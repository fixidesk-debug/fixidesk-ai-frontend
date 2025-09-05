-- =====================================================
-- FixiDesk Complete Database Schema
-- Supports both normalized tickets system and n8n workflows
-- =====================================================

-- Create enum types for various status fields
CREATE TYPE public.ticket_status AS ENUM ('open', 'in_progress', 'pending', 'resolved', 'closed');
CREATE TYPE public.ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent', 'normal');
CREATE TYPE public.user_role AS ENUM ('admin', 'agent', 'customer');
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost');

-- =====================================================
-- CORE USER AND ORGANIZATION TABLES
-- =====================================================

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  company_name TEXT,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create organizations table
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  industry TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- TICKET SYSTEM TABLES (Normalized)
-- =====================================================

-- Create ticket categories table
CREATE TABLE public.ticket_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create normalized tickets table
CREATE TABLE public.tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status ticket_status NOT NULL DEFAULT 'open',
  priority ticket_priority NOT NULL DEFAULT 'medium',
  category_id UUID REFERENCES public.ticket_categories(id),
  customer_id UUID NOT NULL REFERENCES public.profiles(id),
  assigned_agent_id UUID REFERENCES public.profiles(id),
  organization_id UUID REFERENCES public.organizations(id),
  -- Additional fields for n8n integration
  source TEXT DEFAULT 'web',
  customer_email TEXT,
  customer_name TEXT,
  espocrm_case_id TEXT,
  external_id TEXT, -- For any external system IDs
  -- Standard timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  due_date TIMESTAMP WITH TIME ZONE
);

-- Create ticket comments table
CREATE TABLE public.ticket_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  is_internal BOOLEAN NOT NULL DEFAULT false,
  -- Additional fields for external sources
  author_email TEXT, -- For comments from non-users
  author_name TEXT,  -- For comments from non-users
  source TEXT DEFAULT 'web',
  external_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- N8N COMPATIBILITY TABLES (Simpler schema)
-- =====================================================

