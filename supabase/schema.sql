-- ================================================================
-- AHAM.AI — SUPABASE DATABASE SCHEMA
-- Paste this entire file into Supabase → SQL Editor → Run
-- ================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ================================================================
-- 1. PROFILES (extends Supabase auth.users)
-- ================================================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  company text,
  phone text,
  city text,
  avatar_url text,
  role text default 'client' check (role in ('client', 'admin')),
  created_at timestamptz default now()
);

-- Auto-create profile when user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ================================================================
-- 2. LEADS (contact form submissions)
-- ================================================================
create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  service text,
  message text,
  status text default 'new' check (status in ('new', 'progress', 'followup', 'done')),
  created_at timestamptz default now()
);

-- ================================================================
-- 3. PROJECTS
-- ================================================================
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  type text,
  status text default 'In Progress',
  color text default '#9B7FFF',
  icon text default '💼',
  complete integer default 0 check (complete between 0 and 100),
  days_left integer default 30,
  start_date date default current_date,
  target_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ================================================================
-- 4. PROJECT TIMELINE STEPS
-- ================================================================
create table public.timeline_steps (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  title text not null,
  description text,
  status text default 'pending' check (status in ('done', 'current', 'pending')),
  target_date text,
  completed_date date,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- ================================================================
-- 5. DELIVERABLES (checklist)
-- ================================================================
create table public.deliverables (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  title text not null,
  done boolean default false,
  completed_at timestamptz,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- ================================================================
-- 6. MESSAGES
-- ================================================================
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  sender_id uuid references public.profiles(id),
  sender_name text not null,
  sender_initials text not null,
  sender_type text default 'client' check (sender_type in ('client', 'team')),
  content text not null,
  created_at timestamptz default now()
);

-- ================================================================
-- 7. FILES
-- ================================================================
create table public.files (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  uploaded_by uuid references public.profiles(id),
  name text not null,
  file_type text,
  size_mb numeric(6,2),
  storage_path text,
  category text default 'General',
  uploader_name text,
  created_at timestamptz default now()
);

-- ================================================================
-- 8. INVOICES
-- ================================================================
create table public.invoices (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  invoice_number text,
  description text not null,
  amount numeric(10,2) not null,
  status text default 'upcoming' check (status in ('paid', 'due', 'upcoming')),
  due_date date,
  paid_date date,
  created_at timestamptz default now()
);

-- ================================================================
-- 9. APPROVALS
-- ================================================================
create table public.approvals (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  item_name text not null,
  submitted_by text,
  preview_icon text default '◈',
  status text default 'pending' check (status in ('pending', 'approved', 'changes')),
  client_note text,
  created_at timestamptz default now(),
  reviewed_at timestamptz
);

-- ================================================================
-- 10. ACTIVITY LOG
-- ================================================================
create table public.activity (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  icon text default '📋',
  text text not null,
  color text default 'var(--coral)',
  created_at timestamptz default now()
);

-- ================================================================
-- 11. NOTIFICATIONS
-- ================================================================
create table public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  type text default 'info' check (type in ('message', 'approval', 'file', 'milestone', 'invoice', 'info')),
  text text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- ================================================================
-- 12. MEETING SLOTS & BOOKINGS
-- ================================================================
create table public.meeting_slots (
  id uuid default uuid_generate_v4() primary key,
  label text not null,
  slot_datetime timestamptz not null,
  available boolean default true,
  created_at timestamptz default now()
);

create table public.bookings (
  id uuid default uuid_generate_v4() primary key,
  slot_id uuid references public.meeting_slots(id),
  client_id uuid references public.profiles(id),
  project_id uuid references public.projects(id),
  meet_link text,
  created_at timestamptz default now()
);

-- ================================================================
-- 13. BRAND KIT ASSETS
-- ================================================================
create table public.brand_assets (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  name text not null,
  file_name text,
  file_type text,
  storage_path text,
  icon text default '◈',
  color text default 'var(--violet)',
  created_at timestamptz default now()
);

-- ================================================================
-- ROW LEVEL SECURITY (RLS)
-- Ensures clients only see their own data
-- ================================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.projects enable row level security;
alter table public.timeline_steps enable row level security;
alter table public.deliverables enable row level security;
alter table public.messages enable row level security;
alter table public.files enable row level security;
alter table public.invoices enable row level security;
alter table public.approvals enable row level security;
alter table public.activity enable row level security;
alter table public.notifications enable row level security;
alter table public.meeting_slots enable row level security;
alter table public.bookings enable row level security;
alter table public.brand_assets enable row level security;

-- ---- PROFILES ----
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);
create policy "Admins can view all profiles"
  on public.profiles for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ---- LEADS (only admins) ----
