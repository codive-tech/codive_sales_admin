import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager';
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTO_LOGOUT_TIME = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    const loginTime = localStorage.getItem('loginTime');

    if (storedUser && loginTime) {
      const timeElapsed = Date.now() - Number(loginTime);
      if (timeElapsed < AUTO_LOGOUT_TIME) {
        setUser(JSON.parse(storedUser));
      } else {
        handleLogout();
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let logoutTimer: number;

    if (user) {
      logoutTimer = window.setTimeout(handleLogout, AUTO_LOGOUT_TIME);
    }

    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('loginTime');
    navigate('/login');
  };

  const login = async ({ email, password }: LoginData) => {
    try {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Accept any valid email/password combination
      if (email && password) {
        const user: User = {
          id: crypto.randomUUID(),
          email,
          name: email.split('@')[0],
          role: 'admin'
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('loginTime', Date.now().toString());
        navigate('/');
      } else {
        throw new Error('Email and password are required');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would call your API to send a reset email
    console.log('Password reset requested for:', email);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout: handleLogout, 
      forgotPassword,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}