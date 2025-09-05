-- =====================================================
-- Authentication Enhancements Migration
-- Adds support for 2FA, invitations, and enhanced user management
-- =====================================================

-- Create enum for invitation status
CREATE TYPE public.invitation_status AS ENUM ('pending', 'accepted', 'expired', 'cancelled');

-- Create enum for 2FA methods
CREATE TYPE public.two_factor_method AS ENUM ('totp', 'sms');

-- =====================================================
-- USER INVITATIONS TABLE
-- =====================================================

CREATE TABLE public.user_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'agent',
  invited_by UUID NOT NULL REFERENCES public.profiles(id),
  organization_id UUID REFERENCES public.organizations(id),
  token TEXT NOT NULL UNIQUE,
  status invitation_status NOT NULL DEFAULT 'pending',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '7 days'),
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- TWO-FACTOR AUTHENTICATION TABLE
-- =====================================================

CREATE TABLE public.user_two_factor (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  method two_factor_method NOT NULL DEFAULT 'totp',
  secret TEXT NOT NULL, -- TOTP secret or encrypted phone number
  backup_codes TEXT[], -- Array of backup codes
  is_enabled BOOLEAN NOT NULL DEFAULT false,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, method)
);

-- =====================================================
-- PASSWORD RESET TOKENS TABLE
-- =====================================================

CREATE TABLE public.password_reset_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '1 hour'),
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- USER SESSIONS TABLE (for enhanced security tracking)
-- =====================================================

CREATE TABLE public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL UNIQUE,
  ip_address INET,
  user_agent TEXT,
  location TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_activity TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- AUDIT LOG TABLE
-- =====================================================

CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- ENHANCED PROFILES TABLE
-- =====================================================

-- Add new columns to existing profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS login_count INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES public.organizations(id),
ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}';

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to generate secure tokens
CREATE OR REPLACE FUNCTION public.generate_secure_token(length INTEGER DEFAULT 32)
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  result TEXT := '';
  i INTEGER := 0;
BEGIN
  FOR i IN 1..length LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::INTEGER, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to create user invitation
