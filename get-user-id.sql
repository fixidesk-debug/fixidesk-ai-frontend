-- Get your existing user ID

-- 1. Check if you have any users in auth.users
SELECT id, email, created_at FROM auth.users;

-- 2. If no users exist, you need to register first through the app
-- Go to your app's /signup page and create an account

-- 3. After registration, run this again to get your user ID
SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- 4. Then use that ID in the profile creation
-- Replace YOUR_USER_ID_HERE with the actual UUID from step 3