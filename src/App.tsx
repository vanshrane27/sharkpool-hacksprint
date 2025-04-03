import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StartupListingPage from "./pages/investor/StartupListingPage";
import StartupDetailsPage from "./pages/investor/StartupDetailsPage";
import InvestmentsPage from "./pages/investor/InvestmentsPage";
import DashboardPage from "./pages/startup/DashboardPage";
import HostStartupPage from "./pages/startup/HostStartupPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import StartupRequestsPage from "./pages/startup/StartupRequestsPage";
import InvestorNotificationsPage from "./pages/investor/InvestorNotificationsPage";
import StartupNotificationsPage from "./pages/startup/StartupNotificationsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* Protected Routes - No specific role required */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            
            {/* Investor Routes */}
            <Route element={<ProtectedRoute requiredRole="investor" />}>
              <Route path="/investor/startups" element={<StartupListingPage />} />
              <Route path="/investor/startup/:id" element={<StartupDetailsPage />} />
              <Route path="/investor/investments" element={<InvestmentsPage />} />
              <Route path="/investor/notifications" element={<InvestorNotificationsPage />} />
            </Route>
            
            {/* Startup Routes */}
            <Route element={<ProtectedRoute requiredRole="startup" />}>
              <Route path="/startup/dashboard" element={<DashboardPage />} />
              <Route path="/startup/host" element={<HostStartupPage />} />
              <Route path="/startup/requests" element={<StartupRequestsPage />} />
              <Route path="/startup/notifications" element={<StartupNotificationsPage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
