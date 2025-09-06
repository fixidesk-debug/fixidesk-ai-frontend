import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Camera, Shield, Headphones, UserCheck, Upload, X } from 'lucide-react';

const profileSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company_name: z.string().optional(),
  email: z.string().email('Please enter a valid email address').optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export function ProfileSettings() {
  const { user } = useAuth();
  const { profile, updateProfile, isLoading } = useProfile();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      phone: profile?.phone || '',
      company_name: profile?.company_name || '',
      email: profile?.email || '',
    },
  });

  // Reset form when profile loads
  useState(() => {
    if (profile) {
      reset({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
        company_name: profile.company_name || '',
        email: profile.email || '',
      });
      setAvatarUrl(profile.avatar_url);
    }
  });

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploadingAvatar(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const newAvatarUrl = data.publicUrl;
      setAvatarUrl(newAvatarUrl);

      await updateProfile({ avatar_url: newAvatarUrl });
      
      toast({
        title: 'Profile picture updated',
        description: 'Your profile picture has been successfully updated.',
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your profile picture.',
        variant: 'destructive',
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleRemoveAvatar = async () => {
    if (!user) return;
    
    try {
      setAvatarUrl(null);
      await updateProfile({ avatar_url: null });
      
      toast({
        title: 'Profile picture removed',
        description: 'Your profile picture has been removed.',
      });
    } catch (error) {
      toast({
        title: 'Remove failed',
        description: 'There was an error removing your profile picture.',
        variant: 'destructive',
      });
    }
  };

  const onSubmit = async (data: ProfileForm) => {
    if (!profile) return;
    
    setIsUpdating(true);
    try {
      await updateProfile(data);
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'There was an error updating your profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'agent': return <Headphones className="h-4 w-4" />;
      case 'customer': return <UserCheck className="h-4 w-4" />;
      default: return <UserCheck className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'agent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'customer': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Unable to load profile information.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information and account details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarUrl || profile.avatar_url || ''} />
                <AvatarFallback className="text-lg">
                  {getInitials(profile.first_name, profile.last_name)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 rounded-full p-0"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingAvatar}
                >
                  {isUploadingAvatar ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Camera className="h-3 w-3" />
                  )}
                </Button>
                {(avatarUrl || profile.avatar_url) && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 rounded-full p-0 bg-red-50 hover:bg-red-100"
                    onClick={handleRemoveAvatar}
                  >
                    <X className="h-3 w-3 text-red-600" />
                  </Button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">
                  {profile.first_name} {profile.last_name}
                </h3>
                <Badge variant="outline" className={getRoleColor(profile.role)}>
                  {getRoleIcon(profile.role)}
                  <span className="ml-1 capitalize">{profile.role}</span>
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{profile.phone || 'No phone number'}</p>
              {profile.company_name && (
                <p className="text-sm text-muted-foreground">
                  {profile.company_name}
                </p>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  {...register('first_name')}
                  placeholder="Enter your first name"
                />
                {errors.first_name && (
                  <p className="text-sm text-destructive">{errors.first_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  {...register('last_name')}
                  placeholder="Enter your last name"
                />
                {errors.last_name && (
                  <p className="text-sm text-destructive">{errors.last_name.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                {...register('company_name')}
                placeholder="Enter your company name"
              />
              {errors.company_name && (
                <p className="text-sm text-destructive">{errors.company_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter your email address"
              />
              <p className="text-xs text-muted-foreground">
                Optional - used for notifications and account recovery.
              </p>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
                disabled={!isDirty || isUpdating}
              >
                Reset Changes
              </Button>
              <Button
                type="submit"
                disabled={!isDirty || isUpdating}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            View your account details and membership information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Account Created</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Last Updated</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(profile.updated_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">User ID</Label>
              <p className="text-sm text-muted-foreground mt-1 font-mono">
                {profile.id.slice(0, 8)}...
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Account Status</Label>
              <p className="text-sm text-muted-foreground mt-1">
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  Active
                </Badge>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
