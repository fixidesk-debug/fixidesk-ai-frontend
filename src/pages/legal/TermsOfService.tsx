import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { ArrowLeft } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site";
import { ContactBlock } from "@/components/ui/contact-block";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Logo size="sm" />
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8 space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: January 15, 2024</p>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to FixiDesk ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our AI-powered automated helpdesk platform and related services. By accessing or using FixiDesk, you agree to be bound by these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  FixiDesk provides an AI-powered helpdesk solution that includes ticket management, automated responses, call assistance, live chat widgets, and analytics. Our platform integrates with various third-party services to streamline customer support operations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
                <div className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    To use FixiDesk, you must create an account. You agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>Be responsible for all activities under your account</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
                <div className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    You may not use FixiDesk to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Transmit harmful, offensive, or illegal content</li>
                    <li>Interfere with the platform's security or functionality</li>
                    <li>Use the service for unauthorized commercial purposes</li>
                    <li>Attempt to access other users' accounts or data</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Data and Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy. By using FixiDesk, you consent to the collection and use of information as outlined in our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Subscription and Billing</h2>
                <div className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    FixiDesk offers various subscription plans:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Billing cycles are monthly or annual as selected</li>
                    <li>Subscription fees are non-refundable except as required by law</li>
                    <li>You may cancel your subscription at any time</li>
                    <li>Price changes will be communicated 30 days in advance</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  FixiDesk and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, FixiDesk shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the service will cease immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through our platform. Continued use of FixiDesk after changes constitutes acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-muted p-4 rounded-lg mt-4">
                  <p className="font-medium mb-2">FixiDesk Support</p>
                  <ContactBlock showLabels={false} />
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}