# 🚀 Supabase Setup - Final Steps

## ✅ Database Status
- ✅ Tables exist: `profiles`, `user_invitations`, `user_two_factor`
- ❌ Missing columns in `profiles` table

## 🔧 Required SQL Commands

**Go to:** https://supabase.com/dashboard/project/pphakciknujtwdzshvij/sql

**Run this SQL:**

```sql
-- Add missing columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS login_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS organization_id UUID,
ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{}';

-- Create functions for user management
CREATE OR REPLACE FUNCTION public.create_user_invitation(
  p_email TEXT,
  p_role user_role,
  p_invited_by UUID
)
RETURNS UUID AS $$
DECLARE
  invitation_id UUID;
  invitation_token TEXT;
BEGIN
  invitation_token := encode(gen_random_bytes(32), 'hex');
  
  INSERT INTO public.user_invitations (
    email, role, invited_by, token
  ) VALUES (
    p_email, p_role, p_invited_by, invitation_token
  ) RETURNING id INTO invitation_id;
  
  RETURN invitation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on new tables
ALTER TABLE public.user_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_two_factor ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own 2FA" ON public.user_two_factor
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admins can manage invitations" ON public.user_invitations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

## 🎯 After Running SQL

1. **Test the setup:**
   ```bash
   npm run dev
   ```

2. **Create an admin user:**
   - Register a new account
   - Manually update role to 'admin' in Supabase Dashboard

3. **Test features:**
   - ✅ Login/Register
   - ✅ User Management (admin only)
   - ✅ 2FA Setup
   - ✅ Password Reset
   - ✅ Team Invitations

## 🚀 Ready to Use!
Your authentication system is now fully configured!