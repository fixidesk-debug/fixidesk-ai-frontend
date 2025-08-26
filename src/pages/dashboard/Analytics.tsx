import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Clock,
  Star,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

// Enhanced metrics data
const keyMetrics = [
  {
    title: "Total Tickets",
    value: "1,247",
    change: "+12.3%",
    changeType: "increase" as const,
    icon: MessageSquare,
    description: "vs last month",
  },
  {
    title: "Avg Response Time",
    value: "1.2h",
    change: "-23.1%",
    changeType: "decrease" as const,
    icon: Clock,
    description: "faster than last month",
  },
  {
    title: "Customer Satisfaction",
    value: "4.8/5",
    change: "+0.2",
    changeType: "increase" as const,
    icon: Star,
    description: "rating improvement",
  },
  {
    title: "Resolution Rate",
    value: "94.2%",
    change: "+5.1%",
    changeType: "increase" as const,
    icon: TrendingUp,
    description: "vs last month",
  },
];

// Sample data for enhanced charts
const ticketStatusData = [
  { name: "Open", value: 47, color: "#ef4444" },
  { name: "In Progress", value: 23, color: "#f59e0b" },
  { name: "Resolved", value: 156, color: "#10b981" },
  { name: "Closed", value: 89, color: "#6b7280" },
];

const responseTimeData = [
  { day: "Mon", avgTime: 1.2, target: 2.0 },
  { day: "Tue", avgTime: 0.8, target: 2.0 },
  { day: "Wed", avgTime: 1.5, target: 2.0 },
  { day: "Thu", avgTime: 0.9, target: 2.0 },
  { day: "Fri", avgTime: 1.1, target: 2.0 },
  { day: "Sat", avgTime: 2.3, target: 2.0 },
  { day: "Sun", avgTime: 1.8, target: 2.0 },
];

const volumeData = [
  { month: "Jan", tickets: 245, calls: 67, satisfaction: 4.6 },
  { month: "Feb", tickets: 289, calls: 89, satisfaction: 4.7 },
  { month: "Mar", tickets: 167, calls: 45, satisfaction: 4.5 },
  { month: "Apr", tickets: 198, calls: 78, satisfaction: 4.8 },
  { month: "May", tickets: 334, calls: 112, satisfaction: 4.9 },
  { month: "Jun", tickets: 267, calls: 94, satisfaction: 4.8 },
];

const ticketData = [
  { name: "Mon", created: 15, resolved: 12 },
  { name: "Tue", created: 22, resolved: 19 },
  { name: "Wed", created: 11, resolved: 8 },
  { name: "Thu", created: 20, resolved: 25 },
  { name: "Fri", created: 28, resolved: 32 },
  { name: "Sat", created: 14, resolved: 18 },
  { name: "Sun", created: 12, resolved: 15 },
];

const satisfactionData = [
  { name: "Excellent (5)", value: 65, color: "#10b981" },
  { name: "Good (4)", value: 28, color: "#3b82f6" },
  { name: "Average (3)", value: 5, color: "#f59e0b" },
  { name: "Poor (1-2)", value: 2, color: "#ef4444" },
];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold"
            >
              Analytics Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mt-2"
            >
              Track performance, analyze trends, and optimize your support operations
            </motion.p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select defaultValue="30d">
              <SelectTrigger className="w-[140px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="transition-all duration-300 hover:shadow-beautiful border-border/50 hover:border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    {metric.changeType === "increase" ? (
                      <ArrowUpRight className="h-3 w-3 text-success" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-success" />
                    )}
                    <span className="text-success">
                      {metric.change}
                    </span>
                    <span>{metric.description}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Resolution</CardTitle>
              <CardDescription>Daily ticket creation vs resolution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ticketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="created" fill="hsl(var(--primary))" />
                  <Bar dataKey="resolved" fill="hsl(var(--success))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Time Trend</CardTitle>
              <CardDescription>Average response time throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgTime" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Satisfaction</CardTitle>
              <CardDescription>Rating distribution from customer feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
              <CardDescription>Important performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">First Response Time</span>
                <span className="font-semibold">1.2 minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Resolution Rate</span>
                <span className="font-semibold">94.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Customer Satisfaction</span>
                <span className="font-semibold">4.8/5.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">AI Accuracy</span>
                <span className="font-semibold">96.2%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}