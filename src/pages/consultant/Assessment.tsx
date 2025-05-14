
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { AppDispatch } from '@/store';
import { fetchQuestion } from '@/store/assessment/actions';

const AssessmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  
  const [questionCount, setQuestionCount] = useState(0);
  const [answer, setAnswer] = useState("");
  
  const { latestResponse, loading, error } = useSelector((state: RootState) => state.assessment);
  
  // Extract question from response
  const extractQuestionFromResponse = (response: string | null): string => {
    if (!response) return "Loading question...";
    const match = response.match(/<question>([\s\S]*?)<\/question>/);
    return match?.[1]?.trim() || "Please answer the following question:";
  };
  
  const currentQuestion = extractQuestionFromResponse(latestResponse);
  
  // Submit answer and get next question
  const handleNext = () => {
    if (!answer.trim()) {
      toast({
        title: "Error",
        description: "Please provide an answer before continuing",
        variant: "destructive"
      });
      return;
    }
    
    dispatch(fetchQuestion({ content: answer }));
    setQuestionCount(prev => prev + 1);
    setAnswer("");
  };
  
  // If completed all questions
  if (questionCount >= 5) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Assessment Completed</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-lg mb-4">Thank you for completing your assessment!</p>
            <p>Your responses have been submitted successfully.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              className="bg-assessment-blue hover:bg-assessment-navy"
              onClick={() => navigate('/consultant/dashboard')}
            >
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Assessment Progress</span>
            <span className="text-sm font-normal">
              Question {questionCount + 1} of 5
            </span>
          </CardTitle>
          <div className="mt-4">
            <Progress value={(questionCount / 5) * 100} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4 py-6">
          {error ? (
            <div className="text-center p-6">
              <p className="text-red-500 font-medium">An error occurred</p>
              <p className="text-sm mt-2">{error}</p>
              <Button 
                className="mt-4"
                onClick={() => navigate('/consultant/dashboard')}
              >
                Return to Dashboard
              </Button>
            </div>
          ) : (
            <>
              <div className="text-lg font-medium mb-4">
                {loading ? "Loading question..." : currentQuestion}
              </div>
              <Textarea
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="min-h-[200px] resize-y"
                disabled={loading}
              />
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/consultant/dashboard')}
          >
            Cancel
          </Button>
          <Button 
            className="bg-assessment-blue hover:bg-assessment-navy"
            onClick={handleNext}
            disabled={loading || !answer.trim()}
          >
            {questionCount === 4 ? "Finish" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AssessmentPage;
