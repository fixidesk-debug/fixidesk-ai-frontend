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
    customer: "Michael Rodriguez",
    phone: "+1 (555) 234-5678",
    duration: "8:22",
    status: "completed",
    resolution: "Billing inquiry answered",
    timestamp: "2024-01-15T13:15:00Z",
    rating: 4,
  },
  {
    id: "CALL-003",
    customer: "Emily Thompson",
    phone: "+1 (555) 345-6789",
    duration: "15:18",
    status: "completed",
    resolution: "Technical support provided",
    timestamp: "2024-01-15T11:45:00Z",
    rating: 5,
  },
  {
    id: "CALL-004",
    customer: "David Kim",
    phone: "+1 (555) 456-7890",
    duration: "6:45",
    status: "missed",
    resolution: "No answer - callback scheduled",
    timestamp: "2024-01-15T10:20:00Z",
    rating: null,
  },
];

const liveCall = {
  customer: "Lisa Wang",
  phone: "+1 (555) 567-8901",
  duration: "05:32",
  status: "active",
  transcript: [
    { speaker: "customer", text: "Hi, I'm having trouble accessing my account dashboard." },
    { speaker: "ai", text: "I understand you're having trouble accessing your dashboard. Let me help you with that. Can you please tell me what error message you're seeing?" },
    { speaker: "customer", text: "It just says 'Authentication failed' when I try to log in." },
    { speaker: "ai", text: "I see the issue. It looks like your session has expired. Let me reset your authentication tokens. This should resolve the problem." },
  ],
};

export default function CallAssistant() {
  const [isCallActive, setIsCallActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(true);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "secondary";
      case "missed": return "destructive";
      case "active": return "default";
      default: return "secondary";
    }
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
            AI Call Assistant
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-2"
          >
            Monitor and manage AI-powered customer support calls
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Calls Today</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
                <Phone className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                  <p className="text-2xl font-bold">8:24</p>
                </div>
                <Clock className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolution Rate</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
                <PhoneCall className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                  <p className="text-2xl font-bold">4.8★</p>
                </div>
                <User className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Live Call Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                      Live Call
                    </CardTitle>
                    <CardDescription>Active AI assistant call in progress</CardDescription>
                  </div>
                  <Badge variant="default" className="bg-success">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {isCallActive ? (
                  <div className="space-y-6">
                    {/* Call Info */}
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                          LW
                        </div>
                        <div>
                          <h3 className="font-semibold">{liveCall.customer}</h3>
                          <p className="text-sm text-muted-foreground">{liveCall.phone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-mono font-bold">{liveCall.duration}</p>
                        <p className="text-sm text-muted-foreground">Duration</p>
                      </div>
                    </div>

                    {/* Call Controls */}
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        variant={isMuted ? "destructive" : "outline"}
                        size="icon"
                        onClick={() => setIsMuted(!isMuted)}
                        className="rounded-full w-12 h-12"
                      >
                        {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => setIsCallActive(false)}
                        className="rounded-full w-16 h-16"
                      >
                        <PhoneOff className="h-6 w-6" />
                      </Button>
                      <Button
                        variant={isRecording ? "default" : "outline"}
                        size="icon"
                        onClick={() => setIsRecording(!isRecording)}
                        className="rounded-full w-12 h-12"
                      >
                        {isRecording ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                    </div>

                    {/* Live Transcript */}
                    <div>
                      <h4 className="font-semibold mb-3">Live Transcript</h4>
                      <div className="space-y-3 max-h-64 overflow-y-auto p-4 bg-muted/20 rounded-lg">
                        {liveCall.transcript.map((message, index) => (
                          <div
                            key={index}
                            className={`flex gap-3 ${
                              message.speaker === "ai" ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-xs p-3 rounded-lg ${
                                message.speaker === "ai"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-card border"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium">
                                  {message.speaker === "ai" ? "AI Assistant" : "Customer"}
                                </span>
                              </div>
                              <p className="text-sm">{message.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Phone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Active Calls</h3>
                    <p className="text-muted-foreground mb-4">
                      AI assistant is ready to handle incoming calls
                    </p>
                    <Button
                      variant="hero"
                      onClick={() => setIsCallActive(true)}
                    >
                      Simulate Call
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Status & Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>AI Assistant Status</CardTitle>
                <CardDescription>Current AI configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status</span>
                  <Badge variant="default" className="bg-success">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Language</span>
                  <span className="text-sm text-muted-foreground">English (US)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Voice Model</span>
                  <span className="text-sm text-muted-foreground">Professional</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Knowledge Base</span>
                  <span className="text-sm text-muted-foreground">Updated</span>
                </div>
                <Button variant="outline" className="w-full">
                  Configure AI
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Test AI Voice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Customer Feedback
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Call History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Call History</CardTitle>
              <CardDescription>Recent AI assistant calls and outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
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
                    {callHistory.map((call) => (
                      <TableRow key={call.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-semibold">
                              {call.customer.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium">{call.customer}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{call.phone}</TableCell>
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
        </motion.div>
      </div>
    </DashboardLayout>
  );
}