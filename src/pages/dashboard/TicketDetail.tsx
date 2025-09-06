import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  ArrowLeft,
  Clock,
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  Send,
  Paperclip,
  MoreHorizontal,
  Sparkles,
  Copy as CopyIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { orchestratorApi } from "@/lib/api";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  customer_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  customer_company?: string;
  assigned_agent?: string;
  organization_id?: string | null;
}

interface Message {
  id: string;
  content: string;
  sender: 'customer' | 'agent';
  created_at: string;
  author_name: string;
}

export default function TicketDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [reply, setReply] = useState("");
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{ text: string; confidence: number; sources: { index: number; document_id: string; chunk_idx?: number; preview: string }[] } | null>(null);

  useEffect(() => {
    if (id && user) {
      loadTicketData();
    }
  }, [id, user, loadTicketData]);

  const loadTicketData = useCallback(async () => {
    try {
      const { data: ticketData, error: ticketError } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', id)
        .single();

      if (ticketData && !ticketError) {
        const { data: customerData } = await supabase
          .from('profiles')
          .select('first_name,last_name,phone,company_name,email')
          .eq('id', ticketData.customer_id)
          .single();

        setTicket({
          ...ticketData,
          customer_name: [customerData?.first_name, customerData?.last_name].filter(Boolean).join(' ') || 'Customer',
          customer_email: customerData?.email || '',
          customer_phone: customerData?.phone || '',
          customer_company: customerData?.company_name || ''
        });
      }

      const { data: commentsData, error: commentsError } = await supabase
        .from('ticket_comments')
        .select(`
          id,
          content,
          created_at,
          author:profiles(id, first_name, last_name, email)
        `)
        .eq('ticket_id', id)
        .order('created_at', { ascending: true });

      if (commentsData && !commentsError) {
        const mapped = commentsData.map((c: { id: string; content: string; created_at: string; author: { id: string; first_name: string; last_name: string; email: string } | null }) => ({
          id: c.id,
          content: c.content,
          created_at: c.created_at,
          sender: c.author?.id === ticketData?.customer_id ? 'customer' : 'agent',
          author_name: [c.author?.first_name, c.author?.last_name].filter(Boolean).join(' ') || c.author?.email || 'User'
        }));
        setMessages(mapped);
      }
    } catch (error) {
      console.error('Error loading ticket:', error);
    }
  }, [id]);

  const getConfidenceVariant = (c: number) => {
    if (c >= 0.8) return 'default';
    if (c >= 0.5) return 'secondary';
    return 'destructive';
  };

  const handleAISuggest = async () => {
    if (!ticket) return;
    try {
      setAiLoading(true);
      setAiSuggestion(null);
      const last_messages = messages.map(m => ({ role: m.sender, content: m.content })).slice(-20);
      const orgId = ticket.organization_id || undefined;
      const payload: { organization_id: string | undefined; last_messages: Array<{ role: string; content: string }> } = { organization_id: orgId, last_messages };
      if (!orgId) {
        toast({ title: 'Warning', description: 'Ticket has no organization; using limited context.', variant: 'default' });
      }
      const { data } = await orchestratorApi.suggestReply(payload);
      setAiSuggestion(data);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Unexpected error';
      toast({ title: 'AI suggestion failed', description: errorMessage, variant: 'destructive' });
    } finally {
      setAiLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!reply.trim() || !ticket) return;
    
    try {
      const { error } = await supabase
        .from('ticket_comments')
        .insert({
          ticket_id: ticket.id,
          author_id: user?.id as string,
          content: reply
        });

      if (!error) {
        toast({
          title: "Reply sent",
          description: "Your reply has been sent to the customer.",
        });
        setReply("");
        loadTicketData();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply.",
        variant: "destructive"
      });
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!ticket) return;
    
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ status: newStatus })
        .eq('id', ticket.id);

      if (!error) {
        setTicket({ ...ticket, status: newStatus });
        toast({
          title: "Status updated",
          description: `Ticket status changed to ${newStatus}.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive"
      });
    }
  };

  const handlePriorityChange = async (newPriority: string) => {
    if (!ticket) return;
    
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ priority: newPriority })
        .eq('id', ticket.id);

      if (!error) {
        setTicket({ ...ticket, priority: newPriority });
        toast({
          title: "Priority updated",
          description: `Ticket priority changed to ${newPriority}.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update priority.",
        variant: "destructive"
      });
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (!ticket) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">
            {id ? "Loading ticket..." : "Ticket not found"}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard/tickets">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tickets
            </Link>
          </Button>
          
          <div className="flex-1">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-3xl font-bold"
            >
              {ticket.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }} 
              className="text-muted-foreground mt-1"
            >
              Ticket #{ticket.id}
            </motion.p>
          </div>

          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Conversation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {messages.length > 0 ? messages.map((message, index) => (
                  <div key={message.id} className={`flex gap-3 ${message.sender === 'agent' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={undefined} />
                      <AvatarFallback className="text-xs">
                        {message.author_name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`flex-1 max-w-lg ${message.sender === 'agent' ? 'text-right' : ''}`}>
                      <div className={`p-3 rounded-lg ${
                        message.sender === 'agent' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <div className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${
                        message.sender === 'agent' ? 'justify-end' : ''
                      }`}>
                        <span>{message.author_name}</span>
                        <span>•</span>
                        <span>{formatTime(message.created_at)}</span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No messages yet
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Type your reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={4}
                />
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleAISuggest} disabled={aiLoading}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      {aiLoading ? 'Generating…' : 'AI Suggest Reply'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4 mr-2" />
                      Attach File
                    </Button>
                  </div>
                  <Button onClick={handleSendReply} disabled={!reply.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Reply
                  </Button>
                </div>

                {aiSuggestion && (
                  <div className="mt-4 rounded-lg border p-4 space-y-3 bg-card">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">AI Suggested Reply</div>
                      <Badge variant={getConfidenceVariant(aiSuggestion.confidence)}>
                        Confidence: {Math.round(aiSuggestion.confidence * 100)}%
                      </Badge>
                    </div>
                    <div className="rounded-md bg-muted p-3 text-sm whitespace-pre-wrap">
                      {aiSuggestion.text}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => setReply(aiSuggestion.text)}>Use</Button>
                      <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(aiSuggestion.text)}>
                        <CopyIcon className="h-4 w-4 mr-2" />Copy
                      </Button>
                    </div>
                    {aiSuggestion.sources?.length ? (
                      <div className="text-xs text-muted-foreground">
                        Sources:
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          {aiSuggestion.sources.map(s => (
                            <li key={`${s.document_id}-${s.chunk_idx || 0}`}>[S{s.index}] {s.preview}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Ticket Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={ticket.status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={ticket.priority} onValueChange={handlePriorityChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Created:</span>
                    <span>{formatTime(ticket.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Updated:</span>
                    <span>{formatTime(ticket.updated_at)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={undefined} />
                    <AvatarFallback>
                      {ticket.customer_name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{ticket.customer_name}</p>
                    <p className="text-sm text-muted-foreground">{ticket.customer_company}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{ticket.customer_email}</span>
                  </div>
                  {ticket.customer_phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{ticket.customer_phone}</span>
                    </div>
                  )}
                  {ticket.customer_company && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{ticket.customer_company}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
