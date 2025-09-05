-- Fix enum types and auth issues

-- 1. Create missing enum types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'agent', 'customer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Check if you have a profile (replace with your email)
SELECT id, email, role FROM profiles WHERE email = 'your-email@example.com';

-- 3. If no profile exists, create one manually (replace USER_ID and EMAIL)
-- First get your user ID: SELECT id FROM auth.users WHERE email = 'your-email@example.com';

INSERT INTO profiles (id, email, first_name, last_name, role) 
VALUES (
  'YOUR_USER_ID_HERE',  -- Replace with your actual user ID
  'your-email@example.com',  -- Replace with your email
  'Your Name',
  'Last Name', 
  'admin'::user_role
) ON CONFLICT (id) DO UPDATE SET role = 'admin'::user_role;

-- 4. Enable RLS if not enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 5. Create policies if missing
CREATE POLICY IF NOT EXISTS "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY IF NOT EXISTS "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY IF NOT EXISTS "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);