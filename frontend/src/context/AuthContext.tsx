import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Police Commissioner' | 'Police Officer' | 'Crime Analyst';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing token
    const token = localStorage.getItem('forensight_token');
    const storedUser = localStorage.getItem('forensight_user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('forensight_token');
        localStorage.removeItem('forensight_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('forensight_token', token);
    localStorage.setItem('forensight_user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('forensight_token');
    localStorage.removeItem('forensight_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-background text-primary">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
