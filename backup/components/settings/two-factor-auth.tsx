import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Smartphone, Key, Copy, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export function TwoFactorAuth() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const { toast } = useToast();
  const { user, enable2FA, verify2FA, disable2FA } = useAuth();

  useEffect(() => {
    checkTwoFactorStatus();
  }, [user]);

  const checkTwoFactorStatus = async () => {
    if (!user) return;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('two_factor_enabled')
        .eq('id', user.id)
        .single();

      setIs2FAEnabled(profile?.two_factor_enabled || false);
    } catch (error) {
      console.error('Error checking 2FA status:', error);
    }
  };

  const handleEnable2FA = async () => {
    setIsLoading(true);
    
    try {
      const { secret: newSecret, qrCode: newQrCode, error } = await enable2FA();
      
      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setSecret(newSecret);
        setQrCode(newQrCode);
        setShowSetupModal(true);
        
        // Generate backup codes
        const codes = Array.from({ length: 8 }, () => 
          Math.random().toString(36).substring(2, 8).toUpperCase()
        );
        setBackupCodes(codes);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to enable 2FA. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify2FA = async () => {
    if (!verificationCode) {
      toast({
        title: 'Error',
        description: 'Please enter the verification code.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await verify2FA(verificationCode);
      
      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setIs2FAEnabled(true);
        setShowSetupModal(false);
        setVerificationCode('');
        toast({
          title: 'Success',
          description: '2FA has been enabled for your account.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify code. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    if (!verificationCode) {
      toast({
        title: 'Error',
        description: 'Please enter the verification code to disable 2FA.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await disable2FA(verificationCode);
      
      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setIs2FAEnabled(false);
        setShowDisableModal(false);
        setVerificationCode('');
        toast({
          title: 'Success',
          description: '2FA has been disabled for your account.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to disable 2FA. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied',
      description: 'Text copied to clipboard.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Two-Factor Authentication
        </CardTitle>
        <CardDescription>
          Add an extra layer of security to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              <Badge variant={is2FAEnabled ? "default" : "secondary"}>
                {is2FAEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {is2FAEnabled 
                ? "Your account is protected with 2FA" 
                : "Enable 2FA to secure your account"
              }
            </p>
          </div>
          
          {!is2FAEnabled ? (
            <Button onClick={handleEnable2FA} disabled={isLoading}>
              <Smartphone className="h-4 w-4 mr-2" />
              {isLoading ? 'Setting up...' : 'Enable 2FA'}
            </Button>
          ) : (
            <Dialog open={showDisableModal} onOpenChange={setShowDisableModal}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  Disable 2FA
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Disable Two-Factor Authentication</DialogTitle>
                  <DialogDescription>
                    Enter your current 2FA code to disable two-factor authentication.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Disabling 2FA will make your account less secure.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-2">
                    <Label htmlFor="disable-code">Verification Code</Label>
                    <Input
                      id="disable-code"
                      placeholder="Enter 6-digit code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      maxLength={6}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowDisableModal(false);
                        setVerificationCode('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDisable2FA}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Disabling...' : 'Disable 2FA'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {is2FAEnabled && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Two-factor authentication is active. You'll need your authenticator app to sign in.
            </AlertDescription>
          </Alert>
        )}

        {/* Setup Modal */}
        <Dialog open={showSetupModal} onOpenChange={setShowSetupModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Set up Two-Factor Authentication</DialogTitle>
              <DialogDescription>
                Follow these steps to enable 2FA on your account
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Step 1: QR Code */}
              <div className="space-y-3">
                <h4 className="font-medium">Step 1: Scan QR Code</h4>
                <p className="text-sm text-muted-foreground">
                  Use your authenticator app to scan this QR code:
                </p>
                {qrCode && (
                  <div className="flex justify-center">
                    <img src={qrCode} alt="2FA QR Code" className="border rounded-lg" />
                  </div>
                )}
              </div>

              {/* Step 2: Manual Entry */}
              <div className="space-y-3">
                <h4 className="font-medium">Step 2: Or enter manually</h4>
                <p className="text-sm text-muted-foreground">
                  If you can't scan the QR code, enter this secret key:
                </p>
                <div className="flex items-center gap-2">
                  <Input value={secret} readOnly className="font-mono text-sm" />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(secret)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Step 3: Verification */}
              <div className="space-y-3">
                <h4 className="font-medium">Step 3: Verify</h4>
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code from your authenticator app:
                </p>
                <Input
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
              </div>

              {/* Backup Codes */}
              {backupCodes.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">Backup Codes</h4>
                  <p className="text-sm text-muted-foreground">
                    Save these backup codes in a safe place. You can use them to access your account if you lose your authenticator device.
                  </p>
                  <div className="grid grid-cols-2 gap-2 p-3 bg-muted rounded-lg">
                    {backupCodes.map((code, index) => (
                      <div key={index} className="font-mono text-sm">
                        {code}
                      </div>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(backupCodes.join('\n'))}
                    className="w-full"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All Codes
                  </Button>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowSetupModal(false);
                    setVerificationCode('');
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleVerify2FA} disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Enable 2FA'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}