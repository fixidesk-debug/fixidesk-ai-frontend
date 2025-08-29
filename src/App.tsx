import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts";
import { AuthGuard } from "@/components/auth-guard";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
import { I18nProvider } from "@/lib/i18n";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
const Index = lazy(() => import("./pages/Index"));
const Integrations = lazy(() => import("./pages/Integrations"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Careers = lazy(() => import("./pages/Careers"));
const Support = lazy(() => import("./pages/Support"));
const Security = lazy(() => import("./pages/Security"));
const Status = lazy(() => import("./pages/Status"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Tickets = lazy(() => import("./pages/dashboard/Tickets"));
const TicketDetail = lazy(() => import("./pages/dashboard/TicketDetail"));
const CallAssistant = lazy(() => import("./pages/dashboard/CallAssistant"));
const ChatWidget = lazy(() => import("./pages/dashboard/ChatWidget"));
const Analytics = lazy(() => import("./pages/dashboard/Analytics"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));
const TermsOfService = lazy(() => import("./pages/legal/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="fixidesk-theme">
      <I18nProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SpeedInsights />
          <BrowserRouter>
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-background focus:text-foreground focus:px-3 focus:py-2 focus:rounded-md z-50">Skip to content</a>
            <Suspense fallback={<div className="fixed inset-0 grid place-items-center"><LoadingSpinner size="lg" /></div>}>
            <ErrorBoundary>
            <RouteTracker />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/support" element={<Support />} />
              <Route path="/help" element={<Support />} />
              <Route path="/security" element={<Security />} />
              <Route path="/status" element={<Status />} />
              <Route path="/legal/terms" element={<TermsOfService />} />
              <Route path="/legal/privacy" element={<PrivacyPolicy />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
              <Route path="/dashboard/tickets" element={<AuthGuard><Tickets /></AuthGuard>} />
              <Route path="/dashboard/tickets/:id" element={<AuthGuard><TicketDetail /></AuthGuard>} />
              <Route path="/dashboard/calls" element={<AuthGuard><CallAssistant /></AuthGuard>} />
              <Route path="/dashboard/chat" element={<AuthGuard><ChatWidget /></AuthGuard>} />
              <Route path="/dashboard/analytics" element={<AuthGuard><Analytics /></AuthGuard>} />
              <Route path="/dashboard/settings" element={<AuthGuard><Settings /></AuthGuard>} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </ErrorBoundary>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
