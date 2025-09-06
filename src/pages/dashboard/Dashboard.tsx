import { motion } from "framer-motion";
import {
  Inbox,
  CheckCircle,
  Clock,
  TrendingUp,
  Phone,
  MessageSquare,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RoleDashboard } from "@/components/dashboard/role-dashboard";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/lib/i18n";
import { User } from "@supabase/supabase-js";

interface DashboardStats {
  active_tickets: number;
  resolved_today: number;
  avg_response_time: string;
  satisfaction_rate: number;
  ticket_change: string;
  resolved_change: string;
  response_change: string;
  satisfaction_change: string;
  [key: string]: string | number; // Add index signature for dynamic access
}

interface Activity {
  id: string;
  type: 'ticket' | 'call' | 'chat';
  title: string;
  description: string;
  created_at: string;
  priority: 'low' | 'medium' | 'high';
}

interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  last_login: string;
}

export default function Dashboard() {
  const { user } = useAuth() as { user: User | null };
  const { t } = useI18n();
  const [stats, setStats] = useState<Partial<DashboardStats>>({});
  const [activities, setActivities] = useState<Activity[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  console.log('Dashboard: Render state:', { 
    hasUser: !!user, 
    userId: user?.id, 
    userEmail: user?.email,
    stats: !!stats,
    activitiesCount: activities.length,
    teamMembersCount: teamMembers.length,
    loading 
  });

  useEffect(() => {
    if (user) {
      console.log('Dashboard: User found, loading dashboard data');
      loadDashboardData();
    } else {
      console.log('Dashboard: No user found');
    }
  }, [user, loadDashboardData]);

  const loadDashboardData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      await Promise.all([
        loadStats(),
        loadRecentActivity(),
        loadTeamMembers()
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [user, loadStats, loadRecentActivity, loadTeamMembers]);

  const loadStats = async () => {
    if (!user?.id) {
      console.error('No user ID available');
      return;
    }
    
    try {
      type DashboardStatsResponse = {
        data: DashboardStats | null;
        error: Error | null;
      };
      
      const { data, error } = await supabase.rpc('get_dashboard_stats', {
        user_id: user.id
      }) as unknown as DashboardStatsResponse;
      
      if (error) throw error;
      
      if (data) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      // Fallback to default stats if RPC fails
      setStats({
        active_tickets: 0,
        resolved_today: 0,
        avg_response_time: '0m',
        satisfaction_rate: 0,
        ticket_change: '+0%',
        resolved_change: '+0%',
        response_change: '0%',
        satisfaction_change: '+0%'
      });
    }
  };

  const loadRecentActivity = async () => {
    try {
      const { data, error } = await supabase
        .from('recent_activities')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (data && !error) {
        setActivities(data);
      }
    } catch (error) {
      console.error('Error loading activities:', error);
      // Fallback to empty activities if table doesn't exist
      setActivities([]);
    }
  };

  const loadTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, is_active, last_login')
        .neq('id', user?.id)
        .limit(3);
      
      if (data && !error) {
        setTeamMembers(data);
      }
    } catch (error) {
      console.error('Error loading team members:', error);
      // Fallback to empty team members if table doesn't exist
      setTeamMembers([]);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  // Remove loading state - always show layout

  return (
    <RoleDashboard>
      <div className="space-y-8">
        {/* Header - Removed duplicate greeting as it's already shown in the topbar */}
        <div className="h-8"></div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="transition-all duration-300 hover:shadow-beautiful border-border/50 hover:border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('dashboard.activeTickets')}</CardTitle>
                <Inbox className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.active_tickets || 0}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <ArrowUpRight className="h-3 w-3 text-success" />
                  <span className="text-success">{stats?.ticket_change || '+0%'}</span>
                  <span>{t('dashboard.fromLastWeek')}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="transition-all duration-300 hover:shadow-beautiful border-border/50 hover:border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('dashboard.resolvedToday')}</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.resolved_today || 0}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <ArrowUpRight className="h-3 w-3 text-success" />
                  <span className="text-success">{stats?.resolved_change || '+0%'}</span>
                  <span>{t('dashboard.vsYesterday')}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="transition-all duration-300 hover:shadow-beautiful border-border/50 hover:border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('dashboard.avgResponseTime')}</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.avg_response_time || '0m'}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <ArrowDownRight className="h-3 w-3 text-success" />
                  <span className="text-success">{stats?.response_change || '0%'}</span>
                  <span>{t('dashboard.fasterThanLastWeek')}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="transition-all duration-300 hover:shadow-beautiful border-border/50 hover:border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('dashboard.customerSatisfaction')}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.satisfaction_rate || 0}%</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <ArrowUpRight className="h-3 w-3 text-success" />
                  <span className="text-success">{stats?.satisfaction_change || '+0%'}</span>
                  <span>{t('dashboard.fromLastMonth')}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 h-full"
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
                    <CardDescription>Latest tickets and interactions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/dashboard/tickets">{t('dashboard.viewAll')}</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.length > 0 ? (
                    activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex-shrink-0">
                          {activity.type === "ticket" && <Inbox className="h-5 w-5 text-primary" />}
                          {activity.type === "call" && <Phone className="h-5 w-5 text-accent" />}
                          {activity.type === "chat" && <MessageSquare className="h-5 w-5 text-success" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium">{activity.title}</h4>
                            <Badge 
                              variant={
                                activity.priority === "high" ? "destructive" :
                                activity.priority === "medium" ? "default" : "secondary"
                              }
                              className="text-xs"
                            >
                              {activity.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{formatTimeAgo(activity.created_at)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      {t('dashboard.noActivity')}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions & Team Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="h-full"
          >
            {/* Team Status */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{t('dashboard.teamStatus')}</CardTitle>
                <CardDescription>Who's online right now</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamMembers.length > 0 ? (
                    teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-semibold">
                          {getInitials(member.first_name, member.last_name)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{member.first_name} {member.last_name}</p>
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${member.is_active ? 'bg-success' : 'bg-muted-foreground'}`}></div>
                            <span className="text-xs text-muted-foreground">
                              {member.is_active ? t('dashboard.online') : t('dashboard.offline')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      {t('dashboard.noTeamMembers')}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </RoleDashboard>
  );
}