import { SITE_CONTACT } from "@/lib/site";
import { Mail, Phone, MessageCircle } from "lucide-react";

type ContactBlockProps = {
  compact?: boolean;
  showLabels?: boolean;
  className?: string;
};

export function ContactBlock({ compact = false, showLabels = true, className = "" }: ContactBlockProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Mail className="h-4 w-4 flex-shrink-0" />
        {showLabels && <span className="sr-only">Email:</span>}
        <a
          href={`mailto:${SITE_CONTACT.email}`}
          className="hover:underline"
          aria-label={`Email us at ${SITE_CONTACT.email}`}
        >
          {SITE_CONTACT.email}
        </a>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Phone className="h-4 w-4 flex-shrink-0" />
        {showLabels && <span className="sr-only">Phone:</span>}
        <a
          href={`tel:${SITE_CONTACT.phoneHref}`}
          className="hover:underline whitespace-nowrap"
          aria-label={`Call us at ${SITE_CONTACT.phoneDisplay}`}
        >
          {SITE_CONTACT.phoneDisplay}
        </a>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <MessageCircle className="h-4 w-4 flex-shrink-0" />
        {showLabels && <span className="sr-only">WhatsApp:</span>}
        <a
          href={SITE_CONTACT.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          aria-label="Message us on WhatsApp"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}


