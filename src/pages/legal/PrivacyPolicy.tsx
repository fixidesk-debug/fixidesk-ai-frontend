import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: January 15, 2024</p>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This may include your name, email address, company information, and any other information you choose to provide.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Usage Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We automatically collect information about how you use FixiDesk, including your IP address, browser type, operating system, referring URLs, access times, and pages viewed.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Customer Support Data</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      When you use our helpdesk services, we collect and process customer support tickets, messages, call recordings, and related data to provide our services.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                <div className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Develop new features and functionality</li>
                    <li>Ensure platform security and prevent fraud</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>With your consent or at your direction</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and prevent fraud</li>
                    <li>With service providers who assist in our operations</li>
                    <li>In connection with a business transfer or merger</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                <div className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Access to your personal information</li>
                    <li>Correction of inaccurate information</li>
                    <li>Deletion of your personal information</li>
                    <li>Restriction of processing</li>
                    <li>Data portability</li>
                    <li>Objection to processing</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to collect usage information, improve our services, and provide personalized experiences. You can control cookie preferences through your browser settings, though this may affect some functionality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Third-Party Integrations</h2>
                <p className="text-muted-foreground leading-relaxed">
                  FixiDesk integrates with third-party services like WhatsApp, Slack, and Tiledesk. When you use these integrations, the privacy policies of those services also apply to the information they collect and process.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. International Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-muted p-4 rounded-lg mt-4">
                  <p className="font-medium">FixiDesk Privacy Team</p>
                  <p className="text-muted-foreground">Email: privacy@fixidesk.com</p>
                  <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
                  <p className="text-muted-foreground">Address: 123 Tech Street, San Francisco, CA 94105</p>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}