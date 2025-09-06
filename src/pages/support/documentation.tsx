import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Terminal, Server, Database, Zap, Settings, ArrowRight, Search, Download, FileText } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "Getting Started",
    description: "New to our platform? Start here to learn the basics.",
    icon: <Zap className="h-5 w-5 text-blue-600" />,
    articles: [
      { title: "Introduction", slug: "introduction" },
      { title: "Quick Start Guide", slug: "quick-start" },
      { title: "Key Concepts", slug: "key-concepts" },
      { title: "System Requirements", slug: "system-requirements" }
    ]
  },
  {
    title: "API Reference",
    description: "Complete API documentation for developers.",
    icon: <Code className="h-5 w-5 text-green-600" />,
    articles: [
      { title: "Authentication", slug: "api/authentication" },
      { title: "Endpoints", slug: "api/endpoints" },
      { title: "Webhooks", slug: "api/webhooks" },
      { title: "Rate Limiting", slug: "api/rate-limiting" }
    ]
  },
  {
    title: "Guides",
    description: "Step-by-step tutorials and how-tos.",
    icon: <BookOpen className="h-5 w-5 text-purple-600" />,
    articles: [
      { title: "Building Your First Bot", slug: "guides/first-bot" },
      { title: "Integrating with Slack", slug: "guides/slack-integration" },
      { title: "Custom Responses", slug: "guides/custom-responses" },
      { title: "Analytics Setup", slug: "guides/analytics" }
    ]
  },
  {
    title: "Deployment",
    description: "Deploy and scale your applications.",
    icon: <Server className="h-5 w-5 text-orange-600" />,
    articles: [
      { title: "Docker Setup", slug: "deployment/docker" },
      { title: "Kubernetes", slug: "deployment/kubernetes" },
      { title: "AWS Deployment", slug: "deployment/aws" },
      { title: "Scaling", slug: "deployment/scaling" }
    ]
  },
  {
    title: "Data Management",
    description: "Working with data and storage.",
    icon: <Database className="h-5 w-5 text-red-600" />,
    articles: [
      { title: "Data Models", slug: "data/models" },
      { title: "Import/Export", slug: "data/import-export" },
      { title: "Backup & Restore", slug: "data/backup" },
      { title: "Data Privacy", slug: "data/privacy" }
    ]
  },
  {
    title: "Configuration",
    description: "System and application configuration.",
    icon: <Settings className="h-5 w-5 text-amber-600" />,
    articles: [
      { title: "Environment Variables", slug: "config/environment" },
      { title: "Security Settings", slug: "config/security" },
      { title: "Performance Tuning", slug: "config/performance" },
      { title: "Logging & Monitoring", slug: "config/logging" }
    ]
  }
];

const popularArticles = [
  {
    title: "Getting Started with the API",
    path: "/docs/api/quick-start",
    category: "API"
  },
  {
    title: "Authentication Best Practices",
    path: "/docs/security/authentication",
    category: "Security"
  },
  {
    title: "Building Custom Integrations",
    path: "/docs/guides/custom-integrations",
    category: "Guides"
  },
  {
    title: "Troubleshooting Common Issues",
    path: "/docs/support/troubleshooting",
    category: "Support"
  }
];

const downloads = [
  {
    name: "API Client Library (v2.3.1)",
    type: "ZIP",
    size: "4.2 MB",
    url: "#"
  },
  {
    name: "Command Line Tools",
    type: "TAR",
    size: "8.7 MB",
    url: "#"
  },
  {
    name: "SDK Documentation",
    type: "PDF",
    size: "12.5 MB",
    url: "#"
  },
  {
    name: "API Reference",
    type: "PDF",
    size: "3.1 MB",
    url: "#"
  }
];

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Documentation
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Comprehensive guides and API references for developers
        </p>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search documentation..."
            className="pl-12 pr-4 py-3 text-base w-full rounded-lg"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {categories.map((category, i) => (
          <Card key={i} className="group hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                {category.icon}
              </div>
              <CardTitle className="text-xl">{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 flex-1 flex flex-col">
              <ul className="space-y-2 mb-4">
                {category.articles.map((article, j) => (
                  <li key={j}>
                    <Link 
                      href={`/docs/${category.slug || category.title.toLowerCase()}/${article.slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground flex items-center group-hover:translate-x-1 transition-transform"
                    >
                      <FileText className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4 border-t">
                <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" asChild>
                  <Link href={`/docs/${category.title.toLowerCase()}`}>
                    View all {category.title.toLowerCase()} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
          <div className="space-y-4">
            {popularArticles.map((article, i) => (
              <Link key={i} href={article.path} className="block group">
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

        <div>
          <h2 className="text-2xl font-bold mb-6">Downloads</h2>
          <div className="space-y-3">
            {downloads.map((download, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{download.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {download.type} • {download.size}
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={download.url} className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <Terminal className="h-12 w-12 mx-auto text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Command Line Tools</h2>
          <p className="text-muted-foreground mb-6">
            Our CLI tools help you manage your applications and interact with our platform directly from your terminal.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm text-left mb-6 overflow-x-auto">
            <div className="text-green-400">$ npm install -g our-cli</div>
            <div className="text-gray-400"># Install the CLI tools</div>
            <div className="mt-2 text-green-400">$ our-cli login</div>
            <div className="text-gray-400"># Authenticate with your account</div>
            <div className="mt-2 text-green-400">$ our-cli deploy</div>
            <div className="text-gray-400"># Deploy your application</div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/docs/cli" className="flex items-center mx-auto">
              View CLI Documentation <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
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

function Terminal(props: React.SVGProps<SVGSVGElement>) {
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
      className="lucide lucide-terminal"
      {...props}
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  );
}

function FileText(props: React.SVGProps<SVGSVGElement>) {
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
      className="lucide lucide-file-text"
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

function Download(props: React.SVGProps<SVGSVGElement>) {
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
      className="lucide lucide-download"
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}
