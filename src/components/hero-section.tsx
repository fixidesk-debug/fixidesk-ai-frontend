import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";

export function HeroSection() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5 dark:opacity-10" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              <Star className="w-4 h-4 mr-2 text-accent" />
              {t("hero.badge")}
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {t("hero.head.pre")} {" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {t("hero.head.highlight")}
            </span>{" "}
            {t("hero.head.post")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto"
          >
            {t("hero.sub")}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span>{t("hero.stat.1")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <span>{t("hero.stat.2")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-accent" />
              <span>{t("hero.stat.3")}</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex items-center justify-center gap-4 flex-wrap"
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/signup">
                {t("hero.cta.start")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#demo">
                <Play className="mr-2 h-4 w-4" />
                {t("hero.cta.watch")}
              </a>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            {t("hero.trust")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}