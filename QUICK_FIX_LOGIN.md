# Quick Fix for Login Issues

## Problem Identified

The login system is failing because the `profiles` table is missing required columns that the application expects.

## Solution

Run the following SQL commands in your Supabase dashboard (SQL Editor):

### Step 1: Add Missing Columns

```sql
-- Add missing columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN DEFAULT false;
```

### Step 2: Fix RLS Policies

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.profiles;

-- Create proper policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### Step 3: Update User Registration Function

```sql
-- Update the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    first_name, 
    last_name, 
    company_name,
    role,
    permissions,
    is_active,
    two_factor_enabled
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'company_name', ''),
    'customer',
    '{}',
    true,
    false
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    RETURN NEW;
  WHEN OTHERS THEN
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RAISE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## How to Apply the Fix

1. **Go to your Supabase Dashboard**
   - Navigate to your project
   - Go to SQL Editor

2. **Run the SQL Commands**
   - Copy and paste each SQL block above
   - Run them one by one in order

3. **Restart Your Development Server**

   ```bash
   npm run dev
   ```

4. **Test Login**
   - Try logging in with existing credentials
   - Try creating a new account

## Alternative: Use Supabase CLI

If you have Supabase CLI installed:

```bash
supabase db push
```

## What This Fixes

- ✅ Adds missing `is_active`, `permissions`, `last_login`, `two_factor_enabled` columns
- ✅ Fixes Row Level Security policies
- ✅ Updates user registration trigger
- ✅ Ensures proper profile creation during login/signup

## Verification

After applying the fix, you can verify it worked by:

1. Checking that login works without errors
2. Creating a new account successfully
3. Checking browser console for no authentication errors

## If Issues Persist

1. Check browser console for specific error messages
2. Verify environment variables are loaded correctly
3. Ensure Supabase project is properly configured
4. Check that the profiles table has all required columns
