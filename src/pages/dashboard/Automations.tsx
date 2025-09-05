import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  ExternalLink,
  Plus,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export default function Automations() {
  const { toast } = useToast();
  const [newWorkflow, setNewWorkflow] = useState({ name: '', description: '', trigger: '' });
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateWorkflow = () => {
    if (!newWorkflow.name || !newWorkflow.trigger) {
      toast({ title: 'Missing fields', description: 'Please fill in workflow name and trigger.', variant: 'destructive' });
      return;
    }
    setIsCreating(true);
    setTimeout(() => {
      toast({ title: 'Workflow created', description: `${newWorkflow.name} workflow has been created.` });
      setNewWorkflow({ name: '', description: '', trigger: '' });
      setIsCreating(false);
    }, 1000);
  };

  const handleUseTemplate = (templateName: string) => {
    toast({ title: 'Template selected', description: `${templateName} template is being set up.` });
  };

  const handleRecreateWorkflow = () => {
    toast({ title: 'Workflow recreated', description: 'Workflow has been recreated successfully.' });
  };

  const openAutomationPlatform = () => {
    window.open(import.meta.env.VITE_AUTOMATION_URL || 'http://localhost:5678', '_blank');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Automations</h1>
            <p className="text-muted-foreground">
              Automate your workflows with powerful integrations
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.open(import.meta.env.VITE_AUTOMATION_URL || 'http://localhost:5678', '_blank')}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Automation Platform
            </Button>

          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No active workflows</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Executions Today</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No executions yet</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-xs text-muted-foreground">No data available</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Runtime</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0s</div>
              <p className="text-xs text-muted-foreground">No executions yet</p>
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

          <TabsContent value="workflows">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Automations</CardTitle>
                <CardDescription>Manage your automated workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No workflows created</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first automation workflow to streamline your processes
                  </p>
                  <div className="flex gap-2 justify-center">

                    <Button variant="outline" onClick={openAutomationPlatform}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Automation Platform
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="executions">
            <Card>
              <CardHeader>
                <CardTitle>Execution History</CardTitle>
                <CardDescription>View workflow execution logs and results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No executions yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Workflow executions will appear here once you create and run automations
                  </p>
                  <Button variant="outline" onClick={openAutomationPlatform}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Automation Platform
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Templates</CardTitle>
                <CardDescription>Pre-built automation templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleUseTemplate('New Lead to CRM')}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Zap className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">New Lead to CRM</h4>
                          <p className="text-sm text-muted-foreground">Auto-add leads to EspoCRM</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">Template</Badge>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleUseTemplate('Ticket Auto-Response')}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Ticket Auto-Response</h4>
                          <p className="text-sm text-muted-foreground">Send confirmation emails</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">Template</Badge>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleUseTemplate('Lead Nurturing')}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Activity className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Lead Nurturing</h4>
                          <p className="text-sm text-muted-foreground">Automated email sequences</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">Template</Badge>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}