CREATE OR REPLACE FUNCTION public.create_user_invitation(
  p_email TEXT,
  p_role user_role,
  p_invited_by UUID,
  p_organization_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  invitation_id UUID;
  invitation_token TEXT;
BEGIN
  -- Generate secure token
  invitation_token := public.generate_secure_token(64);
  
  -- Create invitation
  INSERT INTO public.user_invitations (
    email, role, invited_by, organization_id, token
  ) VALUES (
    p_email, p_role, p_invited_by, p_organization_id, invitation_token
  ) RETURNING id INTO invitation_id;
  
  RETURN invitation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to accept invitation
CREATE OR REPLACE FUNCTION public.accept_invitation(
  p_token TEXT,
  p_user_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  invitation_record RECORD;
BEGIN
  -- Get invitation
  SELECT * INTO invitation_record
  FROM public.user_invitations
  WHERE token = p_token
    AND status = 'pending'
    AND expires_at > now();
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Update user profile with invitation details
  UPDATE public.profiles
  SET 
    role = invitation_record.role,
    organization_id = invitation_record.organization_id,
    updated_at = now()
  WHERE id = p_user_id;
  
  -- Mark invitation as accepted
  UPDATE public.user_invitations
  SET 
    status = 'accepted',
    accepted_at = now(),
    updated_at = now()
  WHERE id = invitation_record.id;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log audit events
CREATE OR REPLACE FUNCTION public.log_audit_event(
  p_user_id UUID,
  p_action TEXT,
  p_resource_type TEXT DEFAULT NULL,
  p_resource_id TEXT DEFAULT NULL,
  p_old_values JSONB DEFAULT NULL,
  p_new_values JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  audit_id UUID;
BEGIN
  INSERT INTO public.audit_logs (
    user_id, action, resource_type, resource_id, old_values, new_values
  ) VALUES (
    p_user_id, p_action, p_resource_type, p_resource_id, p_old_values, p_new_values
  ) RETURNING id INTO audit_id;
  
  RETURN audit_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user analytics
CREATE OR REPLACE FUNCTION public.get_user_analytics(
  p_user_id UUID DEFAULT NULL,
  p_role user_role DEFAULT NULL
)
RETURNS TABLE (
  total_users BIGINT,
  active_users BIGINT,
  new_users_today BIGINT,
  total_tickets BIGINT,
  open_tickets BIGINT,
  resolved_tickets BIGINT,
  avg_resolution_time INTERVAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM public.profiles WHERE (p_role IS NULL OR role = p_role))::BIGINT,
    (SELECT COUNT(*) FROM public.profiles WHERE is_active = true AND (p_role IS NULL OR role = p_role))::BIGINT,
    (SELECT COUNT(*) FROM public.profiles WHERE created_at >= CURRENT_DATE AND (p_role IS NULL OR role = p_role))::BIGINT,
    (SELECT COUNT(*) FROM public.tickets WHERE (p_user_id IS NULL OR customer_id = p_user_id OR assigned_agent_id = p_user_id))::BIGINT,
    (SELECT COUNT(*) FROM public.tickets WHERE status = 'open' AND (p_user_id IS NULL OR customer_id = p_user_id OR assigned_agent_id = p_user_id))::BIGINT,
    (SELECT COUNT(*) FROM public.tickets WHERE status = 'resolved' AND (p_user_id IS NULL OR customer_id = p_user_id OR assigned_agent_id = p_user_id))::BIGINT,
    (SELECT AVG(resolved_at - created_at) FROM public.tickets WHERE resolved_at IS NOT NULL AND (p_user_id IS NULL OR customer_id = p_user_id OR assigned_agent_id = p_user_id));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Update triggers for new tables
CREATE TRIGGER update_user_invitations_updated_at
  BEFORE UPDATE ON public.user_invitations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_two_factor_updated_at
  BEFORE UPDATE ON public.user_two_factor
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to update login stats
CREATE OR REPLACE FUNCTION public.update_login_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET 
    last_login = now(),
    login_count = login_count + 1
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS on new tables
ALTER TABLE public.user_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_two_factor ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_invitations
CREATE POLICY "Admins can manage all invitations" ON public.user_invitations
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can view invitations sent to them" ON public.user_invitations
  FOR SELECT USING (email = (SELECT email FROM public.profiles WHERE id = auth.uid()));

-- RLS Policies for user_two_factor
CREATE POLICY "Users can manage their own 2FA" ON public.user_two_factor
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admins can view 2FA status" ON public.user_two_factor
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for password_reset_tokens
CREATE POLICY "Users can access their own reset tokens" ON public.password_reset_tokens
  FOR ALL USING (user_id = auth.uid());

-- RLS Policies for user_sessions
CREATE POLICY "Users can view their own sessions" ON public.user_sessions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all sessions" ON public.user_sessions
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for audit_logs
CREATE POLICY "Admins can view all audit logs" ON public.audit_logs
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can view their own audit logs" ON public.audit_logs
  FOR SELECT USING (user_id = auth.uid());

-- =====================================================
-- INDEXES
-- =====================================================

-- Indexes for performance
CREATE INDEX idx_user_invitations_email ON public.user_invitations(email);
CREATE INDEX idx_user_invitations_token ON public.user_invitations(token);
CREATE INDEX idx_user_invitations_status ON public.user_invitations(status);
CREATE INDEX idx_user_invitations_expires_at ON public.user_invitations(expires_at);

CREATE INDEX idx_user_two_factor_user_id ON public.user_two_factor(user_id);
CREATE INDEX idx_user_two_factor_method ON public.user_two_factor(method);

CREATE INDEX idx_password_reset_tokens_token ON public.password_reset_tokens(token);
CREATE INDEX idx_password_reset_tokens_user_id ON public.password_reset_tokens(user_id);
CREATE INDEX idx_password_reset_tokens_expires_at ON public.password_reset_tokens(expires_at);

CREATE INDEX idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX idx_user_sessions_session_token ON public.user_sessions(session_token);
CREATE INDEX idx_user_sessions_is_active ON public.user_sessions(is_active);

CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);

CREATE INDEX idx_profiles_organization_id ON public.profiles(organization_id);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_is_active ON public.profiles(is_active);

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant permissions to authenticated users
GRANT ALL ON public.user_invitations TO authenticated;
GRANT ALL ON public.user_two_factor TO authenticated;
GRANT ALL ON public.password_reset_tokens TO authenticated;
GRANT ALL ON public.user_sessions TO authenticated;
GRANT ALL ON public.audit_logs TO authenticated;

-- Grant permissions to service role
GRANT ALL ON public.user_invitations TO service_role;
GRANT ALL ON public.user_two_factor TO service_role;
GRANT ALL ON public.password_reset_tokens TO service_role;
GRANT ALL ON public.user_sessions TO service_role;
GRANT ALL ON public.audit_logs TO service_role;