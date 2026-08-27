import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  level: number;
  total_sessions: number;
  total_focus_minutes: number;
  current_streak: number;
  total_points: number;
  experience_points: number;
  created_at?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  profile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logOut: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_PROFILE: UserProfile = {
  id: '1',
  username: 'focususer',
  email: 'user@example.com',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=focususer',
  bio: 'Passionate about productivity and focus',
  location: 'San Francisco, CA',
  level: 5,
  total_sessions: 42,
  total_focus_minutes: 1260,
  current_streak: 7,
  total_points: 2540,
  experience_points: 540,
  created_at: '2024-01-15',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedProfile = localStorage.getItem('userProfile');
    
    if (token && savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const userProfile: UserProfile = {
        ...DEFAULT_PROFILE,
        email,
      };
      
      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      
      setProfile(userProfile);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const userProfile: UserProfile = {
        ...DEFAULT_PROFILE,
        username,
        email,
        id: Math.random().toString(36).substr(2, 9),
      };
      
      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      
      setProfile(userProfile);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userProfile');
    setProfile(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (profile) {
      const updatedProfile = { ...profile, ...updates };
      setProfile(updatedProfile);
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        profile,
        loading,
        login,
        signup,
        logOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
