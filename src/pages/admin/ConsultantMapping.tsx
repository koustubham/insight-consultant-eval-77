
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  User, 
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock consultants data
const mockConsultants = [
  { 
    id: '1', 
    name: 'John Smith', 
    email: 'john.smith@example.com', 
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    skillMatch: 92,
    jobDescriptions: ['Senior Full Stack Developer']
  },
  { 
    id: '2', 
    name: 'Emily Johnson', 
    email: 'emily.johnson@example.com', 
    skills: ['Python', 'Data Analysis', 'Machine Learning', 'SQL', 'Statistics'],
    skillMatch: 85,
    jobDescriptions: ['Data Scientist']
  },
  { 
    id: '3', 
    name: 'Michael Chen', 
    email: 'michael.chen@example.com', 
    skills: ['Java', 'Spring Boot', 'AWS', 'Microservices', 'Docker'],
    skillMatch: 75,
    jobDescriptions: []
  },
  { 
    id: '4', 
    name: 'Sarah Williams', 
    email: 'sarah.williams@example.com', 
    skills: ['React', 'Angular', 'UI/UX', 'CSS', 'JavaScript'],
    skillMatch: 88,
    jobDescriptions: ['React Frontend Developer']
  },
];

// Mock job descriptions for filtering
const mockJobOptions = [
  { value: 'all', label: 'All Jobs' },
  { value: 'Senior Full Stack Developer', label: 'Senior Full Stack Developer' },
  { value: 'React Frontend Developer', label: 'React Frontend Developer' },
  { value: 'Data Scientist', label: 'Data Scientist' },
  { value: 'DevOps Engineer', label: 'DevOps Engineer' },
  { value: 'Technical Project Manager', label: 'Technical Project Manager' },
];

const ConsultantMapping: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedJob, setSelectedJob] = React.useState('all');
  const { toast } = useToast();
  
  const filteredConsultants = mockConsultants.filter((consultant) => {
    const nameMatch = consultant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = consultant.email.toLowerCase().includes(searchQuery.toLowerCase());
    const jobMatch = selectedJob === 'all' || consultant.jobDescriptions.includes(selectedJob);
    
    return (nameMatch || emailMatch) && jobMatch;
  });
  
  const handleMapConsultant = (consultantId: string) => {
    toast({
      title: 'Consultant mapped',
      description: 'Consultant has been mapped to the selected job description.',
    });
  };
  
  const getMatchBadgeColor = (matchPercentage: number) => {
    if (matchPercentage >= 90) return 'bg-green-100 text-green-800';
    if (matchPercentage >= 75) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-assessment-blue">Consultant Mapping</h1>
        <p className="text-muted-foreground">Map consultants to job descriptions based on skills</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>AI-Assisted Mapping</CardTitle>
          <CardDescription>
            Our AI analyzes consultant profiles and skill sets to suggest the best matches for each job description.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search consultants..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={selectedJob}
              onValueChange={setSelectedJob}
            >
              <SelectTrigger className="w-full sm:w-[250px]">
                <SelectValue placeholder="Select Job Description" />
              </SelectTrigger>
              <SelectContent>
                {mockJobOptions.map((option) => (
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
                  <TableHead>Skills</TableHead>
                  <TableHead>Skill Match</TableHead>
                  <TableHead>Current Assignments</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConsultants.map((consultant) => (
                  <TableRow key={consultant.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-assessment-blue flex items-center justify-center text-white">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{consultant.name}</div>
                          <div className="text-sm text-muted-foreground">{consultant.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {consultant.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`text-sm px-2 py-1 rounded ${getMatchBadgeColor(consultant.skillMatch)}`}>
                        {consultant.skillMatch}% Match
                      </div>
                    </TableCell>
                    <TableCell>
                      {consultant.jobDescriptions.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {consultant.jobDescriptions.map((job, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {job}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">None</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        className="bg-assessment-blue hover:bg-assessment-navy"
                        onClick={() => handleMapConsultant(consultant.id)}
                        disabled={selectedJob === 'all'}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Assign
                      </Button>
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

export default ConsultantMapping;
