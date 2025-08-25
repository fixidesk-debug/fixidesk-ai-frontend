import { useState } from "react";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock ticket data
const ticketData = {
  id: "TK-1001",
  subject: "Unable to login to mobile app",
  status: "open",
  priority: "high",
  created: "2024-01-15T10:30:00Z",
  updated: "2024-01-15T14:22:00Z",
  customer: {
    name: "Sarah Chen",
    email: "sarah@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612345b?w=40&h=40&fit=crop&crop=face",
  },
  assignee: {
    name: "John Doe",
    avatar: null,
  },
  messages: [
    {
      id: "1",
      type: "customer",
      content: "I'm having trouble logging into the mobile app. I keep getting an 'invalid credentials' error even though I'm sure my password is correct. This started happening yesterday after the app update.",
      timestamp: "2024-01-15T10:30:00Z",
      author: "Sarah Chen",
    },
    {
      id: "2",
      type: "agent",
      content: "Hi Sarah, thanks for reaching out. I understand you're having trouble logging in after the recent app update. Let me help you with that. Can you please try the following steps:\n\n1. Clear the app's cache and data\n2. Uninstall and reinstall the app\n3. Make sure you're using the latest version\n\nLet me know if this resolves the issue!",
      timestamp: "2024-01-15T11:15:00Z",
      author: "John Doe",
    },
    {
      id: "3",
      type: "customer",
      content: "I tried all those steps but I'm still getting the same error. The app version is 2.1.3 which seems to be the latest. Is there anything else I can try?",
      timestamp: "2024-01-15T14:22:00Z",
      author: "Sarah Chen",
    },
  ],
};

export default function TicketDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState(ticketData.status);
  const [priority, setPriority] = useState(ticketData.priority);

  const handleSendReply = () => {
    if (!reply.trim()) return;
    
    toast({
      title: "Reply sent",
      description: "Your reply has been sent to the customer.",
    });
    setReply("");
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    toast({
      title: "Status updated",
      description: `Ticket status changed to ${newStatus}.`,
    });
  };

  const handlePriorityChange = (newPriority: string) => {
    setPriority(newPriority);
    toast({
      title: "Priority updated",
      description: `Ticket priority changed to ${newPriority}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-blue-500";
      case "in-progress": return "bg-yellow-500";
      case "resolved": return "bg-green-500";
      case "closed": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "high": return "bg-red-500";
      case "urgent": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
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
              {ticketData.subject}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }} 
              className="text-muted-foreground mt-1"
            >
              Ticket #{ticketData.id}
            </motion.p>
          </div>

          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-4"
          >
            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle>Conversation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ticketData.messages.map((message, index) => (
                  <div key={message.id} className={`flex gap-3 ${message.type === 'agent' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.type === 'customer' ? ticketData.customer.avatar : undefined} />
                      <AvatarFallback className="text-xs">
                        {message.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`flex-1 max-w-lg ${message.type === 'agent' ? 'text-right' : ''}`}>
                      <div className={`p-3 rounded-lg ${
                        message.type === 'agent' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <div className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${
                        message.type === 'agent' ? 'justify-end' : ''
                      }`}>
                        <span>{message.author}</span>
                        <span>•</span>
                        <span>{formatTime(message.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reply Box */}
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
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach File
                  </Button>
                  <Button onClick={handleSendReply} disabled={!reply.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {/* Ticket Info */}
            <Card>
              <CardHeader>
                <CardTitle>Ticket Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={priority} onValueChange={handlePriorityChange}>
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
                    <span>{formatTime(ticketData.created)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Updated:</span>
                    <span>{formatTime(ticketData.updated)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Customer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={ticketData.customer.avatar} />
                    <AvatarFallback>
                      {ticketData.customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{ticketData.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{ticketData.customer.company}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{ticketData.customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{ticketData.customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{ticketData.customer.company}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}