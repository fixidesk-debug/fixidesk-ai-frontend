import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Users, 
  TrendingUp, 
  Eye, 
  MousePointer, 
  ExternalLink,
  Plus,
  Play,
  Pause,
  BarChart3
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface CampaignStats {
  active_campaigns: number;
  total_subscribers: number;
  avg_open_rate: number;
  avg_click_rate: number;
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  subscribers: number;
  open_rate: number;
  click_rate: number;
  created_at: string;
}

export default function Campaigns() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<CampaignStats>({
    active_campaigns: 0,
    total_subscribers: 0,
    avg_open_rate: 0,
    avg_click_rate: 0
  });
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: '', subject: '', content: '' });

  useEffect(() => {
    if (user) {
      loadCampaignData();
    }
  }, [user]);

  const loadCampaignData = async () => {
    try {
      const { data: campaignData, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', user?.id);

      if (campaignData && !error) {
        setCampaigns(campaignData);
        const activeCampaigns = campaignData.filter(c => c.status === 'active').length;
        const totalSubscribers = campaignData.reduce((sum, c) => sum + (c.subscribers || 0), 0);
        const avgOpenRate = campaignData.length > 0 
          ? campaignData.reduce((sum, c) => sum + (c.open_rate || 0), 0) / campaignData.length 
          : 0;
        const avgClickRate = campaignData.length > 0 
          ? campaignData.reduce((sum, c) => sum + (c.click_rate || 0), 0) / campaignData.length 
          : 0;

        setStats({
          active_campaigns: activeCampaigns,
          total_subscribers: totalSubscribers,
          avg_open_rate: Math.round(avgOpenRate),
          avg_click_rate: Math.round(avgClickRate)
        });
      }
    } catch (error) {
      console.error('Error loading campaigns:', error);
    }
  };

  const handleCreateCampaign = async () => {
    if (!newCampaign.name || !newCampaign.subject) {
      toast({ title: 'Missing fields', description: 'Please fill in campaign name and subject.', variant: 'destructive' });
      return;
    }
    
    setIsCreating(true);
    try {
      const { error } = await supabase
        .from('campaigns')
        .insert({
          name: newCampaign.name,
          subject: newCampaign.subject,
          content: newCampaign.content,
          status: 'draft',
          user_id: user?.id,
          subscribers: 0,
          open_rate: 0,
          click_rate: 0
        });

      if (error) throw error;
      
      toast({ title: 'Campaign created', description: 'Your campaign has been created successfully.' });
      setNewCampaign({ name: '', subject: '', content: '' });
      loadCampaignData();
    } catch (error) {
      toast({ title: 'Creation failed', description: 'Failed to create campaign.', variant: 'destructive' });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Marketing Campaigns</h1>
            <p className="text-muted-foreground">
              Create and manage your email marketing campaigns
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.open(import.meta.env.VITE_MAUTIC_URL || 'http://localhost:8082', '_blank')}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Marketing
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Campaign</DialogTitle>
                  <DialogDescription>Create a new email marketing campaign</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input 
                      id="name" 
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                      placeholder="Enter campaign name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Email Subject</Label>
                    <Input 
                      id="subject" 
                      value={newCampaign.subject}
                      onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                      placeholder="Enter email subject"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea 
                      id="content" 
                      value={newCampaign.content}
                      onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
                      placeholder="Enter email content"
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleCreateCampaign} disabled={isCreating} className="w-full">
                    {isCreating ? 'Creating...' : 'Create Campaign'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active_campaigns}</div>
              <p className="text-xs text-muted-foreground">
                {stats.active_campaigns === 0 ? 'No active campaigns' : `${stats.active_campaigns} active`}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_subscribers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total_subscribers === 0 ? 'Build your audience' : 'Total subscribers'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avg_open_rate}%</div>
              <p className="text-xs text-muted-foreground">
                {stats.avg_open_rate === 0 ? 'No data yet' : 'Average open rate'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avg_click_rate}%</div>
              <p className="text-xs text-muted-foreground">
                {stats.avg_click_rate === 0 ? 'No data yet' : 'Average click rate'}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-4">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Email Campaigns</CardTitle>
                <CardDescription>Manage your email marketing campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                {campaigns.length > 0 ? (
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{campaign.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {campaign.subscribers} subscribers • {campaign.open_rate}% open rate
                          </p>
                        </div>
                        <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No campaigns yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first email campaign to start engaging with your audience
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Campaign
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Campaign</DialogTitle>
                          <DialogDescription>Create a new email marketing campaign</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name2">Campaign Name</Label>
                            <Input 
                              id="name2" 
                              value={newCampaign.name}
                              onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                              placeholder="Enter campaign name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="subject2">Email Subject</Label>
                            <Input 
                              id="subject2" 
                              value={newCampaign.subject}
                              onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                              placeholder="Enter email subject"
                            />
                          </div>
                          <div>
                            <Label htmlFor="content2">Content</Label>
                            <Textarea 
                              id="content2" 
                              value={newCampaign.content}
                              onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
                              placeholder="Enter email content"
                              rows={4}
                            />
                          </div>
                          <Button onClick={handleCreateCampaign} disabled={isCreating} className="w-full">
                            {isCreating ? 'Creating...' : 'Create Campaign'}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>Pre-designed templates for your campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No templates available</h3>
                  <p className="text-muted-foreground mb-4">
                    Create reusable email templates to speed up your campaign creation
                  </p>
                  <Button variant="outline" onClick={() => window.open(import.meta.env.VITE_MAUTIC_URL || 'http://localhost:8082', '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Manage in Marketing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="segments">
            <Card>
              <CardHeader>
                <CardTitle>Audience Segments</CardTitle>
                <CardDescription>Organize your contacts into targeted segments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No segments created</h3>
                  <p className="text-muted-foreground mb-4">
                    Create audience segments to send targeted campaigns
                  </p>
                  <Button variant="outline" onClick={() => window.open(import.meta.env.VITE_MAUTIC_URL || 'http://localhost:8082', '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Manage in Marketing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}