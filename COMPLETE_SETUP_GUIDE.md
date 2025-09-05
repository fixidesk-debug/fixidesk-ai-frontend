# 🚀 COMPLETE DATABASE SETUP FROM SCRATCH

## What This Script Does
- ✅ Creates all extensions and enum types
- ✅ Drops and recreates all tables with correct structure
- ✅ Sets up Row Level Security on all tables
- ✅ Creates comprehensive RLS policies
- ✅ Sets up triggers for user registration
- ✅ Grants all necessary permissions
- ✅ Creates admin test user
- ✅ Inserts default data

## Step 1: Run the Complete Setup
1. Open **Supabase Dashboard**
2. Go to **SQL Editor**
3. Copy the ENTIRE contents of `complete-database-setup.sql`
4. Click **Run** (this may take 30-60 seconds)

## Step 2: Enable Authentication
1. Go to **Authentication** → **Settings**
2. Enable these settings:
   - ✅ **Enable email signups**
   - ❌ **Enable email confirmations** (disable for testing)
   - ✅ **Disable email change confirmations** (for testing)

## Step 3: Test Login
**Admin Credentials:**
- Email: `admin@fixidesk.com`
- Password: `admin123`

## Step 4: Test Registration
1. Go to your app's `/signup` page
2. Register a new user
3. Should automatically create profile

## What Gets Created:

### Tables:
- ✅ profiles (with proper enum types)
- ✅ organizations
- ✅ tickets & ticket_comments
- ✅ ticket_categories
- ✅ chat_messages
- ✅ widget_settings
- ✅ recent_activities
- ✅ leads & deals
- ✅ user_invitations

### Security:
- ✅ RLS enabled on all tables
- ✅ Policies for user data isolation
- ✅ Admin access to all data
- ✅ Agent access to tickets

### Functions:
- ✅ Auto profile creation on signup
- ✅ Updated_at triggers
- ✅ Proper permissions

## Verification:
After running, you should see:
```
SETUP COMPLETE!
Admin user created: [UUID] admin@fixidesk.com admin
Total tables created: [number]
RLS enabled on: [number]
```

## If Something Goes Wrong:
1. Check the error message in SQL Editor
2. Run the script again (it's designed to be re-runnable)
3. Check Authentication settings in Supabase Dashboard

## Success Indicators:
- ✅ Script runs without errors
- ✅ Can login with admin@fixidesk.com / admin123
- ✅ Can register new users
- ✅ Dashboard loads without errors
- ✅ All features work

**This script completely rebuilds your database from scratch with everything needed for FixiDesk to work perfectly.**