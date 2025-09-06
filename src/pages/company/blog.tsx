import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Tag, User, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const categories = [
  { name: "All", count: 24 },
  { name: "Product Updates", count: 8 },
  { name: "Engineering", count: 6 },
  { name: "Company News", count: 5 },
  { name: "Tutorials", count: 5 }
];

const popularTags = [
  "AI", "Chatbots", "Automation", "Productivity", "Customer Support",
  "Machine Learning", "API", "Integrations", "Case Studies"
];

const posts = [
  {
    id: 1,
    title: "Introducing Our New AI Assistant",
    excerpt: "Learn about the latest features and improvements in our newest AI assistant release.",
    category: "Product Updates",
    date: "May 15, 2023",
    readTime: "5 min read",
    author: "Sarah Chen",
    image: "/blog/ai-assistant.jpg",
    tags: ["AI", "Product Updates", "Chatbots"]
  },
  {
    id: 2,
    title: "How We Scaled Our Infrastructure to Handle 1M+ Messages/Day",
    excerpt: "A technical deep dive into our architecture and scaling strategies.",
    category: "Engineering",
    date: "April 28, 2023",
    readTime: "8 min read",
    author: "Michael Rodriguez",
    image: "/blog/scaling.jpg",
    tags: ["Engineering", "Scalability", "Infrastructure"]
  },
  {
    id: 3,
    title: "The Future of Customer Support: AI and Beyond",
    excerpt: "Exploring how AI is transforming customer service and what's coming next.",
    category: "Tutorials",
    date: "April 15, 2023",
    readTime: "6 min read",
    author: "Emily Wilson",
    image: "/blog/customer-support.jpg",
    tags: ["AI", "Customer Support", "Tutorials"]
  },
  {
    id: 4,
    title: "Case Study: How Company X Improved Response Times by 80%",
    excerpt: "Learn how one company transformed their customer support with our platform.",
    category: "Case Studies",
    date: "March 30, 2023",
    readTime: "7 min read",
    author: "Alex Johnson",
    image: "/blog/case-study.jpg",
    tags: ["Case Studies", "Customer Support", "Success Stories"]
  },
  {
    id: 5,
    title: "Building Secure Chat Applications: Best Practices",
    excerpt: "Essential security practices every developer should know when building chat applications.",
    category: "Engineering",
    date: "March 22, 2023",
    readTime: "9 min read",
    author: "Michael Rodriguez",
    image: "/blog/security.jpg",
    tags: ["Engineering", "Security", "Best Practices"]
  },
  {
    id: 6,
    title: "Announcing Our Series B Funding Round",
    excerpt: "We're excited to announce our $50M Series B funding to accelerate our mission.",
    category: "Company News",
    date: "March 10, 2023",
    readTime: "4 min read",
    author: "Alex Johnson",
    image: "/blog/funding.jpg",
    tags: ["Company News", "Funding", "Announcements"]
  }
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-xl text-muted-foreground">
          Insights, updates, and stories from our team
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          {/* Search and Filter */}
          <div className="mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category, i) => (
                <Button
                  key={i}
                  variant={i === 0 ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {category.name}
                  <span className="ml-2 bg-white/20 dark:bg-black/20 px-2 py-0.5 rounded-full text-xs">
                    {category.count}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Posts */}
          <div className="space-y-8">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-muted h-48 md:h-auto">
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <span className="flex items-center mr-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-1 bg-muted rounded-full flex items-center"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <div className="h-8 w-8 rounded-full bg-muted mr-2" />
                        <span>{post.author}</span>
                      </div>
                      <Button variant="ghost" className="group-hover:text-blue-600" asChild>
                        <Link href={`/blog/${post.id}`}>
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="default">1</Button>
              <Button variant="ghost">2</Button>
              <Button variant="ghost">3</Button>
              <Button variant="ghost">
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 space-y-8">
          {/* Popular Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    size="sm"
                    className="rounded-full"
                    asChild
                  >
                    <Link href={`/blog/tag/${tag.toLowerCase()}`}>
                      {tag}
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {categories.map((category, i) => (
                  <li key={i}>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between"
                      asChild
                    >
                      <Link href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        <span>{category.name}</span>
                        <span className="bg-muted px-2 py-0.5 rounded-full text-xs">
                          {category.count}
                        </span>
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Newsletter */}
          <Card>
            <CardHeader>
              <CardTitle>Subscribe to our newsletter</CardTitle>
              <CardDescription>
                Get the latest articles and news delivered to your inbox.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Input placeholder="Your email address" />
                <Button className="w-full">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
