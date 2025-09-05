-- Create enum types for various status fields
CREATE TYPE public.ticket_status AS ENUM ('open', 'in_progress', 'pending', 'resolved', 'closed');
CREATE TYPE public.ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE public.user_role AS ENUM ('admin', 'agent', 'customer');

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

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

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

-- Enable RLS on organizations
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Create ticket categories table
CREATE TABLE public.ticket_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on ticket categories
ALTER TABLE public.ticket_categories ENABLE ROW LEVEL SECURITY;

-- Create tickets table
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
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  due_date TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on tickets
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- Create ticket comments table
CREATE TABLE public.ticket_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  is_internal BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on ticket comments
ALTER TABLE public.ticket_comments ENABLE ROW LEVEL SECURITY;

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

-- Enable RLS on articles
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Function to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Security definer function to check user roles
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

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

-- RLS Policies for tickets
CREATE POLICY "Users can view their own tickets" ON public.tickets
  FOR SELECT USING (
    customer_id = auth.uid() OR 
    assigned_agent_id = auth.uid() OR 
    public.get_user_role(auth.uid()) IN ('admin', 'agent')
  );

CREATE POLICY "Customers can create tickets" ON public.tickets
  FOR INSERT WITH CHECK (customer_id = auth.uid());

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
    author_id = auth.uid() AND
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

-- Insert some initial data
INSERT INTO public.ticket_categories (name, description, color) VALUES
  ('Technical Support', 'Technical issues and troubleshooting', '#3B82F6'),
  ('Billing', 'Billing and payment related questions', '#10B981'),
  ('Feature Request', 'Requests for new features', '#8B5CF6'),
  ('Bug Report', 'Report bugs and issues', '#EF4444'),
  ('General Inquiry', 'General questions and information', '#6B7280');

INSERT INTO public.organizations (name, description, industry) VALUES
  ('Acme Corporation', 'A leading technology company', 'Technology'),
  ('Global Solutions Inc', 'Business consulting services', 'Consulting'),
  ('StartupXYZ', 'Innovative startup company', 'Technology');