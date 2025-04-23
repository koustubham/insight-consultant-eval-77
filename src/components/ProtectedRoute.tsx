
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';

interface ProtectedRouteProps {
  role: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== role) {
    // Redirect to appropriate dashboard based on user role
    if (user?.role === 'admin' || user?.role === 'hr') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/consultant/dashboard" replace />;
  }
  
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default ProtectedRoute;
