import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, MessageSquare, Mail, Settings, Code, Plus } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Customer Support",
    description: "Connect with your existing support tools",
    integrations: [
      { name: "Zendesk", logo: "Z" },
      { name: "Intercom", logo: "I" },
      { name: "Freshdesk", logo: "F" },
      { name: "Help Scout", logo: "HS" }
    ]
  },
  {
    name: "CRM",
    description: "Sync with your customer relationship management",
    integrations: [
      { name: "Salesforce", logo: "S" },
      { name: "HubSpot", logo: "H" },
      { name: "Pipedrive", logo: "P" },
      { name: "Zoho", logo: "Z" }
    ]
  },
  {
    name: "Communication",
    description: "Connect with your team's communication tools",
    integrations: [
      { name: "Slack", logo: "S" },
      { name: "Microsoft Teams", logo: "MT" },
      { name: "Discord", logo: "D" },
      { name: "WhatsApp", logo: "W" }
    ]
  },
  {
    name: "Productivity",
    description: "Boost your team's productivity",
    integrations: [
      { name: "Notion", logo: "N" },
      { name: "Trello", logo: "T" },
      { name: "Asana", logo: "A" },
      { name: "Jira", logo: "J" }
    ]
  },
  {
    name: "Analytics",
    description: "Gain insights from your data",
    integrations: [
      { name: "Google Analytics", logo: "GA" },
      { name: "Mixpanel", logo: "M" },
      { name: "Amplitude", logo: "A" },
      { name: "Segment", logo: "S" }
    ]
  },
  {
    name: "Development",
    description: "Tools for developers",
    integrations: [
      { name: "GitHub", logo: "GH" },
      { name: "GitLab", logo: "GL" },
      { name: "Bitbucket", logo: "B" },
      { name: "Vercel", logo: "V" }
    ]
  }
];

export default function IntegrationsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Integrations
        </h1>
        <p className="text-xl text-muted-foreground">
          Connect with your favorite tools and services
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {categories.map((category, i) => (
          <Card key={i} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {category.integrations.map((integration, j) => (
                  <div key={j} className="flex flex-col items-center">
                    <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center text-lg font-medium mb-1">
                      {integration.logo}
                    </div>
                    <span className="text-sm">{integration.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 rounded-xl p-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h2>
              <p className="text-muted-foreground">
                We're constantly adding new integrations. Request one or build your own with our API.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" asChild>
                <Link href="/api-docs" className="flex items-center">
                  <Code className="mr-2 h-4 w-4" /> View API Docs
                </Link>
              </Button>
              <Button asChild>
                <Link href="/contact" className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" /> Request Integration
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <CardTitle>Zapier Integration</CardTitle>
            <CardDescription>
              Connect with 5,000+ apps through Zapier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="/integrations/zapier" className="flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
              <Code className="h-6 w-6" />
            </div>
            <CardTitle>Custom Integration</CardTitle>
            <CardDescription>
              Build your own integration with our powerful API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="/api-docs" className="flex items-center">
                View API Documentation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
