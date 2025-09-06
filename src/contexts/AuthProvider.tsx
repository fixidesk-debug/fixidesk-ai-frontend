import { useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AuthContext } from './auth-context';
import { TOTP, Secret } from 'otpauth';
import QRCode from 'qrcode';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('AuthProvider: Auth state change:', { event, session: !!session, userId: session?.user?.id });
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('AuthProvider: Initial session:', { session: !!session, userId: session?.user?.id });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string, company?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          company_name: company,
        }
      }
    });

    if (!error && data.user) {
      // Create profile immediately since email verification is disabled
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email || email,
          first_name: firstName || '',
          last_name: lastName || '',
          company_name: company || '',
          role: 'customer',
          permissions: {},
          is_active: true,
          two_factor_enabled: false
        });

      if (profileError) {
        console.error('Profile creation error during signup:', profileError);
        // Don't fail the signup if profile creation fails
        // The trigger should handle this, but we'll log it
      }

      toast({
        title: "Account created!",
        description: "Welcome to FixiDesk! You can now access your dashboard.",
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string, totpCode?: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return { error };
      }

      if (data.user) {
        // Check if profile exists, create if missing
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError && profileError.code === 'PGRST116') {
          // Profile doesn't exist, create it with all required fields
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email: data.user.email || email,
              first_name: data.user.user_metadata?.first_name || '',
              last_name: data.user.user_metadata?.last_name || '',
              company_name: data.user.user_metadata?.company_name || '',
              role: 'customer',
              permissions: {},
              is_active: true,
              two_factor_enabled: false
            });

          if (insertError) {
            console.error('Profile creation error:', insertError);
            // Don't fail the login if profile creation fails
            // The trigger should handle this, but we'll log it
          }
        } else if (profileError) {
          console.error('Profile fetch error:', profileError);
          // Don't fail the login for profile fetch errors
        }

        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      }

      return { error: null };
    } catch (err) {
      console.error('Unexpected login error:', err);
      return { error: new Error('Login failed. Please try again.') };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (!error) {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    }

    return { error };
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (!error) {
      toast({
        title: "Password reset sent",
        description: "Check your email for password reset instructions.",
      });
    }

    return { error };
  };

  const updatePassword = async (token: string, password: string) => {
    const { error } = await supabase.auth.updateUser({ password });

    if (!error) {
      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      });
    }

    return { error };
  };

  const acceptInvitation = async (token: string) => {
    if (!user) {
      return { error: new Error('User must be logged in to accept invitation') };
    }

    const { error } = await supabase.rpc('accept_invitation', {
      p_token: token,
      p_user_id: user.id
    });

    if (!error) {
      toast({
        title: "Invitation accepted",
        description: "Welcome to the team!",
      });
      // Refresh the page to update user role
      window.location.reload();
    }

    return { error };
  };

  const enable2FA = async () => {
    if (!user) {
      return { secret: '', qrCode: '', error: new Error('User must be logged in') };
    }

    try {
      // Generate TOTP secret
      const secret = new Secret({ size: 20 });
      const totp = new TOTP({
        issuer: 'FixiDesk',
        label: user.email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: secret,
      });

      // Generate QR code
      const qrCode = await QRCode.toDataURL(totp.toString());

      // Store secret in database (not yet enabled)
      const { error } = await supabase
        .from('user_two_factor')
        .upsert({
          user_id: user.id,
          method: 'totp',
          secret: secret.base32,
          is_enabled: false
        });

      if (error) {
        return { secret: '', qrCode: '', error };
      }

      return { secret: secret.base32, qrCode, error: null };
    } catch (error) {
      return { secret: '', qrCode: '', error: error as Error };
    }
  };

  const verify2FA = async (code: string) => {
    if (!user) {
      return { error: new Error('User must be logged in') };
    }

    try {
      // Get user's 2FA secret
      const { data: twoFactor, error: fetchError } = await supabase
        .from('user_two_factor')
        .select('secret')
        .eq('user_id', user.id)
        .eq('method', 'totp')
        .single();

      if (fetchError || !twoFactor) {
        return { error: new Error('2FA not set up') };
      }

      // Verify TOTP code
      const totp = new TOTP({
        issuer: 'FixiDesk',
        label: user.email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: Secret.fromBase32(twoFactor.secret),
      });

      const delta = totp.validate({ token: code, window: 1 });
      
      if (delta === null) {
        return { error: new Error('Invalid verification code') };
      }

      // Enable 2FA and update profile
      const { error: updateError } = await supabase
        .from('user_two_factor')
        .update({ 
          is_enabled: true, 
          verified_at: new Date().toISOString() 
        })
        .eq('user_id', user.id)
        .eq('method', 'totp');

      if (updateError) {
        return { error: updateError };
      }

      // Update profile
      await supabase
        .from('profiles')
        .update({ two_factor_enabled: true })
        .eq('id', user.id);

      toast({
        title: "2FA enabled",
        description: "Two-factor authentication has been enabled for your account.",
      });

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const disable2FA = async (code: string) => {
    if (!user) {
      return { error: new Error('User must be logged in') };
    }

    try {
      // Verify current code before disabling
      const { error: verifyError } = await verify2FA(code);
      if (verifyError) {
        return { error: new Error('Invalid verification code') };
      }

      // Disable 2FA
      const { error } = await supabase
        .from('user_two_factor')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        return { error };
      }

      // Update profile
      await supabase
        .from('profiles')
        .update({ two_factor_enabled: false })
        .eq('id', user.id);

      toast({
        title: "2FA disabled",
        description: "Two-factor authentication has been disabled.",
      });

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signOut,
      resetPassword,
      updatePassword,
      acceptInvitation,
      enable2FA,
      verify2FA,
      disable2FA,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
