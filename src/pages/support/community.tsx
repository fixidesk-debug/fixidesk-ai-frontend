import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Code, BookOpen, Zap, Award, ArrowRight, Search, MessageCircle, ThumbsUp, Clock, Hash, ExternalLink } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "General",
    description: "General discussions about the platform",
    icon: <MessageSquare className="h-5 w-5 text-blue-600" />,
    threads: 1245,
    posts: 12456
  },
  {
    name: "Questions & Help",
    description: "Get help from the community",
    icon: <HelpCircle className="h-5 w-5 text-green-600" />,
    threads: 876,
    posts: 5432
  },
  {
    name: "Showcase",
    description: "Share your projects and get feedback",
    icon: <Zap className="h-5 w-5 text-purple-600" />,
    threads: 342,
    posts: 2345
  },
  {
    name: "Tutorials",
    description: "Learn from community tutorials",
    icon: <BookOpen className="h-5 w-5 text-orange-600" />,
    threads: 156,
    posts: 987
  },
  {
    name: "Development",
    description: "Technical discussions for developers",
    icon: <Code className="h-5 w-5 text-red-600" />,
    threads: 432,
    posts: 3210
  },
  {
    name: "Announcements",
    description: "Updates and announcements from the team",
    icon: <Megaphone className="h-5 w-5 text-amber-600" />,
    threads: 89,
    posts: 543
  }
];

const recentThreads = [
  {
    id: 1,
    title: "How to implement custom authentication?",
    category: "Questions & Help",
    author: "devuser123",
    replies: 12,
    views: 345,
    lastActivity: "2 hours ago",
    isPinned: true,
    isSolved: true
  },
  {
    id: 2,
    title: "Showcase: Built a chatbot for customer support",
    category: "Showcase",
    author: "chatbotdev",
    replies: 24,
    views: 789,
    lastActivity: "5 hours ago",
    isPinned: false,
    isSolved: false
  },
  {
    id: 3,
    title: "Tutorial: Getting started with the API",
    category: "Tutorials",
    author: "apiguru",
    replies: 8,
    views: 456,
    lastActivity: "1 day ago",
    isPinned: true,
    isSolved: false
  },
  {
    id: 4,
    title: "Bug: Issue with file uploads in v2.3.0",
    category: "Development",
    author: "bugfinder",
    replies: 15,
    views: 567,
    lastActivity: "1 day ago",
    isPinned: false,
    isSolved: true
  },
  {
    id: 5,
    title: "New feature request: Webhooks",
    category: "General",
    author: "featurehunter",
    replies: 32,
    views: 890,
    lastActivity: "2 days ago",
    isPinned: false,
    isSolved: false
  }
];

const communityStats = {
  members: 12543,
  online: 342,
  threads: 5432,
  posts: 28976
};

const topContributors = [
  { id: 1, name: "alex_dev", role: "Moderator", posts: 1245 },
  { id: 2, name: "sarah_codes", role: "Community Leader", posts: 987 },
  { id: 3, name: "mike_ai", role: "Top Contributor", posts: 876 },
  { id: 4, name: "jane_doe", role: "Top Contributor", posts: 765 },
  { id: 5, name: "dev_guru", role: "Top Contributor", posts: 654 }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Community Q&A with the Dev Team",
    date: "2023-07-15T18:00:00Z",
    type: "Live Event"
  },
  {
    id: 2,
    title: "Webinar: Advanced API Integration",
    date: "2023-07-20T16:30:00Z",
    type: "Webinar"
  },
  {
    id: 3,
    title: "Community Hackathon",
    date: "2023-08-01T10:00:00Z",
    type: "Hackathon"
  }
];

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Community
        </h1>
        <p className="text-xl text-muted-foreground">
          Connect with other developers, share knowledge, and get help
        </p>
      </div>

      {/* Stats and Search */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">{communityStats.members.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Members</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
            {communityStats.online.toLocaleString()}
            <span className="ml-2 h-2 w-2 rounded-full bg-green-500"></span>
          </div>
          <div className="text-sm text-muted-foreground">Online Now</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">{communityStats.threads.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Threads</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">{communityStats.posts.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Posts</div>
        </Card>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search the community..."
          className="pl-12 pr-4 py-6 text-base w-full rounded-lg"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Categories */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Categories</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/community/categories">View All</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {categories.map((category, i) => (
              <Link key={i} href={`/community/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <Card className="group hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mr-4 mt-0.5">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1 group-hover:text-blue-600 transition-colors">{category.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                        <div className="flex text-xs text-muted-foreground">
                          <span className="mr-4">{category.threads} threads</span>
                          <span>{category.posts} posts</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Start New Thread */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Start a New Thread</CardTitle>
              <CardDescription>Ask a question or start a discussion</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/community/new">
                  Create New Thread
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Contributors</CardTitle>
              <CardDescription>Our most active community members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContributors.map((user, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium mr-3">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.role}</div>
                      </div>
                    </div>
                    <div className="text-xs bg-muted px-2 py-1 rounded-full">
                      {user.posts} posts
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4" asChild>
                <Link href="/community/leaderboard">
                  View Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
              <CardDescription>Join our community events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start">
                    <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg p-2 mr-3">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                        <span className="mx-1">•</span>
                        {event.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4" asChild>
                <Link href="/community/events">
                  View All Events <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Threads */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Threads</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/community/threads">View All</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/community/threads?filter=unanswered">Unanswered</Link>
            </Button>
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="p-4 font-medium">Thread</th>
                  <th className="p-4 font-medium text-center w-24">Replies</th>
                  <th className="p-4 font-medium text-center w-24">Views</th>
                  <th className="p-4 font-medium w-48">Last Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentThreads.map((thread) => (
                  <tr key={thread.id} className="hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          {thread.isSolved ? (
                            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <Link 
                            href={`/community/thread/${thread.id}`}
                            className="font-medium hover:text-blue-600 transition-colors line-clamp-1"
                          >
                            {thread.isPinned && <span className="text-amber-500 mr-1">📌</span>}
                            {thread.title}
                          </Link>
                          <div className="text-xs text-muted-foreground mt-1">
                            <span>in {thread.category}</span>
                            <span className="mx-1">•</span>
                            <span>by {thread.author}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center text-sm">
                      {thread.replies}
                    </td>
                    <td className="p-4 text-center text-sm text-muted-foreground">
                      {thread.views.toLocaleString()}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1.5 flex-shrink-0" />
                        <span className="truncate">{thread.lastActivity}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Community Guidelines */}
      <div className="bg-muted/50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Community Guidelines</h2>
          <p className="text-muted-foreground mb-6">
            Our community is built on respect, collaboration, and mutual support. Please review our guidelines before participating.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/community/guidelines">
                Read Guidelines
              </Link>
            </Button>
            <Button asChild>
              <Link href="/community/new">
                Join the Discussion
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

function HelpCircle(props: React.SVGProps<SVGSVGElement>) {
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
      className="lucide lucide-help-circle"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function Megaphone(props: React.SVGProps<SVGSVGElement>) {
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
      className="lucide lucide-megaphone"
      {...props}
    >
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

function Calendar(props: React.SVGProps<SVGSVGElement>) {
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
      className="lucide lucide-calendar"
      {...props}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
