import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://pphakciknujtwdzshvij.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwaGFrY2lrbnVqdHdkenNodmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MzY4ODksImV4cCI6MjA3MjAxMjg4OX0.H0WVcRRn8SvQFYCpT3q0_6O-9ccLwcXc83-VnjR_2f0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runSQL() {
  console.log('🚀 Running SQL migration...');
  
  const sqlCommands = [
    `CREATE TABLE IF NOT EXISTS public.recent_activities (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users(id),
      type TEXT CHECK (type IN ('ticket', 'call', 'chat')),
      title TEXT NOT NULL,
      description TEXT,
      priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
      created_at TIMESTAMPTZ DEFAULT now()
    );`,
    
    `CREATE TABLE IF NOT EXISTS public.widget_settings (
      user_id UUID PRIMARY KEY REFERENCES auth.users(id),
      enabled BOOLEAN DEFAULT true,
      show_online_status BOOLEAN DEFAULT true,
      auto_greet BOOLEAN DEFAULT false,
      greeting_message TEXT DEFAULT '',
      theme_color TEXT DEFAULT 'blue',
      widget_title TEXT DEFAULT '',
      offline_message TEXT DEFAULT '',
      updated_at TIMESTAMPTZ DEFAULT now()
    );`,
    
    `CREATE TABLE IF NOT EXISTS public.chat_messages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users(id),
      content TEXT NOT NULL,
      sender TEXT CHECK (sender IN ('user', 'agent')),
      created_at TIMESTAMPTZ DEFAULT now()
    );`,
    
    `ALTER TABLE public.recent_activities ENABLE ROW LEVEL SECURITY;`,
    `ALTER TABLE public.widget_settings ENABLE ROW LEVEL SECURITY;`,
    `ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;`
  ];
  
  for (const sql of sqlCommands) {
    try {
      console.log('Executing:', sql.substring(0, 50) + '...');
      const { error } = await supabase.rpc('exec_sql', { sql });
      if (error) {
        console.log('⚠️', error.message);
      } else {
        console.log('✅ Success');
      }
    } catch (err) {
      console.log('⚠️', err.message);
    }
  }
  
  console.log('🎉 Migration completed!');
}

runSQL();