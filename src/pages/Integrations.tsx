import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { trackClick } from "@/lib/analytics";
import { BsMicrosoftTeams } from "react-icons/bs";
import { 
  SiSlack, 
  SiWhatsapp,
  SiMessenger,
  SiInstagram,
  SiHubspot,
  SiSalesforce,
  SiZendesk,
  SiZapier 
} from "react-icons/si";

const integrations = [
  {
    name: "Slack",
    description: "Receive ticket notifications and manage support directly from Slack",
    icon: <SiSlack className="h-10 w-10 text-[#4A154B]" />,
    category: "Communication",
    features: ["Real-time notifications", "Direct ticket management", "Team collaboration"],
    pricing: "Free",
    popular: true,
  },
  {
    name: "Microsoft Teams",
    description: "Seamless integration with your Microsoft Teams workspace",
    icon: <BsMicrosoftTeams className="h-10 w-10 text-[#6264A7]" />,
    category: "Communication",
    features: ["Team notifications", "Shared channels", "File sharing"],
    pricing: "Free",
    popular: true,
  },
  {
    name: "WhatsApp Business",
    description: "Handle customer support through WhatsApp Business API",
    icon: <SiWhatsapp className="h-10 w-10 text-[#25D366]" />,
    category: "Messaging",
    features: ["Business API", "Rich media support", "Auto-responses"],
    pricing: "Premium",
    popular: true,
  },
  {
    name: "Facebook Messenger",
    description: "Connect with customers on Facebook Messenger",
    icon: <SiMessenger className="h-10 w-10 text-[#0084FF]" />,
    category: "Messaging",
    features: ["Automated responses", "Rich media", "Customer profiles"],
    pricing: "Free",
    popular: false,
  },
  {
    name: "Instagram DM",
    description: "Manage Instagram direct messages from your dashboard",
    icon: <SiInstagram className="h-10 w-10 text-[#E4405F]" />,
    category: "Social Media",
    features: ["DM management", "Story responses", "Media handling"],
    pricing: "Premium",
    popular: false,
  },
  {
    name: "HubSpot",
    description: "Sync customer data and tickets with HubSpot CRM",
    icon: <SiHubspot className="h-10 w-10 text-[#FF7A59]" />,
    category: "CRM",
    features: ["Contact sync", "Deal tracking", "Email marketing"],
    pricing: "Premium",
    popular: true,
  },
  {
    name: "Salesforce",
    description: "Connect with Salesforce for advanced CRM features",
    icon: <SiSalesforce className="h-10 w-10 text-[#00A1E0]" />,
    category: "CRM",
    features: ["Lead management", "Opportunity tracking", "Custom objects"],
    pricing: "Enterprise",
    popular: true,
  },
  {
    name: "Zendesk",
    description: "Integrate with Zendesk Support and Guide",
    icon: <SiZendesk className="h-10 w-10 text-[#03363D]" />,
    category: "Help Desk",
    features: ["Ticket sync", "Knowledge base", "Customer portal"],
    pricing: "Premium",
    popular: false,
  },
  {
    name: "Zapier",
    description: "Connect with 5000+ apps through Zapier",
    icon: <SiZapier className="h-10 w-10 text-[#FF4A00]" />,
    category: "Automation",
    features: ["Multi-step Zaps", "Webhooks", "Custom integrations"],
    pricing: "Free",
    popular: true,
  },
];

const categories = ["All", "Communication", "Messaging", "Social Media", "CRM", "Help Desk", "Automation"];

export default function Integrations() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              >
                1000+ Integrations
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto"
              >
                Connect FixiDesk with your favorite tools and platforms. Build powerful workflows 
                that automatically sync data, trigger actions, and keep your team in the loop.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-10 flex flex-wrap justify-center gap-4"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">5-minute setup</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
                  <Shield className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">Enterprise security</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">Real-time sync</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Integrations Grid */}
        <section className="pb-20 lg:pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </motion.div>

            {/* Integrations Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="relative h-full transition-all duration-300 hover:shadow-beautiful border-border/50 hover:border-primary/20 group">
                    {integration.popular && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-20 w-20 flex items-center justify-center rounded-lg bg-muted/50">
                          {integration.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{integration.name}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {integration.category}
                            </Badge>
                          </div>
                          <CardDescription className="mt-2">
                            {integration.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Features</h4>
                          <ul className="space-y-1">
                            {integration.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="h-3 w-3 text-success" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <span className="text-sm text-muted-foreground">Pricing: </span>
                            <Badge 
                              variant={integration.pricing === "Free" ? "secondary" : "outline"}
                              className="text-xs"
                            >
                              {integration.pricing}
                            </Badge>
                          </div>
                          <Button size="sm" className="group-hover:translate-x-1 transition-transform">
                            Connect
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Custom Integration CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16 text-center"
            >
              <Card className="bg-gradient-primary text-primary-foreground border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Need a Custom Integration?</h3>
                  <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                    Our team can build custom integrations for your specific needs. 
                    Connect any API or service to FixiDesk with our enterprise solutions.
                  </p>
                  <Button variant="secondary" size="lg" onClick={() => trackClick("contact-sales", { from: "integrations-hero" })}>
                    Contact Sales
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}