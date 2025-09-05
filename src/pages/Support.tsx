import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Search, MessageCircle, Book, Video, Mail, Phone, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Support = () => {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      availability: "24/7",
      responseTime: "< 2 minutes"
    },
    {
      icon: Mail,
      title: "Email Support", 
      description: "Send us a detailed message",
      action: "Send Email",
      availability: "24/7",
      responseTime: "< 4 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Talk to our experts directly",
      action: "Request Call",
      availability: "Mon-Fri 9AM-6PM EST",
      responseTime: "< 30 minutes"
    },
    {
      icon: Book,
      title: "Documentation",
      description: "Browse our comprehensive guides",
      action: "View Docs",
      availability: "Always available",
      responseTime: "Instant"
    }
  ];

  const quickHelp = [
    {
      title: "Getting Started",
      questions: [
        "How do I set up my first integration?",
        "What's included in the free trial?",
        "How to invite team members?",
        "Setting up automated responses"
      ]
    },
    {
      title: "Account & Billing",
      questions: [
        "How to upgrade my plan?",
        "Managing subscription and billing",
        "Downloading invoices",
        "Canceling or pausing account"
      ]
    },
    {
      title: "Integrations",
      questions: [
        "Connecting Slack workspace",
        "WhatsApp Business API setup",
        "Zendesk integration guide",
        "Custom API documentation"
      ]
    }
  ];

  const popularArticles = [
    {
      title: "Complete Setup Guide for New Users",
      views: "12.5k views",
      category: "Getting Started"
    },
    {
      title: "Troubleshooting Common Integration Issues",
      views: "8.2k views", 
      category: "Integrations"
    },
    {
      title: "Understanding AI Response Accuracy",
      views: "6.8k views",
      category: "AI Features"
    },
    {
      title: "Best Practices for Team Collaboration",
      views: "5.4k views",
      category: "Team Management"
    }
  ];

  const { toast } = useToast();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      toast({ title: "Missing information", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    if (!validateEmail(form.email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      // Simulate send
      await new Promise(res => setTimeout(res, 600));
      toast({ title: "Message sent", description: "We will get back to you within 4 hours." });
      setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast({ title: "Could not send message", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

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
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                How can we <span className="text-primary">help you?</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Get the support you need to succeed with FixiDesk
              </p>
              
              {/* Search */}
              <div className="flex gap-2 max-w-2xl mx-auto mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Search for help articles, guides, or common questions..." 
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <Button size="lg">Search</Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Popular searches: <span className="text-primary cursor-pointer hover:underline">setup guide</span>, 
                <span className="text-primary cursor-pointer hover:underline ml-2">billing</span>, 
                <span className="text-primary cursor-pointer hover:underline ml-2">integrations</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Support Options */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <option.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">{option.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{option.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {option.availability}
                        </div>
                        <div className="text-xs text-primary font-medium">
                          Response: {option.responseTime}
                        </div>
                      </div>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                        {option.action}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Help */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Quick Help</h2>
              <p className="text-lg text-muted-foreground">
                Find answers to commonly asked questions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {quickHelp.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">{category.title}</h3>
                      <ul className="space-y-3">
                        {category.questions.map((question) => (
                          <li key={question}>
                            <a 
                              href="#" 
                              className="text-muted-foreground hover:text-primary text-sm transition-colors block py-1"
                            >
                              {question}
                            </a>
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

        {/* Popular Articles */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Popular Articles</h2>
              <p className="text-lg text-muted-foreground">
                Most viewed help articles this month
              </p>
            </div>
            
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground mb-2 hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Badge variant="secondary">{article.category}</Badge>
                            <span>{article.views}</span>
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-muted-foreground ml-4" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline">View All Articles</Button>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Still need help?</h2>
                    <p className="text-muted-foreground">
                      Send us a message and we'll get back to you within 4 hours
                    </p>
                  </div>
                  
                  <form className="space-y-6" onSubmit={onSubmit} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          First Name
                        </label>
                        <Input placeholder="Enter your first name" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Last Name
                        </label>
                        <Input placeholder="Enter your last name" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Email
                      </label>
                      <Input type="email" placeholder="Enter your email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Subject
                      </label>
                      <Input placeholder="What's this about?" value={form.subject} onChange={(e) => update("subject", e.target.value)} required />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Message
                      </label>
                      <Textarea 
                        placeholder="Describe your issue or question in detail..."
                        className="min-h-[120px]"
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button size="lg" className="w-full" type="submit" disabled={submitting}>
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support;