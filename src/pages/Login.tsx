
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      
      // Check admin credentials
      if (email === 'admin@example.com') {
        navigate('/admin/dashboard');
      } else {
        navigate('/consultant/dashboard');
      }
      
      toast({
        title: 'Login successful',
        description: 'Welcome to AI Assessment platform',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: 'Invalid email or password',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'admin' | 'consultant') => {
    setIsLoading(true);
    
    try {
      if (role === 'admin') {
        await login('admin@example.com', 'password');
        navigate('/admin/dashboard');
      } else {
        await login('consultant@example.com', 'password');
        navigate('/consultant/dashboard');
      }
      
      toast({
        title: 'Demo login successful',
        description: `Logged in as ${role}`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-assessment-gray">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-assessment-blue">
            AI Assessment Platform
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-assessment-blue hover:bg-assessment-navy" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            For demo purposes, you can use the quick login options below:
          </div>
          <div className="flex space-x-4 w-full">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => handleDemoLogin('admin')}
              disabled={isLoading}
            >
              Admin Demo
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => handleDemoLogin('consultant')}
              disabled={isLoading}
            >
              Consultant Demo
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
