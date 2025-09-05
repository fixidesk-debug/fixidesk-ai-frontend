import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const widgetId = searchParams.get('widgetId');

    if (!widgetId) {
      return NextResponse.json({ error: 'Widget ID required' }, { status: 400 });
    }

    const { data: settings, error } = await supabase
      .from('widget_settings')
      .select('*')
      .eq('user_id', widgetId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    const widgetSettings = settings || {
      enabled: true,
      show_online_status: true,
      auto_greet: true,
      greeting_message: "Hi! How can we help you today?",
      theme_color: "blue",
      widget_title: "Support Chat",
      offline_message: "We're currently offline. Please leave a message."
    };

    return NextResponse.json({
      settings: widgetSettings,
      success: true
    });

  } catch (error) {
    console.error('Widget API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}