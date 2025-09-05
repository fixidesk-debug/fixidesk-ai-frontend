import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, UserPlus, Shield, Headphones, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface InvitationData {
  id: string;
  email: string;
  role: 'admin' | 'agent' | 'customer';
  invited_by: string;
  inviter_name: string;
  organization_name?: string;
  expires_at: string;
  status: string;
}

export default function AcceptInvitation() {
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, acceptInvitation } = useAuth();

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      fetchInvitation();
    } else {
      setError('Invalid invitation link');
      setIsLoading(false);
    }
  }, [token]);

  const fetchInvitation = async () => {
    if (!token) return;

    try {
      const { data, error } = await supabase
        .from('user_invitations')
        .select(`
          *,
          invited_by_profile:profiles!user_invitations_invited_by_fkey(first_name, last_name),
          organization:organizations(name)
        `)
        .eq('token', token)
        .eq('status', 'pending')
        .single();

      if (error || !data) {
        setError('Invitation not found or has expired');
        return;
      }

      // Check if invitation has expired
      if (new Date(data.expires_at) < new Date()) {
        setError('This invitation has expired');
        return;
      }

      setInvitation({
        id: data.id,
        email: data.email,
        role: data.role,
        invited_by: data.invited_by,
        inviter_name: `${data.invited_by_profile?.first_name || ''} ${data.invited_by_profile?.last_name || ''}`.trim(),
        organization_name: data.organization?.name,
        expires_at: data.expires_at,
        status: data.status,
      });
    } catch (error) {
      console.error('Error fetching invitation:', error);
      setError('Failed to load invitation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptInvitation = async () => {
    if (!token || !user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to accept this invitation.',
        variant: 'destructive',
      });
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      return;
    }

    setIsAccepting(true);

    try {
      const { error } = await acceptInvitation(token);

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to accept invitation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAccepting(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-5 w-5" />;
      case 'agent': return <Headphones className="h-5 w-5" />;
      case 'customer': return <UserCheck className="h-5 w-5" />;
      default: return <UserCheck className="h-5 w-5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'agent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'customer': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Full access to all features and settings';
      case 'agent':
        return 'Can manage tickets and help customers';
      case 'customer':
        return 'Can create and view their own tickets';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-between items-center mb-6">
              <Link 
                to="/login" 
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to login
              </Link>
              <ThemeToggle />
            </div>
            
            <Logo size="lg" clickable={false} className="justify-center mb-6" />
          </div>

          <Card className="shadow-luxurious border-border/50">
            <CardContent className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                  <UserPlus className="h-8 w-8 text-destructive" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Invalid Invitation</h3>
              <p className="text-muted-foreground mb-6">{error}</p>

              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link to="/login">
                  Go to Login
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5 dark:opacity-10" />
      
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <Link 
              to="/login" 
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to login
            </Link>
            <ThemeToggle />
          </div>
          
          <Logo size="lg" clickable={false} className="justify-center mb-6" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold mb-2">Team Invitation</h1>
            <p className="text-muted-foreground">
              You've been invited to join a team
            </p>
          </motion.div>
        </div>

        {/* Invitation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-luxurious border-border/50">
            {!isSuccess ? (
              <>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Join Team
                  </CardTitle>
                  <CardDescription>
                    Accept this invitation to get started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {invitation && (
                    <>
                      {/* Invitation Details */}
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Invited by</p>
                          <p className="font-medium">{invitation.inviter_name || 'Team Admin'}</p>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Email</p>
                          <p className="font-medium">{invitation.email}</p>
                        </div>

                        {invitation.organization_name && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Organization</p>
                            <p className="font-medium">{invitation.organization_name}</p>
                          </div>
                        )}

                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Role</p>
                          <Badge variant="outline" className={getRoleColor(invitation.role)}>
                            {getRoleIcon(invitation.role)}
                            <span className="ml-1 capitalize">{invitation.role}</span>
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {getRoleDescription(invitation.role)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Expires</p>
                          <p className="font-medium">
                            {new Date(invitation.expires_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Authentication Check */}
                      {!user ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              You need to sign in or create an account to accept this invitation.
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Button variant="hero" size="lg" className="w-full" asChild>
                              <Link to={`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`}>
                                Sign In to Accept
                              </Link>
                            </Button>
                            
                            <Button variant="outline" size="lg" className="w-full" asChild>
                              <Link to={`/register?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`}>
                                Create Account
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {user.email !== invitation.email && (
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <p className="text-sm text-yellow-800">
                                This invitation was sent to <strong>{invitation.email}</strong>, but you're signed in as <strong>{user.email}</strong>.
                              </p>
                            </div>
                          )}
                          
                          <Button
                            onClick={handleAcceptInvitation}
                            variant="hero"
                            size="lg"
                            className="w-full"
                            disabled={isAccepting}
                          >
                            {isAccepting ? 'Accepting...' : 'Accept Invitation'}
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </>
            ) : (
              <CardContent className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">Welcome to the team!</h3>
                <p className="text-muted-foreground mb-6">
                  Your invitation has been accepted. You will be redirected to the dashboard.
                </p>

                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link to="/dashboard">
                    Go to Dashboard
                  </Link>
                </Button>
              </CardContent>
            )}
          </Card>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Need help?{" "}
            <Link to="/contact" className="underline underline-offset-4">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}