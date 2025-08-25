import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Building2, 
  CreditCard, 
  Settings2,
  Upload,
  Mail,
  Phone,
  MessageSquare,
  Slack,
  Zap
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const integrations = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Sync WhatsApp conversations with tickets",
    icon: Phone,
    enabled: true,
    color: "bg-green-500",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Get notifications in your Slack workspace",
    icon: Slack,
    enabled: false,
    color: "bg-purple-500",
  },
  {
    id: "tiledesk",
    name: "Tiledesk",
    description: "Advanced chat and bot integrations",
    icon: MessageSquare,
    enabled: true,
    color: "bg-blue-500",
  },
  {
    id: "activepieces",
    name: "Activepieces",
    description: "Workflow automation and integrations",
    icon: Zap,
    enabled: false,
    color: "bg-orange-500",
  },
];

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleProfileSave = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }, 1000);
  };

  const handleIntegrationToggle = (integrationId: string, enabled: boolean) => {
    toast({
      title: enabled ? "Integration enabled" : "Integration disabled",
      description: `${integrations.find(i => i.id === integrationId)?.name} has been ${enabled ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-3xl font-bold"
          >
            Settings
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="text-muted-foreground mt-2"
          >
            Manage your account, company, and integrations
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Company
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center gap-2">
                <Settings2 className="h-4 w-4" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Billing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="text-lg">
                        {user?.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user?.email} />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Change Password</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleProfileSave} disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle>Company Settings</CardTitle>
                  <CardDescription>
                    Manage your company information and branding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" defaultValue={user?.company} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="domain">Domain</Label>
                      <Input id="domain" placeholder="yourcompany.com" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Branding</h4>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>

                  <Button>Save Company Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations">
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>
                    Connect FixiDesk with your favorite tools and platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {integrations.map((integration) => (
                      <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${integration.color}`}>
                            <integration.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{integration.name}</h4>
                              {integration.enabled && (
                                <Badge variant="secondary" className="text-xs">Connected</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{integration.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={integration.enabled}
                          onCheckedChange={(checked) => handleIntegrationToggle(integration.id, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>
                      Manage your subscription and billing information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5">
                      <div>
                        <h4 className="font-semibold">Pro Plan</h4>
                        <p className="text-sm text-muted-foreground">$49/month • Billed monthly</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-3">
                      <Button variant="outline">Change Plan</Button>
                      <Button variant="outline">Billing History</Button>
                      <Button variant="outline">Download Invoice</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/26</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}