import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ShieldCheck, User, Lock, Download, Mail, ArrowRight, Check, FileText, Server, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const rights = [
  {
    title: "Right to Access",
    description: "You have the right to request copies of your personal data.",
    icon: <FileText className="h-5 w-5 text-blue-600" />
  },
  {
    title: "Right to Rectification",
    description: "You have the right to request correction of inaccurate personal data.",
    icon: <Check className="h-5 w-5 text-green-600" />
  },
  {
    title: "Right to Erasure",
    description: "You have the right to request erasure of your personal data under certain conditions.",
    icon: <AlertCircle className="h-5 w-5 text-red-600" />
  },
  {
    title: "Right to Restrict Processing",
    description: "You have the right to request restriction of processing your personal data.",
    icon: <Lock className="h-5 w-5 text-purple-600" />
  },
  {
    title: "Right to Data Portability",
    description: "You have the right to request transfer of your data to another organization.",
    icon: <Download className="h-5 w-5 text-orange-600" />
  },
  {
    title: "Right to Object",
    description: "You have the right to object to our processing of your personal data.",
    icon: <User className="h-5 w-5 text-amber-600" />
  }
];

const dataProcessingActivities = [
  {
    purpose: "Account Management",
    dataType: "Name, email, contact details, account credentials",
    legalBasis: "Contractual necessity"
  },
  {
    purpose: "Service Provision",
    dataType: "Usage data, preferences, transaction history",
    legalBasis: "Contractual necessity, legitimate interest"
  },
  {
    purpose: "Customer Support",
    dataType: "Contact details, communication history, support tickets",
    legalBasis: "Legitimate interest, consent"
  },
  {
    purpose: "Marketing Communications",
    dataType: "Email address, preferences, interaction data",
    legalBasis: "Consent, legitimate interest"
  },
  {
    purpose: "Analytics & Improvement",
    dataType: "Usage data, device information, interaction patterns",
    legalBasis: "Legitimate interest"
  },
  {
    purpose: "Legal Compliance",
    dataType: "Identity verification, transaction records, compliance documentation",
    legalBasis: "Legal obligation"
  }
];

