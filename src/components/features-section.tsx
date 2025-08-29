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
import { useI18n } from "@/lib/i18n";

const features = [
  {
    icon: Bot,
    titleKey: "features.aiAssistant.title",
    descKey: "features.aiAssistant.desc",
    color: "text-primary"
  },
  {
    icon: MessageSquare,
    titleKey: "features.ticketRouting.title",
    descKey: "features.ticketRouting.desc",
    color: "text-accent"
  },
  {
    icon: BarChart3,
    titleKey: "features.analytics.title",
    descKey: "features.analytics.desc",
    color: "text-success"
  },
  {
    icon: Shield,
    titleKey: "features.security.title",
    descKey: "features.security.desc",
    color: "text-warning"
  },
  {
    icon: Clock,
    titleKey: "features.availability.title",
    descKey: "features.availability.desc",
    color: "text-primary"
  },
  {
    icon: Workflow,
    titleKey: "features.automation.title",
    descKey: "features.automation.desc",
    color: "text-accent"
  },
  {
    icon: Zap,
    titleKey: "features.fast.title",
    descKey: "features.fast.desc",
    color: "text-success"
  },
  {
    icon: Users,
    titleKey: "features.collaboration.title",
    descKey: "features.collaboration.desc",
    color: "text-warning"
  },
  {
    icon: Brain,
    titleKey: "features.learning.title",
    descKey: "features.learning.desc",
    color: "text-primary"
  }
];

export function FeaturesSection() {
  const { t } = useI18n();
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
            {t("features.header")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            {t("features.sub")}
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
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
                    {t(feature.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {t(feature.descKey)}
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