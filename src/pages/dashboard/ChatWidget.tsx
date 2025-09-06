import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Monitor, Smartphone, Palette, Settings } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { ChatAPI } from "@/services/chatApi";
import { WidgetAPI } from "@/services/widgetApi";
import styles from "./ChatWidget.module.css";

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: string;
}

interface WidgetSettings {
  enabled: boolean;
  show_online_status: boolean;
  auto_greet: boolean;
  greeting_message: string;
  theme_color: string;
  widget_title: string;
  offline_message: string;
}

export default function ChatWidget() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<WidgetSettings>({
    enabled: true,
    show_online_status: true,
    auto_greet: true,
    greeting_message: "Hi! How can we help you today?",
    theme_color: "blue",
    widget_title: "Support Chat",
    offline_message: "We're currently offline. Please leave a message."
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const loadWidgetSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('widget_settings')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      if (data && !error) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error loading widget settings:', error);
    }
  }, [user]);

  const loadRecentMessages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (data && !error) {
        setMessages(data.reverse());
      } else {
        // Demo messages if no data
        setMessages([
          {
            id: '1',
            content: settings.greeting_message || 'Hi! How can we help you today?',
            sender: 'agent',
            timestamp: new Date().toISOString()
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      // Demo messages on error
      setMessages([
        {
          id: '1',
          content: settings.greeting_message || 'Hi! How can we help you today?',
          sender: 'agent',
          timestamp: new Date().toISOString()
        }
      ]);
    }
  }, [settings.greeting_message, user]);

  useEffect(() => {
    if (user) {
      loadWidgetSettings();
      loadRecentMessages();
    }
  }, [user, loadWidgetSettings, loadRecentMessages]);

  const updateSetting = async (key: keyof WidgetSettings, value: string | boolean | number) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    try {
      const { error } = await supabase
        .from('widget_settings')
        .upsert({ 
          user_id: user?.id, 
          ...newSettings,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
      
      // Update greeting message in demo if changed
      if (key === 'greeting_message' && messages.length > 0 && messages[0].sender === 'agent') {
        const updatedMessages = [...messages];
        updatedMessages[0].content = value || 'Hi! How can we help you today?';
        setMessages(updatedMessages);
      }
      
      toast({
        title: "Settings updated",
        description: "Widget settings have been saved successfully.",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const messageContent = newMessage;
    setNewMessage("");
    setIsTyping(true);
    
    try {
      // Send user message via API
      const userMessage = await ChatAPI.sendMessage(messageContent);
      setMessages(prev => [...prev, userMessage]);
      
      // Get AI response
      const aiResponseContent = await ChatAPI.getAIResponse(messageContent);
      
      // Simulate typing delay
      setTimeout(async () => {
        try {
          const aiMessage = await ChatAPI.saveAIResponse(aiResponseContent);
          setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
          console.error('Error saving AI response:', error);
        } finally {
          setIsTyping(false);
        }
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold">
            Chat Widget
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-muted-foreground mt-2">
            Preview and customize your website chat widget
          </motion.p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Widget Preview
                </CardTitle>
                <CardDescription>Live preview of your chat widget</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8" >
                  <div className="w-full max-w-md mx-auto flex justify-center">
                    <div className="w-full h-[380px] overflow-hidden rounded-2xl border border-slate-200 bg-white dark:bg-slate-800 shadow-2xl dark:border-slate-700">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <div className="w-6 h-6 bg-white rounded-full"></div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{settings.widget_title || 'Support Chat'}</h3>
                            {settings.show_online_status && (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <p className="text-xs text-white/80">Online now</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="h-64 overflow-y-auto bg-slate-50 dark:bg-slate-900 p-4 space-y-4">
                        {messages.map((message) => (
                          <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                            {message.sender === 'agent' && (
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
                            )}
                            <div className={`${styles.chatMessage} p-3 rounded-2xl shadow-sm max-w-[240px] ${message.sender === 'agent' ? styles.agentMessage : styles.userMessage}`}>
                              <p className={`text-sm ${message.sender === 'agent' ? 'text-slate-700 dark:text-slate-300' : 'text-white'}`}>
                                {message.content}
                              </p>
                            </div>
                            {message.sender === 'user' && (
                              <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
                            <div className="p-3 rounded-2xl shadow-sm bg-white dark:bg-slate-800 rounded-tl-sm">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" ></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" ></div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                      
                      <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex gap-2 items-center">
                          <div className="flex-1 relative">
                            <input 
                              className="w-full px-4 py-2 text-sm bg-slate-100 dark:bg-slate-700 border-0 rounded-full placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                              placeholder="Type a message..."
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            />
                          </div>
                          <Button 
                            size="sm" 
                            className="rounded-lg w-10 h-10 p-0 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                            onClick={sendMessage}
                            disabled={!newMessage.trim() || isTyping}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 left-4 w-32 h-32 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-xl"></div>
                  <div className="absolute bottom-4 left-8 w-24 h-24 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-xl"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Widget Settings</CardTitle>
                <CardDescription>Customize appearance and behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Enable Widget</span>
                    <Switch 
                      checked={settings.enabled} 
                      onCheckedChange={(checked) => updateSetting('enabled', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Show Online Status</span>
                    <Switch 
                      checked={settings.show_online_status} 
                      onCheckedChange={(checked) => updateSetting('show_online_status', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Auto-greet Visitors</span>
                    <Switch 
                      checked={settings.auto_greet} 
                      onCheckedChange={(checked) => updateSetting('auto_greet', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="widget-title">Widget Title</Label>
                    <Input
                      id="widget-title"
                      value={settings.widget_title}
                      onChange={(e) => updateSetting('widget_title', e.target.value)}
                      placeholder="e.g., Support Chat"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="greeting-message">Greeting Message</Label>
                    <Textarea
                      id="greeting-message"
                      value={settings.greeting_message}
                      onChange={(e) => updateSetting('greeting_message', e.target.value)}
                      placeholder="e.g., Hi! How can we help you today?"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme-color">Theme Color</Label>
                    <select 
                      id="theme-color"
                      aria-label="Theme Color"
                      value={settings.theme_color}
                      onChange={(e) => updateSetting('theme_color', e.target.value)}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="purple">Purple</option>
                      <option value="red">Red</option>
                      <option value="orange">Orange</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Installation</CardTitle>
                <CardDescription>Add this code to your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                  <code className="text-sm break-all">
                    {WidgetAPI.generateEmbedCode(user?.id || '')}
                  </code>
                </div>
                <Button 
                  className="mt-3 w-full" 
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(WidgetAPI.generateEmbedCode(user?.id || ''));
                    toast({ title: "Copied!", description: "Embed code copied to clipboard" });
                  }}
                >
                  Copy Embed Code
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
