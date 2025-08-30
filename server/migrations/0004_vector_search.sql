create or replace function search_vector_documents(_org uuid, query vector, k integer)
returns setof vector_documents
language sql stable
as $$
  select * from vector_documents
  where org_id = _org and embedding is not null
  order by embedding <#> query
  limit k;
$$;

-- overload: accept float array
create or replace function search_vector_documents_array(_org uuid, query float4[], k integer)
returns setof vector_documents
language sql stable
as $$
  select * from search_vector_documents(_org, query::vector, k);
$$;
