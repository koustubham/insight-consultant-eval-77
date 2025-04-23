
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertTriangle } from 'lucide-react';

// Mock data for assessments
const mockAssessments = [
  {
    id: '1',
    title: 'Full Stack Developer Assessment',
    jobDescription: 'Senior Full Stack Developer',
    deadline: '2025-05-10T23:59:59',
    status: 'not_started',
    questions: { total: 20, answered: 0 }
  },
  {
    id: '2',
    title: 'React Developer Skills',
    jobDescription: 'React Frontend Developer',
    deadline: '2025-04-28T23:59:59',
    status: 'in_progress',
    questions: { total: 15, answered: 7 }
  },
  {
    id: '3',
    title: 'Project Management Fundamentals',
    jobDescription: 'Agile Project Manager',
    deadline: '2025-04-25T23:59:59',
    status: 'not_started',
    questions: { total: 18, answered: 0 }
  }
];

const ConsultantDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Function to calculate days remaining until deadline
  const getDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Function to get appropriate badge for assessment status
  const getStatusBadge = (status: string, deadline: string) => {
    const daysRemaining = getDaysRemaining(deadline);
    
    if (status === 'completed') {
      return <Badge className="bg-green-500">Completed</Badge>;
    } else if (status === 'in_progress') {
      return <Badge className="bg-blue-500">In Progress</Badge>;
    } else if (daysRemaining <= 3) {
      return <Badge className="bg-red-500">Urgent</Badge>;
    } else {
      return <Badge className="bg-orange-500">Not Started</Badge>;
    }
  };
  
  // Function to get progress percentage
  const getProgressPercentage = (answered: number, total: number) => {
    return Math.round((answered / total) * 100);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-assessment-blue">Your Assessments</h1>
        <p className="text-muted-foreground">View and complete your assigned assessments</p>
      </div>
      
      {mockAssessments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAssessments.map((assessment) => (
            <Card key={assessment.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{assessment.title}</CardTitle>
                  {getStatusBadge(assessment.status, assessment.deadline)}
                </div>
                <CardDescription>
                  {assessment.jobDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{assessment.questions.answered}/{assessment.questions.total} questions</span>
                  </div>
                  <Progress 
                    value={getProgressPercentage(assessment.questions.answered, assessment.questions.total)}
                    className="h-2"
                  />
                </div>
                
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    {getDaysRemaining(assessment.deadline) <= 0 
                      ? "Deadline passed" 
                      : `${getDaysRemaining(assessment.deadline)} days remaining`}
                  </span>
                </div>
                
                {getDaysRemaining(assessment.deadline) <= 3 && getDaysRemaining(assessment.deadline) > 0 && (
                  <div className="flex items-center text-sm text-orange-600">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span>Deadline approaching soon!</span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-assessment-blue hover:bg-assessment-navy"
                  onClick={() => navigate(`/consultant/assessment/${assessment.id}`)}
                >
                  {assessment.status === 'not_started' ? 'Start Assessment' : 
                   assessment.status === 'in_progress' ? 'Continue Assessment' : 
                   'View Assessment'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 border rounded-lg">
          <h3 className="text-xl font-medium mb-2">No assessments assigned yet</h3>
          <p className="text-muted-foreground">When you are assigned an assessment, it will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default ConsultantDashboard;
