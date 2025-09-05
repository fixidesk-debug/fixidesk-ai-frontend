import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const plans = [
  {
    nameKey: "pricing.plan.starter.name",
    descriptionKey: "pricing.plan.starter.desc",
    price: "$29",
    periodKey: "pricing.perMonth",
    features: [
      "pricing.plan.starter.f1",
      "pricing.plan.starter.f2",
      "pricing.plan.starter.f3",
      "pricing.plan.starter.f4",
      "pricing.plan.starter.f5",
      "pricing.plan.starter.f6"
    ],
    ctaKey: "pricing.ctaStart",
    popular: false
  },
  {
    nameKey: "pricing.plan.pro.name",
    descriptionKey: "pricing.plan.pro.desc",
    price: "$79",
    periodKey: "pricing.perMonth",
    features: [
      "pricing.plan.pro.f1",
      "pricing.plan.pro.f2",
      "pricing.plan.pro.f3",
      "pricing.plan.pro.f4",
      "pricing.plan.pro.f5",
      "pricing.plan.pro.f6",
      "pricing.plan.pro.f7",
      "pricing.plan.pro.f8"
    ],
    ctaKey: "pricing.ctaStart",
    popular: true
  },
  {
    nameKey: "pricing.plan.ent.name",
    descriptionKey: "pricing.plan.ent.desc",
    price: "Custom",
    periodKey: "pricing.contactSales",
    features: [
      "pricing.plan.ent.f1",
      "pricing.plan.ent.f2",
      "pricing.plan.ent.f3",
      "pricing.plan.ent.f4",
      "pricing.plan.ent.f5",
      "pricing.plan.ent.f6",
      "pricing.plan.ent.f7",
      "pricing.plan.ent.f8"
    ],
    ctaKey: "pricing.ctaContact",
    popular: false
  }
];

export function PricingSection() {
  const { t } = useI18n();
  return (
    <section id="pricing" className="py-20 lg:py-32 bg-muted/30">
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
            {t("pricing.header")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            {t("pricing.sub")}
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.nameKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    {t("pricing.mostPopular")}
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full transition-all duration-300 hover:shadow-beautiful ${
                plan.popular 
                  ? 'border-primary shadow-glow' 
                  : 'border-border/50 hover:border-primary/20'
              }`}>
                <CardHeader className="pb-8">
                  <CardTitle className="text-xl font-semibold">{t(plan.nameKey)}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {t(plan.descriptionKey)}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-muted-foreground ml-1">/{t(plan.periodKey)}</span>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((featureKey) => (
                      <li key={featureKey} className="flex items-start">
                        <Check className="h-5 w-5 text-success mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="pt-4">
                    <Button 
                      variant={plan.popular ? "hero" : "outline"} 
                      size="lg" 
                      className="w-full"
                      asChild
                    >
                      <Link to={t(plan.nameKey) === t("pricing.plan.ent.name") ? "/contact" : "/signup"}>
                        {t(plan.ctaKey)}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            {t("pricing.bottom")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}