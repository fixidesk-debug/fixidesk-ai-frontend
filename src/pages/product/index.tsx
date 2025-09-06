import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap, Lock, Code, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";

export default function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          All-in-One AI Chat Platform
        </h1>
        <p className="text-xl text-muted-foreground">
          Transform your customer support and team collaboration with our powerful AI chat solution
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          {
            icon: <Zap className="w-8 h-8 text-blue-600" />,
            title: "Lightning Fast",
            description: "Instant responses powered by advanced AI technology"
          },
          {
            icon: <Lock className="w-8 h-8 text-green-600" />,
            title: "Secure & Private",
            description: "Enterprise-grade security for your conversations"
          },
          {
            icon: <Code className="w-8 h-8 text-purple-600" />,
            title: "Developer Friendly",
            description: "Easy to integrate with your existing tools"
          }
        ].map((feature, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 w-fit mb-4">
                {feature.icon}
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 rounded-xl p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Enterprise-Grade Security
          </div>
          <h2 className="text-3xl font-bold mb-4">Trusted by 10,000+ businesses worldwide</h2>
          <p className="text-muted-foreground mb-8">
            Join companies of all sizes who trust our platform to power their customer conversations
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/pricing">
                View Pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/features">
                Explore Features
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: "How does the AI chat work?",
              answer: "Our AI chat uses advanced natural language processing to understand and respond to customer inquiries in real-time."
            },
            {
              question: "Is my data secure?",
              answer: "Yes, we use bank-level encryption and comply with global data protection regulations."
            },
            {
              question: "Can I customize the chat experience?",
              answer: "Absolutely! Our platform offers extensive customization options to match your brand."
            }
          ].map((faq, i) => (
            <Card key={i}>
              <CardHeader className="py-4">
                <CardTitle className="text-lg">{faq.question}</CardTitle>
                <CardDescription>{faq.answer}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
