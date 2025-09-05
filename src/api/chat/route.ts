import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { message, widgetId, sessionId } = await request.json();

    if (!message || !widgetId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save user message
    const { data: userMessage, error: userError } = await supabase
      .from('chat_messages')
      .insert({
        content: message,
        sender: 'user',
        user_id: widgetId,
        session_id: sessionId
      })
      .select()
      .single();

    if (userError) throw userError;

    // Generate AI response
    const aiResponse = await generateAIResponse(message);

    // Save AI response
    const { data: aiMessage, error: aiError } = await supabase
      .from('chat_messages')
      .insert({
        content: aiResponse,
        sender: 'agent',
        user_id: widgetId,
        session_id: sessionId
      })
      .select()
      .single();

    if (aiError) throw aiError;

    return NextResponse.json({
      userMessage,
      aiMessage,
      success: true
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const widgetId = searchParams.get('widgetId');
    const sessionId = searchParams.get('sessionId');

    if (!widgetId) {
      return NextResponse.json({ error: 'Widget ID required' }, { status: 400 });
    }

    let query = supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', widgetId)
      .order('created_at', { ascending: true })
      .limit(50);

    if (sessionId) {
      query = query.eq('session_id', sessionId);
    }

    const { data: messages, error } = await query;
    if (error) throw error;

    return NextResponse.json({ messages, success: true });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function generateAIResponse(message: string): Promise<string> {
  // Replace with actual AI service
  const responses = [
    "Thanks for your message! How can I help you today?",
    "I understand your question. Let me assist you with that.",
    "That's a great point! I'll help you find the right solution.",
    "I'm here to help! Could you provide more details about your issue?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}