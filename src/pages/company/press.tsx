import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Newspaper, Download, Mail, Twitter, Link as LinkIcon, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const pressReleases = [
  {
    id: 1,
    title: "Company Raises $50M Series B to Expand AI Platform",
    date: "March 10, 2023",
    excerpt: "Funding will accelerate product development and global expansion of our AI-powered conversation platform.",
    category: "Funding"
  },
  {
    id: 2,
    title: "Company Launches Next-Gen AI Assistant",
    date: "February 15, 2023",
    excerpt: "New features include multilingual support and advanced analytics for better customer insights.",
    category: "Product"
  },
  {
    id: 3,
    title: "Company Named to Forbes AI 50 List",
    date: "January 5, 2023",
    excerpt: "Recognized as one of the most promising AI companies transforming business communications.",
    category: "Awards"
  },
  {
    id: 4,
    title: "Company Expands Leadership Team with Key Hires",
    date: "December 1, 2022",
    excerpt: "Industry veterans join to drive product innovation and customer success initiatives.",
    category: "Company"
  }
];

const mediaCoverage = [
  {
    id: 1,
    title: "How AI is Revolutionizing Customer Service",
    source: "TechCrunch",
    date: "April 5, 2023",
    url: "#"
  },
  {
    id: 2,
    title: "The Future of Work: AI Assistants in the Enterprise",
    source: "Forbes",
    date: "March 28, 2023",
    url: "#"
  },
  {
    id: 3,
    title: "Startup Spotlight: Company's Impressive Growth Trajectory",
    source: "The Information",
    date: "March 15, 2023",
    url: "#"
  },
  {
    id: 4,
    title: "AI Ethics: Building Responsible Conversational AI",
    source: "Wired",
    date: "February 20, 2023",
    url: "#"
  }
];

const assets = [
  {
    name: "Company Logo",
    type: "PNG",
    size: "2.4 MB"
  },
  {
    name: "Brand Guidelines",
    type: "PDF",
    size: "5.1 MB"
  },
  {
    name: "Product Screenshots",
    type: "ZIP",
    size: "18.7 MB"
  },
  {
    name: "Team Photos",
    type: "ZIP",
    size: "32.5 MB"
  }
];

export default function PressPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Press
        </h1>
        <p className="text-xl text-muted-foreground">
          Latest news and media resources
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Press Releases</h2>
            <Button variant="ghost" asChild>
              <Link to="/press/releases" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-6">
            {pressReleases.map((release) => (
              <Card key={release.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        {release.date}
                        <span className="mx-2">•</span>
                        <span className="px-2 py-0.5 bg-muted rounded-full text-xs">
                          {release.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium mb-2 group-hover:text-blue-600 transition-colors">
                        {release.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {release.excerpt}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="flex-shrink-0" asChild>
                      <Link to={`/press/releases/${release.id}`}>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="sticky top-6 space-y-8">
            {/* Media Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Media Contact</CardTitle>
                <CardDescription>
                  For press inquiries, please contact our media relations team.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Press Inquiries</h4>
                  <a 
                    href="mailto:press@example.com" 
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    press@example.com
                  </a>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Follow Us</h4>
                  <div className="flex items-center space-x-4">
                    <a href="#" className="text-blue-600 hover:text-blue-800" title="Twitter">
                      <Twitter className="h-5 w-5" aria-hidden="true" />
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800" title="LinkedIn">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media Assets */}
            <Card>
              <CardHeader>
                <CardTitle>Media Assets</CardTitle>
                <CardDescription>
                  Download our logo, brand assets, and product images.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assets.map((asset, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {asset.type} • {asset.size}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href="#" className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">In the News</h2>
          <Button variant="ghost" asChild>
            <Link to="/press/coverage" className="flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {mediaCoverage.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {item.source} • {item.date}
                    </div>
                    <h3 className="font-medium mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0" asChild>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" title="Read article">
                      <LinkIcon className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <Newspaper className="h-12 w-12 mx-auto text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Subscribe to Press Releases</h2>
          <p className="text-muted-foreground mb-6">
            Get the latest company news and announcements delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input placeholder="Your email address" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