-- Support tickets table for n8n workflows (simpler schema)
CREATE TABLE public.support_tickets (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  status VARCHAR(50) DEFAULT 'open',
  priority VARCHAR(50) DEFAULT 'normal',
  source VARCHAR(50) DEFAULT 'chat',
  customer_email VARCHAR(255),
  customer_name VARCHAR(255),
  espocrm_case_id VARCHAR(100),
  -- Link to normalized tickets table
  ticket_uuid UUID REFERENCES public.tickets(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Missed calls table for call tracking
CREATE TABLE public.missed_calls (
  id SERIAL PRIMARY KEY,
  call_id VARCHAR(255),
  from_number VARCHAR(50),
  to_number VARCHAR(50),
  duration INTEGER,
  timestamp TIMESTAMP,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Leads table for CRM integration
CREATE TABLE public.leads (
  id SERIAL PRIMARY KEY,
  espocrm_id VARCHAR(100),
  mautic_contact_id VARCHAR(100),
  email VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company VARCHAR(255),
  phone VARCHAR(50),
  status VARCHAR(50) DEFAULT 'new',
  nurture_campaign_started BOOLEAN DEFAULT FALSE,
  nurture_start_date TIMESTAMP,
  lead_score INTEGER DEFAULT 0,
  -- Link to profiles table if they become users
  profile_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Call logs table for call tracking
CREATE TABLE public.call_logs (
  id SERIAL PRIMARY KEY,
  call_id VARCHAR(255),
  direction VARCHAR(20),
  from_number VARCHAR(50),
  to_number VARCHAR(50),
  duration INTEGER,
  status VARCHAR(50),
  recording_url TEXT,
  transcript TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- KNOWLEDGE BASE TABLES
-- =====================================================

-- Create knowledge base articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug TEXT UNIQUE NOT NULL,
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  category_id UUID REFERENCES public.ticket_categories(id),
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to sync support_tickets to tickets table
CREATE OR REPLACE FUNCTION public.sync_support_ticket_to_tickets()
RETURNS TRIGGER AS $$
DECLARE
  customer_profile_id UUID;
BEGIN
  -- Try to find existing profile by email
  SELECT id INTO customer_profile_id 
  FROM public.profiles 
  WHERE email = NEW.customer_email;
  
  -- If no profile exists, create one
  IF customer_profile_id IS NULL AND NEW.customer_email IS NOT NULL THEN
    INSERT INTO public.profiles (id, email, first_name, last_name, role)
    VALUES (gen_random_uuid(), NEW.customer_email, 
            COALESCE(split_part(NEW.customer_name, ' ', 1), ''),
            COALESCE(split_part(NEW.customer_name, ' ', 2), ''),
            'customer')
    RETURNING id INTO customer_profile_id;
  END IF;
  
  -- Create corresponding ticket in normalized table
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.tickets (
      id, title, description, status, priority, source,
      customer_id, customer_email, customer_name, espocrm_case_id,
      created_at, updated_at
    ) VALUES (
      gen_random_uuid(), NEW.title, NEW.description, 
      NEW.status::ticket_status, NEW.priority::ticket_priority, NEW.source,
      customer_profile_id, NEW.customer_email, NEW.customer_name, NEW.espocrm_case_id,
      NEW.created_at, NEW.updated_at
    )
    RETURNING id INTO NEW.ticket_uuid;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Security definer function to check user roles
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ticket_comments_updated_at
  BEFORE UPDATE ON public.ticket_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to sync support_tickets to tickets
CREATE TRIGGER sync_support_tickets
  BEFORE INSERT ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION public.sync_support_ticket_to_tickets();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missed_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for organizations
CREATE POLICY "Everyone can view organizations" ON public.organizations
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage organizations" ON public.organizations
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for ticket categories
CREATE POLICY "Everyone can view categories" ON public.ticket_categories
  FOR SELECT USING (true);

CREATE POLICY "Admins and agents can manage categories" ON public.ticket_categories
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'agent'));

-- RLS Policies for tickets (normalized table)
CREATE POLICY "Users can view their own tickets" ON public.tickets
  FOR SELECT USING (
    customer_id = auth.uid() OR 
    assigned_agent_id = auth.uid() OR 
    public.get_user_role(auth.uid()) IN ('admin', 'agent')
  );

CREATE POLICY "Customers can create tickets" ON public.tickets
  FOR INSERT WITH CHECK (
    customer_id = auth.uid() OR
    public.get_user_role(auth.uid()) IN ('admin', 'agent')
  );

CREATE POLICY "Agents and admins can update tickets" ON public.tickets
  FOR UPDATE USING (
    assigned_agent_id = auth.uid() OR 
    public.get_user_role(auth.uid()) IN ('admin', 'agent')
  );

-- RLS Policies for ticket comments
CREATE POLICY "Users can view comments on accessible tickets" ON public.ticket_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tickets 
      WHERE id = ticket_id 
      AND (
        customer_id = auth.uid() OR 
        assigned_agent_id = auth.uid() OR 
        public.get_user_role(auth.uid()) IN ('admin', 'agent')
      )
    )
  );

CREATE POLICY "Users can create comments on accessible tickets" ON public.ticket_comments
  FOR INSERT WITH CHECK (
    (author_id = auth.uid() OR author_id IS NULL) AND
    EXISTS (
      SELECT 1 FROM public.tickets 
      WHERE id = ticket_id 
      AND (
        customer_id = auth.uid() OR 
        assigned_agent_id = auth.uid() OR 
        public.get_user_role(auth.uid()) IN ('admin', 'agent')
      )
    )
  );

-- RLS Policies for articles
CREATE POLICY "Everyone can view published articles" ON public.articles
  FOR SELECT USING (published = true);

CREATE POLICY "Agents and admins can view all articles" ON public.articles
  FOR SELECT USING (public.get_user_role(auth.uid()) IN ('admin', 'agent'));

CREATE POLICY "Agents and admins can manage articles" ON public.articles
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'agent'));

-- RLS Policies for n8n compatibility tables
-- These allow service role access for automation workflows
CREATE POLICY "Service role can manage support_tickets" ON public.support_tickets
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR public.get_user_role(auth.uid()) IN ('admin', 'agent'));

CREATE POLICY "Admins and agents can view support_tickets" ON public.support_tickets
  FOR SELECT USING (public.get_user_role(auth.uid()) IN ('admin', 'agent'));

