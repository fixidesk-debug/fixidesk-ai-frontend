-- Final auth fix without IF NOT EXISTS

-- 1. Create enum types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'agent', 'customer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Get your user ID first
SELECT id, email FROM auth.users;

-- 3. Create profile manually (replace with your actual user ID and email)
INSERT INTO profiles (id, email, first_name, last_name, role) 
VALUES (
  'YOUR_USER_ID_HERE',
  'your-email@example.com',
  'Your Name',
  'Last Name', 
  'admin'::user_role
) ON CONFLICT (id) DO UPDATE SET role = 'admin'::user_role;

-- 4. Drop existing policies
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;

-- 5. Create new policies
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);