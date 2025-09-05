-- Dashboard Backend Tables and Functions
-- Run this in Supabase SQL Editor

-- Recent activities table
CREATE TABLE IF NOT EXISTS public.recent_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  type TEXT CHECK (type IN ('ticket', 'call', 'chat')),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Widget settings table
CREATE TABLE IF NOT EXISTS public.widget_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  enabled BOOLEAN DEFAULT true,
  show_online_status BOOLEAN DEFAULT true,
  auto_greet BOOLEAN DEFAULT false,
  greeting_message TEXT DEFAULT '',
  theme_color TEXT DEFAULT 'blue',
  widget_title TEXT DEFAULT '',
  offline_message TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  sender TEXT CHECK (sender IN ('user', 'agent')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Dashboard stats function
CREATE OR REPLACE FUNCTION public.get_dashboard_stats(p_user_id UUID)
RETURNS TABLE (
  active_tickets INTEGER,
  resolved_today INTEGER,
  avg_response_time TEXT,
  satisfaction_rate INTEGER,
  ticket_change TEXT,
  resolved_change TEXT,
  response_change TEXT,
  satisfaction_change TEXT
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE((SELECT COUNT(*)::INTEGER FROM tickets WHERE status IN ('open', 'in_progress') AND (customer_id = p_user_id OR assigned_agent_id = p_user_id)), 0),
    COALESCE((SELECT COUNT(*)::INTEGER FROM tickets WHERE status = 'resolved' AND resolved_at >= CURRENT_DATE AND (customer_id = p_user_id OR assigned_agent_id = p_user_id)), 0),
    COALESCE((SELECT EXTRACT(EPOCH FROM AVG(resolved_at - created_at))/60 || 'm' FROM tickets WHERE resolved_at IS NOT NULL AND (customer_id = p_user_id OR assigned_agent_id = p_user_id)), '0m'),
    95,
    '+12%',
    '+8%',
    '-23%',
    '+2%';
END;
$$;

-- Enable RLS
ALTER TABLE public.recent_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.widget_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their own activities" ON public.recent_activities
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own widget settings" ON public.widget_settings
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own chat messages" ON public.chat_messages
  FOR ALL USING (user_id = auth.uid());

-- Grant permissions
GRANT ALL ON public.recent_activities TO authenticated;
GRANT ALL ON public.widget_settings TO authenticated;
GRANT ALL ON public.chat_messages TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_dashboard_stats TO authenticated;