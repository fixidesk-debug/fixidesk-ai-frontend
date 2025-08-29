import { createContext } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar?: string;
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
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; company: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
