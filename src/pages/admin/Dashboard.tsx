
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Users,
  FileText,
  CheckSquare,
  Clock,
  AlertTriangle,
} from 'lucide-react';

// Mock dashboard data
const dashboardData = {
  totalConsultants: 36,
  totalJobDescriptions: 15,
  activeAssessments: 24,
  completedAssessments: 42,
  pendingReviews: 7,
  
  recentAssessments: [
    {
      id: '1',
      consultant: 'John Smith',
      title: 'Full Stack Developer Assessment',
      jobDescription: 'Senior Full Stack Developer',
      status: 'completed',
      completedAt: '2025-04-20T14:30:00'
    },
    {
      id: '2',
      consultant: 'Emily Johnson',
      title: 'React Developer Skills',
      jobDescription: 'React Frontend Developer',
      status: 'in_progress',
      deadline: '2025-04-28T23:59:59'
    },
    {
      id: '3',
      consultant: 'Michael Chen',
      title: 'Project Management Fundamentals',
      jobDescription: 'Agile Project Manager',
      status: 'not_started',
      deadline: '2025-04-25T23:59:59'
    },
    {
      id: '4',
      consultant: 'Sarah Williams',
      title: 'DevOps Engineer Assessment',
      jobDescription: 'Senior DevOps Engineer',
      status: 'completed',
      completedAt: '2025-04-19T11:15:00'
    },
  ],
  
  urgentNotifications: [
    {
      id: '1',
      message: '7 assessments pending review',
      link: '/admin/results'
    },
    {
      id: '2',
      message: '3 assessments with approaching deadlines',
      link: '/admin/dashboard'
    }
  ]
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Get status badge class
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'not_started':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get status text for display
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'not_started':
        return 'Not Started';
      default:
        return status;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-assessment-blue">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of the assessment platform</p>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Consultants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalConsultants}</div>
            <p className="text-xs text-muted-foreground">
              Registered consultants in system
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Job Descriptions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalJobDescriptions}</div>
            <p className="text-xs text-muted-foreground">
              Active job descriptions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Assessments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.activeAssessments}</div>
            <p className="text-xs text-muted-foreground">
              Assessments in progress
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.completedAssessments}</div>
            <p className="text-xs text-muted-foreground">
              Total completed assessments
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Recent Assessments */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
            <CardDescription>Latest assessment activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentAssessments.map((assessment) => (
                <div key={assessment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">{assessment.consultant}</div>
                    <div className="text-sm text-muted-foreground">{assessment.title}</div>
                    <div className="flex items-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(assessment.status)}`}>
                        {getStatusText(assessment.status)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      {assessment.status === 'completed'
                        ? `Completed: ${formatDate(assessment.completedAt)}`
                        : `Deadline: ${formatDate(assessment.deadline)}`}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => navigate('/admin/results')}
                    >
                      {assessment.status === 'completed' ? 'View Results' : 'Details'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="link" 
              className="mt-4 px-0"
              onClick={() => navigate('/admin/results')}
            >
              View all assessments
            </Button>
          </CardContent>
        </Card>
        
        {/* Notifications & Quick Actions */}
        <div className="space-y-6">
          {/* Urgent Notifications */}
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Requires Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.urgentNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className="p-3 bg-white rounded-md border border-orange-200 cursor-pointer hover:bg-orange-50"
                    onClick={() => navigate(notification.link)}
                  >
                    <p>{notification.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                className="w-full justify-start bg-assessment-blue hover:bg-assessment-navy"
                onClick={() => navigate('/admin/users')}
              >
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
              <Button 
                className="w-full justify-start bg-assessment-blue hover:bg-assessment-navy"
                onClick={() => navigate('/admin/job-descriptions')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Manage Job Descriptions
              </Button>
              <Button 
                className="w-full justify-start bg-assessment-blue hover:bg-assessment-navy"
                onClick={() => navigate('/admin/results')}
              >
                <CheckSquare className="mr-2 h-4 w-4" />
                Review Assessments
              </Button>
              <Button 
                className="w-full justify-start bg-assessment-blue hover:bg-assessment-navy"
                onClick={() => navigate('/admin/analytics')}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
