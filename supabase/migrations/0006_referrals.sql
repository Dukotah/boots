-- ============================================================================
-- 0006 — Referral programme ("give a month, get a month")
-- ============================================================================
-- Each authenticated user gets a unique, short referral code. When a new
-- learner signs up via ?ref=CODE, we record the relationship and, once they
-- complete a qualifying action (e.g. subscribe), the webhook flips status to
-- 'completed' and triggers reward_granted. Rewards (Stripe coupon / entitlement
-- extension) are applied by the Stripe webhook handler — see docs/referrals.md.
--
-- Fraud notes:
--   • A user can NOT refer themselves — CHECK (referrer_id != referred_id).
--   • reward_granted is NOT in the "users update own profile" policy domain;
--     only service_role can flip it (same pattern as protect_billing_columns).
--   • One row per (referrer_id, referred_id) pair — unique index prevents
--     double-counting if the referred user hits the endpoint twice.
--
-- Idempotent — safe to re-run.
-- ============================================================================

create table if not exists public.referrals (
  id              uuid        primary key default gen_random_uuid(),
  referrer_id     uuid        not null references public.profiles (id) on delete cascade,
  code            text        not null,
  referred_id     uuid        references public.profiles (id) on delete set null,
  status          text        not null default 'pending'
                              check (status in ('pending', 'completed')),
  reward_granted  boolean     not null default false,
  created_at      timestamptz not null default now(),
  completed_at    timestamptz
);

-- Each user has exactly one referral code (no duplicates; UPSERT safe).
create unique index if not exists referrals_code_idx
  on public.referrals (code);

-- One referred user can only be credited to one referrer.
create unique index if not exists referrals_referred_idx
  on public.referrals (referred_id)
  where referred_id is not null;

-- Fast lookup: all referrals by referrer.
create index if not exists referrals_referrer_idx
  on public.referrals (referrer_id);

-- No self-referrals.
alter table public.referrals
  add constraint if not exists referrals_no_self_refer
  check (referrer_id != referred_id);

-- RLS -------------------------------------------------------------------------
alter table public.referrals enable row level security;

-- A user can see only their own referral rows (they are the referrer).
drop policy if exists "referrals_select_own" on public.referrals;
create policy "referrals_select_own"
  on public.referrals for select
  using (referrer_id = auth.uid());

-- A signed-in user can insert a pending redemption row where THEY are the
-- referred party and reward_granted stays false. They cannot set referrer_id to
-- themselves (the check constraint enforces this at the DB level too).
drop policy if exists "referrals_redeem" on public.referrals;
create policy "referrals_redeem"
  on public.referrals for insert
  with check (
    referred_id   = auth.uid()
    and status        = 'pending'
    and reward_granted = false
    and referrer_id  != auth.uid()
  );

-- service_role (webhook) can update any row (status, reward_granted, etc.).
-- No explicit policy needed — service_role bypasses RLS by default.

-- Helper: look up a referrer by their code (used in the redeem endpoint).
-- Returns null if the code does not exist.
create or replace function public.referrer_id_for_code(p_code text)
returns uuid language sql stable security definer as $$
  select referrer_id
  from   public.referrals
  where  code = p_code
  limit  1;
$$;
