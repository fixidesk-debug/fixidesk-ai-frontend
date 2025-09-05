import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  UserPlus, 
  TrendingUp, 
  DollarSign, 
  Search,
  Filter,
  ExternalLink,
  Phone,
  Mail,
  Calendar
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { MarketingAPI } from "@/services/marketingApi";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  value: number;
  points?: number;
  last_active?: string;
  created_at: string;
}

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: string;
  probability: number;
  close_date: string;
}

interface CRMStats {
  total_leads: number;
  new_leads_today: number;
  active_campaigns: number;
  total_emails_sent: number;
  pipeline_value: number;
  conversion_rate: number;
}

export default function CRM() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [stats, setStats] = useState<CRMStats>({
    total_leads: 0,
    new_leads_today: 0,
    active_campaigns: 0,
    total_emails_sent: 0,
    pipeline_value: 0,
    conversion_rate: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadCRMData();
    }
  }, [user]);

  const loadCRMData = async () => {
    try {
      // Load marketing contacts as leads
      const marketingContacts = await MarketingAPI.getContacts(50);
      const marketingStats = await MarketingAPI.getStats();
      
      // Convert marketing contacts to leads format
      const convertedLeads: Lead[] = marketingContacts.map(contact => ({
        id: contact.id.toString(),
        name: `${contact.firstname || ''} ${contact.lastname || ''}`.trim(),
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        status: contact.stage || (contact.points > 100 ? 'hot' : contact.points > 50 ? 'warm' : 'cold'),
        value: contact.points * 10, // Convert points to dollar value
        points: contact.points,
        last_active: contact.last_active,
        created_at: contact.date_added
      }));
      
      setLeads(convertedLeads);
      
      // Load deals from Supabase (keep existing deals functionality)
      const { data: dealsData, error: dealsError } = await supabase
        .from('deals')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (dealsData && !dealsError) {
        setDeals(dealsData);
      }

      const activeDeals = dealsData?.filter(d => d.stage !== 'closed').length || 0;
      const pipelineValue = dealsData?.reduce((sum, d) => sum + (d.value || 0), 0) || 0;
      const conversionRate = convertedLeads.length > 0 ? Math.round((activeDeals / convertedLeads.length) * 100) : 0;

      setStats({
        total_leads: marketingStats.total_contacts,
        new_leads_today: marketingStats.new_contacts_today,
        active_campaigns: marketingStats.active_campaigns,
        total_emails_sent: marketingStats.total_emails_sent,
        pipeline_value: pipelineValue,
        conversion_rate: conversionRate
      });
    } catch (error) {
      console.error('Error loading CRM data:', error);
      // Fallback to empty data
      setLeads([]);
      setDeals([]);
      setStats({
        total_leads: 0,
        new_leads_today: 0,
        active_campaigns: 0,
        total_emails_sent: 0,
        pipeline_value: 0,
        conversion_rate: 0
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "warm": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "cold": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "negotiation": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "proposal": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "qualified": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">CRM</h1>
            <p className="text-muted-foreground">
              Manage your leads, contacts, and deals
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.open(import.meta.env.VITE_CRM_URL || 'http://localhost:8081', '_blank')}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Open CRM System
            </Button>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_leads}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total_leads === 0 ? 'No contacts yet' : 'From CRM system'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Today</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.new_leads_today}</div>
              <p className="text-xs text-muted-foreground">
                {stats.new_leads_today === 0 ? 'No new contacts' : 'New contacts today'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active_campaigns}</div>
              <p className="text-xs text-muted-foreground">
                {stats.active_campaigns === 0 ? 'No campaigns' : 'Running campaigns'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_emails_sent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total_emails_sent === 0 ? 'No emails sent' : 'Total emails'}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="leads" className="space-y-4">
          <TabsList>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>CRM Contacts</CardTitle>
                    <CardDescription>
                      Latest contacts from your CRM system
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search leads..."
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
                  {leads.length > 0 ? leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-sm text-muted-foreground">{lead.company || 'No company'}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium">{lead.points || 0} pts</div>
                          <div className="text-sm text-muted-foreground">
                            {lead.last_active ? `Active: ${formatDate(lead.last_active)}` : `Added: ${formatDate(lead.created_at)}`}
                          </div>
                        </div>
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No leads found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Deals</CardTitle>
                <CardDescription>
                  Track your sales pipeline and deal progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deals.length > 0 ? deals.map((deal) => (
                    <div
                      key={deal.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium">{deal.title}</div>
                        <div className="text-sm text-muted-foreground">{deal.company}</div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium">{formatCurrency(deal.value)}</div>
                          <div className="text-sm text-muted-foreground">
                            {deal.probability}% probability
                          </div>
                        </div>
                        <Badge className={getStageColor(deal.stage)}>
                          {deal.stage}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          {formatDate(deal.close_date)}
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No deals found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Management</CardTitle>
                <CardDescription>
                  Manage your customer and prospect contacts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Contact management coming soon</h3>
                  <p className="text-muted-foreground mb-4">
                    This feature will be integrated with CRM
                  </p>
                  <Button variant="outline" onClick={() => window.open(import.meta.env.VITE_CRM_URL || 'http://localhost:8081', '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open CRM System
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