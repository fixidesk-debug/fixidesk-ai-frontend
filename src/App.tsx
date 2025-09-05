import React, { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthProvider";
import { AuthGuard } from "@/components/auth-guard";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { trackPageView } from "@/lib/analytics";
import { I18nProvider } from "@/lib/i18n";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SimpleLoading } from "@/components/ui/simple-loading";
import { useAIOrchestrator } from "@/hooks/useAIOrchestrator";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const Integrations = lazy(() => import("./pages/Integrations"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const AcceptInvitation = lazy(() => import("./pages/AcceptInvitation"));
const EmailVerification = lazy(() => import("./pages/EmailVerification"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Careers = lazy(() => import("./pages/Careers"));
const Support = lazy(() => import("./pages/Support"));
const Security = lazy(() => import("./pages/Security"));
const Status = lazy(() => import("./pages/Status"));
const TermsOfService = lazy(() => import("./pages/legal/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Dashboard components (not lazy loaded for better UX)
import Dashboard from "./pages/dashboard/Dashboard";
import Tickets from "./pages/dashboard/Tickets";
import TicketDetail from "./pages/dashboard/TicketDetail";
import CRM from "./pages/dashboard/CRM";
import Campaigns from "./pages/dashboard/Campaigns";
import Automations from "./pages/dashboard/Automations";
import CallAssistant from "./pages/dashboard/CallAssistant";
import ChatWidget from "./pages/dashboard/ChatWidget";
import Analytics from "./pages/dashboard/Analytics";
import UserManagement from "./pages/dashboard/UserManagement";
import Settings from "./pages/dashboard/Settings";
import AccountSettings from "./pages/dashboard/AccountSettings";
import Billing from "./pages/Billing";

// Create query client with proper configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/integrations" element={<Integrations />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/accept-invitation" element={<AcceptInvitation />} />
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/support" element={<Support />} />
      <Route path="/help" element={<Support />} />
      <Route path="/security" element={<Security />} />
      <Route path="/status" element={<Status />} />
      <Route path="/legal/terms" element={<TermsOfService />} />
      <Route path="/legal/privacy" element={<PrivacyPolicy />} />
      <Route path="/billing" element={<AuthGuard><Billing /></AuthGuard>} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
      <Route path="/dashboard/tickets" element={<AuthGuard><Tickets /></AuthGuard>} />
      <Route path="/dashboard/tickets/:id" element={<AuthGuard><TicketDetail /></AuthGuard>} />
      <Route path="/dashboard/crm" element={<AuthGuard><CRM /></AuthGuard>} />
      <Route path="/dashboard/campaigns" element={<AuthGuard><Campaigns /></AuthGuard>} />
      <Route path="/dashboard/automations" element={<AuthGuard><Automations /></AuthGuard>} />
      <Route path="/dashboard/calls" element={<AuthGuard><CallAssistant /></AuthGuard>} />
      <Route path="/dashboard/chat" element={<AuthGuard><ChatWidget /></AuthGuard>} />
      <Route path="/dashboard/analytics" element={<AuthGuard><Analytics /></AuthGuard>} />
      <Route path="/dashboard/users" element={<AuthGuard><UserManagement /></AuthGuard>} />
      <Route path="/dashboard/settings" element={<AuthGuard><Settings /></AuthGuard>} />
      <Route path="/dashboard/account" element={<AuthGuard><AccountSettings /></AuthGuard>} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App: React.FC = () => {
  useAIOrchestrator(); // Start AI processing
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="fixidesk-theme">
          <I18nProvider>
            <AuthProvider>
              <TooltipProvider>
                <BrowserRouter>
                  <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-background focus:text-foreground focus:px-3 focus:py-2 focus:rounded-md z-50">
                    Skip to content
                  </a>
                  <Suspense fallback={
                    <div className="fixed inset-0 grid place-items-center bg-background">
                      <LoadingSpinner size="lg" />
                    </div>
                  }>
                    <RouteTracker />
                    <AppRoutes />
                  </Suspense>
                  <Toaster />
                  <Sonner />
                </BrowserRouter>
              </TooltipProvider>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
