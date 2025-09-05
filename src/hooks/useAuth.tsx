import { useContext } from 'react';
import { AuthContext, type AuthContextType } from '@/contexts/auth-context';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  return context;
}