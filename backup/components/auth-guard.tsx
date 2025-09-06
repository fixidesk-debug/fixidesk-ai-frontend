import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

// Temporary billing maintenance flag
const BILLING_DISABLED = true;

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: 'admin' | 'agent' | 'customer';
  redirectTo?: string;
}

interface Permissions {
  subscription_active?: boolean;
}

export function AuthGuard({ 
  children, 
  requireAuth = true, 
  requiredRole,
  redirectTo 
}: AuthGuardProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  const { profile, isLoading: profileLoading } = useProfile();

  // Show minimal loading while checking authentication
  if (loading || profileLoading) {
    console.log('AuthGuard: Loading state, showing spinner');
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  console.log('AuthGuard:', { 
    requireAuth, 
    isAuthenticated, 
    user: !!user, 
    userId: user?.id,
    userEmail: user?.email,
    location: location.pathname,
    loading 
  });

  // Handle authentication requirement
  if (requireAuth && !isAuthenticated) {
    console.log('AuthGuard: User not authenticated, redirecting to login');
    return <Navigate to={redirectTo || "/login"} state={{ from: location }} replace />;
  }

  // Subscription gate (skip when billing is disabled)
  if (!BILLING_DISABLED) {
const subscriptionActive = Boolean((profile?.permissions as Permissions)?.subscription_active);
    const onBillingPage = location.pathname.startsWith('/billing');
    if (requireAuth && isAuthenticated && !subscriptionActive && !onBillingPage) {
      console.log('AuthGuard: Subscription inactive, redirecting to billing');
      return <Navigate to="/billing" state={{ from: location }} replace />;
    }
  }

  // Role-based access placeholder
  if (requiredRole && user) {
    // Future: check role
  }

  // If user is authenticated but accessing auth pages, redirect to dashboard
  if (!requireAuth && isAuthenticated) {
    console.log('AuthGuard: User authenticated but accessing auth page, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('AuthGuard: Rendering children for path:', location.pathname);
  return <>{children}</>;
}

export function PublicRoute({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireAuth={false} redirectTo="/dashboard">
      {children}
    </AuthGuard>
  );
}

export function ProtectedRoute({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode;
  requiredRole?: 'admin' | 'agent' | 'customer';
}) {
  return (
    <AuthGuard requireAuth={true} requiredRole={requiredRole}>
      {children}
    </AuthGuard>
  );
}
