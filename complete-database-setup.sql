-- COMPLETE DATABASE SETUP FROM SCRATCH
-- This script will create everything needed and fix existing issues

-- ============================================================================
-- 1. CREATE EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 2. CREATE ENUM TYPES
-- ============================================================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'agent', 'customer');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ============================================================================
-- 3. DROP AND RECREATE PROFILES TABLE
-- ============================================================================
DROP TABLE IF EXISTS public.profiles CASCADE;

CREATE TABLE public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  first_name text,
  last_name text,
  avatar_url text,
  company_name text,
  phone text,
  role user_role not null default 'customer',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  is_active boolean default true,
  two_factor_enabled boolean default false,
  login_count integer default 0,
  last_login timestamp with time zone,
  organization_id uuid,
  permissions jsonb default '{}'
);

-- ============================================================================
-- 4. CREATE ALL OTHER TABLES
-- ============================================================================

-- Organizations table
CREATE TABLE IF NOT EXISTS public.organizations (
  id uuid not null default gen_random_uuid() primary key,
  name text not null,
  description text,
  website text,
  industry text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Ticket categories
CREATE TABLE IF NOT EXISTS public.ticket_categories (
  id uuid not null default gen_random_uuid() primary key,
  name text not null,
  description text,
  color text,
  created_at timestamp with time zone not null default now()
);

-- Tickets table
DROP TABLE IF EXISTS public.tickets CASCADE;
CREATE TABLE public.tickets (
  id uuid not null default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  status ticket_status not null default 'open',
  priority ticket_priority not null default 'medium',
  category_id uuid references public.ticket_categories(id),
  customer_id uuid not null references public.profiles(id),
  assigned_agent_id uuid references public.profiles(id),
  organization_id uuid references public.organizations(id),
  source text default 'web',
  customer_email text,
  customer_name text,
  espocrm_case_id text,
  external_id text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  resolved_at timestamp with time zone,
  due_date timestamp with time zone
);

-- Ticket comments
DROP TABLE IF EXISTS public.ticket_comments CASCADE;
CREATE TABLE public.ticket_comments (
  id uuid not null default gen_random_uuid() primary key,
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  author_id uuid references public.profiles(id),
  content text not null,
  is_internal boolean not null default false,
  author_email text,
  author_name text,
  source text default 'web',
  external_id text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Chat messages
DROP TABLE IF EXISTS public.chat_messages CASCADE;
CREATE TABLE public.chat_messages (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  session_id text,
  content text not null,
  sender text check (sender in ('user', 'agent', 'ai')),
  created_at timestamp with time zone default now()
);

-- Widget settings
DROP TABLE IF EXISTS public.widget_settings CASCADE;
CREATE TABLE public.widget_settings (
  user_id uuid not null references auth.users(id) primary key,
  enabled boolean default true,
  show_online_status boolean default true,
  auto_greet boolean default false,
  greeting_message text default 'Hi there! How can I help you today?',
  theme_color text default 'blue',
  widget_title text default 'Support Chat',
  offline_message text default 'We are currently offline. Please leave a message.',
  updated_at timestamp with time zone default now()
);

-- Recent activities
DROP TABLE IF EXISTS public.recent_activities CASCADE;
CREATE TABLE public.recent_activities (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  type text check (type in ('ticket', 'call', 'chat')),
  title text not null,
  description text,
  priority text default 'medium' check (priority in ('low', 'medium', 'high')),
  created_at timestamp with time zone default now()
);

-- Leads table
DROP TABLE IF EXISTS public.leads CASCADE;
CREATE TABLE public.leads (
  id serial primary key,
  user_id uuid references auth.users(id),
  email varchar,
  first_name varchar,
  last_name varchar,
  company varchar,
  phone varchar,
  status varchar default 'new',
  points integer default 0,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Deals table
DROP TABLE IF EXISTS public.deals CASCADE;
CREATE TABLE public.deals (
  id serial primary key,
  user_id uuid references auth.users(id),
  title varchar not null,
  value decimal default 0,
  stage varchar default 'prospect',
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- User invitations
CREATE TABLE IF NOT EXISTS public.user_invitations (
  id bigint generated always as identity primary key,
  inviter_id uuid references auth.users(id),
  invitee_email text not null,
  invited_at timestamp with time zone default now(),
  status text default 'pending' check (status in ('pending', 'accepted', 'revoked'))
);

-- ============================================================================
-- 5. ENABLE ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.widget_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recent_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 6. DROP ALL EXISTING POLICIES
-- ============================================================================
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.profiles;

-- ============================================================================
-- 7. CREATE RLS POLICIES
-- ============================================================================

-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Admin can see all profiles
CREATE POLICY "admin_all_profiles" ON public.profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Tickets policies
CREATE POLICY "tickets_select_own" ON public.tickets FOR SELECT USING (
  customer_id = auth.uid() OR assigned_agent_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'agent'))
);
CREATE POLICY "tickets_insert_own" ON public.tickets FOR INSERT WITH CHECK (customer_id = auth.uid());
CREATE POLICY "tickets_update_own" ON public.tickets FOR UPDATE USING (
  customer_id = auth.uid() OR assigned_agent_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'agent'))
);

-- Chat messages policies
CREATE POLICY "chat_select_own" ON public.chat_messages FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "chat_insert_own" ON public.chat_messages FOR INSERT WITH CHECK (user_id = auth.uid());

-- Widget settings policies
CREATE POLICY "widget_all_own" ON public.widget_settings FOR ALL USING (user_id = auth.uid());

-- Recent activities policies
CREATE POLICY "activities_select_own" ON public.recent_activities FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "activities_insert_own" ON public.recent_activities FOR INSERT WITH CHECK (user_id = auth.uid());

-- Leads policies
CREATE POLICY "leads_all_own" ON public.leads FOR ALL USING (user_id = auth.uid());

-- Deals policies
CREATE POLICY "deals_all_own" ON public.deals FOR ALL USING (user_id = auth.uid());

-- ============================================================================
-- 8. CREATE FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Drop existing functions and triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Updated at function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- New user handler
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    'customer'::user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 9. GRANT PERMISSIONS
-- ============================================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- ============================================================================
-- 10. CREATE TEST DATA
-- ============================================================================

-- Insert default ticket category
INSERT INTO public.ticket_categories (name, description, color) 
VALUES ('General', 'General support requests', '#3B82F6')
ON CONFLICT DO NOTHING;

-- Create admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@fixidesk.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Create profile for admin
INSERT INTO public.profiles (id, email, first_name, last_name, role)
SELECT id, email, 'Admin', 'User', 'admin'::user_role
FROM auth.users 
WHERE email = 'admin@fixidesk.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin'::user_role;

-- ============================================================================
-- 11. VERIFICATION QUERIES
-- ============================================================================
SELECT 'SETUP COMPLETE!' as status;
SELECT 'Admin user created:' as info, id, email, role FROM public.profiles WHERE email = 'admin@fixidesk.com';
SELECT 'Total tables created:' as info, count(*) as count FROM information_schema.tables WHERE table_schema = 'public';
SELECT 'RLS enabled on:' as info, count(*) as count FROM pg_tables WHERE schemaname = 'public' AND rowsecurity = true;