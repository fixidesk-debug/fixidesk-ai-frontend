import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  href: "#",
  icon: Twitter
}, {
  name: "LinkedIn",
  href: "#",
  icon: Linkedin
}, {
  name: "GitHub",
  href: "#",
  icon: Github
}];
export function Footer() {
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
                <h4 className="font-semibold">Stay Updated</h4>
                <div className="flex gap-2 max-w-sm">
                  <Input type="email" placeholder="Enter your email" className="rounded-lg" />
                  <Button variant="default" size="sm">Subscribe</Button>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map(link => <li key={link.name}>
                    <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </a>
                  </li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map(link => <li key={link.name}>
                    <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map(link => <li key={link.name}>
                    <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map(link => <li key={link.name}>
                    <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>)}
              </ul>

              {/* Contact Info */}
              <div className="mt-8 space-y-3">
                <h4 className="font-semibold">Contact</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href="mailto:hello@fixidesk.com" className="hover:text-foreground">hello@f.com</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a href="tel:+1234567890" className="hover:text-foreground">+1 (234) 567-890</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">© 2025 FixiDesk. All rights reserved.</div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map(social => <a key={social.name} href={social.href} className="text-muted-foreground hover:text-foreground transition-colors" aria-label={social.name}>
                  <social.icon className="h-5 w-5" />
                </a>)}
            </div>
          </div>
        </div>
      </div>
    </footer>;
}