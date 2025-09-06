import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, Users, Zap, BarChart, ArrowRight, Search, Check, Mail } from "lucide-react";
import Link from "next/link";

const partnerPrograms = [
  {
    title: "Technology Partners",
    description: "Integrate your technology with our platform and reach new customers.",
    icon: <Zap className="h-6 w-6 text-blue-600" />,
    benefits: [
      "API Access",
      "Co-marketing opportunities",
      "Technical support",
      "Joint go-to-market"
    ]
  },
  {
    title: "Solution Partners",
    description: "Resell our solutions and provide implementation services to your clients.",
    icon: <Handshake className="h-6 w-6 text-green-600" />,
    benefits: [
      "Sales enablement",
      "Deal registration",
      "Training & certification",
      "Revenue sharing"
    ]
  },
  {
    title: "Agency Partners",
    description: "Deliver exceptional customer experiences with our platform.",
    icon: <Users className="h-6 w-6 text-purple-600" />,
    benefits: [
      "Dedicated support",
      "Partner portal access",
      "Lead sharing",
      "Custom solutions"
    ]
  }
];

const successStories = [
  {
    company: "TechSolutions Inc.",
    logo: "TS",
    description: "Increased revenue by 200% through our partner program.",
    link: "#"
  },
  {
    company: "DigitalAgency",
    logo: "DA",
    description: "Successfully implemented our solution for 50+ enterprise clients.",
    link: "#"
  },
  {
    company: "CloudInnovate",
    logo: "CI",
    description: "Expanded service offerings with our AI-powered platform.",
    link: "#"
  }
];

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export default function PartnersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Partner With Us
        </h1>
        <p className="text-xl text-muted-foreground">
          Grow your business with our partner ecosystem
        </p>
      </div>

      <div className="bg-muted/50 rounded-xl p-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="md:flex items-center justify-between gap-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Why Partner With Us?</h2>
              <p className="text-muted-foreground mb-6">
                Join our partner program to access exclusive benefits, resources, and opportunities to grow your business.
              </p>
              <ul className="space-y-3">
                {[
                  "Access to cutting-edge technology",
                  "Dedicated partner support",
                  "Marketing and sales enablement",
                  "Revenue sharing opportunities"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Become a Partner</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company Name</label>
                  <Input placeholder="Your company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Your Name</label>
                  <Input placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input placeholder="Your email address" type="email" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Partner Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select partner type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology Partner</SelectItem>
                      <SelectItem value="solution">Solution Partner</SelectItem>
                      <SelectItem value="agency">Agency Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Submit Application</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Partner Programs</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {partnerPrograms.map((program, i) => (
            <Card key={i} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  {program.icon}
                </div>
                <CardTitle className="text-xl">{program.title}</CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {program.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/partners/apply">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Partner Success Stories</h2>
            <p className="text-muted-foreground">See how our partners are succeeding</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/partners/success-stories">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {successStories.map((story, i) => (
            <Card key={i} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-lg font-medium mb-4">
                  {story.logo}
                </div>
                <h3 className="font-medium mb-2">{story.company}</h3>
                <p className="text-muted-foreground mb-4">{story.description}</p>
                <Button variant="ghost" size="sm" className="p-0 h-auto" asChild>
                  <Link href={story.link} className="flex items-center">
                    Read case study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl p-8">
        <div className="max-w-4xl mx-auto">
          <div className="md:flex items-center justify-between gap-8">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Partner Resources</h2>
              <p className="text-muted-foreground">
                Access our partner portal for marketing materials, sales enablement, and technical resources.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild>
                <Link href="/partners/portal">
                  Partner Portal
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/partners/contact">
                  <Mail className="h-4 w-4 mr-2" /> Contact Partner Team
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing components (add these to your components directory if needed)
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Select({ children, ...props }: SelectProps) {
  return <div className="relative" {...props}>{children}</div>;
}

interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function SelectTrigger({ children, ...props }: SelectTriggerProps) {
  return (
    <div
      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    >
      {children}
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 opacity-50"
      >
        <path
          d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
}

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function SelectContent({ children, ...props }: SelectContentProps) {
  return (
    <div
      className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      {...props}
    >
      <div className="p-1">
        {children}
      </div>
    </div>
  );
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function SelectItem({ children, ...props }: SelectItemProps) {
  return (
    <div
      className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
        >
          <path
            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3334 6.96242 11.3334C6.77929 11.3334 6.60806 11.2374 6.50446 11.078L3.521 6.84182C3.36532 6.59394 3.43014 6.26653 3.67792 6.11084C3.92569 5.95515 4.2531 6.01997 4.40879 6.26775L6.87058 10.2705L10.6015 3.90786C10.7904 3.61896 11.1778 3.53795 11.4669 3.72684Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
      {children}
    </div>
  );
}

interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

function SelectValue({ children, ...props }: SelectValueProps) {
  return <span className="text-sm" {...props}>{children}</span>;
}
