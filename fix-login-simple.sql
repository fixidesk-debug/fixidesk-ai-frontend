-- Simple login fix - run this first

-- 1. Check if admin user exists
SELECT id, email FROM auth.users WHERE email = 'admin@fixidesk.com';

-- 2. If no admin user, create one
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
  'admin@fixidesk.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- 3. Create profile for admin
INSERT INTO public.profiles (id, email, first_name, last_name, role)
SELECT id, email, 'Admin', 'User', 'admin'
FROM auth.users 
WHERE email = 'admin@fixidesk.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- 4. Verify setup
SELECT 'User created:' as status, id, email FROM auth.users WHERE email = 'admin@fixidesk.com';
SELECT 'Profile created:' as status, id, email, role FROM public.profiles WHERE email = 'admin@fixidesk.com';