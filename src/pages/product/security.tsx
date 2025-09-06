import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Lock, Key, Server, EyeOff, FileText, Clock, AlertCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const securityFeatures = [
  {
    icon: <Lock className="h-6 w-6 text-blue-600" />,
    title: "End-to-End Encryption",
    description: "All data is encrypted in transit and at rest using industry-standard encryption protocols."
  },
  {
    icon: <Shield className="h-6 w-6 text-green-600" />,
    title: "SOC 2 Type II Compliant",
    description: "Our systems undergo regular audits to ensure the highest security standards are maintained."
  },
  {
    icon: <Key className="h-6 w-6 text-purple-600" />,
    title: "Single Sign-On (SSO)",
    description: "Secure authentication with your existing identity provider (SAML 2.0, OAuth 2.0)."
  },
  {
    icon: <Server className="h-6 w-6 text-orange-600" />,
    title: "Data Residency",
    description: "Choose where your data is stored with our global data center locations."
  },
  {
    icon: <EyeOff className="h-6 w-6 text-red-600" />,
    title: "Zero-Knowledge Architecture",
    description: "We never store your encryption keys and cannot access your data."
  },
  {
    icon: <FileText className="h-6 w-6 text-amber-600" />,
    title: "Compliance Certifications",
    description: "GDPR, CCPA, HIPAA, and more. We meet the strictest compliance requirements."
  }
];

const securityPractices = [
  {
    title: "Infrastructure Security",
    description: "Our infrastructure is built on secure, isolated cloud environments with strict access controls.",
    features: [
      "DDoS protection",
      "Web application firewall",
      "Regular security audits",
      "Intrusion detection systems"
    ]
  },
  {
    title: "Data Protection",
    description: "Multiple layers of protection to keep your data safe at all times.",
    features: [
      "AES-256 encryption",
      "TLS 1.3 for data in transit",
      "Encrypted backups",
      "Data retention policies"
    ]
  },
  {
    title: "Access Control",
    description: "Granular permissions and authentication controls to protect your account.",
    features: [
      "Role-based access control",
      "Multi-factor authentication",
      "IP allowlisting",
      "Session timeouts"
    ]
  }
];

export default function SecurityPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 mb-4">
          <Shield className="w-4 h-4 mr-2" />
          Enterprise-Grade Security
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Security & Compliance
        </h1>
        <p className="text-xl text-muted-foreground">
          Your data's security is our top priority
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {securityFeatures.map((feature, i) => (
          <Card key={i} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 rounded-xl p-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Security Practices</h2>
          <div className="space-y-8">
            {securityPractices.map((practice, i) => (
              <div key={i} className="md:flex gap-8">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold mb-2">{practice.title}</h3>
                  <p className="text-muted-foreground">{practice.description}</p>
                </div>
                <div className="md:w-2/3">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {practice.features.map((feature, j) => (
                      <li key={j} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <CardTitle>Compliance & Certifications</CardTitle>
            <CardDescription>
              We maintain the highest industry standards and certifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "SOC 2 Type II Certified",
                "GDPR Compliant",
                "CCPA Compliant",
                "HIPAA Ready",
                "ISO 27001 Certified"
              ].map((item, i) => (
                <li key={i} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <CardTitle>Vulnerability Disclosure</CardTitle>
            <CardDescription>
              We take security vulnerabilities seriously and encourage responsible disclosure.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              If you believe you've found a security vulnerability, please report it to our security team.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>security@example.com</span>
              </div>
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>PGP Key: 0x1234567890ABCDEF</span>
              </div>
            </div>
            <Button variant="outline" className="mt-2" asChild>
              <Link href="/security/bug-bounty">
                Learn about our Bug Bounty Program
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Have specific security requirements?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our security team is available to discuss your organization's specific needs and requirements.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/contact/security">
              Contact Security Team
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/security/whitepaper">
              Download Security Whitepaper
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