create policy "Admins can manage leads"
  on public.leads for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );
create policy "Anyone can insert a lead"
  on public.leads for insert with check (true);

-- ---- PROJECTS ----
create policy "Clients see own projects"
  on public.projects for select using (client_id = auth.uid());
create policy "Admins manage all projects"
  on public.projects for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ---- PROJECT CHILDREN (timeline, deliverables, etc.) ----
-- Uses a helper function to check project ownership
create or replace function public.owns_project(proj_id uuid)
returns boolean as $$
  select exists (
    select 1 from public.projects
    where id = proj_id
    and (
      client_id = auth.uid()
      or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
    )
  );
$$ language sql security definer;

create policy "Access own project timeline" on public.timeline_steps for all using (owns_project(project_id));
create policy "Access own deliverables" on public.deliverables for all using (owns_project(project_id));
create policy "Access own messages" on public.messages for all using (owns_project(project_id));
create policy "Access own files" on public.files for all using (owns_project(project_id));
create policy "Access own invoices" on public.invoices for all using (owns_project(project_id));
create policy "Access own approvals" on public.approvals for all using (owns_project(project_id));
create policy "Access own activity" on public.activity for all using (owns_project(project_id));
create policy "Access own brand assets" on public.brand_assets for all using (owns_project(project_id));

-- ---- NOTIFICATIONS ----
create policy "Users see own notifications"
  on public.notifications for all using (user_id = auth.uid());

-- ---- MEETING SLOTS ----
create policy "Anyone can view available slots"
  on public.meeting_slots for select using (available = true);
create policy "Admins manage slots"
  on public.meeting_slots for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ---- BOOKINGS ----
create policy "Clients see own bookings"
  on public.bookings for select using (client_id = auth.uid());
create policy "Clients can book"
  on public.bookings for insert with check (client_id = auth.uid());
create policy "Admins manage bookings"
  on public.bookings for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ================================================================
-- STORAGE BUCKET for file uploads
-- Run this after setting up the schema
-- ================================================================
-- In Supabase dashboard → Storage → New Bucket:
-- Name: "project-files"
-- Public: false
-- Then add this policy:
--
-- insert into storage.policies (name, bucket_id, operation, definition)
-- values (
--   'Authenticated users can upload',
--   'project-files',
--   'INSERT',
--   'auth.role() = ''authenticated'''
-- );

-- ================================================================
-- SEED DATA — Demo client + project for testing
-- Run after creating a user via Supabase Auth dashboard
-- Replace 'YOUR-USER-UUID' with the actual UUID from auth.users
-- ================================================================

-- Insert demo meeting slots
insert into public.meeting_slots (label, slot_datetime) values
  ('Mon Mar 24 · 10:00 AM', '2026-03-24 10:00:00+05:30'),
  ('Mon Mar 24 · 3:00 PM',  '2026-03-24 15:00:00+05:30'),
  ('Tue Mar 25 · 11:00 AM', '2026-03-25 11:00:00+05:30'),
  ('Tue Mar 25 · 4:00 PM',  '2026-03-25 16:00:00+05:30'),
  ('Wed Mar 26 · 10:00 AM', '2026-03-26 10:00:00+05:30'),
  ('Thu Mar 27 · 2:00 PM',  '2026-03-27 14:00:00+05:30');
