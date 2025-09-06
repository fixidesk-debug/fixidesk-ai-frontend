import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, AlertTriangle, Info, Clock, RefreshCw, Mail, Rss, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./status.module.css";

// Mock data for status items
const statusItems = [
  {
    service: "API",
    status: "operational",
    description: "Core API services",
    updated: "2 minutes ago"
  },
  {
    service: "Web Application",
    status: "operational",
    description: "Main web interface",
    updated: "5 minutes ago"
  },
  {
    service: "Database",
    status: "degraded",
    description: "Primary database cluster",
    updated: "1 hour ago",
    incident: {
      id: "db-2023-06-15",
      title: "Increased latency on read replicas",
      status: "monitoring"
    }
  },
  {
    service: "Authentication",
    status: "operational",
    description: "User authentication services",
    updated: "15 minutes ago"
  },
  {
    service: "File Storage",
    status: "operational",
    description: "File upload and storage",
    updated: "30 minutes ago"
  },
  {
    service: "Email Service",
    status: "partial_outage",
    description: "Transaction and notification emails",
    updated: "45 minutes ago",
    incident: {
      id: "email-2023-06-15",
      title: "Delays in outbound email delivery",
      status: "investigating"
    }
  }
];

// Mock incident history
const incidents = [
  {
    id: "email-2023-06-15",
    status: "investigating",
    title: "Delays in outbound email delivery",
    start: "2023-06-15T10:30:00Z",
    updates: [
      {
        time: "2023-06-15T10:30:00Z",
        status: "investigating",
        message: "We're investigating reports of delayed email delivery. Some users may experience delays in receiving our emails."
      },
      {
        time: "2023-06-15T10:45:00Z",
        status: "investigating",
        message: "Our team has identified the issue with our third-party email provider and is working on a resolution."
      }
    ]
  },
  {
    id: "db-2023-06-15",
    status: "monitoring",
    title: "Increased latency on read replicas",
    start: "2023-06-15T09:15:00Z",
    resolved: "2023-06-15T10:30:00Z",
    updates: [
      {
        time: "2023-06-15T09:15:00Z",
        status: "investigating",
        message: "We're investigating increased latency on our database read replicas."
      },
      {
        time: "2023-06-15T09:45:00Z",
        status: "identified",
        message: "The issue has been identified and a fix is being implemented."
      },
      {
        time: "2023-06-15T10:30:00Z",
        status: "resolved",
        message: "The issue has been resolved and we're monitoring the situation."
      }
    ]
  },
  {
    id: "api-2023-06-14",
    status: "resolved",
    title: "API rate limiting issues",
    start: "2023-06-14T14:20:00Z",
    resolved: "2023-06-14T15:45:00Z",
    updates: [
      {
        time: "2023-06-14T14:20:00Z",
        status: "investigating",
        message: "We're investigating reports of API rate limiting issues."
      },
      {
        time: "2023-06-14T15:00:00Z",
        status: "monitoring",
        message: "A fix has been deployed and we're monitoring the situation."
      },
      {
        time: "2023-06-14T15:45:00Z",
        status: "resolved",
        message: "The issue has been fully resolved."
      }
    ]
  }
];

// Get status color and icon
function getStatusInfo(status: string) {
  switch (status) {
    case 'operational':
      return {
        color: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        icon: <Check className="h-5 w-5" />,
        label: 'Operational'
      };
    case 'degraded':
      return {
        color: 'text-yellow-600 dark:text-yellow-400',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        icon: <AlertTriangle className="h-5 w-5" />,
        label: 'Degraded Performance'
      };
    case 'partial_outage':
      return {
        color: 'text-orange-600 dark:text-orange-400',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        icon: <AlertTriangle className="h-5 w-5" />,
        label: 'Partial Outage'
      };
    case 'major_outage':
      return {
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        icon: <X className="h-5 w-5" />,
        label: 'Major Outage'
      };
    case 'maintenance':
      return {
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        icon: <Clock className="h-5 w-5" />,
        label: 'Maintenance'
      };
    default:
      return {
        color: 'text-gray-600 dark:text-gray-400',
        bgColor: 'bg-gray-100 dark:bg-gray-800',
        icon: <Info className="h-5 w-5" />,
        label: 'Unknown'
      };
  }
}

// Format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  }).format(date);
}

// Format relative time
function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
}

export default function StatusPage() {
  const activeIncidents = incidents.filter(incident => incident.status !== 'resolved');
  const pastIncidents = incidents.filter(incident => incident.status === 'resolved').slice(0, 5);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Service Status
        </h1>
        <p className="text-xl text-muted-foreground">
          Real-time updates on the status of our services
        </p>
      </div>

      {/* Status Overview */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Service Status</h2>
          <div className="flex items-center text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 mr-2" />
            Updated {formatRelativeTime(new Date().toISOString())}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {statusItems.map((item, i) => {
            const statusInfo = getStatusInfo(item.status);
            return (
              <Card key={i} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{item.service}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <span 
                          className={`h-2 w-2 rounded-full mr-1.5 ${statusInfo.bgColor}`}
                          style={{
                            backgroundColor: statusInfo.color.replace('text-', '').split('-')[0],
                            opacity: 0.8
                          }}
                        />
                        <span className="text-xs">
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  {item.incident && (
                    <div className="mt-3 pt-3 border-t">
                      <Link to={`/status/incidents/${item.incident.id}`} className="text-sm text-blue-600 hover:underline flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1.5 text-yellow-500" />
                        {item.incident.title}
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-sm text-muted-foreground">
          Last updated: {formatDate(new Date().toISOString())}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Active Incidents */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Active Incidents</h2>
            {activeIncidents.length > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                {activeIncidents.length} Active
              </span>
            )}
          </div>
          
          {activeIncidents.length > 0 ? (
            <div className="space-y-4">
              {activeIncidents.map((incident) => (
                <Card key={incident.id} className="border-red-200 dark:border-red-900/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        <Link to={`/status/incidents/${incident.id}`} className="hover:underline">
                          {incident.title}
                        </Link>
                      </CardTitle>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        {incident.status === 'investigating' ? 'Investigating' : 
                         incident.status === 'identified' ? 'Identified' : 
                         incident.status === 'monitoring' ? 'Monitoring' : 'Resolved'}
                      </span>
                    </div>
                    <CardDescription>
                      Started {formatRelativeTime(incident.start)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">
                      {incident.updates[0].message}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/status/incidents/${incident.id}`}>
                        View Updates <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium mb-1">All systems operational</h3>
                <p className="text-sm text-muted-foreground">
                  There are no ongoing incidents at this time.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Past Incidents */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Past Incidents</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/status/history" className="text-sm">
                View All
              </Link>
            </Button>
          </div>
          
          {pastIncidents.length > 0 ? (
            <div className="space-y-4">
              {pastIncidents.map((incident) => (
                <Card key={incident.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="py-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        <Link href={`/status/incidents/${incident.id}`} className="hover:underline">
                          {incident.title}
                        </Link>
                      </CardTitle>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Resolved
                      </span>
                    </div>
                    <CardDescription className="text-xs">
                      {formatDate(incident.start)} • {formatRelativeTime(incident.resolved || '')}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <Info className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="font-medium mb-1">No past incidents</h3>
                <p className="text-sm text-muted-foreground">
                  There are no resolved incidents to display.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Stay Updated</h2>
          <p className="text-muted-foreground text-center mb-6">
            Get notified about service status updates and incidents.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center justify-center">
              <Rss className="h-4 w-4 mr-2" />
              RSS Feed
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              <Mail className="h-4 w-4 mr-2" />
              Email Alerts
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
