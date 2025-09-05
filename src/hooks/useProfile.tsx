import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  company_name: string | null;
  phone: string | null;
  role: 'admin' | 'agent' | 'customer';
  created_at: string;
  updated_at: string;
  // Optional fields present after SQL setup
  permissions?: Record<string, any> | null;
  is_active?: boolean | null;
}

export function useProfile() {
  const auth = useAuth();
  const user = auth?.user;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      console.log('useProfile: No user, clearing profile');
      setProfile(null);
      setLoading(false);
      return;
    }

    console.log('useProfile: User found, fetching profile for:', user.id);
    fetchProfile();
  }, [user?.id]);

  const fetchProfile = useCallback(async () => {
    try {
      console.log('useProfile: Starting profile fetch for user:', user?.id);
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      console.log('useProfile: Profile fetch result:', { data: !!data, error: !!error, errorMessage: error?.message });

      if (error) {
        // If profile doesn't exist, try to create one
        if (error.code === 'PGRST116') { // No rows returned
          console.log('useProfile: Profile not found, creating one');
          
          try {
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert({
                id: user?.id,
                email: user?.email,
                first_name: user?.user_metadata?.first_name || null,
                last_name: user?.user_metadata?.last_name || null,
                role: 'customer' // Default role
              })
              .select()
              .single();

            if (createError) {
              console.error('useProfile: Error creating profile:', createError);
              
              // If we can't create a profile due to RLS, create a minimal profile object
              if (createError.code === '42501') { // Insufficient privilege
                console.log('useProfile: Creating minimal profile object due to RLS restrictions');
                const minimalProfile: Profile = {
                  id: user?.id || '',
                  email: user?.email || '',
                  first_name: user?.user_metadata?.first_name || null,
                  last_name: user?.user_metadata?.last_name || null,
                  avatar_url: null,
                  company_name: null,
                  phone: null,
                  role: 'customer',
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  permissions: null,
                  is_active: true,
                };
                setProfile(minimalProfile);
                return;
              }
              
              throw createError;
            }

            console.log('useProfile: Profile created successfully:', newProfile);
            setProfile(newProfile as Profile);
            return;
          } catch (createErr) {
            console.error('useProfile: Error during profile creation:', createErr);
            // Fall back to minimal profile
            const minimalProfile: Profile = {
              id: user?.id || '',
              email: user?.email || '',
              first_name: user?.user_metadata?.first_name || null,
              last_name: user?.user_metadata?.last_name || null,
              avatar_url: null,
              company_name: null,
              phone: null,
              role: 'customer',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              permissions: null,
              is_active: true,
            };
            setProfile(minimalProfile);
            return;
          }
        }
        throw error;
      }
      
      setProfile(data as Profile);
    } catch (err: unknown) {
      console.error('useProfile: Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [user?.id, user?.email, user?.user_metadata]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No user found' };

    // Validate and sanitize updates
    const allowedFields = ['first_name', 'last_name', 'avatar_url', 'company_name', 'phone', 'permissions'] as const;
    const sanitizedUpdates = Object.fromEntries(
      Object.entries(updates).filter(([key]) => (allowedFields as readonly string[]).includes(key))
    );

    try {
      const { error } = await supabase
        .from('profiles')
        .update(sanitizedUpdates)
        .eq('id', user.id);

      if (error) throw error;
      
      await fetchProfile(); // Refresh profile data
      return { error: null };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  return {
    profile,
    isLoading: loading,
    error,
    updateProfile,
    refetch: fetchProfile,
  };
}