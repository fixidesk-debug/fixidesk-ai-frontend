import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";

const steps = [
  {
    step: "01",
    titleKey: "how.step1.title",
    descriptionKey: "how.step1.desc",
    featuresKeys: ["how.step1.f1", "how.step1.f2", "how.step1.f3", "how.step1.f4"]
  },
  {
    step: "02",
    titleKey: "how.step2.title",
    descriptionKey: "how.step2.desc",
    featuresKeys: ["how.step2.f1", "how.step2.f2", "how.step2.f3", "how.step2.f4"]
  },
  {
    step: "03",
    titleKey: "how.step3.title",
    descriptionKey: "how.step3.desc",
    featuresKeys: ["how.step3.f1", "how.step3.f2", "how.step3.f3", "how.step3.f4"]
  }
];

export function HowItWorksSection() {
  const { t } = useI18n();
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
            {t("how.header")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            {t("how.sub")}
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
                  <h3 className="text-xl font-semibold mb-4">{t(step.titleKey)}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t(step.descriptionKey)}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {step.featuresKeys.map((featureKey) => (
                      <li key={featureKey} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{t(featureKey)}</span>
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