CREATE POLICY "Service role can manage leads" ON public.leads
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR public.get_user_role(auth.uid()) IN ('admin', 'agent'));

CREATE POLICY "Admins and agents can view leads" ON public.leads
  FOR SELECT USING (public.get_user_role(auth.uid()) IN ('admin', 'agent'));

CREATE POLICY "Service role can manage call logs" ON public.call_logs
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR public.get_user_role(auth.uid()) IN ('admin', 'agent'));

CREATE POLICY "Agents can view call logs" ON public.call_logs
  FOR SELECT USING (public.get_user_role(auth.uid()) IN ('admin', 'agent'));

CREATE POLICY "Service role can manage missed calls" ON public.missed_calls
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR public.get_user_role(auth.uid()) IN ('admin', 'agent'));

CREATE POLICY "Agents can view missed calls" ON public.missed_calls
  FOR SELECT USING (public.get_user_role(auth.uid()) IN ('admin', 'agent'));

-- =====================================================
-- VIEWS FOR EASIER DATA ACCESS
-- =====================================================

-- View to combine ticket data with customer information
CREATE VIEW public.tickets_with_customer AS
SELECT 
  t.*,
  p.first_name as customer_first_name,
  p.last_name as customer_last_name,
  p.phone as customer_phone,
  p.company_name as customer_company,
  agent.first_name as agent_first_name,
  agent.last_name as agent_last_name,
  cat.name as category_name,
  cat.color as category_color,
  org.name as organization_name
FROM public.tickets t
LEFT JOIN public.profiles p ON t.customer_id = p.id
LEFT JOIN public.profiles agent ON t.assigned_agent_id = agent.id
LEFT JOIN public.ticket_categories cat ON t.category_id = cat.id
LEFT JOIN public.organizations org ON t.organization_id = org.id;

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Insert sample ticket categories
INSERT INTO public.ticket_categories (name, description, color) VALUES
  ('Technical Support', 'Technical issues and troubleshooting', '#3B82F6'),
  ('Billing', 'Billing and payment related questions', '#10B981'),
  ('Feature Request', 'Requests for new features', '#8B5CF6'),
  ('Bug Report', 'Report bugs and issues', '#EF4444'),
  ('General Inquiry', 'General questions and information', '#6B7280');

-- Insert sample organizations
INSERT INTO public.organizations (name, description, industry) VALUES
  ('Acme Corporation', 'A leading technology company', 'Technology'),
  ('Global Solutions Inc', 'Business consulting services', 'Consulting'),
  ('StartupXYZ', 'Innovative startup company', 'Technology');

-- =====================================================
-- FUNCTIONS FOR API COMPATIBILITY
-- =====================================================

-- Function to get ticket statistics
CREATE OR REPLACE FUNCTION public.get_ticket_stats(user_id UUID DEFAULT NULL)
RETURNS TABLE (
  total_tickets BIGINT,
  open_tickets BIGINT,
  in_progress_tickets BIGINT,
  resolved_tickets BIGINT,
  avg_resolution_time INTERVAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_tickets,
    COUNT(*) FILTER (WHERE status = 'open')::BIGINT as open_tickets,
    COUNT(*) FILTER (WHERE status = 'in_progress')::BIGINT as in_progress_tickets,
    COUNT(*) FILTER (WHERE status = 'resolved')::BIGINT as resolved_tickets,
    AVG(resolved_at - created_at) as avg_resolution_time
  FROM public.tickets
  WHERE (user_id IS NULL OR customer_id = user_id OR assigned_agent_id = user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Indexes for better query performance
CREATE INDEX idx_tickets_customer_id ON public.tickets(customer_id);
CREATE INDEX idx_tickets_assigned_agent_id ON public.tickets(assigned_agent_id);
CREATE INDEX idx_tickets_status ON public.tickets(status);
CREATE INDEX idx_tickets_priority ON public.tickets(priority);
CREATE INDEX idx_tickets_created_at ON public.tickets(created_at);
CREATE INDEX idx_ticket_comments_ticket_id ON public.ticket_comments(ticket_id);
CREATE INDEX idx_support_tickets_customer_email ON public.support_tickets(customer_email);
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_call_logs_call_id ON public.call_logs(call_id);

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Grant permissions to service role for automation
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;
