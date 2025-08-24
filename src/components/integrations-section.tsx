import { motion } from "framer-motion";

const integrations = [
  { name: "Tiledesk", logo: "https://via.placeholder.com/120x60/16A4A4/FFFFFF?text=Tiledesk" },
  { name: "Activepieces", logo: "https://via.placeholder.com/120x60/3B82F6/FFFFFF?text=Activepieces" },
  { name: "Slack", logo: "https://via.placeholder.com/120x60/4A154B/FFFFFF?text=Slack" },
  { name: "Microsoft Teams", logo: "https://via.placeholder.com/120x60/6264A7/FFFFFF?text=Teams" },
  { name: "Zendesk", logo: "https://via.placeholder.com/120x60/03363D/FFFFFF?text=Zendesk" },
  { name: "Salesforce", logo: "https://via.placeholder.com/120x60/00A1E0/FFFFFF?text=Salesforce" },
  { name: "HubSpot", logo: "https://via.placeholder.com/120x60/FF7A59/FFFFFF?text=HubSpot" },
  { name: "Intercom", logo: "https://via.placeholder.com/120x60/1F8DED/FFFFFF?text=Intercom" },
];

export function IntegrationsSection() {
  return (
    <section id="integrations" className="py-20 lg:py-32">
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
            Seamless Integrations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Connect FixiDesk with your existing tools and workflows. 
            Works with all major platforms and services.
          </motion.p>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center p-6 bg-card rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-beautiful"
            >
              <img
                src={integration.logo}
                alt={`${integration.name} integration`}
                className="max-h-12 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Don't see your integration? We support 1000+ apps through Zapier and custom APIs.
          </p>
          <a 
            href="#contact" 
            className="text-primary hover:text-primary-hover font-medium underline underline-offset-4"
          >
            Request an integration
          </a>
        </motion.div>
      </div>
    </section>
  );
}