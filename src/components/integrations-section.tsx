import { motion } from "framer-motion";
import slackLogo from "@/assets/slack-logo.svg";
import teamsLogo from "@/assets/teams-logo.svg";
import whatsappLogo from "@/assets/whatsapp-logo.svg";
import messengerLogo from "@/assets/messenger-logo.svg";
import instagramLogo from "@/assets/instagram-logo.svg";
import hubspotLogo from "@/assets/hubspot-logo.svg";
import salesforceLogo from "@/assets/salesforce-logo.svg";
import zendeskLogo from "@/assets/zendesk-logo.svg";
import zapierLogo from "@/assets/zapier-logo.svg";

const integrations = [
  { 
    name: "Slack", 
    logo: slackLogo,
    tagline: "Team communication platform",
    bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
    borderColor: "border-purple-200/50 dark:border-purple-500/30"
  },
  { 
    name: "Microsoft Teams", 
    logo: teamsLogo,
    tagline: "Collaboration workspace by Microsoft",
    bgColor: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
    borderColor: "border-blue-200/50 dark:border-blue-500/30"
  },
  { 
    name: "WhatsApp Business", 
    logo: whatsappLogo,
    tagline: "Business messaging API",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    borderColor: "border-green-200/50 dark:border-green-500/30"
  },
  { 
    name: "Facebook Messenger", 
    logo: messengerLogo,
    tagline: "Facebook's messaging platform",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
    borderColor: "border-blue-200/50 dark:border-blue-500/30"
  },
  { 
    name: "Instagram DM", 
    logo: instagramLogo,
    tagline: "Direct messaging for Instagram",
    bgColor: "bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20",
    borderColor: "border-pink-200/50 dark:border-pink-500/30"
  },
  { 
    name: "HubSpot", 
    logo: hubspotLogo,
    tagline: "CRM & marketing automation",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
    borderColor: "border-orange-200/50 dark:border-orange-500/30"
  },
  { 
    name: "Salesforce", 
    logo: salesforceLogo,
    tagline: "Enterprise CRM solution",
    bgColor: "bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20",
    borderColor: "border-blue-200/50 dark:border-blue-500/30"
  },
  { 
    name: "Zendesk", 
    logo: zendeskLogo,
    tagline: "Customer support & help desk",
    bgColor: "bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20",
    borderColor: "border-teal-200/50 dark:border-teal-500/30"
  },
  { 
    name: "Zapier", 
    logo: zapierLogo,
    tagline: "Automation across 5000+ apps",
    bgColor: "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20",
    borderColor: "border-orange-200/50 dark:border-orange-500/30"
  },
];

export function IntegrationsSection() {
  return (
    <section id="integrations" className="py-20 lg:py-32 overflow-hidden">
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
            Seamlessly integrates with your favorite tools
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            From CRMs to collaboration platforms, FixiDesk connects where your work happens.
          </motion.p>
        </div>

        {/* Responsive Grid Integrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-16"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-2xl ${integration.bgColor} border ${integration.borderColor} p-8 hover:shadow-beautiful transition-all duration-500 hover:scale-105 cursor-pointer`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-white/80 dark:bg-white/90 shadow-sm group-hover:shadow-md transition-all duration-300">
                  <img
                    src={integration.logo}
                    alt={`${integration.name} logo`}
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    {integration.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {integration.tagline}
                  </p>
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* Scrolling Marquee for Additional Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <h3 className="text-center text-lg font-medium text-muted-foreground mb-8">
            Plus thousands more through our integration platform
          </h3>
          <div className="flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex animate-marquee space-x-6 py-4">
              {[...integrations.slice(0, 6), ...integrations.slice(0, 6)].map((integration, index) => (
                <div
                  key={`marquee-${integration.name}-${index}`}
                  className="group flex-shrink-0 flex items-center justify-center w-32 h-16 bg-card/40 backdrop-blur-sm rounded-xl border border-border/20 hover:[animation-play-state:paused] transition-all duration-300"
                >
                  <img
                    src={integration.logo}
                    alt={`${integration.name} integration`}
                    className="h-6 w-auto opacity-50 group-hover:opacity-80 transition-opacity duration-300"
                  />
                </div>
              ))}
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
            Connect with 1000+ apps through our platform
          </p>
          <a 
            href="/integrations" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-card hover:bg-card-hover border border-border/50 hover:border-primary/20 rounded-xl text-foreground hover:text-primary font-medium transition-all duration-300 hover:shadow-beautiful group"
          >
            See All Integrations
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}