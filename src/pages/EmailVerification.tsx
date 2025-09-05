import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type VerificationState = 'loading' | 'success' | 'error' | 'expired' | 'pending';

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const [verificationState, setVerificationState] = useState<VerificationState>('loading');
  const [email, setEmail] = useState<string>('');
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type');
      const emailParam = searchParams.get('email');
      
      if (emailParam) {
        setEmail(emailParam);
      }

      // If no token, this is just the pending verification page
      if (!token) {
        setVerificationState('pending');
        return;
      }

      // Handle email confirmation
      if (type === 'email') {
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'email',
          });

          if (error) {
            console.error('Verification error:', error);
            if (error.message.includes('expired')) {
              setVerificationState('expired');
            } else {
              setVerificationState('error');
            }
          } else {
            setVerificationState('success');
            toast({
              title: 'Email verified!',
              description: 'Your email has been successfully verified. Welcome to FixiDesk!',
            });
            
            // Redirect to dashboard after 3 seconds
            setTimeout(() => {
              navigate('/dashboard');
            }, 3000);
          }
        } catch (error) {
          console.error('Verification error:', error);
          setVerificationState('error');
        }
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate, toast]);

  const handleResendVerification = async () => {
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please provide your email address to resend verification.',
        variant: 'destructive',
      });
      return;
    }

    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        toast({
          title: 'Resend failed',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Verification email sent',
          description: 'Please check your email for the verification link.',
        });
      }
    } catch (error) {
      toast({
        title: 'Resend failed',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsResending(false);
    }
  };

  const getContent = () => {
    switch (verificationState) {
      case 'loading':
        return {
          icon: <RefreshCw className="h-16 w-16 text-primary animate-spin" />,
          title: 'Verifying your email...',
          description: 'Please wait while we verify your email address.',
          action: null,
        };

      case 'success':
        return {
          icon: <CheckCircle className="h-16 w-16 text-success" />,
          title: 'Email verified successfully!',
          description: 'Your email has been verified. You will be redirected to your dashboard shortly.',
          action: (
            <Button onClick={() => navigate('/dashboard')} className="w-full">
              Go to Dashboard
            </Button>
          ),
        };

      case 'error':
        return {
          icon: <AlertCircle className="h-16 w-16 text-destructive" />,
          title: 'Verification failed',
          description: 'The verification link is invalid or has already been used.',
          action: (
            <div className="space-y-3">
              <Button onClick={handleResendVerification} disabled={isResending} className="w-full">
                {isResending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Resend verification email'
                )}
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/login">Back to Login</Link>
              </Button>
            </div>
          ),
        };

      case 'expired':
        return {
          icon: <AlertCircle className="h-16 w-16 text-warning" />,
          title: 'Verification link expired',
          description: 'The verification link has expired. Please request a new one.',
          action: (
            <div className="space-y-3">
              <Button onClick={handleResendVerification} disabled={isResending} className="w-full">
                {isResending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send new verification email'
                )}
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/signup">Create new account</Link>
              </Button>
            </div>
          ),
        };

      case 'pending':
      default:
        return {
          icon: <Mail className="h-16 w-16 text-primary" />,
          title: 'Check your email',
          description: email 
            ? `We've sent a verification link to ${email}. Please click the link to verify your account.`
            : 'We\'ve sent you a verification email. Please click the link to verify your account.',
          action: (
            <div className="space-y-3">
              <Button onClick={handleResendVerification} disabled={isResending} variant="outline" className="w-full">
                {isResending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Resend verification email'
                )}
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/login">Back to Login</Link>
              </Button>
            </div>
          ),
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5 dark:opacity-10" />
      
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <Link 
              to="/" 
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Link>
            <ThemeToggle />
          </div>
          
          <Logo size="lg" clickable={false} className="justify-center mb-6" />
        </div>

        {/* Verification Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-luxurious border-border/50">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                {content.icon}
              </div>
              <CardTitle className="text-xl">{content.title}</CardTitle>
              <CardDescription className="text-center px-2">
                {content.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {content.action}
              
              {verificationState === 'pending' && (
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  <p>Didn't receive the email? Check your spam folder or try resending.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Need help?{" "}
            <Link to="/support" className="underline underline-offset-4">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
