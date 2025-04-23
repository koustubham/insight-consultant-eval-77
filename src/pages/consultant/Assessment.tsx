
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { AlertTriangle, Clock, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Mock data structures
interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'essay';
  options?: string[];
  answer?: string;
}

interface Assessment {
  id: string;
  title: string;
  jobDescription: string;
  deadline: string;
  status: 'not_started' | 'in_progress' | 'completed';
  questions: Question[];
}

// Mock assessments data
const mockAssessments: Record<string, Assessment> = {
  '1': {
    id: '1',
    title: 'Full Stack Developer Assessment',
    jobDescription: 'Senior Full Stack Developer',
    deadline: '2025-05-10T23:59:59',
    status: 'not_started',
    questions: [
      {
        id: 'q1',
        text: 'Which of the following is not a feature of React.js?',
        type: 'multiple_choice',
        options: [
          'Virtual DOM',
          'One-way data binding',
          'Built-in state management',
          'Two-way data binding'
        ]
      },
      {
        id: 'q2',
        text: 'What is the purpose of Redux in a React application?',
        type: 'multiple_choice',
        options: [
          'To handle routing',
          'To manage global state',
          'To optimize rendering performance',
          'To connect to backend services'
        ]
      },
      {
        id: 'q3',
        text: 'Explain how you would design a scalable microservice architecture for a high-traffic e-commerce platform.',
        type: 'essay'
      },
      {
        id: 'q4',
        text: 'What is the difference between REST and GraphQL?',
        type: 'essay'
      },
      {
        id: 'q5',
        text: 'Which database would you choose for a real-time analytics dashboard and why?',
        type: 'essay'
      }
    ]
  },
  '2': {
    id: '2',
    title: 'React Developer Skills',
    jobDescription: 'React Frontend Developer',
    deadline: '2025-04-28T23:59:59',
    status: 'in_progress',
    questions: [
      {
        id: 'q1',
        text: 'What is a closure in JavaScript?',
        type: 'essay',
        answer: 'A closure is a function that has access to its outer function scope even after the outer function has returned.'
      },
      {
        id: 'q2',
        text: 'Which hook would you use to perform side effects in a functional component?',
        type: 'multiple_choice',
        options: [
          'useState',
          'useEffect',
          'useContext',
          'useReducer'
        ],
        answer: 'useEffect'
      },
      {
        id: 'q3',
        text: 'What is the purpose of keys in React lists?',
        type: 'multiple_choice',
        options: [
          'To provide CSS styling',
          'To enable event handling',
          'To help React identify which items have changed',
          'To define component hierarchy'
        ],
        answer: 'To help React identify which items have changed'
      },
      {
        id: 'q4',
        text: 'Explain how you would optimize a React application for performance.',
        type: 'essay'
      },
      {
        id: 'q5',
        text: 'What are the advantages of using TypeScript with React?',
        type: 'essay'
      }
    ]
  }
};

const AssessmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [failed, setFailed] = useState(false);
  const [requestReattempt, setRequestReattempt] = useState(false);
  const wasStarted = useRef(false);
  const viewOnly = new URLSearchParams(location.search).has("view");

  useEffect(() => {
    if (id && mockAssessments[id]) {
      const assessmentData = mockAssessments[id];
      setAssessment(assessmentData);
      const initialAnswers: Record<string, string> = {};
      assessmentData.questions.forEach((question) => {
        if (question.answer) {
          initialAnswers[question.id] = question.answer;
        }
      });
      setAnswers(initialAnswers);
    }
  }, [id]);

  // Fullscreen and anti-switch logic (only if not viewOnly)
  useEffect(() => {
    if (viewOnly) return; // Do not apply lock for view mode

    // Enter fullscreen on mount
    const enterFullScreen = () => {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen();
    };
    enterFullScreen();

    const handleBlur = () => {
      if (!wasStarted.current) return;
      // Only apply once assessment "started" in this session
      setFailed(true);
      document.exitFullscreen?.();
    };
    const handleVisibility = () => {
      // If page is hidden (tab switch), fail
      if (document.hidden && !failed) {
        setFailed(true);
        document.exitFullscreen?.();
      }
    };
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);
    // Clean up on unmount
    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.exitFullscreen?.();
    };
  }, [failed, viewOnly]);

  if (!assessment) {
    return <div className="flex justify-center items-center h-64">Loading assessment...</div>;
  }

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = assessment.questions.length;
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  const handleAnswerChange = (questionId: string, value: string) => {
    wasStarted.current = true; // Mark as started for focus detection after first answer
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast({
        title: 'Progress saved',
        description: 'Your answers have been saved successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to save',
        description: 'There was an error saving your progress.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (isManual = true) => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: isManual ? 'Assessment submitted' : 'Assessment failed',
        description: isManual
          ? 'Your assessment has been submitted successfully.'
          : 'Assessment failed due to loss of focus or switching screens.',
      });
      navigate('/consultant/dashboard');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to submit',
        description: 'There was an error submitting your assessment.',
      });
    } finally {
      setIsSaving(false);
      setIsSubmitDialogOpen(false);
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const navigateQuestion = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (direction === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Only allow submit if all questions answered and not failed, and not in view mode
  const isFullyAnswered = assessment.questions.every(q => answers[q.id]);
  const daysRemaining = getDaysRemaining(assessment.deadline);
  const isDeadlineApproaching = daysRemaining <= 3 && daysRemaining > 0;

  // If failed, show the failed view
  if (failed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
        <div className="max-w-md bg-white shadow-lg rounded-lg p-8 mt-8 flex flex-col items-center">
          <AlertTriangle className="h-10 w-10 text-red-500 mb-3" />
          <h2 className="text-2xl font-bold mb-2 text-red-600">Assessment Failed</h2>
          <p className="mb-4 text-center">
            Your assessment was closed because you switched tabs or apps.<br />
            Please raise a request to attempt again. This will be reviewed by the admin.
          </p>
          {!requestReattempt ? (
            <Button
              className="bg-assessment-blue hover:bg-assessment-navy mb-2"
              onClick={() => setRequestReattempt(true)}
            >
              Request Re-attempt
            </Button>
          ) : (
            <span className="text-green-600 font-medium">Request sent to admin!</span>
          )}
          <Button
            variant="outline"
            onClick={() => navigate('/consultant/dashboard')}
            className="mt-4"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // View mode (already completed) just disables answers
  return (
    <div className={`space-y-6 min-h-screen bg-soft-gray ${!viewOnly ? "fixed inset-0 z-40" : ""}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-assessment-blue">{assessment.title}</h1>
          <p className="text-muted-foreground">{assessment.jobDescription}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('/consultant/dashboard')}
        >
          Back to Dashboard
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-medium">Assessment Progress</h2>
            <div className="flex items-center mt-1">
              <Progress value={progress} className="h-2 flex-1 mr-2" />
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {answeredCount}/{totalQuestions} answered
              </span>
            </div>
          </div>
          <div className="flex items-center text-sm mt-2 sm:mt-0">
            <Clock className="h-4 w-4 mr-1" />
            <span>
              {daysRemaining <= 0
                ? "Deadline passed"
                : `${daysRemaining} days remaining`}
            </span>
          </div>
        </div>
        {isDeadlineApproaching && (
          <div className="flex items-center bg-orange-50 text-orange-700 p-3 rounded-md mb-4">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span>Deadline is approaching! Please complete your assessment soon.</span>
          </div>
        )}
      </div>
      <Card className="shadow">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            <span className="text-sm font-normal text-muted-foreground">
              {currentQuestion.type === 'multiple_choice' ? 'Multiple Choice' : 'Essay Question'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-lg font-medium">{currentQuestion.text}</div>
          {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              className="space-y-3"
              disabled={viewOnly}
            >
              {currentQuestion.options.map((option, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${i}`} disabled={viewOnly} />
                  <Label htmlFor={`option-${i}`} className="cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
          {currentQuestion.type === 'essay' && (
            <Textarea
              placeholder="Enter your answer here..."
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              className="min-h-[200px]"
              disabled={viewOnly}
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => navigateQuestion('prev')}
              disabled={currentQuestionIndex === 0 || viewOnly}
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => navigateQuestion('next')}
              disabled={currentQuestionIndex === totalQuestions - 1 || viewOnly}
            >
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          {!viewOnly && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="mr-1 h-4 w-4" /> Save Progress
              </Button>
              <Button
                className="bg-assessment-blue hover:bg-assessment-navy"
                onClick={() => setIsSubmitDialogOpen(true)}
                disabled={isSaving || !isFullyAnswered}
              >
                Submit Assessment
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
      {/* AlertDialog for submit confirmation */}
      <AlertDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit this assessment?</AlertDialogTitle>
            <AlertDialogDescription>
              You're about to submit your assessment. Once submitted, you won't be able to make any further changes.
              Make sure you've reviewed all your answers before submitting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSaving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleSubmit(true)}
              disabled={isSaving}
              className="bg-assessment-blue hover:bg-assessment-navy"
            >
              {isSaving ? 'Submitting...' : 'Submit Assessment'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AssessmentPage;
