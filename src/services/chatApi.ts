import { supabase } from '@/integrations/supabase/client';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent' | 'ai';
  timestamp: string;
  user_id?: string;
  session_id?: string;
}

export class ChatAPI {
  static async sendMessage(content: string): Promise<ChatMessage> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          content,
          sender: 'user',
          user_id: user?.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  static async getAIResponse(message: string): Promise<string> {
    // Simulate AI response - replace with actual API
    const responses = [
      "Thanks for your message! Our team will get back to you shortly.",
      "I understand your concern. Let me connect you with a specialist.",
      "That's a great question! I'll help you find the answer.",
      "I'm here to help! Could you provide more details?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  static async saveAIResponse(content: string): Promise<ChatMessage> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          content,
          sender: 'agent',
          user_id: user?.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving AI response:', error);
      throw error;
    }
  }
}