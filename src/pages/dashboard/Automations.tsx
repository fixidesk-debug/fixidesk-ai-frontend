import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Workflow, 
  Plus, 
  TrendingUp, 
  Zap, 
  Search,
  Filter,
  ExternalLink,
  Play,
  Pause,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity
} from "lucide-react";

// Mock data for demonstration
const mockWorkflows = [
  {
    id: 1,
    name: "New Lead to CRM",
    description: "Automatically add new leads from forms to EspoCRM",
    status: "active",
    trigger: "Webhook",
    lastRun: "2024-01-15 14:30",
    executions: 156,
    successRate: 98.7,
    avgDuration: "2.3s",
  },
  {
    id: 2,
    name: "Chat to Ticket",
    description: "Create support tickets from Chatwoot conversations",
    status: "active",
    trigger: "Chatwoot Message",
    lastRun: "2024-01-15 15:45",
    executions: 89,
    successRate: 100,
    avgDuration: "1.8s",
  },
  {
    id: 3,
    name: "Missed Call Alert",
    description: "Send email alerts for missed calls via Telnyx",
    status: "paused",
    trigger: "Telnyx Webhook",
    lastRun: "2024-01-14 09:15",
    executions: 23,
    successRate: 95.7,
    avgDuration: "3.1s",
  },
  {
    id: 4,
    name: "Lead Nurturing",
    description: "Start Mautic campaigns for qualified leads",
    status: "draft",
    trigger: "CRM Update",
    lastRun: "Never",
    executions: 0,
    successRate: 0,
    avgDuration: "N/A",
  },
];

const mockExecutions = [
  {
    id: 1,
    workflowName: "New Lead to CRM",
    status: "success",
    startTime: "2024-01-15 15:45:23",
    duration: "2.1s",
    trigger: "Form Submission",
  },
  {
    id: 2,
    workflowName: "Chat to Ticket",
    status: "success",
    startTime: "2024-01-15 15:42:18",
    duration: "1.9s",
    trigger: "New Message",
  },
  {
    id: 3,
    workflowName: "New Lead to CRM",
    status: "error",
    startTime: "2024-01-15 15:38:45",
    duration: "0.8s",
    trigger: "Form Submission",
  },
  {
    id: 4,
    workflowName: "Chat to Ticket",
    status: "success",
    startTime: "2024-01-15 15:35:12",
    duration: "2.3s",
    trigger: "New Message",
  },
];

export default function Automations() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "paused": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "draft": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      case "error": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getExecutionStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "error": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "running": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Play className="h-3 w-3" />;
      case "paused": return <Pause className="h-3 w-3" />;
      case "error": return <AlertCircle className="h-3 w-3" />;
      default: return null;
    }
  };

  const getExecutionIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="h-3 w-3" />;
      case "error": return <AlertCircle className="h-3 w-3" />;
      case "running": return <Activity className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Automations</h1>
            <p className="text-muted-foreground">
              Create and manage automated workflows
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open n8n
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Workflow
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
              <Workflow className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                2 paused, 1 draft
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.4K</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.2%</div>
              <p className="text-xs text-muted-foreground">
                +0.5% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.1s</div>
              <p className="text-xs text-muted-foreground">
                -0.3s from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="workflows" className="space-y-4">
          <TabsList>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="executions">Executions</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Workflow Management</CardTitle>
                    <CardDescription>
                      Monitor and control your automated workflows
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search workflows..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-64"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockWorkflows.map((workflow) => (
                    <div
                      key={workflow.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                          <Workflow className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{workflow.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {workflow.description}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Trigger: {workflow.trigger}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-sm font-medium">{workflow.executions}</div>
                          <div className="text-xs text-muted-foreground">Executions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{workflow.successRate}%</div>
                          <div className="text-xs text-muted-foreground">Success</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{workflow.avgDuration}</div>
                          <div className="text-xs text-muted-foreground">Avg Time</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Last run:</div>
                          <div className="text-sm">{workflow.lastRun}</div>
                        </div>
                        <Badge className={getStatusColor(workflow.status)}>
                          {getStatusIcon(workflow.status)}
                          <span className="ml-1">{workflow.status}</span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="executions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Executions</CardTitle>
                <CardDescription>
                  Monitor workflow execution history and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockExecutions.map((execution) => (
                    <div
                      key={execution.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white">
                          <Zap className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{execution.workflowName}</div>
                          <div className="text-sm text-muted-foreground">
                            Triggered by: {execution.trigger}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-sm">{execution.startTime}</div>
                          <div className="text-xs text-muted-foreground">Start Time</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{execution.duration}</div>
                          <div className="text-xs text-muted-foreground">Duration</div>
                        </div>
                        <Badge className={getExecutionStatusColor(execution.status)}>
                          {getExecutionIcon(execution.status)}
                          <span className="ml-1">{execution.status}</span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Templates</CardTitle>
                <CardDescription>
                  Pre-built workflow templates for common automation scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white mb-3">
                      <Workflow className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium mb-2">Lead to CRM Sync</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Automatically sync new leads from forms to your CRM system
                    </p>
                    <Button variant="outline" size="sm">Use Template</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white mb-3">
                      <Workflow className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium mb-2">Support Ticket Creation</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Create support tickets from chat messages and emails
                    </p>
                    <Button variant="outline" size="sm">Use Template</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white mb-3">
                      <Workflow className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium mb-2">Email Campaign Trigger</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Start email campaigns based on customer actions
                    </p>
                    <Button variant="outline" size="sm">Use Template</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

