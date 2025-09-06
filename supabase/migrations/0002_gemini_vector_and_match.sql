-- Adjust embeddings vector dimension to 768 for Gemini text-embedding-004
alter table if exists public.embeddings
  alter column vector type vector(768);

-- RPC function for ANN search using pgvector (<-> Euclidean)
create or replace function public.match_embeddings(
  p_org_id uuid,
  p_query_embedding vector(768),
  p_match_count int default 5
)
returns table (
  id uuid,
  organization_id uuid,
  document_id uuid,
  chunk_idx int,
  text text,
  distance float
) as $$
  select e.id, e.organization_id, e.document_id, e.chunk_idx, e.text,
         (e.vector <-> p_query_embedding) as distance
  from public.embeddings e
  where e.organization_id = p_org_id
  order by e.vector <-> p_query_embedding
  limit p_match_count;
$$ language sql stable;
