import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, MessageCircle, Copy, Check } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SITE_CONTACT, SOCIAL_LINKS } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
const footerLinks = {
  product: [{
    name: "Features",
    href: "#features"
  }, {
    name: "Pricing",
    href: "#pricing"
  }, {
    name: "Integrations",
    href: "#integrations"
  }, {
    name: "Security",
    href: "/security"
  }, {
    name: "API",
    href: "/api"
  }],
  company: [{
    name: "About",
    href: "/about"
  }, {
    name: "Blog",
    href: "/blog"
  }, {
    name: "Careers",
    href: "/careers"
  }, {
    name: "Press",
    href: "/press"
  }, {
    name: "Partners",
    href: "/partners"
  }],
  support: [{
    name: "Help Center",
    href: "/help"
  }, {
    name: "Documentation",
    href: "/docs"
  }, {
    name: "Contact Support",
    href: "/support"
  }, {
    name: "Status",
    href: "/status"
  }, {
    name: "Community",
    href: "/community"
  }],
  legal: [{
    name: "Privacy Policy",
    href: "/legal/privacy"
  }, {
    name: "Terms of Service",
    href: "/legal/terms"
  }, {
    name: "Cookie Policy",
    href: "/cookies"
  }, {
    name: "GDPR",
    href: "/gdpr"
  }]
};
const socialLinks = [{
  name: "Twitter",
  href: SOCIAL_LINKS.twitter,
  icon: Twitter,
  ariaLabel: "Visit our Twitter profile"
}, {
  name: "LinkedIn",
  href: SOCIAL_LINKS.linkedin,
  icon: Linkedin,
  ariaLabel: "Visit our LinkedIn page"
}, {
  name: "GitHub",
  href: SOCIAL_LINKS.github,
  icon: Github,
  ariaLabel: "View our GitHub repository"
}];
export function Footer() {
  const { t } = useI18n();
  return <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Logo size="md" clickable={false} className="mb-4" />
              <p className="text-muted-foreground mb-6 max-w-md">
                Transform your customer support with AI-powered automation. 
                Join thousands of businesses already using FixiDesk.
              </p>

              {/* Newsletter */}
              <div className="space-y-4">
                <h4 className="font-semibold">{t("footer.stayUpdated") || "Stay Updated"}</h4>
                <div className="flex gap-2 max-w-sm">
                  <Input type="email" placeholder="Enter your email" className="rounded-lg" />
                  <Button variant="default" size="sm">{t("footer.subscribe") || "Subscribe"}</Button>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h4 className="font-semibold mb-4">{t("footer.product") || "Product"}</h4>
              <ul className="space-y-3">
                {footerLinks.product.map(link => <li key={link.name}>
                    <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </a>
                  </li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t("footer.company") || "Company"}</h4>
              <ul className="space-y-3">
                {footerLinks.company.map(link => <li key={link.name}>
                    <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t("footer.support") || "Support"}</h4>
              <ul className="space-y-3">
                {footerLinks.support.map(link => <li key={link.name}>
                    <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t("footer.legal") || "Legal"}</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map(link => <li key={link.name}>
                    <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>)}
              </ul>

              {/* Contact Info */}
              <div className="mt-8 space-y-4">
                <h4 className="font-semibold">{t("footer.contactUs") || "Contact Us"}</h4>
                <div className="space-y-3 text-sm">
                  <div className="group relative">
                    <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <a 
                        href={`mailto:${SITE_CONTACT.email}`} 
                        className="hover:underline"
                        aria-label={`Email us at ${SITE_CONTACT.email}`}
                      >
                        {SITE_CONTACT.email}
                      </a>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(SITE_CONTACT.email);
                          const button = document.getElementById('copy-email');
                          if (button) {
                            button.innerHTML = '<Check className="h-4 w-4" />';
                            setTimeout(() => {
                              if (button) button.innerHTML = '<Copy className="h-4 w-4" />';
                            }, 2000);
                          }
                        }}
                        className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Copy email to clipboard"
                        id="copy-email"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <a 
                          href={`tel:${SITE_CONTACT.phoneHref}`} 
                          className="hover:underline whitespace-nowrap"
                          aria-label={`Call us at ${SITE_CONTACT.phoneDisplay}`}
                        >
                          {SITE_CONTACT.phoneDisplay}
                        </a>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">(Mon-Sat, 9AM-6PM IST)</span>
                    </div>
                  </div>

                  <div className="pl-6">
                    <a 
                      href={SITE_CONTACT.whatsappHref} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors text-sm"
                      aria-label="Message us on WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground"> 2025 FixiDesk. All rights reserved.</div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map(social => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.ariaLabel}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>;
}