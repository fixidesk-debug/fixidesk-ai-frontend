import { createContext } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  // Add other user properties as needed
}

export interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; company: string }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
