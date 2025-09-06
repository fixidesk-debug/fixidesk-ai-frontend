-- Enable required extensions
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";
create extension if not exists vector;

-- Enums
create type public.user_role as enum ('admin', 'agent', 'customer');
create type public.ticket_status as enum ('open', 'in_progress', 'pending', 'resolved', 'closed');
create type public.ticket_priority as enum ('low', 'medium', 'high', 'urgent');

-- Organizations
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  website text,
  industry text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  first_name text,
  last_name text,
  avatar_url text,
  company_name text,
  phone text,
  role public.user_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists profiles_email_unique on public.profiles(email);

-- Organization membership
create table if not exists public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.user_role not null default 'customer',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

-- Ticket categories
create table if not exists public.ticket_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text,
  description text,
  created_at timestamptz not null default now()
);

-- Tickets
create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  customer_id uuid not null references public.profiles(id) on delete set null,
  assigned_agent_id uuid references public.profiles(id) on delete set null,
  category_id uuid references public.ticket_categories(id) on delete set null,
  title text not null,
  description text not null,
  status public.ticket_status not null default 'open',
  priority public.ticket_priority not null default 'medium',
  due_date timestamptz,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_tickets_org on public.tickets(organization_id);
create index if not exists idx_tickets_customer on public.tickets(customer_id);
create index if not exists idx_tickets_assigned on public.tickets(assigned_agent_id);

-- Ticket comments/messages
create table if not exists public.ticket_comments (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  is_internal boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_ticket_comments_ticket on public.ticket_comments(ticket_id);

-- 2FA table
create table if not exists public.user_two_factor (
  user_id uuid not null references public.profiles(id) on delete cascade,
  method text not null,
  secret text not null,
  is_enabled boolean not null default false,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  primary key (user_id, method)
);

-- Optional: knowledge embeddings (for RAG later)
create table if not exists public.knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  source text not null,
  chunk text not null,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamptz not null default now()
);
create index if not exists idx_knowledge_org on public.knowledge_chunks(organization_id);

-- Helper function to get user role
create or replace function public.get_user_role(user_id uuid)
returns public.user_role
language sql stable as $$
  select role from public.profiles p where p.id = get_user_role.user_id;
$$;

-- RLS
alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.organization_members enable row level security;
alter table public.tickets enable row level security;
alter table public.ticket_comments enable row level security;
alter table public.ticket_categories enable row level security;
alter table public.user_two_factor enable row level security;
alter table public.knowledge_chunks enable row level security;

-- Profiles: users can read/update their own profile, insert their row on signup hooks
create policy if not exists "Profiles are viewable by owner" on public.profiles
  for select using (id = auth.uid());
create policy if not exists "Profiles are updatable by owner" on public.profiles
  for update using (id = auth.uid());
create policy if not exists "Profiles insert by self" on public.profiles
  for insert with check (id = auth.uid());

-- Organizations: members can read; creators can insert
create policy if not exists "Organizations readable by members" on public.organizations
  for select using (exists (
    select 1 from public.organization_members m
    where m.organization_id = organizations.id and m.user_id = auth.uid() and m.is_active
  ));
create policy if not exists "Organizations insert by authenticated" on public.organizations
  for insert with check (true);
create policy if not exists "Organizations updatable by admins" on public.organizations
  for update using (exists (
    select 1 from public.organization_members m
    where m.organization_id = organizations.id and m.user_id = auth.uid() and m.role = 'admin'
  ));

-- Organization members: member can read; only admins can manage within their org
create policy if not exists "Org members readable by members" on public.organization_members
  for select using (exists (
    select 1 from public.organization_members m
    where m.organization_id = organization_members.organization_id and m.user_id = auth.uid() and m.is_active
  ));
create policy if not exists "Org members insert by admins" on public.organization_members
  for insert with check (exists (
    select 1 from public.organization_members m
    where m.organization_id = organization_members.organization_id and m.user_id = auth.uid() and m.role = 'admin'
  ));
create policy if not exists "Org members update by admins" on public.organization_members
  for update using (exists (
    select 1 from public.organization_members m
    where m.organization_id = organization_members.organization_id and m.user_id = auth.uid() and m.role = 'admin'
  ));

-- Tickets: members can read/insert/update within their org
create policy if not exists "Tickets readable by org members" on public.tickets
  for select using (exists (
    select 1 from public.organization_members m
    where m.organization_id = tickets.organization_id and m.user_id = auth.uid() and m.is_active
  ));
create policy if not exists "Tickets insert by org members" on public.tickets
  for insert with check (exists (
    select 1 from public.organization_members m
    where m.organization_id = tickets.organization_id and m.user_id = auth.uid() and m.is_active
  ));
create policy if not exists "Tickets update by org members" on public.tickets
  for update using (exists (
    select 1 from public.organization_members m
    where m.organization_id = tickets.organization_id and m.user_id = auth.uid() and m.is_active
  ));

-- Ticket comments: readable/insertable by org members
create policy if not exists "Ticket comments readable by org members" on public.ticket_comments
  for select using (exists (
    select 1 from public.organization_members m
    join public.tickets t on t.id = ticket_comments.ticket_id
    where m.organization_id = t.organization_id and m.user_id = auth.uid() and m.is_active
  ));
create policy if not exists "Ticket comments insert by org members" on public.ticket_comments
  for insert with check (exists (
    select 1 from public.organization_members m
    join public.tickets t on t.id = ticket_comments.ticket_id
    where m.organization_id = t.organization_id and m.user_id = auth.uid() and m.is_active
  ));

-- Ticket categories: readable by org members, insert/update by admins if you choose to scope per org later
create policy if not exists "Ticket categories readable by all" on public.ticket_categories for select using (true);

-- 2FA: only owner can operate
create policy if not exists "2FA selectable by owner" on public.user_two_factor
  for select using (user_id = auth.uid());
create policy if not exists "2FA insert by owner" on public.user_two_factor
  for insert with check (user_id = auth.uid());
create policy if not exists "2FA update by owner" on public.user_two_factor
  for update using (user_id = auth.uid());
create policy if not exists "2FA delete by owner" on public.user_two_factor
  for delete using (user_id = auth.uid());

-- Knowledge chunks: org members only
create policy if not exists "Knowledge chunks readable by org members" on public.knowledge_chunks
  for select using (exists (
    select 1 from public.organization_members m
    where m.organization_id = knowledge_chunks.organization_id and m.user_id = auth.uid() and m.is_active
  ));
create policy if not exists "Knowledge chunks insert by org members" on public.knowledge_chunks
  for insert with check (exists (
    select 1 from public.organization_members m
    where m.organization_id = knowledge_chunks.organization_id and m.user_id = auth.uid() and m.is_active
  ));

-- Triggers to keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;$$;

create trigger set_updated_at_organizations before update on public.organizations
for each row execute function public.set_updated_at();
create trigger set_updated_at_profiles before update on public.profiles
for each row execute function public.set_updated_at();
create trigger set_updated_at_org_members before update on public.organization_members
for each row execute function public.set_updated_at();
create trigger set_updated_at_tickets before update on public.tickets
for each row execute function public.set_updated_at();
create trigger set_updated_at_ticket_comments before update on public.ticket_comments
for each row execute function public.set_updated_at();
