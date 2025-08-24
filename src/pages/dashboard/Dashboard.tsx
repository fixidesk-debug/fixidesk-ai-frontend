import { motion } from "framer-motion";
import {
  Inbox,
  CheckCircle,
  Clock,
  TrendingUp,
  Phone,
  MessageSquare,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Active Tickets",
    value: "47",
    change: "+12%",
    changeType: "increase" as const,
    icon: Inbox,
    description: "from last week",
  },
  {
    title: "Resolved Today",
    value: "23",
    change: "+8%",
    changeType: "increase" as const,
    icon: CheckCircle,
    description: "vs yesterday",
  },
  {
    title: "Avg Response Time",
    value: "1.2m",
    change: "-23%",
    changeType: "decrease" as const,
    icon: Clock,
    description: "faster than last week",
  },
  {
    title: "Customer Satisfaction",
    value: "98%",
    change: "+2%",
    changeType: "increase" as const,
    icon: TrendingUp,
    description: "from last month",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "ticket",
    title: "New ticket from Sarah Chen",
    description: "Login issues with mobile app",
    time: "2 minutes ago",
    priority: "high",
  },
  {
    id: 2,
    type: "call",
    title: "AI call completed",
    description: "Successfully resolved billing inquiry",
    time: "5 minutes ago",
    priority: "medium",
  },
  {
    id: 3,
    type: "ticket",
    title: "Ticket resolved",
    description: "Password reset request completed",
    time: "12 minutes ago",
    priority: "low",
  },
  {
    id: 4,
    type: "chat",
    title: "Live chat session",
    description: "Product demo request",
    time: "18 minutes ago",
    priority: "medium",
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            Welcome back, John
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-2"
          >
            Here's what's happening with your support team today.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="transition-all duration-300 hover:shadow-beautiful border-border/50 hover:border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    {stat.changeType === "increase" ? (
                      <ArrowUpRight className="h-3 w-3 text-success" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-success" />
                    )}
                    <span className={stat.changeType === "increase" ? "text-success" : "text-success"}>
                      {stat.change}
                    </span>
                    <span>{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest tickets and interactions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/dashboard/tickets">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex-shrink-0">
                        {activity.type === "ticket" && <Inbox className="h-5 w-5 text-primary" />}
                        {activity.type === "call" && <Phone className="h-5 w-5 text-accent" />}
                        {activity.type === "chat" && <MessageSquare className="h-5 w-5 text-success" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium">{activity.title}</h4>
                          <Badge 
                            variant={
                              activity.priority === "high" ? "destructive" :
                              activity.priority === "medium" ? "default" : "secondary"
                            }
                            className="text-xs"
                          >
                            {activity.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/dashboard/tickets">
                    <Inbox className="h-4 w-4 mr-2" />
                    View All Tickets
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/dashboard/calls">
                    <Phone className="h-4 w-4 mr-2" />
                    AI Call Assistant
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/dashboard/chat">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat Widget
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/dashboard/analytics">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Team Status */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Team Status</CardTitle>
                <CardDescription>Who's online right now</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-semibold">
                      JD
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">John Doe</p>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-xs text-muted-foreground">Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-xs font-semibold">
                      SC
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Sarah Chen</p>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-xs text-muted-foreground">Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-xs font-semibold">
                      MR
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Mike Rodriguez</p>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                        <span className="text-xs text-muted-foreground">Away</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}