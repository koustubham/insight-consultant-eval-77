
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ConsultantDashboard from "./pages/consultant/Dashboard";
import AssessmentPage from "./pages/consultant/Assessment";
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import JobDescriptions from "./pages/admin/JobDescriptions";
import ConsultantMapping from "./pages/admin/ConsultantMapping";
import AssessmentResults from "./pages/admin/AssessmentResults";
import Analytics from "./pages/admin/Analytics";

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
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Consultant Routes */}
            <Route path="/consultant" element={<ProtectedRoute role="consultant" />}>
              <Route path="dashboard" element={<ConsultantDashboard />} />
              <Route path="assessment/:id" element={<AssessmentPage />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute role="admin" />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="job-descriptions" element={<JobDescriptions />} />
              <Route path="consultant-mapping" element={<ConsultantMapping />} />
              <Route path="results" element={<AssessmentResults />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
