# 🔧 Complete Supabase Setup Instructions

## Step 1: Run the Complete Fix
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire contents of `complete-supabase-fix.sql`
4. Click **Run** to execute

## Step 2: Enable Authentication Settings
1. Go to **Authentication** → **Settings**
2. Enable these settings:
   - ✅ **Enable email signups**
   - ❌ **Enable email confirmations** (disable for testing)
   - ✅ **Enable phone signups** (optional)

## Step 3: Test Login
Use these credentials to test:
- **Email:** `admin@fixidesk.com`
- **Password:** `admin123`

## Step 4: Verify Setup
Run this query to verify everything worked:
```sql
SELECT 'Users:' as table_name, count(*) as count FROM auth.users
UNION ALL
SELECT 'Profiles:', count(*) FROM profiles;
```

## Step 5: Update Environment Variables
Make sure your `.env` has:
```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## What This Script Does:
- ✅ Creates all required enum types
- ✅ Creates/fixes profiles table
- ✅ Sets up Row Level Security
- ✅ Creates proper policies
- ✅ Sets up user registration trigger
- ✅ Creates admin test user
- ✅ Creates admin profile
- ✅ Grants all permissions

## If Issues Persist:
1. Check Supabase logs in Dashboard → Logs
2. Verify your project URL and keys
3. Test with the admin credentials first
4. Then try registering a new user

## Success Indicators:
- ✅ Can login with admin@fixidesk.com / admin123
- ✅ Can register new users
- ✅ Profiles are created automatically
- ✅ Dashboard loads without errors

**Total setup time: 5 minutes**