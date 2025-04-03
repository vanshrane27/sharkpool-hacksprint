
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StartupListingPage from "./pages/investor/StartupListingPage";
import StartupDetailsPage from "./pages/investor/StartupDetailsPage";
import InvestmentsPage from "./pages/investor/InvestmentsPage";
import DashboardPage from "./pages/startup/DashboardPage";
import HostStartupPage from "./pages/startup/HostStartupPage";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) => {
  const { currentUser, userData, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && userData?.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Investor Routes */}
            <Route 
              path="/investor/startups" 
              element={
                <ProtectedRoute requiredRole="investor">
                  <StartupListingPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/investor/startup/:id" 
              element={
                <ProtectedRoute requiredRole="investor">
                  <StartupDetailsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/investor/investments" 
              element={
                <ProtectedRoute requiredRole="investor">
                  <InvestmentsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Startup Routes */}
            <Route 
              path="/startup/dashboard" 
              element={
                <ProtectedRoute requiredRole="startup">
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/startup/host" 
              element={
                <ProtectedRoute requiredRole="startup">
                  <HostStartupPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
