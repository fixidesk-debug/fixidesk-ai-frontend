import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, BookOpen, MessageSquare, Settings, Mail, Users, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

const helpCategories = [
  {
    title: "Getting Started",
    description: "New to our platform? Start here to learn the basics.",
    icon: <HelpCircle className="h-6 w-6 text-blue-600" />,
    link: "/support/getting-started"
  },
  {
    title: "Guides & Tutorials",
    description: "Step-by-step guides to help you master our platform.",
    icon: <BookOpen className="h-6 w-6 text-green-600" />,
    link: "/support/guides"
  },
  {
    title: "API Documentation",
    description: "Technical documentation for developers.",
    icon: <Code className="h-6 w-6 text-purple-600" />,
    link: "/docs/api"
  },
  {
    title: "Troubleshooting",
    description: "Solutions to common issues and errors.",
    icon: <Settings className="h-6 w-6 text-orange-600" />,
    link: "/support/troubleshooting"
  },
  {
    title: "FAQ",
    description: "Answers to frequently asked questions.",
    icon: <MessageSquare className="h-6 w-6 text-red-600" />,
    link: "/support/faq"
  },
  {
    title: "Community Forum",
    description: "Connect with other users and share knowledge.",
    icon: <Users className="h-6 w-6 text-amber-600" />,
    link: "/community"
  }
];

const popularArticles = [
  {
    title: "How to set up your first AI assistant",
    category: "Getting Started",
    link: "/support/articles/setup-first-ai-assistant"
  },
  {
    title: "Understanding conversation flows",
    category: "Guides",
    link: "/support/articles/understanding-conversation-flows"
  },
  {
    title: "API rate limits and best practices",
    category: "API",
    link: "/support/articles/api-rate-limits"
  },
  {
    title: "Troubleshooting common integration issues",
    category: "Troubleshooting",
    link: "/support/articles/integration-troubleshooting"
  }
];

export default function HelpCenterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Help Center
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Find answers and learn how to get the most out of our platform
        </p>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search the help center..."
            className="pl-12 pr-4 py-6 text-lg w-full rounded-full"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpCategories.map((category, i) => (
            <Card key={i} className="group hover:shadow-lg transition-shadow">
              <Link href={category.link}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 h-auto font-normal group-hover:text-blue-600 transition-colors" asChild>
                    <div className="flex items-center">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Articles</h2>
          <Button variant="ghost" asChild>
            <Link href="/support/articles" className="flex items-center">
              View all articles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {popularArticles.map((article, i) => (
            <Link key={i} href={article.link} className="block group">
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="text-sm text-muted-foreground mb-1">{article.category}</div>
                <h3 className="font-medium group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="border-blue-200 dark:border-blue-900/50">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <MessageSquare className="h-6 w-6" />
            </div>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>
              Can't find what you're looking for? Our support team is here to help.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/support/contact">
                Contact Us
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-orange-200 dark:border-orange-900/50">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Check the current status of our services and view incident reports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm">All systems operational</span>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/status">
                View Status Page
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/50 rounded-xl p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is available 24/7 to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/support/contact" className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/community" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Ask the Community
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing components (add these to your components directory if needed)
function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-search"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function Code(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-code"
      {...props}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
