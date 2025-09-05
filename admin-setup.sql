-- Update your user role to admin
-- Replace 'your-email@example.com' with your actual email address

UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';

-- Or if you know your user ID, use:
-- UPDATE profiles SET role = 'admin' WHERE id = 'your-user-id';

-- Verify the update
SELECT id, email, role FROM profiles WHERE email = 'your-email@example.com';