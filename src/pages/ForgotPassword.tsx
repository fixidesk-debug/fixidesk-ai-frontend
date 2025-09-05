import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const email = watch("email");

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    
    try {
      const { error } = await resetPassword(data.email);
      
      if (error) {
        toast({
          title: "Reset failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      toast({
        title: "Reset failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5 dark:opacity-10" />
      
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <Link 
              to="/login" 
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to login
            </Link>
            <ThemeToggle />
          </div>
          
          <Logo size="lg" clickable={false} className="justify-center mb-6" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
            <p className="text-muted-foreground">
              Enter your email and we'll send you a reset link
            </p>
          </motion.div>
        </div>

        {/* Form or Success State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-luxurious border-border/50">
            {!isSubmitted ? (
              <>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Forgot password</CardTitle>
                  <CardDescription>
                    We'll send a password reset link to your email
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        className="rounded-xl"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send reset link"}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Remember your password?{" "}
                      <Link
                        to="/login"
                        className="text-primary hover:text-primary-hover font-medium underline underline-offset-4"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                    <Mail className="h-8 w-8 text-success" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">Check your email</h3>
                <p className="text-muted-foreground mb-6">
                  We've sent a password reset link to{" "}
                  <span className="font-medium text-foreground">{email}</span>
                </p>

                <div className="space-y-4">
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <a href="https://gmail.com" target="_blank" rel="noopener noreferrer">
                      Open Gmail
                    </a>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSubmitted(false)}
                    className="w-full"
                  >
                    Try another email
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Didn't receive the email?</p>
                      <p>Check your spam folder or wait a few minutes for the email to arrive.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Need help?{" "}
            <Link to="/contact" className="underline underline-offset-4">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}