
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
  Trash2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock user data
const mockUsers = [
  { id: '1', name: 'John Smith', email: 'john.smith@example.com', role: 'consultant', skills: ['React', 'Node.js', 'TypeScript'] },
  { id: '2', name: 'Emily Johnson', email: 'emily.johnson@example.com', role: 'consultant', skills: ['Python', 'Data Analysis', 'Machine Learning'] },
  { id: '3', name: 'Michael Chen', email: 'michael.chen@example.com', role: 'consultant', skills: ['Java', 'Spring Boot', 'AWS'] },
  { id: '4', name: 'Sarah Williams', email: 'sarah.williams@example.com', role: 'consultant', skills: ['React', 'Angular', 'UI/UX'] },
  { id: '5', name: 'Robert Taylor', email: 'robert.taylor@example.com', role: 'admin', skills: [] },
  { id: '6', name: 'Jennifer Brown', email: 'jennifer.brown@example.com', role: 'hr', skills: [] },
];

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { toast } = useToast();
  
  const filteredUsers = mockUsers.filter((user) => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDeleteUser = (userId: string) => {
    toast({
      title: 'User deleted',
      description: 'In a real application, this would delete the user.',
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-assessment-blue">User Management</h1>
          <p className="text-muted-foreground">Add, edit, and manage users</p>
        </div>
        <Button className="bg-assessment-blue hover:bg-assessment-navy">
          <Plus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.role === 'admin' 
                            ? 'border-blue-500 text-blue-500' 
                            : user.role === 'hr'
                            ? 'border-purple-500 text-purple-500'
                            : 'border-green-500 text-green-500'
                        }
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.skills.length > 0 ? (
                          user.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted-foreground text-sm">N/A</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteUser(user.id)}
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

export default UserManagement;
