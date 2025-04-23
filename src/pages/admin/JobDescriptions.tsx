
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock job description data
const mockJobDescriptions = [
  { 
    id: '1', 
    title: 'Senior Full Stack Developer', 
    department: 'Engineering', 
    status: 'active',
    requiredSkills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    assessmentsCount: 12
  },
  { 
    id: '2', 
    title: 'React Frontend Developer', 
    department: 'Engineering', 
    status: 'active',
    requiredSkills: ['React', 'JavaScript', 'CSS', 'UI/UX'],
    assessmentsCount: 8
  },
  { 
    id: '3', 
    title: 'Data Scientist', 
    department: 'Data', 
    status: 'active',
    requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
    assessmentsCount: 5
  },
  { 
    id: '4', 
    title: 'DevOps Engineer', 
    department: 'Infrastructure', 
    status: 'active',
    requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    assessmentsCount: 7
  },
  { 
    id: '5', 
    title: 'Technical Project Manager', 
    department: 'Project Management', 
    status: 'inactive',
    requiredSkills: ['Agile', 'Scrum', 'JIRA', 'Technical Planning'],
    assessmentsCount: 3
  },
];

const JobDescriptions: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { toast } = useToast();
  
  const filteredJobDescriptions = mockJobDescriptions.filter((job) => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDeleteJobDescription = (jobId: string) => {
    toast({
      title: 'Job description deleted',
      description: 'In a real application, this would delete the job description.',
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-assessment-blue">Job Descriptions</h1>
          <p className="text-muted-foreground">Manage job descriptions and required skills</p>
        </div>
        <Button className="bg-assessment-blue hover:bg-assessment-navy">
          <Plus className="mr-2 h-4 w-4" /> Add New Job
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Job Descriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search job descriptions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Required Skills</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assessments</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobDescriptions.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {job.requiredSkills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          job.status === 'active' 
                            ? 'border-green-500 text-green-500' 
                            : 'border-gray-500 text-gray-500'
                        }
                      >
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {job.assessmentsCount}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteJobDescription(job.id)}
                      >
                        <Trash2 className="h-4 w-4" />
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

export default JobDescriptions;
