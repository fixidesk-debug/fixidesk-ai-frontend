import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import { AuthGuard } from "@/components/auth-guard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Tickets from "./pages/dashboard/Tickets";
import TicketDetail from "./pages/dashboard/TicketDetail";
import CallAssistant from "./pages/dashboard/CallAssistant";
import ChatWidget from "./pages/dashboard/ChatWidget";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="fixidesk-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
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
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
