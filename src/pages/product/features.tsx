import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, MessageSquare, Bot, Zap, Lock, Code, Users, BarChart, Mail, Bell, Settings, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "AI-Powered Chat",
    description: "Intelligent conversations with advanced natural language understanding"
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Custom AI Assistants",
    description: "Train AI models specific to your business needs"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Responses",
    description: "24/7 automated support with sub-second response times"
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "End-to-End Encryption",
    description: "Bank-level security for all your conversations"
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Developer API",
    description: "Seamless integration with your existing systems"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Team Collaboration",
    description: "Shared inbox and internal notes for your support team"
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: "Analytics Dashboard",
    description: "Detailed insights into your chat performance"
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Omnichannel Support",
    description: "Connect email, social media, and more in one place"
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: "Smart Notifications",
    description: "Never miss an important message with intelligent alerts"
  }
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Powerful Features
        </h1>
        <p className="text-xl text-muted-foreground">
          Everything you need to deliver exceptional customer experiences
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, i) => (
          <Card key={i} className="group hover:shadow-lg transition-all">
            <CardHeader>
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 w-fit mb-4 text-blue-600 dark:text-blue-400">
                {feature.icon}
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="p-0 h-auto font-normal" asChild>
                <Link href="/product" className="flex items-center">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 rounded-xl p-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Enterprise-Grade Security</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-4">Compliance & Certifications</h3>
              <ul className="space-y-3">
                {[
                  "GDPR Compliant",
                  "SOC 2 Type II Certified",
                  "End-to-End Encryption",
                  "Data Residency Options"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Advanced Security Features</h3>
              <ul className="space-y-3">
                {[
                  "Single Sign-On (SSO)",
                  "Role-Based Access Control",
                  "Audit Logs",
                  "Data Encryption at Rest"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of businesses that trust our platform to power their customer conversations.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/pricing">
              View Pricing <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">
              Contact Sales
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
