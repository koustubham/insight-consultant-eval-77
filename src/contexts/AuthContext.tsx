
import React, { createContext, useState, useContext, useEffect } from 'react';

export type UserRole = 'consultant' | 'admin' | 'hr';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is already logged in from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // This is a mock login function - in a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login with mock data
      if (email === 'admin@example.com' && password === 'password') {
        const mockAdminUser = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin' as UserRole
        };
        
        localStorage.setItem('user', JSON.stringify(mockAdminUser));
        setUser(mockAdminUser);
      } else if (email === 'consultant@example.com' && password === 'password') {
        const mockConsultantUser = {
          id: '2',
          name: 'Consultant User',
          email: 'consultant@example.com',
          role: 'consultant' as UserRole
        };
        
        localStorage.setItem('user', JSON.stringify(mockConsultantUser));
        setUser(mockConsultantUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
