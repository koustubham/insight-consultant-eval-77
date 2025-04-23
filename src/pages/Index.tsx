
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    if (isLoading) return;
    
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Redirect based on user role
      if (user?.role === 'admin' || user?.role === 'hr') {
        navigate('/admin/dashboard');
      } else {
        navigate('/consultant/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, navigate, user]);
  
  // Show a loading state while auth check is in progress
  return (
    <div className="min-h-screen flex items-center justify-center bg-assessment-gray">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-assessment-blue mb-4">AI Assessment Platform</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
