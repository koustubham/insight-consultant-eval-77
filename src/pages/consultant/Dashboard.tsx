
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertTriangle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { resetAssessment, fetchQuestion } from '@/store/assessment/actions';
import { AppDispatch } from '@/store';

// Single assessment data
const assessmentData = {
  id: '1',
  title: 'Python Data Engineer ANR',
  jobDescription: 'Python Data Engineer',
  deadline: '2025-05-14T23:59:59',
  status: 'not_started',
  questions: { total: 5, answered: 0 }
};

const ConsultantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const getDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
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
  
  const getProgressPercentage = (answered: number, total: number) => {
    return Math.round((answered / total) * 100);
  };

  const handleStartAssessment = () => {
    // Reset assessment state
    dispatch(resetAssessment());
    // Initialize assessment with first request
    dispatch(fetchQuestion({ 
      content: `Skill ID is ${assessmentData.id} and project name is ${assessmentData.title}` 
    }) as any);
    // Navigate to assessment page
    navigate(`/consultant/assessment/${assessmentData.id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-assessment-blue">Your Assessments</h1>
        <p className="text-muted-foreground">View and complete your assigned assessments</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{assessmentData.title}</CardTitle>
              {getStatusBadge(assessmentData.status, assessmentData.deadline)}
            </div>
            <CardDescription>
              {assessmentData.jobDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{assessmentData.questions.answered}/{assessmentData.questions.total} questions</span>
              </div>
              <Progress 
                value={getProgressPercentage(assessmentData.questions.answered, assessmentData.questions.total)}
                className="h-2"
              />
            </div>
            
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                {getDaysRemaining(assessmentData.deadline) <= 0 
                  ? "Deadline passed" 
                  : `${getDaysRemaining(assessmentData.deadline)} days remaining`}
              </span>
            </div>
            
            {getDaysRemaining(assessmentData.deadline) <= 3 && getDaysRemaining(assessmentData.deadline) > 0 && (
              <div className="flex items-center text-sm text-orange-600">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span>Deadline approaching soon!</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-assessment-blue hover:bg-assessment-navy"
              onClick={handleStartAssessment}
            >
              Start Assessment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ConsultantDashboard;
