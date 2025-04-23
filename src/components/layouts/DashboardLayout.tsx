
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  FileText, 
  ClipboardCheck, 
  BarChart, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };
  
  const isAdmin = user?.role === 'admin' || user?.role === 'hr';
  
  const adminNavItems = [
    { title: 'Dashboard', path: '/admin/dashboard', icon: Home },
    { title: 'User Management', path: '/admin/users', icon: Users },
    { title: 'Job Descriptions', path: '/admin/job-descriptions', icon: FileText },
    { title: 'Consultant Mapping', path: '/admin/consultant-mapping', icon: ClipboardCheck },
    { title: 'Assessment Results', path: '/admin/results', icon: ClipboardCheck },
    { title: 'Analytics', path: '/admin/analytics', icon: BarChart },
  ];
  
  const consultantNavItems = [
    { title: 'Dashboard', path: '/consultant/dashboard', icon: Home },
  ];
  
  const navItems = isAdmin ? adminNavItems : consultantNavItems;
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-4 bg-assessment-blue text-white flex justify-between items-center">
        <h1 className="font-bold text-xl">AI Assessment</h1>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md hover:bg-assessment-navy"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-assessment-blue text-white w-full md:w-64 md:min-h-screen transition-all duration-300 ease-in-out",
          sidebarOpen ? "block" : "hidden md:block"
        )}
      >
        <div className="p-6 hidden md:block">
          <h1 className="text-2xl font-bold">AI Assessment</h1>
        </div>
        
        <div className="mt-6">
          <nav className="px-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-white hover:bg-assessment-navy",
                  isActive(item.path) && "bg-assessment-navy"
                )}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.title}
              </Button>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full p-4">
          <div className="border-t border-assessment-navy pt-4 mb-2">
            <p className="text-sm opacity-70 mb-1">{user?.name}</p>
            <p className="text-xs opacity-50">{user?.email}</p>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:bg-assessment-navy"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
