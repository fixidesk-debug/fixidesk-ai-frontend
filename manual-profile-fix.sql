-- Manual fix - create profile for existing user

-- 1. First, check your user ID
SELECT id, email FROM auth.users;

-- 2. Create profile manually (replace USER_ID and EMAIL)
INSERT INTO profiles (id, email, first_name, last_name, role) 
VALUES (
  'YOUR_USER_ID_HERE',  -- Replace with actual user ID from step 1
  'your-email@example.com',  -- Replace with your email
  'Your',  -- Replace with your first name
  'Name',  -- Replace with your last name
  'admin'  -- Set as admin
) ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  updated_at = NOW();

-- 3. Verify profile created
SELECT * FROM profiles WHERE email = 'your-email@example.com';