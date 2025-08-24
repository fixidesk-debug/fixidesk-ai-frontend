import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    step: "01",
    title: "Connect Your Channels",
    description: "Integrate FixiDesk with your existing email, chat, and social media channels in just a few clicks.",
    features: ["Email integration", "Live chat widget", "Social media sync", "API connections"]
  },
  {
    step: "02",
    title: "Train Your AI Assistant",
    description: "Upload your knowledge base, FAQs, and product documentation to train the AI on your specific business.",
    features: ["Knowledge base import", "FAQ training", "Custom responses", "Brand voice tuning"]
  },
  {
    step: "03",
    title: "Automate & Monitor",
    description: "Let FixiDesk handle routine queries automatically while your team focuses on complex issues.",
    features: ["Automated responses", "Smart escalation", "Performance analytics", "Continuous improvement"]
  }
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
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
            How FixiDesk Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Get started in minutes with our simple three-step process. 
            No technical expertise required.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connector Arrow (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
              )}

              <Card className="h-full transition-all duration-300 hover:shadow-beautiful border-border/50 hover:border-primary/20">
                <CardContent className="p-8">
                  {/* Step Number */}
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {step.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
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
  );
}