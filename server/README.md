FixiDesk Backend

Commands:
- Apply migrations: npm run migrate
- Run API: npm run server:dev
- Run workers: npm run worker:outbox & npm run worker:billing

Environment variables:
- PORT, DATABASE_URL, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, JWT_SIGNING_KEY
- LLM_API_KEY, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, CHATWOOT_API_KEY
- N8N_BASE_URL, MAUTIC_BASE_URL, ESP0CRM_BASE_URL, S3_ENDPOINT, S3_KEY, S3_SECRET
- SECRET_ENCRYPTION_KEY, SYSTEM_ADMIN_KEY, FEATURE_FLAGS_JSON

Provision tenant:
- SYSTEM_ADMIN_KEY=... bash server/scripts/provision.sh "Acme" starter admin@acme.com acme

Docs:
- OpenAPI: server/openapi/fixidesk.yaml
- Postman: server/postman/fixidesk.postman_collection.json

Sample curl:
- Create ticket: curl -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"inbox_id":"...","subject":"Help","message":{"body_text":"Hi"}}' http://localhost:8787/v1/tickets
- Triage: curl -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"message":"Where is my order?"}' http://localhost:8787/v1/ai/triage
