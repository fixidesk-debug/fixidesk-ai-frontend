-- Documents table for RAG
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  content text not null,
  chunked_at timestamptz,
  created_at timestamptz not null default now()
);

-- Embeddings table (Gemini 768-dim)
create table if not exists public.embeddings (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  document_id uuid not null references public.documents(id) on delete cascade,
  chunk_idx int not null,
  vector vector(768),
  text text not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_embeddings_org on public.embeddings(organization_id);
create index if not exists idx_embeddings_doc on public.embeddings(document_id);

-- View to simplify ticket joins used by API server
create or replace view public.tickets_with_customer as
select t.*, 
       p.first_name || coalesce(' ' || p.last_name, '') as customer_name,
       p.email as customer_email
from public.tickets t
left join public.profiles p on p.id = t.customer_id;

-- Recent activities for dashboard
create table if not exists public.recent_activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('ticket','call','chat')),
  title text not null,
  description text,
  priority text not null default 'medium' check (priority in ('low','medium','high')),
  created_at timestamptz not null default now()
);
alter table public.recent_activities enable row level security;
create policy if not exists "Activities by owner" on public.recent_activities
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Simple analytics function used by dashboard charts
create or replace function public.get_user_analytics(p_user_id uuid)
returns table (
  new_users_today int,
  total_tickets int,
  open_tickets int,
  resolved_tickets int,
  avg_resolution_time text
) language sql stable as $$
  select 
    0 as new_users_today,
    (select count(*) from public.tickets) as total_tickets,
    (select count(*) from public.tickets where status = 'open') as open_tickets,
    (select count(*) from public.tickets where status = 'resolved') as resolved_tickets,
    '0m'::text as avg_resolution_time;
$$;

-- Dashboard summary stats
create or replace function public.get_dashboard_stats(user_id uuid)
returns json language plpgsql stable as $$
DECLARE
  v_active int;
  v_resolved_today int;
BEGIN
  select count(*) into v_active from public.tickets where status in ('open','in_progress');
  select count(*) into v_resolved_today from public.tickets where resolved_at::date = now()::date;
  return json_build_object(
    'active_tickets', coalesce(v_active,0),
    'resolved_today', coalesce(v_resolved_today,0),
    'avg_response_time', '0m',
    'satisfaction_rate', 0,
    'ticket_change', '+0%',
    'resolved_change', '+0%',
    'response_change', '0%',
    'satisfaction_change', '+0%'
  );
END$$;

-- Invitations for team onboarding
create table if not exists public.user_invitations (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role public.user_role not null default 'agent',
  token text not null unique,
  invited_by uuid,
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  expires_at timestamptz
);
alter table public.user_invitations enable row level security;
create policy if not exists "Invites readable by anyone" on public.user_invitations for select using (true);
create policy if not exists "Invites insert by authenticated" on public.user_invitations for insert with check (auth.uid() is not null);
create policy if not exists "Invites update by authenticated" on public.user_invitations for update using (auth.uid() is not null);

create or replace function public.create_user_invitation(p_email text, p_role public.user_role default 'agent')
returns table (token text) language plpgsql security definer as $$
DECLARE
  v_token text := encode(gen_random_bytes(24), 'hex');
BEGIN
  insert into public.user_invitations(email, role, token, invited_by, expires_at)
  values (p_email, p_role, v_token, auth.uid(), now() + interval '14 days')
  on conflict (token) do nothing;
  return query select v_token;
END$$;

create or replace function public.accept_invitation(p_token text, p_user_id uuid)
returns void language plpgsql security definer as $$
DECLARE
  v_role public.user_role;
BEGIN
  select role into v_role from public.user_invitations where token = p_token and accepted_at is null and (expires_at is null or expires_at > now());
  if v_role is null then
    raise exception 'Invalid or expired invitation';
  end if;
  update public.user_invitations set accepted_at = now() where token = p_token;
  update public.profiles set role = v_role where id = p_user_id;
END$$;

-- Create public storage bucket for avatars if storage schema is available
do $$ begin
  if exists (select 1 from information_schema.schemata where schema_name = 'storage') then
    insert into storage.buckets (id, name, public) values ('avatars','avatars', true)
    on conflict (id) do nothing;
  end if;
end $$;