export default function GDPRCompliancePage() {
  const lastUpdated = "June 1, 2023";
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          GDPR Compliance
        </h1>
        <p className="text-xl text-muted-foreground">
          General Data Protection Regulation Information
        </p>
        <p className="text-sm text-muted-foreground mt-2">
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
                  { id: 'gdpr-overview', label: '1. GDPR Overview' },
                  { id: 'data-controller', label: '2. Data Controller' },
                  { id: 'legal-basis', label: '3. Legal Basis for Processing' },
                  { id: 'data-subject-rights', label: '4. Your Rights' },
                  { id: 'data-processing', label: '5. Data Processing Activities' },
                  { id: 'data-transfers', label: '6. International Transfers' },
                  { id: 'security-measures', label: '7. Security Measures' },
                  { id: 'data-breaches', label: '8. Data Breach Procedures' },
                  { id: 'dpo', label: '9. Data Protection Officer' },
                  { id: 'contact', label: '10. Contact Us' }
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
              This GDPR Compliance page provides information about how [Company Name] complies with the General Data Protection Regulation (GDPR) (EU) 2016/679, 
              a regulation in EU law on data protection and privacy in the European Union and the European Economic Area.
            </p>
          </div>

          <section id="gdpr-overview" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">1. GDPR Overview</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect on May 25, 2018. 
                It applies to all organizations operating within the EU/EEA, as well as those outside the region that offer goods or services to 
                individuals in the EU/EEA or monitor their behavior.
              </p>
              <p className="mt-4">
                At [Company Name], we are committed to protecting the privacy and security of personal data in compliance with GDPR requirements.
              </p>
            </div>
          </section>

          <section id="data-controller" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">2. Data Controller</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                [Company Name] acts as a data controller for the personal data we process in connection with our services. 
                This means we determine the purposes and means of processing personal data.
              </p>
              <p className="mt-4">
                <strong>Our contact information:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Company Name: [Your Company Name]</li>
                <li>Address: 123 Tech Street, San Francisco, CA 94107, United States</li>
                <li>Email: privacy@example.com</li>
                <li>Phone: +1 (555) 123-4567</li>
              </ul>
            </div>
          </section>

          <section id="legal-basis" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">3. Legal Basis for Processing</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>We process personal data on the following legal bases under GDPR:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Consent:</strong> When you have given clear consent for us to process your personal data for a specific purpose.</li>
                <li><strong>Contract:</strong> When processing is necessary for a contract we have with you, or because you have asked us to take specific steps before entering into a contract.</li>
                <li><strong>Legal Obligation:</strong> When processing is necessary for compliance with a legal obligation to which we are subject.</li>
                <li><strong>Legitimate Interests:</strong> When processing is necessary for our legitimate interests or the legitimate interests of a third party, unless there is a good reason to protect your personal data which overrides those legitimate interests.</li>
                <li><strong>Vital Interests:</strong> When processing is necessary to protect someone's life.</li>
                <li><strong>Public Task:</strong> When processing is necessary for us to perform a task in the public interest or for official functions.</li>
              </ul>
            </div>
          </section>

          <section id="data-subject-rights" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">4. Your Rights Under GDPR</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Under GDPR, you have specific rights regarding your personal data. Below is an overview of these rights and how you can exercise them:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {rights.map((right, i) => (
                <Card key={i} className="h-full">
                  <CardHeader className="pb-3">
                    <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                      {right.icon}
                    </div>
                    <h3 className="text-lg font-medium">{right.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{right.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 prose prose-slate dark:prose-invert max-w-none">
              <h3 className="font-medium">Exercising Your Rights</h3>
              <p>
                To exercise any of these rights, please contact us using the information in the "Contact Us" section below. 
                We may need to verify your identity before processing your request.
              </p>
              <p className="mt-4">
                We will respond to all valid requests within one month of receipt. If your request is particularly complex, 
                we may extend this period by up to two additional months, and we will notify you of any extension.
              </p>
            </div>
          </section>

          <section id="data-processing" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">5. Data Processing Activities</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                The table below outlines our main data processing activities, the types of personal data involved, 
                and the legal basis for processing under GDPR:
              </p>
              
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-left">Purpose of Processing</th>
                      <th className="p-3 text-left">Types of Personal Data</th>
                      <th className="p-3 text-left">Legal Basis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {dataProcessingActivities.map((activity, i) => (
                      <tr key={i} className="hover:bg-muted/50">
                        <td className="p-3">{activity.purpose}</td>
                        <td className="p-3">{activity.dataType}</td>
                        <td className="p-3">{activity.legalBasis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="data-transfers" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">6. International Data Transfers</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                We may transfer, store, and process your personal data outside the European Economic Area (EEA). 
                When we do, we ensure appropriate safeguards are in place to protect your personal data in accordance with GDPR requirements.
              </p>
              <p className="mt-4">
                These safeguards may include:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Transferring to countries that have been deemed to provide an adequate level of protection by the European Commission</li>
                <li>Using standard contractual clauses approved by the European Commission</li>
                <li>Implementing additional technical and organizational security measures</li>
              </ul>
              <p className="mt-4">
                For more information about our international data transfer practices, please contact our Data Protection Officer.
              </p>
            </div>
          </section>

          <section id="security-measures" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">7. Security Measures</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security testing and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Staff training on data protection and security</li>
                <li>Incident response and business continuity plans</li>
              </ul>
              <p className="mt-4">
                We regularly review and update our security measures to protect against unauthorized access, alteration, disclosure, 
                or destruction of your personal data.
              </p>
            </div>
          </section>

          <section id="data-breaches" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">8. Data Breach Procedures</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                In the event of a personal data breach, we have established procedures to detect, report, and investigate the breach. 
                If a breach is likely to result in a high risk to your rights and freedoms, we will notify you and the relevant 
                supervisory authority without undue delay and within 72 hours of becoming aware of the breach, where feasible.
              </p>
              <p className="mt-4">
                Our breach response plan includes:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Containment and recovery actions</li>
                <li>Assessment of the risks to individuals</li>
                <li>Notification to the relevant supervisory authority</li>
                <li>Communication with affected individuals when required</li>
                <li>Documentation of the breach and our response</li>
              </ul>
            </div>
          </section>

          <section id="dpo" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">9. Data Protection Officer</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                We have appointed a Data Protection Officer (DPO) to oversee compliance with data protection laws, including GDPR. 
                You can contact our DPO with any questions or concerns about our data protection practices.
              </p>
              <div className="bg-muted/50 rounded-lg p-6 mt-6">
                <h3 className="font-medium">Data Protection Officer</h3>
                <p className="mt-2">
                  <strong>Email:</strong> dpo@example.com<br />
                  <strong>Phone:</strong> +1 (555) 987-6543<br />
                  <strong>Mail:</strong> Data Protection Officer, 123 Tech Street, San Francisco, CA 94107, United States
                </p>
              </div>
            </div>
          </section>

          <section id="contact" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>If you have any questions about this GDPR Compliance statement or our data protection practices, please contact us:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>By email: privacy@example.com</li>
                <li>By visiting our <Link href="/contact" className="text-blue-600 hover:underline">contact page</Link></li>
                <li>By mail: 123 Tech Street, San Francisco, CA 94107, United States</li>
              </ul>
              <p className="mt-4">
                You also have the right to lodge a complaint with a supervisory authority, in particular in the EU Member State of your 
                habitual residence, place of work, or place of the alleged infringement if you believe that our processing of your 
                personal data does not comply with GDPR.
              </p>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto">
          <div className="md:flex items-start">
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-6 flex-shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Data Protection Rights</h2>
              <p className="text-muted-foreground mb-6">
                Under GDPR, you have rights regarding your personal data. To exercise any of these rights, please contact us using the information above.
              </p>
              <Button asChild>
                <Link href="/legal/datarequest" className="flex items-center">
                  Submit a Data Request
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
