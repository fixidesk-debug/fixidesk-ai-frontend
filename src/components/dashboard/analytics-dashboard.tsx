import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  TicketIcon, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Activity,
  MessageSquare,
  Phone,
  Mail
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart
} from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useAIOrchestrator } from '@/hooks/useAIOrchestrator';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  avgResolutionTime: string;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export function AnalyticsDashboard() {
  const aiStats = useAIOrchestrator();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
    avgResolutionTime: '0m'
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { profile } = useProfile();

  // Update analytics with AI-generated data
  useEffect(() => {
    if (aiStats.tickets) {
      setAnalytics(prev => ({
        ...prev,
        totalTickets: aiStats.tickets.total_tickets,
        openTickets: aiStats.tickets.open_tickets,
        resolvedTickets: aiStats.tickets.resolved_tickets
      }));
    }
  }, [aiStats]);

  const ticketTrendData = [
    { name: 'Mon', tickets: 12, resolved: 8, pending: 4 },
    { name: 'Tue', tickets: 19, resolved: 15, pending: 4 },
    { name: 'Wed', tickets: 8, resolved: 6, pending: 2 },
    { name: 'Thu', tickets: 15, resolved: 12, pending: 3 },
    { name: 'Fri', tickets: 22, resolved: 18, pending: 4 },
    { name: 'Sat', tickets: 6, resolved: 5, pending: 1 },
    { name: 'Sun', tickets: 4, resolved: 3, pending: 1 },
  ];

  const userActivityData = [
    { name: 'Jan', users: 45, satisfaction: 4.2 },
    { name: 'Feb', users: 52, satisfaction: 4.1 },
    { name: 'Mar', users: 48, satisfaction: 4.3 },
    { name: 'Apr', users: 61, satisfaction: 4.4 },
    { name: 'May', users: 55, satisfaction: 4.2 },
    { name: 'Jun', users: 67, satisfaction: 4.5 },
  ];

  const channelData = [
    { name: 'Email', tickets: 45, avgTime: '2.5h' },
    { name: 'Chat', tickets: 32, avgTime: '15m' },
    { name: 'Phone', tickets: 18, avgTime: '8m' },
    { name: 'Social', tickets: 12, avgTime: '1.2h' },
  ];

  const agentPerformanceData = [
    { name: 'John D.', resolved: 28, satisfaction: 4.8, avgTime: '1.2h' },
    { name: 'Sarah M.', resolved: 24, satisfaction: 4.6, avgTime: '1.5h' },
    { name: 'Mike R.', resolved: 22, satisfaction: 4.4, avgTime: '1.8h' },
    { name: 'Lisa K.', resolved: 26, satisfaction: 4.7, avgTime: '1.3h' },
  ];

  const slaData = [
    { metric: 'First Response', target: 95, actual: 87, color: '#EF4444' },
    { metric: 'Resolution Time', target: 90, actual: 92, color: '#10B981' },
    { metric: 'Customer Satisfaction', target: 85, actual: 89, color: '#3B82F6' },
    { metric: 'Escalation Rate', target: 15, actual: 12, color: '#10B981' },
  ];

  const ticketStatusData = [
    { name: 'Open', value: analytics.openTickets || 15, color: '#EF4444' },
    { name: 'In Progress', value: 8, color: '#F59E0B' },
    { name: 'Resolved', value: analytics.resolvedTickets || 45, color: '#10B981' },
    { name: 'Closed', value: 12, color: '#6B7280' },
  ];

  const priorityData = [
    { name: 'Critical', value: 3, color: '#DC2626' },
    { name: 'High', value: 8, color: '#EA580C' },
    { name: 'Medium', value: 25, color: '#CA8A04' },
    { name: 'Low', value: 44, color: '#16A34A' },
  ];

  useEffect(() => {
    fetchAnalytics();
  }, [user, profile]);

  const fetchAnalytics = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.rpc('get_user_analytics', {
        p_user_id: profile?.role === 'customer' ? user.id : null,
        p_role: profile?.role === 'admin' ? null : profile?.role
      });

      if (data && data.length > 0) {
        const result = data[0];
        setAnalytics({
          totalUsers: result.total_users || 0,
          activeUsers: result.active_users || 0,
          newUsersToday: result.new_users_today || 0,
          totalTickets: result.total_tickets || 0,
          openTickets: result.open_tickets || 0,
          resolvedTickets: result.resolved_tickets || 0,
          avgResolutionTime: result.avg_resolution_time || '0m',
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMetricsForRole = () => {
    if (!profile) return [];

    const baseMetrics = [
      {
        title: 'Total Tickets',
        value: analytics.totalTickets,
        change: 0,
        icon: TicketIcon,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
      },
      {
        title: 'Open Tickets',
        value: analytics.openTickets,
        change: 0,
        icon: MessageSquare,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
      },
      {
        title: 'Resolved Tickets',
        value: analytics.resolvedTickets,
        change: 0,
        icon: Activity,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
      },
    ];

    if (profile.role === 'admin') {
      return [
        {
          title: 'Total Users',
          value: analytics.totalUsers,
          change: 0,
          icon: Users,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
        },
        {
          title: 'Active Users',
          value: analytics.activeUsers,
          change: 0,
          icon: Activity,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
        },
        ...baseMetrics,
        {
          title: 'Avg Resolution Time',
          value: analytics.avgResolutionTime,
          change: 0,
          icon: Clock,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
        },
      ];
    }

    if (profile.role === 'agent') {
      return [
        ...baseMetrics,
        {
          title: 'Avg Resolution Time',
          value: analytics.avgResolutionTime,
          change: 0,
          icon: Clock,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
        },
      ];
    }

    return baseMetrics;
  };

  const metrics = getMetricsForRole();

  // Remove loading state - always show layout

  return (
    <div className="space-y-6 overflow-auto">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="text-3xl font-bold">
                      {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                    </p>
                  </div>
                  <metric.icon className={`h-10 w-10 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* SLA Performance */}
      <Card>
        <CardHeader>
          <CardTitle>SLA Performance</CardTitle>
          <CardDescription>Service level agreement metrics vs targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {slaData.map((sla, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{sla.metric}</span>
                  <span className={sla.actual >= sla.target ? 'text-green-600' : 'text-red-600'}>
                    {sla.actual}% / {sla.target}%
                  </span>
                </div>
                <div className="flex gap-1">
                  <Progress value={sla.actual} className="h-2 flex-1" />
                  <div className="w-1 bg-gray-300 rounded" style={{ marginLeft: `${sla.target}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Ticket Trends</CardTitle>
            <CardDescription>
              Daily ticket creation and resolution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ticketTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="tickets" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Created"
                />
                <Line 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Resolved"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ticket Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Ticket Status</CardTitle>
            <CardDescription>
              Current ticket status distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ticketStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ticketStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 mt-4">
              {ticketStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Satisfaction Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
            <CardDescription>Monthly satisfaction scores and user activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
                <Tooltip />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="users" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.3}
                  name="Active Users"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="satisfaction" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Satisfaction (1-5)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Channel Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
            <CardDescription>Ticket volume and response time by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tickets" fill="#3B82F6" name="Tickets" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {channelData.map((channel, index) => (
                <div key={index} className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold">{channel.name}</div>
                  <div className="text-sm text-muted-foreground">Avg: {channel.avgTime}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Ticket Priority</CardTitle>
            <CardDescription>Distribution by priority level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 mt-4">
              {priorityData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agent Performance (Admin only) */}
        {profile?.role === 'admin' && (
          <Card>
            <CardHeader>
              <CardTitle>Agent Performance</CardTitle>
              <CardDescription>Individual agent metrics and rankings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentPerformanceData.map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-muted-foreground">{agent.resolved} resolved</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium">{agent.satisfaction}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{agent.avgTime} avg</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Chats</p>
                <p className="text-2xl font-bold">7</p>
                <p className="text-xs text-green-600">+2 from yesterday</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Queue Length</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-red-600">+1 from yesterday</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Online Agents</p>
                <p className="text-2xl font-bold">4/6</p>
                <p className="text-xs text-green-600">67% availability</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}