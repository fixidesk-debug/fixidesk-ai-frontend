import { createContext } from 'react';
import { User, Session } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string, company?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string, totpCode?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (token: string, password: string) => Promise<{ error: Error | null }>;
  acceptInvitation: (token: string) => Promise<{ error: Error | null }>;
  enable2FA: () => Promise<{ secret: string; qrCode: string; error: Error | null }>;
  verify2FA: (code: string) => Promise<{ error: Error | null }>;
  disable2FA: (code: string) => Promise<{ error: Error | null }>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => ({ error: null }),
  resetPassword: async () => ({ error: null }),
  updatePassword: async () => ({ error: null }),
  acceptInvitation: async () => ({ error: null }),
  enable2FA: async () => ({ secret: '', qrCode: '', error: null }),
  verify2FA: async () => ({ error: null }),
  disable2FA: async () => ({ error: null }),
  isAuthenticated: false,
});
