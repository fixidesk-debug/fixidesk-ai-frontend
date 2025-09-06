import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, BarChart3, Settings, ExternalLink } from 'lucide-react';
import { tiledeskApi, TiledeskProject, TiledeskConversation } from '@/services/tiledeskApi';
import { useToast } from '@/hooks/use-toast';

export default function Tiledesk() {
  const [projects, setProjects] = useState<TiledeskProject[]>([]);
  const [conversations, setConversations] = useState<TiledeskConversation[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    if (selectedProject) {
      loadConversations(selectedProject);
    }
  }, [selectedProject, loadConversations]);

  const loadProjects = useCallback(async () => {
    try {
      const projectsData = await tiledeskApi.getProjects();
      setProjects(projectsData);
      if (projectsData.length > 0) {
        setSelectedProject(projectsData[0]._id);
      }
    } catch (error) {
      toast({
        title: 'Error loading projects',
        description: 'Failed to load Tiledesk projects. Please check your connection.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const loadConversations = useCallback(async (projectId: string) => {
    try {
      const conversationsData = await tiledeskApi.getConversations(projectId);
      setConversations(conversationsData);
    } catch (error) {
      toast({
        title: 'Error loading conversations',
        description: 'Failed to load conversations.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const openTiledesk = () => {
    window.open(import.meta.env.VITE_TILEDESK_URL, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tiledesk</h1>
          <p className="text-muted-foreground">Conversational AI and chatbot platform</p>
        </div>
        <Button onClick={openTiledesk} variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          Open Tiledesk
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversations.length}</div>
            <p className="text-xs text-muted-foreground">Total conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {conversations.filter(c => c.status === 100).length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">Average response rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects and Conversations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Manage your Tiledesk projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedProject === project._id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedProject(project._id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ID: {project.id_project}
                      </p>
                    </div>
                    {selectedProject === project._id && (
                      <Badge variant="secondary">Selected</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Conversations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Conversations</CardTitle>
            <CardDescription>Latest customer interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conversations.slice(0, 5).map((conversation) => (
                <div
                  key={conversation._id}
                  className="p-3 rounded-lg border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">
                      {conversation.lead?.fullname || 'Anonymous'}
                    </h4>
                    <Badge
                      variant={conversation.status === 100 ? 'default' : 'secondary'}
                    >
                      {conversation.status === 100 ? 'Active' : 'Closed'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {conversation.lead?.email}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{conversation.messages_count} messages</span>
                    <span>
                      {new Date(conversation.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Widget Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Widget Integration</CardTitle>
          <CardDescription>
            Add Tiledesk chat widget to your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Copy and paste this code into your website's HTML to add the Tiledesk chat widget:
            </p>
            {selectedProject && (
              <div className="bg-muted p-4 rounded-lg">
                <code className="text-sm">
                  {tiledeskApi.getWidgetScript(
                    projects.find(p => p._id === selectedProject)?.id_project || ''
                  )}
                </code>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}