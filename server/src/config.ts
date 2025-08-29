export const config = {
  port: parseInt(process.env.PORT || '8787', 10),
  env: process.env.NODE_ENV || 'development',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSigningKey: process.env.JWT_SIGNING_KEY || '',
  kmsKeyId: process.env.KMS_KEY_ID || '',
  featureFlagsJson: process.env.FEATURE_FLAGS_JSON || '{}',
  n8nBaseUrl: process.env.N8N_BASE_URL || '',
  mauticBaseUrl: process.env.MAUTIC_BASE_URL || '',
  espocrmBaseUrl: process.env.ESP0CRM_BASE_URL || process.env.ESPOCRM_BASE_URL || '',
  s3: {
    endpoint: process.env.S3_ENDPOINT || '',
    key: process.env.S3_KEY || '',
    secret: process.env.S3_SECRET || '',
  },
  chatwootApiKey: process.env.CHATWOOT_API_KEY || '',
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
  },
  llmApiKey: process.env.LLM_API_KEY || '',
};
