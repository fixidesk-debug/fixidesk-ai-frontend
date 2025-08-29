import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}