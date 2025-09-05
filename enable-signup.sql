-- Enable signup and fix auth settings

-- 1. Check current auth settings
SELECT * FROM auth.config;

-- 2. Enable signup (run in Supabase SQL Editor)
UPDATE auth.config SET enable_signup = true;

-- 3. Disable email confirmation for testing
UPDATE auth.config SET enable_confirmations = false;

-- 4. Create a test user manually (if needed)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@yourdomain.com',
  crypt('password123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- 5. Get the created user ID
SELECT id, email FROM auth.users WHERE email = 'admin@yourdomain.com';