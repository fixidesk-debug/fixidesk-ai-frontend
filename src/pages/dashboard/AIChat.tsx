import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, Settings, Send, Bot, User, ExternalLink, Phone, Mail, Plus, 
  Search, RefreshCw, Filter, BarChart2, MessageCircle, Users, Zap, Tag, 
  Clock, CheckCircle, XCircle, MoreVertical, Star, Archive, Trash2, AlertCircle, 
  Bell, BellOff, Volume2, VolumeX, Mic, Paperclip, Smile, Code, Image, FileText, 
  Video, File, Settings2, HelpCircle, LogOut, ChevronDown, ChevronRight, 
  ChevronUp, ChevronLeft, Maximize2, Minimize2, Copy, Share2, Download, Upload, 
  Edit, Eye, EyeOff, Lock, Unlock, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { tiledeskApi, TiledeskProject, TiledeskConversation } from '@/services/tiledeskApi';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
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

function AIChatContent() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<TiledeskProject[]>([]);
  const [conversations, setConversations] = useState<TiledeskConversation[]>([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  // Enhanced active users with more details
  const [activeUsers, setActiveUsers] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      status: 'online', 
      lastActive: '2 min ago',
      role: 'Admin',
      avatar: '',
      department: 'Support',
      unread: 3,
      active: true
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      status: 'away', 
      lastActive: '30 min ago',
      role: 'Agent',
      avatar: '',
      department: 'Sales',
      unread: 0,
      active: false
    },
    { 
      id: 3, 
      name: 'Bob Johnson', 
      email: 'bob@example.com', 
      status: 'offline', 
      lastActive: '2 hours ago',
      role: 'Agent',
      avatar: '',
      department: 'Support',
      unread: 1,
      active: false
    },
    { 
      id: 4, 
      name: 'Alice Williams', 
      email: 'alice@example.com', 
      status: 'online', 
      lastActive: '5 min ago',
      role: 'Manager',
      avatar: '',
      department: 'Management',
      unread: 0,
      active: true
    },
  ]);
  
  // Stats data
  const [stats, setStats] = useState({
    totalConversations: 1245,
    activeConversations: 24,
    avgResponseTime: '2m 34s',
    satisfactionRate: '92%',
    resolvedToday: 18,
    waitingResponse: 6
  });
  
  // Tags for conversations
  const [tags, setTags] = useState([
    { id: 1, name: 'Support', color: 'bg-blue-500' },
    { id: 2, name: 'Sales', color: 'bg-green-500' },
    { id: 3, name: 'Billing', color: 'bg-purple-500' },
    { id: 4, name: 'Technical', color: 'bg-orange-500' },
  ]);
  
  // Quick actions
  const quickActions = [
    { id: 1, name: 'New Chat', icon: MessageCircle, color: 'text-blue-500 bg-blue-50' },
    { id: 2, name: 'New Group', icon: Users, color: 'text-green-500 bg-green-50' },
    { id: 3, name: 'New Ticket', icon: Tag, color: 'text-purple-500 bg-purple-50' },
    { id: 4, name: 'New Automation', icon: Zap, color: 'text-orange-500 bg-orange-50' },
  ];
  
  const { toast } = useToast();
  
  const [settings, setSettings] = useState<WidgetSettings>({
    enabled: true,
    show_online_status: true,
    auto_greet: true,
    greeting_message: "Hi! How can I help you today?",
    theme_color: "blue",
    widget_title: "AI Assistant",
    offline_message: "I'm currently offline. Please leave a message and I'll get back to you soon."
  });

  const loadProjects = useCallback(async () => {
    try {
      const projectsData = await tiledeskApi.getProjects();
      setProjects(projectsData);
      if (projectsData.length > 0) {
        setSelectedProject(projectsData[0]._id);
      }
    } catch (error) {
      toast({
        title: 'Error loading projects',
        description: 'Failed to load Tiledesk projects. Please check your connection.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const loadConversations = useCallback(async (projectId: string) => {
    try {
      const conversationsData = await tiledeskApi.getConversations(projectId);
      setConversations(conversationsData);
    } catch (error) {
      toast({
        title: 'Error loading conversations',
        description: 'Failed to load conversations. Please try again later.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const loadInitialData = useCallback(async () => {
    await loadProjects();
    // Load initial greeting if auto-greet is enabled
    if (settings.auto_greet) {
      setMessages([{
        id: '1',
        content: settings.greeting_message,
        sender: 'ai',
        timestamp: new Date().toISOString()
      }]);
    }
  }, [loadProjects, settings.auto_greet, settings.greeting_message]);

  // Load projects on mount
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Load conversations when project is selected
  useEffect(() => {
    if (selectedProject) {
      loadConversations(selectedProject);
    }
  }, [selectedProject, loadConversations]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm your AI assistant. How can I help you further?",
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv => 
    conv.conversation_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.status.toString().includes(searchQuery)
  );

  // Filter active users based on search query
  const filteredActiveUsers = activeUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-[2000px] mx-auto">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-0 shadow-sm dark:shadow-blue-900/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Conversations</p>
                <h3 className="text-2xl font-bold">{stats.totalConversations.toLocaleString()}</h3>
              </div>
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50">
                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border-0 shadow-sm dark:shadow-green-900/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Now</p>
                <h3 className="text-2xl font-bold">{stats.activeConversations}</h3>
              </div>
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <span>{stats.waitingResponse} waiting response</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border-0 shadow-sm dark:shadow-purple-900/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Response Time</p>
                <h3 className="text-2xl font-bold">{stats.avgResponseTime}</h3>
              </div>
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50">
                <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              <span>5% faster than last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 border-0 shadow-sm dark:shadow-orange-900/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Satisfaction Rate</p>
                <h3 className="text-2xl font-bold">{stats.satisfactionRate}</h3>
              </div>
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/50">
                <Star className="h-6 w-6 text-orange-600 dark:text-orange-400 fill-orange-600 dark:fill-orange-400" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <span>{stats.resolvedToday} resolved today</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Button 
            key={action.id} 
            variant="outline" 
            className="h-24 flex-col items-center justify-center space-y-2 hover:shadow-md dark:hover:shadow-gray-700/50 transition-all duration-200 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-800"
          >
            <action.icon className={`h-6 w-6 ${action.color.split(' ')[0]} dark:opacity-80`} />
            <span className="text-sm font-medium dark:text-gray-200">{action.name}</span>
          </Button>
        ))}
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            AI Chat Dashboard
          </h2>
          <p className="text-muted-foreground dark:text-gray-300">
            Manage your AI chat interface and conversations in one place
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-9 w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project._id} value={project._id}>
                  {project.name || `Project ${project._id.slice(0, 6)}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList className="grid w-full sm:w-auto grid-cols-3">
            <TabsTrigger 
              value="chat" 
              onClick={() => setActiveTab('chat')}
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
              <Badge variant="secondary" className="ml-2 hidden sm:flex">New</Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="conversations" 
              onClick={() => setActiveTab('conversations')}
              className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
            >
              <Users className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Conversations</span>
              <Badge variant="secondary" className="ml-2">{conversations.length}</Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              onClick={() => setActiveTab('settings')}
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 data-[state=active]:shadow-sm"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center w-full sm:w-auto space-x-2">
            <div className="relative flex-1 sm:min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-[180px] hidden sm:flex">
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project._id} value={project._id}>
                    {project.name || `Project ${project._id.slice(0, 6)}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="hidden sm:flex">
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden lg:inline">New Chat</span>
            </Button>
          </div>
        </div>

        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chat with AI Assistant</CardTitle>
              <CardDescription>
                Interact with the AI assistant in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 h-[400px] overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex max-w-[80%] flex-col space-y-2 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`flex items-center space-x-2 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                        >
                          {message.sender === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>
                        <div
                          className={`rounded-lg px-4 py-2 ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                        >
                          {message.content}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-lg bg-muted px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce bounce-delay-0" />
                        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce bounce-delay-150" />
                        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce bounce-delay-300" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Type your message..."
                  className="min-h-[40px] resize-none"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-4">
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Conversations</CardTitle>
                  <CardDescription>
                    View and manage your chat conversations
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
                {/* Conversation List */}
                <div className="border-r overflow-y-auto">
                  {filteredConversations.length > 0 ? (
                    <div className="divide-y">
                      {filteredConversations.map((conversation) => (
                        <div key={conversation._id} className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium truncate">
                                  Conversation {conversation.conversation_id?.slice(0, 8) || 'New Chat'}
                                </p>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(conversation.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">
                                Status: {conversation.status || 'Unknown'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-1">No conversations found</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {searchQuery ? 'Try a different search term' : 'Start a new conversation to see it here'}
                      </p>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Conversation
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Active Users */}
                <div className="border-r p-4 overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Active Users</h3>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {filteredActiveUsers.map((user) => (
                      <div key={user.id} className="flex items-center p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div className="relative mr-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className={cn(
                            "absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-background",
                            user.status === 'online' ? 'bg-green-500' : 
                            user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                          )} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{user.lastActive}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Conversation Preview */}
                <div className="p-4">
                  <div className="h-full flex flex-col">
                    <div className="border-b pb-4 mb-4">
                      <h3 className="font-medium">Conversation Details</h3>
                      <p className="text-sm text-muted-foreground">Select a conversation to view details</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="font-medium mb-1">No conversation selected</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Select a conversation from the list to view details
                        </p>
                        <Button>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Start New Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Widget Settings</CardTitle>
              <CardDescription>
                Customize your chat widget appearance and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="widget-enabled">Enable Widget</Label>
                    <p className="text-sm text-muted-foreground">
                      Show or hide the chat widget on your website
                    </p>
                  </div>
                  <Switch
                    id="widget-enabled"
                    checked={settings.enabled}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, enabled: checked })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="widget-title">Widget Title</Label>
                    <Input
                      id="widget-title"
                      value={settings.widget_title}
                      onChange={(e) =>
                        setSettings({ ...settings, widget_title: e.target.value })
                      }
                      placeholder="e.g., Support Chat"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theme-color">Theme Color</Label>
                    <Input
                      type="color"
                      id="theme-color"
                      value={settings.theme_color}
                      onChange={(e) =>
                        setSettings({ ...settings, theme_color: e.target.value })
                      }
                      className="h-10 w-16 p-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="greeting-message">Greeting Message</Label>
                  <Textarea
                    id="greeting-message"
                    value={settings.greeting_message}
                    onChange={(e) =>
                      setSettings({ ...settings, greeting_message: e.target.value })
                    }
                    placeholder="Enter a welcome message for your users"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="offline-message">Offline Message</Label>
                  <Textarea
                    id="offline-message"
                    value={settings.offline_message}
                    onChange={(e) =>
                      setSettings({ ...settings, offline_message: e.target.value })
                    }
                    placeholder="Enter a message to show when offline"
                    rows={2}
                  />
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-greet">Auto Greeting</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically send a greeting message when the widget is opened
                      </p>
                    </div>
                    <Switch
                      id="auto-greet"
                      checked={settings.auto_greet}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, auto_greet: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-online-status">Show Online Status</Label>
                      <p className="text-sm text-muted-foreground">
                        Display whether you're online or offline to users
                      </p>
                    </div>
                    <Switch
                      id="show-online-status"
                      checked={settings.show_online_status}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, show_online_status: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function AIChat() {
  return (
    <DashboardLayout>
      <AIChatContent />
    </DashboardLayout>
  );
}
