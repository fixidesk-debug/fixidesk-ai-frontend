-- Add missing columns used by app
alter table if exists public.tickets add column if not exists customer_email text;
alter table if exists public.profiles add column if not exists is_active boolean default true;
alter table if exists public.profiles add column if not exists last_login timestamptz;

-- Allow personal (no-org) tickets: readable/insertable/updatable by owner or assigned agent
create policy if not exists "Tickets readable when no org" on public.tickets
  for select using (
    organization_id is null and (
      customer_id = auth.uid() or assigned_agent_id = auth.uid()
    )
  );

create policy if not exists "Tickets insert when no org by owner" on public.tickets
  for insert with check (
    organization_id is null and customer_id = auth.uid()
  );

create policy if not exists "Tickets update when no org by owner or agent" on public.tickets
  for update using (
    organization_id is null and (
      customer_id = auth.uid() or assigned_agent_id = auth.uid()
    )
  );

-- Comments policies for no-org tickets
create policy if not exists "Comments readable when ticket has no org" on public.ticket_comments
  for select using (
    exists (
      select 1 from public.tickets t
      where t.id = ticket_comments.ticket_id
        and t.organization_id is null
        and (t.customer_id = auth.uid() or t.assigned_agent_id = auth.uid())
    )
  );

create policy if not exists "Comments insert when ticket has no org by owner or agent" on public.ticket_comments
  for insert with check (
    exists (
      select 1 from public.tickets t
      where t.id = ticket_comments.ticket_id
        and t.organization_id is null
        and (t.customer_id = auth.uid() or t.assigned_agent_id = auth.uid())
    )
  );
