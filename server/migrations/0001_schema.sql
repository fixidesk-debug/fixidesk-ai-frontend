create extension if not exists pgcrypto;
create extension if not exists vector;

create table if not exists orgs (
  id uuid primary key,
  name text not null,
  plan text not null,
  settings jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists users (
  id uuid primary key,
  org_id uuid references orgs(id) on delete cascade,
  email text not null,
  name text,
  role text,
  password_hash text,
  created_at timestamptz default now(),
  unique(org_id, email)
);

create table if not exists teams (
  id uuid primary key,
  org_id uuid references orgs(id) on delete cascade,
  name text not null
);

create table if not exists inboxes (
  id uuid primary key,
  org_id uuid references orgs(id) on delete cascade,
  name text not null,
  provider text not null,
  provider_inbox_id text
);

create table if not exists customers (
  id uuid primary key,
  org_id uuid references orgs(id) on delete cascade,
  name text,
  email text,
  phone text,
  metadata jsonb default '{}'::jsonb
);

create table if not exists tickets (
  id uuid primary key,
  org_id uuid references orgs(id) on delete cascade,
  inbox_id uuid references inboxes(id),
  customer_id uuid references customers(id),
  subject text not null,
  status text not null,
  priority text,
  assignee_id uuid references users(id),
  meta jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists threads (
  id uuid primary key,
  ticket_id uuid references tickets(id) on delete cascade,
  org_id uuid references orgs(id) on delete cascade,
  type text
);

create table if not exists messages (
  id uuid primary key,
  thread_id uuid references threads(id),
  ticket_id uuid references tickets(id) on delete cascade,
  org_id uuid references orgs(id) on delete cascade,
  direction text,
  body_text text,
  body_html text,
  sender_user_id uuid references users(id),
  sender_customer_id uuid references customers(id),
  message_uuid text unique,
  provider text,
  provider_message_id text,
  created_at timestamptz default now()
);
create unique index if not exists uniq_messages_provider_msg on messages(org_id, provider_message_id);

create table if not exists attachments (
  id uuid primary key,
  org_id uuid references orgs(id) on delete cascade,
  message_id uuid references messages(id) on delete cascade,
  url text,
  size bigint,
  mime text
);

create table if not exists outbox (
  id serial primary key,
  org_id uuid references orgs(id) on delete cascade,
  event_type text not null,
  payload jsonb not null,
  processed boolean default false,
  created_at timestamptz default now()
);

create table if not exists vector_documents (
  id uuid primary key,
  org_id uuid references orgs(id) on delete cascade,
  source text,
  source_id text,
  embedding vector(1536),
  content text,
  metadata jsonb default '{}'::jsonb
);

create table if not exists audit_events (
  id uuid primary key,
  org_id uuid references orgs(id) on delete cascade,
  actor_id uuid,
  action text,
  entity text,
  entity_id uuid,
  diff jsonb,
  created_at timestamptz default now()
);

create table if not exists secrets (
  id uuid primary key,
  org_id uuid references orgs(id) on delete cascade,
  key text,
  value text,
  created_at timestamptz default now()
);

create table if not exists ai_logs (
  id uuid primary key,
  org_id uuid references orgs(id) on delete cascade,
  prompt_hash text,
  response_id text,
  llm_model text,
  tokens_used integer,
  meta jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists templates (
  id uuid primary key,
  org_id uuid references orgs(id) on delete cascade,
  name text,
  content text,
  created_at timestamptz default now()
);

create table if not exists idempotency_keys (
  key text primary key,
  org_id uuid references orgs(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists billing_usage (
  id bigserial primary key,
  org_id uuid references orgs(id) on delete cascade,
  day date not null,
  tokens_used bigint default 0,
  call_minutes integer default 0
);
