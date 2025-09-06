import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Gavel, AlertTriangle, Shield, User, CreditCard, Code, Server, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  const effectiveDate = "June 1, 2023";
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-xl text-muted-foreground">
          Effective: {effectiveDate}
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 mb-16">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <h2 className="font-medium mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                {[
                  { id: 'agreement', label: '1. Agreement to Terms' },
                  { id: 'accounts', label: '2. Accounts' },
                  { id: 'subscriptions', label: '3. Subscriptions & Payments' },
                  { id: 'content', label: '4. User Content' },
                  { id: 'prohibited', label: '5. Prohibited Activities' },
                  { id: 'intellectual', label: '6. Intellectual Property' },
                  { id: 'termination', label: '7. Termination' },
                  { id: 'disclaimers', label: '8. Disclaimers' },
                  { id: 'liability', label: '9. Limitation of Liability' },
                  { id: 'changes', label: '10. Changes to Terms' },
                  { id: 'contact', label: '11. Contact Us' }
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/legal/privacy">
                    View Privacy Policy
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              Please read these Terms of Service ("Terms") carefully before using the [Company Name] website and services.
            </p>
          </div>

          <section id="agreement" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the services.
              </p>
              <p className="mt-4">
                Our services are intended for users who are at least 18 years old. If you are under 18, you may not use our services.
              </p>
            </div>
          </section>

          <section id="accounts" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">2. Accounts</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>When you create an account with us, you must provide accurate and complete information. You are responsible for:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Maintaining the security of your account and password</li>
                <li>All activities that occur under your account</li>
                <li>Immediately notifying us of any unauthorized use of your account</li>
              </ul>
              <p className="mt-4">
                We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.
              </p>
            </div>
          </section>

          <section id="subscriptions" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">3. Subscriptions & Payments</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>Certain services may require payment. You agree to pay all fees in accordance with the pricing and payment terms presented to you.</p>
              
              <h3 className="font-medium mt-6 mb-2">Billing</h3>
              <p>By providing a payment method, you authorize us to charge the applicable fees to your selected payment method.</p>
              
              <h3 className="font-medium mt-6 mb-2">Cancellation</h3>
              <p>You may cancel your subscription at any time. Your cancellation will take effect at the end of your current billing period.</p>
              
              <h3 className="font-medium mt-6 mb-2">Refunds</h3>
              <p>Payments are non-refundable except as required by law or at our sole discretion.</p>
            </div>
          </section>

          <section id="content" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">4. User Content</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>Our services allow you to post, link, store, share, and otherwise make available certain information, text, or other material ("Content").</p>
              <p className="mt-4">You are responsible for the Content that you post, including its legality, reliability, and appropriateness.</p>
              <p className="mt-4">By posting Content, you grant us the right to use, modify, publicly perform, and distribute such Content on and through our services.</p>
            </div>
          </section>

          <section id="prohibited" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">5. Prohibited Activities</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>You agree not to use our services to:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Harass, abuse, or harm others</li>
                <li>Distribute spam or malicious software</li>
                <li>Interfere with or disrupt the services</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Engage in any fraudulent or deceptive activities</li>
              </ul>
            </div>
          </section>

          <section id="intellectual" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>The services and their original content, features, and functionality are and will remain the exclusive property of [Company Name] and its licensors.</p>
              <p className="mt-4">Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.</p>
            </div>
          </section>

          <section id="termination" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">7. Termination</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>We may terminate or suspend your account and bar access to the services immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms.</p>
              <p className="mt-4">Upon termination, your right to use the services will immediately cease.</p>
            </div>
          </section>

          <section id="disclaimers" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">8. Disclaimers</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>Your use of the services is at your sole risk. The services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind.</p>
              <p className="mt-4">We do not warrant that:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>The services will be uninterrupted or error-free</li>
                <li>The results from using the services will be accurate or reliable</li>
                <li>The quality of any products, services, or information obtained through the services will meet your expectations</li>
              </ul>
            </div>
          </section>

          <section id="liability" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>In no event shall [Company Name], nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Your access to or use of or inability to access or use the services</li>
                <li>Any conduct or content of any third party on the services</li>
                <li>Any content obtained from the services</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
            </div>
          </section>

          <section id="changes" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>We reserve the right to modify these Terms at any time. We will provide notice of any changes by updating the "Effective" date at the top of these Terms.</p>
              <p className="mt-4">By continuing to access or use our services after any revisions become effective, you agree to be bound by the revised terms.</p>
            </div>
          </section>

          <section id="contact" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>If you have any questions about these Terms, please contact us:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>By email: legal@example.com</li>
                <li>By visiting our <Link href="/contact" className="text-blue-600 hover:underline">contact page</Link></li>
                <li>By mail: 123 Tech Street, San Francisco, CA 94107, United States</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto">
          <div className="md:flex items-start">
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-6 flex-shrink-0">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Important Legal Notice</h2>
              <p className="text-muted-foreground mb-4">
                These Terms of Service constitute a legally binding agreement between you and [Company Name]. By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>
              <p className="text-muted-foreground">
                If you do not agree with any part of these Terms, you must not use our services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
