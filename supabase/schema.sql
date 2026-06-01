-- =====================================================
-- Boots – Supabase schema
-- Run this in the Supabase SQL editor once to bootstrap
-- the cloud backend.
-- =====================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- -------------------------------------------------------
-- profiles
-- -------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  username    text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row when a new user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- -------------------------------------------------------
-- user_progress
-- Mirrors the Zustand localStorage shape for easy sync.
-- -------------------------------------------------------
create table if not exists public.user_progress (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references auth.users on delete cascade,
  xp              integer not null default 0,
  streak          integer not null default 0,
  last_active_day text,
  completed       text[] not null default '{}',
  updated_at      timestamptz not null default now(),
  constraint user_progress_user_id_unique unique (user_id)
);

alter table public.user_progress enable row level security;

create policy "Users can read their own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- Bump updated_at automatically.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_user_progress_updated_at on public.user_progress;
create trigger set_user_progress_updated_at
  before update on public.user_progress
  for each row execute procedure public.set_updated_at();

-- -------------------------------------------------------
-- courses  (informational seed – mirrors src/lib/curriculum)
-- -------------------------------------------------------
create table if not exists public.courses (
  slug        text primary key,
  title       text not null,
  description text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.courses enable row level security;

create policy "Courses are publicly readable"
  on public.courses for select
  using (true);

-- -------------------------------------------------------
-- lessons
-- -------------------------------------------------------
create table if not exists public.lessons (
  id          uuid primary key default uuid_generate_v4(),
  course_slug text not null references public.courses on delete cascade,
  slug        text not null,
  title       text not null,
  xp          integer not null default 25,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  constraint lessons_course_slug_slug_unique unique (course_slug, slug)
);

alter table public.lessons enable row level security;

create policy "Lessons are publicly readable"
  on public.lessons for select
  using (true);
