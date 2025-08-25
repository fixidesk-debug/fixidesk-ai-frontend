import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MoreHorizontal,
  ArrowUpDown,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AddTicketModal } from "@/components/modals/add-ticket-modal";

const tickets = [
  {
    id: "TK-1001",
    subject: "Unable to login to mobile app",
    customer: "Sarah Chen",
    email: "sarah@company.com",
    status: "open",
    priority: "high",
    assignee: "John Doe",
    created: "2024-01-15T10:30:00Z",
    updated: "2024-01-15T14:22:00Z",
    responses: 3,
  },
  {
    id: "TK-1002",
    subject: "Billing inquiry about monthly charges",
    customer: "Michael Rodriguez",
    email: "mike@startup.io",
    status: "in_progress",
    priority: "medium",
    assignee: "Sarah Chen",
    created: "2024-01-15T09:15:00Z",
    updated: "2024-01-15T13:45:00Z",
    responses: 5,
  },
  {
    id: "TK-1003",
    subject: "Feature request: Dark mode support",
    customer: "Emily Thompson",
    email: "emily@design.co",
    status: "resolved",
    priority: "low",
    assignee: "John Doe",
    created: "2024-01-14T16:20:00Z",
    updated: "2024-01-15T11:30:00Z",
    responses: 2,
  },
  {
    id: "TK-1004",
    subject: "API integration documentation unclear",
    customer: "David Kim",
    email: "david@techcorp.com",
    status: "open",
    priority: "medium",
    assignee: "Mike Rodriguez",
    created: "2024-01-15T08:45:00Z",
    updated: "2024-01-15T12:10:00Z",
    responses: 1,
  },
  {
    id: "TK-1005",
    subject: "Password reset not working",
    customer: "Lisa Wang",
    email: "lisa@business.net",
    status: "in_progress",
    priority: "high",
    assignee: "John Doe",
    created: "2024-01-15T11:00:00Z",
    updated: "2024-01-15T14:15:00Z",
    responses: 4,
  },
];

const statusConfig = {
  open: { label: "Open", color: "destructive", icon: AlertTriangle },
  in_progress: { label: "In Progress", color: "default", icon: Clock },
  resolved: { label: "Resolved", color: "secondary", icon: CheckCircle },
};

const priorityConfig = {
  high: { label: "High", color: "destructive" },
  medium: { label: "Medium", color: "default" },
  low: { label: "Low", color: "secondary" },
};

export default function Tickets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            Ticket Inbox
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-2"
          >
            Manage and track all customer support tickets
          </motion.p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Open Tickets</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">15</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved Today</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                  <p className="text-2xl font-bold">1.2h</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Tickets</CardTitle>
                  <CardDescription>Search and filter customer support tickets</CardDescription>
                </div>
                <Button variant="hero">New Ticket</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tickets, customers, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              {/* Tickets Table */}
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">
                        <Button variant="ghost" className="h-8 p-0">
                          ID
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.map((ticket) => {
                      const StatusIcon = statusConfig[ticket.status as keyof typeof statusConfig].icon;
                      return (
                        <TableRow key={ticket.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{ticket.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{ticket.subject}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <MessageSquare className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {ticket.responses} responses
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{ticket.customer}</p>
                              <p className="text-sm text-muted-foreground">{ticket.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusConfig[ticket.status as keyof typeof statusConfig].color as any}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {statusConfig[ticket.status as keyof typeof statusConfig].label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={priorityConfig[ticket.priority as keyof typeof priorityConfig].color as any}>
                              {priorityConfig[ticket.priority as keyof typeof priorityConfig].label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-semibold">
                                {ticket.assignee.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="text-sm">{ticket.assignee}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{getTimeAgo(ticket.updated)}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(ticket.updated)}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Ticket
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Reply
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <User className="mr-2 h-4 w-4" />
                                  Assign
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Mark as Resolved
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing 1-5 of 47 tickets
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}