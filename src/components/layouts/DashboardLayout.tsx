
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
import Topbar from "../Topbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  
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

  // Check if current page is assessment page
  const isAssessmentPage = location.pathname.includes('/consultant/assessment/');
  
  // If on assessment page, we don't want to show the sidebar
  if (isAssessmentPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    );
  }
  
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
      </aside>
      
      {/* Main Content with Topbar */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
