create index if not exists idx_tickets_org_status on tickets(org_id, status);
create index if not exists idx_messages_org_created on messages(org_id, created_at);
create index if not exists idx_vector_documents_org on vector_documents(org_id);

create or replace function aggregate_billing_usage() returns void as $$
begin
  -- aggregate tokens and minutes from logs (stub)
  return;
end;
$$ language plpgsql;
