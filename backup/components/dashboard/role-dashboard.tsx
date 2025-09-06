import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  TicketIcon, 
  MessageSquare, 
  BarChart3,
  Settings,
  UserCheck,
  Headphones,
  Shield
} from 'lucide-react';
import { DashboardLayout } from './dashboard-layout';
import { useNavigate } from 'react-router-dom';

interface RoleDashboardProps {
  children: React.ReactNode;
}

export function RoleDashboard({ children }: RoleDashboardProps) {
  const { user } = useAuth();
  const { profile, isLoading } = useProfile();
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const navigate = useNavigate();

  console.log('RoleDashboard: Render state:', { 
    hasUser: !!user, 
    userId: user?.id, 
    hasProfile: !!profile, 
    profileLoading: isLoading,
    profileRole: profile?.role 
  });

  useEffect(() => {
    if (profile) {
      const name = profile.first_name || 'there';
      const role = profile.role || 'customer';
      
      setWelcomeMessage(getWelcomeMessage(name, role));
    }
  }, [profile]);

  const getWelcomeMessage = (name: string, role: string) => {
    const time = new Date().getHours();
    const greeting = time < 12 ? 'Good morning' : time < 18 ? 'Good afternoon' : 'Good evening';
    
    const roleMessages = {
      admin: `${greeting}, ${name}! Ready to manage your platform?`,
      agent: `${greeting}, ${name}! Let's help some customers today.`,
      customer: `${greeting}, ${name}! How can we help you today?`
    };
    
    return roleMessages[role as keyof typeof roleMessages] || `${greeting}, ${name}!`;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'agent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'customer': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'agent': return <Headphones className="h-4 w-4" />;
      case 'customer': return <UserCheck className="h-4 w-4" />;
      default: return <UserCheck className="h-4 w-4" />;
    }
  };

  // Improved contrast utility strings for quick actions in dark mode
  const qaBlue = 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:border-blue-800/50';
  const qaGray = 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/40 dark:hover:bg-gray-800/60 dark:border-gray-700/60';
  const qaGreen = 'bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:border-green-800/50';
  const qaPurple = 'bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 dark:border-purple-800/50';

  const getQuickActions = (role: string) => {
    switch (role) {
      case 'admin':
        return [
          { 
            title: 'Manage Users', 
            description: 'Add agents and manage permissions',
            icon: <Users className="h-5 w-5" />,
            action: () => navigate('/dashboard/users'),
            color: qaBlue
          },
          { 
            title: 'System Settings', 
            description: 'Configure platform settings',
            icon: <Settings className="h-5 w-5" />,
            action: () => navigate('/dashboard/settings'),
            color: qaGray
          },
          { 
            title: 'Analytics', 
            description: 'View platform analytics',
            icon: <BarChart3 className="h-5 w-5" />,
            action: () => navigate('/dashboard/analytics'),
            color: qaGreen
          }
        ];
      case 'agent':
        return [
          { 
            title: 'My Tickets', 
            description: 'View tickets assigned to you',
            icon: <TicketIcon className="h-5 w-5" />,
            action: () => navigate('/dashboard/tickets'),
            color: qaBlue
          },
          { 
            title: 'New Ticket', 
            description: 'Create a ticket for a customer',
            icon: <MessageSquare className="h-5 w-5" />,
            action: () => navigate('/dashboard/tickets'),
            color: qaGreen
          },
          { 
            title: 'Knowledge Base', 
            description: 'Access help articles',
            icon: <BarChart3 className="h-5 w-5" />,
            action: () => navigate('/support'),
            color: qaPurple
          }
        ];
      case 'customer':
      default:
        return [
          { 
            title: 'Create Ticket', 
            description: 'Get help with an issue',
            icon: <TicketIcon className="h-5 w-5" />,
            action: () => navigate('/dashboard/tickets'),
            color: qaBlue
          },
          { 
            title: 'My Tickets', 
            description: 'View your support tickets',
            icon: <MessageSquare className="h-5 w-5" />,
            action: () => navigate('/dashboard/tickets'),
            color: qaGreen
          },
          { 
            title: 'Help Center', 
            description: 'Browse help articles',
            icon: <BarChart3 className="h-5 w-5" />,
            action: () => navigate('/support'),
            color: qaPurple
          }
        ];
    }
  };

  // Always show layout, load profile in background
  if (isLoading) {
    console.log('RoleDashboard: Profile loading, showing basic layout');
    // Show basic layout while profile loads
    return (
      <DashboardLayout>
        {children}
      </DashboardLayout>
    );
  }
  
  if (!profile) {
    console.log('RoleDashboard: No profile, showing basic layout');
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  console.log('RoleDashboard: Rendering with profile:', { role: profile.role, name: profile.first_name });
  return (
    <DashboardLayout>
      {/* Role-based welcome section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{welcomeMessage}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className={getRoleColor(profile.role)}>
                {getRoleIcon(profile.role)}
                <span className="ml-1 capitalize">{profile.role}</span>
              </Badge>
              {profile.company_name && (
                <span className="text-sm text-muted-foreground">
                  at {profile.company_name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Role-based quick actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getQuickActions(profile.role).map((action, index) => (
            <Card 
              key={index} 
              className={`cursor-pointer transition-colors border dark:border-transparent ${action.color}`}
              onClick={action.action}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/50 dark:bg-white/10">
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{action.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Original dashboard content */}
      {children}
    </DashboardLayout>
  );
}
