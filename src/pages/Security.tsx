import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, FileCheck, Users, Globe, CheckCircle } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site";
import { ContactBlock } from "@/components/ui/contact-block";

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Bank-level encryption and security protocols protect your data 24/7.",
      details: ["AES-256 encryption", "TLS 1.3 in transit", "Zero-knowledge architecture"]
    },
    {
      icon: Lock,
      title: "Data Protection",
      description: "Your customer data is encrypted, anonymized, and stored securely.",
      details: ["End-to-end encryption", "Data anonymization", "Secure key management"]
    },
    {
      icon: Eye,
      title: "Privacy by Design",
      description: "Built with privacy at the core, compliant with global regulations.",
      details: ["GDPR compliant", "CCPA compliant", "SOC 2 Type II certified"]
    },
    {
      icon: Server,
      title: "Infrastructure Security",
      description: "Hosted on secure, monitored cloud infrastructure with 99.9% uptime.",
      details: ["AWS security", "24/7 monitoring", "DDoS protection"]
    }
  ];

  const compliance = [
    {
      title: "SOC 2 Type II",
      description: "Audited annually for security, availability, and confidentiality",
      status: "Certified",
      icon: FileCheck
    },
    {
      title: "GDPR Compliance",
      description: "Full compliance with European data protection regulations",
      status: "Compliant",
      icon: Globe
    },
    {
      title: "CCPA Compliance", 
      description: "Adheres to California Consumer Privacy Act requirements",
      status: "Compliant",
      icon: Users
    },
    {
      title: "HIPAA Ready",
      description: "Healthcare-grade security for sensitive customer data",
      status: "Available",
      icon: Shield
    }
  ];

  const securityPractices = [
    "Regular security audits and penetration testing",
    "Multi-factor authentication for all accounts", 
    "Role-based access controls and permissions",
    "Automated security monitoring and alerting",
    "Regular employee security training and certification",
    "Incident response plan with 24/7 security team",
    "Data backup and disaster recovery procedures",
    "Secure development lifecycle and code reviews"
  ];

  const dataHandling = [
    {
      title: "Data Collection",
      description: "We only collect data necessary for service functionality and with explicit consent."
    },
    {
      title: "Data Storage",
      description: "All data is encrypted at rest and in transit, stored in secure, geographically distributed data centers."
    },
    {
      title: "Data Access",
      description: "Strict access controls ensure only authorized personnel can access customer data, with full audit logs."
    },
    {
      title: "Data Retention",
      description: "Data is retained only as long as necessary and securely deleted when no longer needed."
    },
    {
      title: "Data Portability",
      description: "Customers can export their data at any time and request complete deletion upon account closure."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">
                <Shield className="h-3 w-3 mr-1" />
                Enterprise Security
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Your Data is <span className="text-primary">Safe</span> with Us
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Bank-level security, enterprise compliance, and privacy by design. 
                We protect your customer data with the highest security standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">View Security Docs</Button>
                <Button variant="outline" size="lg">Download Security Report</Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Security Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive security measures protecting your data at every level
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-8">
                      <feature.icon className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Compliance & Certifications</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meeting the highest industry standards for security and privacy
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {compliance.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <CardContent className="p-6">
                      <cert.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {cert.status}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Practices */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Security Practices</h2>
                <p className="text-lg text-muted-foreground">
                  Our comprehensive approach to keeping your data secure
                </p>
              </div>
              
              <Card>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {securityPractices.map((practice, index) => (
                      <motion.div
                        key={practice}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{practice}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Data Handling */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Data Handling</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transparent practices for how we collect, store, and protect your data
              </p>
            </div>
            
            <div className="space-y-6">
              {dataHandling.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Security Team */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Security Questions?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our security team is here to address any concerns or questions about data protection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">Contact Security Team</Button>
                <Button variant="outline" size="lg">Report Security Issue</Button>
              </div>
              <div className="mt-4 inline-block text-left">
                <ContactBlock showLabels={false} />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Security;