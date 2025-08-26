import { motion } from "framer-motion";

const integrations = [
  { name: "Slack", logo: "https://via.placeholder.com/120x40/4A154B/FFFFFF?text=Slack" },
  { name: "Microsoft Teams", logo: "https://via.placeholder.com/120x40/6264A7/FFFFFF?text=Teams" },
  { name: "WhatsApp Business", logo: "https://via.placeholder.com/120x40/25D366/FFFFFF?text=WhatsApp" },
  { name: "Facebook Messenger", logo: "https://via.placeholder.com/120x40/0084FF/FFFFFF?text=Messenger" },
  { name: "Instagram DM", logo: "https://via.placeholder.com/120x40/E4405F/FFFFFF?text=Instagram" },
  { name: "HubSpot", logo: "https://via.placeholder.com/120x40/FF7A59/FFFFFF?text=HubSpot" },
  { name: "Salesforce", logo: "https://via.placeholder.com/120x40/00A1E0/FFFFFF?text=Salesforce" },
  { name: "Zendesk", logo: "https://via.placeholder.com/120x40/03363D/FFFFFF?text=Zendesk" },
  { name: "Zapier", logo: "https://via.placeholder.com/120x40/FF4A00/FFFFFF?text=Zapier" },
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

        {/* Scrolling Integrations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex animate-marquee space-x-8 py-8">
              {[...integrations, ...integrations].map((integration, index) => (
                <div
                  key={`${integration.name}-${index}`}
                  className="group flex-shrink-0 flex items-center justify-center w-40 h-20 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/30 shadow-elegant hover:shadow-beautiful hover:border-primary/20 transition-all duration-500 hover:scale-105 hover:bg-card/80 hover:[animation-play-state:paused]"
                >
                  <img
                    src={integration.logo}
                    alt={`${integration.name} integration`}
                    className="h-8 w-auto filter opacity-60 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="flex animate-marquee space-x-8 py-8" aria-hidden="true">
              {[...integrations, ...integrations].map((integration, index) => (
                <div
                  key={`${integration.name}-duplicate-${index}`}
                  className="group flex-shrink-0 flex items-center justify-center w-40 h-20 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/30 shadow-elegant hover:shadow-beautiful hover:border-primary/20 transition-all duration-500 hover:scale-105 hover:bg-card/80 hover:[animation-play-state:paused]"
                >
                  <img
                    src={integration.logo}
                    alt={`${integration.name} integration`}
                    className="h-8 w-auto filter opacity-60 group-hover:opacity-100 transition-all duration-300"
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