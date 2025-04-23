import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Eye
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const mockAssessmentResults = [
  { 
    id: '1', 
    consultant: 'John Smith', 
    title: 'Full Stack Developer Assessment',
    jobDescription: 'Senior Full Stack Developer',
    submittedAt: '2025-04-20T14:30:00',
    status: 'pending_review',
    score: { accuracy: 90, relevance: 85, depth: 88, communication: 92, overall: 89 }
  },
  { 
    id: '2', 
    consultant: 'Emily Johnson', 
    title: 'Data Science Assessment',
    jobDescription: 'Data Scientist',
    submittedAt: '2025-04-19T10:15:00',
    status: 'pending_review',
    score: { accuracy: 95, relevance: 90, depth: 92, communication: 88, overall: 91 }
  },
  { 
    id: '3', 
    consultant: 'Michael Chen', 
    title: 'DevOps Engineer Assessment',
    jobDescription: 'DevOps Engineer',
    submittedAt: '2025-04-18T16:45:00',
    status: 'approved',
    score: { accuracy: 85, relevance: 82, depth: 80, communication: 78, overall: 81 }
  },
  { 
    id: '4', 
    consultant: 'Sarah Williams', 
    title: 'React Developer Assessment',
    jobDescription: 'React Frontend Developer',
    submittedAt: '2025-04-17T11:30:00',
    status: 'rejected',
    score: { accuracy: 65, relevance: 70, depth: 60, communication: 72, overall: 67 }
  },
  { 
    id: '5', 
    consultant: 'Robert Taylor', 
    title: 'Java Backend Developer Assessment',
    jobDescription: 'Java Backend Developer',
    submittedAt: '2025-04-16T09:20:00',
    status: 'approved',
    score: { accuracy: 88, relevance: 85, depth: 90, communication: 82, overall: 86 }
  },
];

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending_review', label: 'Pending Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const AssessmentResults: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const { toast } = useToast();
  
  const filteredResults = mockAssessmentResults.filter((result) => {
    const consultantMatch = result.consultant.toLowerCase().includes(searchQuery.toLowerCase());
    const titleMatch = result.title.toLowerCase().includes(searchQuery.toLowerCase());
    const jobMatch = result.jobDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = statusFilter === 'all' || result.status === statusFilter;
    
    return (consultantMatch || titleMatch || jobMatch) && statusMatch;
  });
  
  const handleApproveAssessment = (assessmentId: string) => {
    toast({
      title: 'Assessment approved',
      description: 'The assessment has been approved successfully.',
    });
  };
  
  const handleRejectAssessment = (assessmentId: string) => {
    toast({
      title: 'Assessment rejected',
      description: 'The assessment has been rejected.',
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getProgressColorClass = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      case 'pending_review':
        return <Badge className="bg-yellow-500">Pending Review</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-assessment-blue">Assessment Results</h1>
        <p className="text-muted-foreground">Review and analyze consultant assessment performance</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Assessment Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by consultant or job..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Consultant</TableHead>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Overall Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.consultant}</TableCell>
                    <TableCell>
                      <div className="font-medium">{result.title}</div>
                      <div className="text-sm text-muted-foreground">{result.jobDescription}</div>
                    </TableCell>
                    <TableCell>
                      {formatDate(result.submittedAt)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Score</span>
                          <span className={getScoreColor(result.score.overall)}>
                            {result.score.overall}%
                          </span>
                        </div>
                        <div className={`relative h-2 w-full overflow-hidden rounded-full bg-secondary`}>
                          <Progress 
                            value={result.score.overall} 
                            className="h-2"
                            style={{
                              backgroundColor: "transparent",
                            }}
                          />
                          <div 
                            className={`absolute top-0 left-0 h-full ${getProgressColorClass(result.score.overall)}`} 
                            style={{ 
                              width: `${result.score.overall}%`, 
                              transition: "width 0.3s ease-in-out" 
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(result.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {result.status === 'pending_review' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              onClick={() => handleApproveAssessment(result.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleRejectAssessment(result.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentResults;
