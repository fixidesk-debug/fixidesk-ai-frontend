import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Phone, Clock, MapPin, Check, X, AlertCircle, Send, ArrowRight } from "lucide-react";
import Link from "next/link";

const supportOptions = [
  {
    title: "Email Support",
    description: "Get help via email from our support team.",
    icon: <Mail className="h-5 w-5 text-blue-600" />,
    contact: "support@example.com",
    responseTime: "Typically replies within 2 hours",
    buttonText: "Email Us"
  },
  {
    title: "Live Chat",
    description: "Chat with our support team in real-time.",
    icon: <MessageSquare className="h-5 w-5 text-green-600" />,
    contact: "Available 24/7",
    responseTime: "Instant response",
    buttonText: "Start Chat",
    featured: true
  },
  {
    title: "Phone Support",
    description: "Speak directly with our support team.",
    icon: <Phone className="h-5 w-5 text-purple-600" />,
    contact: "+1 (555) 123-4567",
    responseTime: "Available 9AM - 6PM EST",
    buttonText: "Call Now"
  }
];

const faqs = [
  {
    question: "What are your support hours?",
    answer: "Our support team is available 24/7 via live chat and email. Phone support is available Monday to Friday, 9AM to 6PM EST."
  },
  {
    question: "How long does it take to get a response?",
    answer: "We typically respond to emails within 2 hours during business hours. Live chat support provides instant responses from our team."
  },
  {
    question: "Do you offer support in languages other than English?",
    answer: "Yes, we provide support in multiple languages including Spanish, French, and German through our email and live chat channels."
  },
  {
    question: "What information should I include in my support request?",
    answer: "Please include your account details, a clear description of the issue, any error messages, and steps to reproduce the problem if possible."
  }
];

export default function ContactSupportPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Contact Support
        </h1>
        <p className="text-xl text-muted-foreground">
          We're here to help you with any questions or issues
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {supportOptions.map((option, i) => (
          <Card key={i} className={`group hover:shadow-lg transition-shadow ${option.featured ? 'border-blue-500 shadow-md' : ''}`}>
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                {option.icon}
              </div>
              <CardTitle className="text-xl">{option.title}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <div className="h-5 w-5 text-muted-foreground mr-2">
                    {option.icon}
                  </div>
                  <span className="text-sm">{option.contact}</span>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                  <span className="text-sm">{option.responseTime}</span>
                </div>
              </div>
              <Button 
                className={`w-full ${option.featured ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                asChild
              >
                <Link href={option.featured ? "/support/chat" : `mailto:${option.contact}`}>
                  {option.buttonText}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="you@example.com" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Please describe your issue in detail..." className="min-h-[150px]" />
            </div>
            <div className="flex items-center space-x-2">
              <Button type="submit" className="flex items-center">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" type="button">
                Attach Files
              </Button>
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="ghost" className="p-0 h-auto" asChild>
              <Link href="/support/faq" className="flex items-center">
                View all FAQs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Our Office</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Headquarters</p>
                  <p className="text-sm text-muted-foreground">123 Tech Street, San Francisco, CA 94107</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-sm text-muted-foreground">Monday - Friday, 9:00 AM - 6:00 PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Emergency Support</h2>
              <p className="text-muted-foreground">
                For critical issues requiring immediate assistance outside of business hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="destructive" asChild>
                <Link href="tel:+15551234567" className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Emergency Support
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/support/emergency" className="flex items-center">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
