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
  { name: "Slack", logo: slackLogo },
  { name: "Microsoft Teams", logo: teamsLogo },
  { name: "WhatsApp Business", logo: whatsappLogo },
  { name: "Facebook Messenger", logo: messengerLogo },
  { name: "Instagram DM", logo: instagramLogo },
  { name: "HubSpot", logo: hubspotLogo },
  { name: "Salesforce", logo: salesforceLogo },
  { name: "Zendesk", logo: zendeskLogo },
  { name: "Zapier", logo: zapierLogo },
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

        {/* Continuous Horizontal Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main marquee container */}
          <div className="flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            {/* First set of logos */}
            <div className="flex animate-marquee space-x-12 py-8 min-w-max">
              {integrations.map((integration, index) => (
                <div
                  key={`first-${integration.name}-${index}`}
                  className="group flex-shrink-0 flex items-center justify-center px-6 py-4 bg-white/60 dark:bg-card/40 backdrop-blur-sm rounded-2xl border border-border/20 shadow-sm hover:shadow-md hover:bg-white/80 dark:hover:bg-card/60 transition-all duration-300 hover:[animation-play-state:paused] cursor-pointer"
                >
                  <img
                    src={integration.logo}
                    alt={`${integration.name} integration`}
                    className="h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter dark:brightness-100"
                  />
                </div>
              ))}
            </div>
            
            {/* Second set of logos for seamless loop */}
            <div className="flex animate-marquee space-x-12 py-8 min-w-max" aria-hidden="true">
              {integrations.map((integration, index) => (
                <div
                  key={`second-${integration.name}-${index}`}
                  className="group flex-shrink-0 flex items-center justify-center px-6 py-4 bg-white/60 dark:bg-card/40 backdrop-blur-sm rounded-2xl border border-border/20 shadow-sm hover:shadow-md hover:bg-white/80 dark:hover:bg-card/60 transition-all duration-300 hover:[animation-play-state:paused] cursor-pointer"
                >
                  <img
                    src={integration.logo}
                    alt={`${integration.name} integration`}
                    className="h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter dark:brightness-100"
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