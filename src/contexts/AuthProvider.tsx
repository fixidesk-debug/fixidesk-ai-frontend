import React, { useState, useEffect, useCallback } from 'react';
import { authApi } from '../lib/api';
import { useToast } from '../hooks/use-toast';
import { AuthContext } from './auth.types';
import type { User, ApiError, AuthContextType } from './auth.types';

// Add missing type declarations
declare global {
  interface Window {
    env: {
      VITE_API_URL?: string;
    };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      authApi.me()
        .then(response => setUser(response.data))
        .catch(() => localStorage.removeItem('auth_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      const { token, user } = response.data;
      localStorage.setItem('auth_token', token);
      setUser(user);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast({
        title: "Login failed",
        description: apiError.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const register = useCallback(async (data: { name: string; email: string; password: string; company: string }) => {
    try {
      const response = await authApi.register(data);
      const { token, user } = response.data;
      localStorage.setItem('auth_token', token);
      setUser(user);
      toast({
        title: "Account created!",
        description: "Welcome to FixiDesk. Your account has been created successfully.",
      });
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast({
        title: "Registration failed",
        description: apiError.response?.data?.message || "Failed to create account",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  }, [toast]);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
