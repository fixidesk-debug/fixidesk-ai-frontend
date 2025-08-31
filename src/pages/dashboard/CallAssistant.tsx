import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  PhoneCall,
  Clock,
  User,
  Volume2,
  Mic,
  MicOff,
  PhoneOff,
  Play,
  Pause,
  MoreHorizontal,
  TrendingUp,
  Users,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { TelnyxCallWidget } from "@/components/calling/TelnyxCallWidget";

const callHistory = [
  {
    id: "CALL-001",
    customer: "Sarah Chen",
    phone: "+1 (555) 123-4567",
    duration: "12:34",
    status: "completed",
    resolution: "Account access issue resolved",
    timestamp: "2024-01-15T14:30:00Z",
    rating: 5,
  },
  {
    id: "CALL-002",
    customer: "Mike Rodriguez",
    phone: "+1 (555) 987-6543",
    duration: "8:21",
    status: "completed",
    resolution: "Billing inquiry answered",
    timestamp: "2024-01-15T13:15:00Z",
    rating: 4,
  },
  {
    id: "CALL-003",
    customer: "Emma Thompson",
    phone: "+1 (555) 456-7890",
    duration: "0:00",
    status: "missed",
    resolution: "No answer",
    timestamp: "2024-01-15T12:45:00Z",
    rating: null,
  },
  {
    id: "CALL-004",
    customer: "David Park",
    phone: "+1 (555) 321-0987",
    duration: "15:42",
    status: "completed",
    resolution: "Technical support provided",
    timestamp: "2024-01-15T11:30:00Z",
    rating: 5,
  },
];

export default function CallAssistant() {
  const [callLogs, setCallLogs] = useState(callHistory);

  const handleCallStart = (number: string) => {
    console.log('Starting call to:', number);
  };

  const handleCallEnd = (callId: string, duration: number) => {
    console.log('Call ended:', callId, 'Duration:', duration);
    // Add call to history
    const newCall = {
      id: callId,
      customer: "Unknown Contact",
      phone: "+1 (555) 000-0000",
      duration: `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`,
      status: "completed" as const,
      resolution: "Outbound call completed",
      timestamp: new Date().toISOString(),
      rating: null,
    };
    setCallLogs(prev => [newCall, ...prev]);
  };

  const handleCallLog = (callData: any) => {
    console.log('Logging call data:', callData);
    // Here you would typically send the call data to your backend
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "missed":
        return "destructive";
      case "ongoing":
        return "secondary";
      default:
        return "outline";
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Call Assistant</h1>
            <p className="text-muted-foreground">
              Make calls and manage customer interactions with AI assistance
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Calls Today</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +12% from yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Call Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8:42</div>
              <p className="text-xs text-muted-foreground">
                +2:15 from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8★</div>
              <p className="text-xs text-muted-foreground">
                +0.2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                +3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calling Widget */}
          <div className="lg:col-span-1">
            <TelnyxCallWidget
              onCallStart={handleCallStart}
              onCallEnd={handleCallEnd}
              onCallLog={handleCallLog}
            />
          </div>

          {/* Call History */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Calls</CardTitle>
                <CardDescription>
                  Your call history and customer interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Resolution</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {callLogs.map((call) => (
                        <TableRow key={call.id}>
                          <TableCell className="font-medium">{call.customer}</TableCell>
                          <TableCell>{call.phone}</TableCell>
                          <TableCell>{call.duration}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(call.status) as "default" | "secondary" | "destructive" | "outline"}>
                              {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{call.resolution}</TableCell>
                          <TableCell>
                            {call.rating ? (
                              <span className="text-warning">{call.rating}★</span>
                            ) : (
                              <span className="text-muted-foreground">N/A</span>
                            )}
                          </TableCell>
                          <TableCell>{formatDate(call.timestamp)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Transcript</DropdownMenuItem>
                                <DropdownMenuItem>Listen to Recording</DropdownMenuItem>
                                <DropdownMenuItem>Customer Profile</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Download Recording</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

