import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Server, User, Mail, Lock, ShieldCheck, EyeOff, FileText } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const lastUpdated = "June 1, 2023";
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-xl text-muted-foreground">
          Last updated: {lastUpdated}
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
                  { id: 'introduction', label: '1. Introduction' },
                  { id: 'data-collection', label: '2. Data We Collect' },
                  { id: 'data-use', label: '3. How We Use Your Data' },
                  { id: 'data-sharing', label: '4. Data Sharing' },
                  { id: 'data-security', label: '5. Data Security' },
                  { id: 'your-rights', label: '6. Your Rights' },
                  { id: 'cookies', label: '7. Cookies & Tracking' },
                  { id: 'changes', label: '8. Policy Changes' },
                  { id: 'contact', label: '9. Contact Us' }
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
                  <Link href="/legal/terms">
                    View Terms of Service
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
          <section id="introduction" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                At [Company Name], we respect your privacy and are committed to protecting your personal data.
                This Privacy Policy explains how we collect, use, and safeguard your information when you use our services.
              </p>
              <p>
                By using our services, you agree to the collection and use of information in accordance with this policy.
                If you have any questions about this Privacy Policy, please contact us at privacy@example.com.
              </p>
            </div>
          </section>

          <section id="data-collection" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">2. Data We Collect</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>We collect several different types of information for various purposes to provide and improve our services to you.</p>
              
              <h3 className="font-medium mt-6 mb-2">Personal Data</h3>
              <p>While using our services, we may ask you to provide us with certain personally identifiable information, including but not limited to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Cookies and Usage Data</li>
              </ul>

              <h3 className="font-medium mt-6 mb-2">Usage Data</h3>
              <p>We may also collect information on how the services are accessed and used. This Usage Data may include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your computer's Internet Protocol address (e.g., IP address)</li>
                <li>Browser type and version</li>
                <li>The pages of our services that you visit</li>
                <li>The time and date of your visit</li>
                <li>The time spent on those pages</li>
                <li>Unique device identifiers</li>
                <li>Other diagnostic data</li>
              </ul>
            </div>
          </section>

          <section id="data-use" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>We use the collected data for various purposes, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>To provide and maintain our services</li>
                <li>To notify you about changes to our services</li>
                <li>To allow you to participate in interactive features of our services</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our services</li>
                <li>To monitor the usage of our services</li>
                <li>To detect, prevent, and address technical issues</li>
                <li>To provide you with news, special offers, and general information about other goods, services, and events</li>
              </ul>
            </div>
          </section>

          <section id="data-security" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                The security of your data is important to us. We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
              </p>
              <p>
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[
                {
                  icon: <Lock className="h-6 w-6 text-blue-600" />,
                  title: "Encryption",
                  description: "All data is encrypted in transit and at rest using industry-standard protocols."
                },
                {
                  icon: <ShieldCheck className="h-6 w-6 text-green-600" />,
                  title: "Access Control",
                  description: "Strict access controls limit who can access your data within our organization."
                },
                {
                  icon: <EyeOff className="h-6 w-6 text-purple-600" />,
                  title: "Data Minimization",
                  description: "We only collect the data we need to provide our services effectively."
                },
                {
                  icon: <Server className="h-6 w-6 text-orange-600" />,
                  title: "Secure Infrastructure",
                  description: "Our infrastructure is hosted on secure, SOC 2 compliant data centers."
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mr-4 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="your-rights" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>Depending on your location, you may have certain rights regarding your personal data, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The right to access, update, or delete your information</li>
                <li>The right to rectification if your data is inaccurate or incomplete</li>
                <li>The right to object to our processing of your personal data</li>
                <li>The right to request restriction of processing your personal data</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us using the information in the "Contact Us" section below.
              </p>
            </div>
          </section>

          <section id="cookies" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">6. Cookies & Tracking</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                We use cookies and similar tracking technologies to track activity on our services and hold certain information.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our services.
              </p>
              <p className="mt-4">
                For more information about the cookies we use and your choices regarding cookies, please visit our
                <Link href="/legal/cookies" className="text-blue-600 hover:underline ml-1">
                  Cookie Policy
                </Link>.
              </p>
            </div>
          </section>

          <section id="changes" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">7. Changes to This Policy</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this policy.
              </p>
              <p className="mt-4">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>
          </section>

          <section id="contact" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>By email: privacy@example.com</li>
                <li>By visiting our <Link href="/contact" className="text-blue-600 hover:underline">contact page</Link></li>
                <li>By mail: 123 Tech Street, San Francisco, CA 94107, United States</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <Shield className="h-12 w-12 mx-auto text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your Privacy Matters</h2>
          <p className="text-muted-foreground mb-6">
            We're committed to protecting your personal information and being transparent about how we handle it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/legal/datarequest" className="flex items-center">
                Submit a Data Request
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact" className="flex items-center">
                Contact Privacy Team
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
