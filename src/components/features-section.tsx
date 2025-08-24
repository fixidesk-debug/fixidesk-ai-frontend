import { motion } from "framer-motion";
import { 
  Bot, 
  MessageSquare, 
  BarChart3, 
  Shield, 
  Clock, 
  Workflow,
  Zap,
  Users,
  Brain
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Assistant",
    description: "Advanced AI that understands context, learns from interactions, and provides accurate responses to customer queries 24/7.",
    color: "text-primary"
  },
  {
    icon: MessageSquare,
    title: "Intelligent Ticket Routing",
    description: "Automatically categorize and route tickets to the right team members based on content analysis and priority scoring.",
    color: "text-accent"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Comprehensive dashboards with performance metrics, customer satisfaction scores, and detailed reporting.",
    color: "text-success"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption, GDPR compliance, and advanced security features to protect your customer data.",
    color: "text-warning"
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Never miss a customer query with round-the-clock automated responses and intelligent escalation.",
    color: "text-primary"
  },
  {
    icon: Workflow,
    title: "Smart Automation",
    description: "Create custom workflows that automate repetitive tasks and streamline your support processes.",
    color: "text-accent"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Average response time under 2 seconds with intelligent caching and optimized AI processing.",
    color: "text-success"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Seamless collaboration tools with internal notes, team assignments, and knowledge sharing.",
    color: "text-warning"
  },
  {
    icon: Brain,
    title: "Continuous Learning",
    description: "AI that gets smarter over time by learning from your team's responses and customer feedback.",
    color: "text-primary"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Powerful Features for Modern Support
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Everything you need to deliver exceptional customer support, 
            powered by cutting-edge AI technology.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-beautiful border-border/50 hover:border-primary/20">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-card flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}