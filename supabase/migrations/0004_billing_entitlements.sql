-- ============================================================================
-- 0004 — Billing entitlements (Stripe → Pro)
-- ============================================================================
-- Adds the entitlement columns the app already reads (profiles.is_pro) but the
-- schema never defined, the customer-id mapping the webhook needs to tie a
-- subscription back to a profile, an idempotency ledger so Stripe's retries
-- don't double-process, and a trigger that stops a user from granting *itself*
-- Pro by writing its own profile row (the existing "users update own profile"
-- policy would otherwise allow it).
-- Idempotent — safe to re-run.
-- ============================================================================

-- Entitlement columns -------------------------------------------------------
alter table public.profiles
  add column if not exists is_pro             boolean not null default false,
  add column if not exists stripe_customer_id text,
  add column if not exists pro_since          timestamptz;

-- One Stripe customer maps to exactly one profile.
create unique index if not exists profiles_stripe_customer_idx
  on public.profiles (stripe_customer_id)
  where stripe_customer_id is not null;

-- Webhook idempotency ledger ------------------------------------------------
-- Stripe delivers at-least-once and retries on any non-2xx. Record each event
-- id once; a duplicate insert is the signal to skip re-processing.
create table if not exists public.stripe_events (
  id          text primary key,        -- Stripe event id (evt_...)
  type        text not null,
  received_at timestamptz not null default now()
);

alter table public.stripe_events enable row level security;
-- No policies → only the service-role client (which bypasses RLS) can touch it.

-- Entitlement lock-down -----------------------------------------------------
-- profiles is client-writable (the game store upserts xp/gold/streak under the
-- "users update own profile" policy). Billing columns must NOT be: a learner
-- could otherwise flip their own is_pro. This trigger reverts any change to the
-- billing columns unless the caller is a trusted server role (the service-role
-- key used by the Stripe webhook / cron jobs). Defense-in-depth alongside RLS.
create or replace function public.protect_billing_columns()
returns trigger language plpgsql as $$
begin
  if current_user not in ('service_role', 'postgres', 'supabase_admin') then
    new.is_pro             := old.is_pro;
    new.stripe_customer_id := old.stripe_customer_id;
    new.pro_since          := old.pro_since;
  end if;
  return new;
end $$;

drop trigger if exists trg_profiles_protect_billing on public.profiles;
create trigger trg_profiles_protect_billing
  before update on public.profiles
  for each row execute function public.protect_billing_columns();
