import { motion } from "framer-motion";
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
import React from "react";
import { Marquee } from "@/components/ui/marquee";
import { useI18n } from "@/lib/i18n";

const integrations = [
  { 
    name: "Slack", 
    icon: <SiSlack className="h-8 w-8 text-[#4A154B] dark:text-[#E01E5A]" />,
    bg: "bg-[#4A154B] dark:bg-[#4A154B]/10"
  },
  { 
    name: "Microsoft Teams", 
    icon: <BsMicrosoftTeams className="h-8 w-8 text-[#6264A7] dark:text-[#7B83EB]" />,
    bg: "bg-[#6264A7] dark:bg-[#6264A7]/10"
  },
  { 
    name: "WhatsApp Business", 
    icon: <SiWhatsapp className="h-8 w-8 text-[#25D366] dark:text-[#128C7E]" />,
    bg: "bg-[#25D366] dark:bg-[#25D366]/10"
  },
  { 
    name: "Facebook Messenger", 
    icon: <SiMessenger className="h-8 w-8 text-[#0084FF] dark:text-[#0084FF]" />,
    bg: "bg-[#0084FF] dark:bg-[#0084FF]/10"
  },
  { 
    name: "Instagram DM", 
    icon: <SiInstagram className="h-8 w-8 text-[#E4405F] dark:text-[#E4405F]" />,
    bg: "bg-gradient-to-br from-[#F77737] via-[#E1306C] to-[#833AB4] dark:from-[#F77737]/10 dark:via-[#E1306C]/10 dark:to-[#833AB4]/10"
  },
  { 
    name: "HubSpot", 
    icon: <SiHubspot className="h-8 w-8 text-[#FF7A59] dark:text-[#FF7A59]" />,
    bg: "bg-[#FF7A59] dark:bg-[#FF7A59]/10"
  },
  { 
    name: "Salesforce", 
    icon: <SiSalesforce className="h-8 w-8 text-[#00A1E0] dark:text-[#00A1E0]" />,
    bg: "bg-[#00A1E0] dark:bg-[#00A1E0]/10"
  },
  { 
    name: "Zendesk", 
    icon: <SiZendesk className="h-8 w-8 text-[#03363D] dark:text-[#2F4F4F]" />,
    bg: "bg-[#03363D] dark:bg-[#03363D]/10"
  },
  { 
    name: "Zapier", 
    icon: <SiZapier className="h-8 w-8 text-[#FF4A00] dark:text-[#FF4A00]" />,
    bg: "bg-[#FF4A00] dark:bg-[#FF4A00]/10"
  },
];

export const IntegrationsSection = () => {
  const { t } = useI18n();
  return (
    <section id="integrations" className="py-20 lg:py-32 overflow-hidden bg-white dark:bg-gray-900">
      {/* Local styles for marquee animation (Vite-compatible) */}
      <style>{`
        @keyframes integrations-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: integrations-marquee 28s linear infinite;
          will-change: transform;
        }
        /* Single-track approach with duplicated items avoids overlap */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee,
          .animate-marquee2 {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
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
            {t("integrations.header")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            {t("integrations.sub")}
          </motion.p>
        </div>

        {/* Continuous Horizontal Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Main marquee container using reusable component */}
          <div className="relative [mask-image:_linear_gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)]">
            <Marquee speedSeconds={28} pauseOnHover className="py-8" trackClassName="space-x-8 min-w-max">
              {integrations.map((integration, index) => (
                <div
                  key={`integration-${integration.name}-${index}`}
                  className={`group flex-shrink-0 flex items-center justify-center p-6 rounded-2xl border border-border/20 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${integration.bg} bg-opacity-5 dark:bg-opacity-10`}
                >
                  <div className="relative group-hover:scale-110 transition-transform duration-300">
                    {integration.icon}
                  </div>
                </div>
              ))}
            </Marquee>
            {/* Left and right blur halves; middle third remains clear */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 backdrop-blur-sm">
              <div className="h-full w-full bg-white/10 dark:bg-gray-900/10 [mask-image:_linear-gradient(to_right,_black_65%,_transparent_100%)]" />
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 backdrop-blur-sm">
              <div className="h-full w-full bg-white/10 dark:bg-gray-900/10 [mask-image:_linear-gradient(to_left,_black_65%,_transparent_100%)]" />
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            {t("integrations.ctaSub")}
          </p>
          <a 
            href="/integrations" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-card hover:bg-card-hover border border-border/50 hover:border-primary/20 rounded-xl text-foreground hover:text-primary font-medium transition-all duration-300 hover:shadow-beautiful group"
          >
            {t("integrations.cta")}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};