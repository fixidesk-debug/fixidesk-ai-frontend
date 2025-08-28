import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle, Clock, Activity, Globe, Zap, Database } from "lucide-react";

const Status = () => {
  const systemStatus = {
    overall: "operational",
    lastUpdated: "2 minutes ago"
  };

  const services = [
    {
      name: "API Gateway",
      status: "operational",
      uptime: "99.98%",
      responseTime: "145ms",
      description: "Core API endpoints and authentication"
    },
    {
      name: "AI Processing",
      status: "operational", 
      uptime: "99.95%",
      responseTime: "312ms",
      description: "AI-powered response generation and analysis"
    },
    {
      name: "Integrations",
      status: "operational",
      uptime: "99.97%",
      responseTime: "89ms", 
      description: "Third-party platform connections"
    },
    {
      name: "Dashboard",
      status: "operational",
      uptime: "99.99%",
      responseTime: "67ms",
      description: "Web application and user interface"
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.98%",
      responseTime: "23ms",
      description: "Data storage and retrieval systems"
    },
    {
      name: "Email Delivery",
      status: "partial_outage",
      uptime: "98.23%", 
      responseTime: "1.2s",
      description: "Notification and email services"
    }
  ];

  const incidents = [
    {
      id: 1,
      title: "Email Delivery Delays",
      status: "investigating",
      severity: "minor",
      startTime: "2024-03-15 14:30 UTC",
      description: "Some users may experience delays in receiving email notifications. We're investigating the issue.",
      updates: [
        {
          time: "2024-03-15 15:45 UTC",
          message: "We've identified the issue and are implementing a fix. Email delivery is gradually improving."
        },
        {
          time: "2024-03-15 14:30 UTC", 
          message: "We're investigating reports of delayed email notifications."
        }
      ]
    }
  ];

  const recentIncidents = [
    {
      date: "March 12, 2024",
      title: "API Gateway Maintenance",
      duration: "2 hours",
      status: "resolved",
      impact: "Planned maintenance window"
    },
    {
      date: "March 8, 2024",
      title: "Temporary Slack Integration Issues",
      duration: "45 minutes", 
      status: "resolved",
      impact: "Some Slack messages delayed"
    },
    {
      date: "March 3, 2024",
      title: "Database Performance Optimization",
      duration: "1 hour",
      status: "resolved", 
      impact: "Slower response times during optimization"
    }
  ];

  const metrics = [
    {
      label: "Uptime (30 days)",
      value: "99.97%",
      icon: Activity,
      color: "text-green-500"
    },
    {
      label: "Response Time",
      value: "156ms", 
      icon: Zap,
      color: "text-blue-500"
    },
    {
      label: "Active Incidents",
      value: "1",
      icon: AlertTriangle,
      color: "text-yellow-500"
    },
    {
      label: "Resolved Today",
      value: "0",
      icon: CheckCircle,
      color: "text-green-500"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "partial_outage":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "major_outage":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "investigating":
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      operational: { variant: "outline", className: "text-green-600 border-green-200" },
      partial_outage: { variant: "outline", className: "text-yellow-600 border-yellow-200" },
      major_outage: { variant: "outline", className: "text-red-600 border-red-200" },
      investigating: { variant: "outline", className: "text-blue-600 border-blue-200" },
      resolved: { variant: "outline", className: "text-green-600 border-green-200" }
    };
    
    return variants[status] || { variant: "outline" };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <Badge {...getStatusBadge(systemStatus.overall)} className="text-lg px-3 py-1">
                  All Systems Operational
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                System <span className="text-primary">Status</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Real-time status and performance metrics for all FixiDesk services
              </p>
              <p className="text-sm text-muted-foreground">
                Last updated: {systemStatus.lastUpdated}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Metrics Overview */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6 text-center">
                      <metric.icon className={`h-8 w-8 mx-auto mb-3 ${metric.color}`} />
                      <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Incidents */}
        {incidents.length > 0 && (
          <section className="pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">Current Incidents</h2>
              <div className="space-y-6">
                {incidents.map((incident, index) => (
                  <motion.div
                    key={incident.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="border-yellow-200">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {getStatusIcon(incident.status)}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-foreground">{incident.title}</h3>
                              <Badge {...getStatusBadge(incident.severity)}>
                                {incident.severity}
                              </Badge>
                              <Badge {...getStatusBadge(incident.status)}>
                                {incident.status}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-4">{incident.description}</p>
                            <p className="text-sm text-muted-foreground mb-4">
                              Started: {incident.startTime}
                            </p>
                            
                            <div className="space-y-3">
                              <h4 className="font-medium text-foreground">Updates:</h4>
                              {incident.updates.map((update, updateIndex) => (
                                <div key={updateIndex} className="border-l-2 border-muted pl-4">
                                  <p className="text-sm text-muted-foreground mb-1">{update.time}</p>
                                  <p className="text-sm">{update.message}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Service Status */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Service Status</h2>
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {getStatusIcon(service.status)}
                          <div>
                            <h3 className="font-semibold text-foreground">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div>
                              <div className="font-medium">Uptime</div>
                              <div>{service.uptime}</div>
                            </div>
                            <div>
                              <div className="font-medium">Response</div>
                              <div>{service.responseTime}</div>
                            </div>
                            <Badge {...getStatusBadge(service.status)}>
                              {service.status === 'operational' ? 'Operational' : 
                               service.status === 'partial_outage' ? 'Partial Outage' : 'Major Outage'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Incidents */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Recent Incidents</h2>
            <div className="space-y-4">
              {recentIncidents.map((incident, index) => (
                <motion.div
                  key={incident.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <div>
                            <h3 className="font-medium text-foreground">{incident.title}</h3>
                            <p className="text-sm text-muted-foreground">{incident.impact}</p>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div>{incident.date}</div>
                          <div>Duration: {incident.duration}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline">View All Incident History</Button>
            </div>
          </div>
        </section>

        {/* Subscribe to Updates */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Stay Informed</h2>
              <p className="text-muted-foreground mb-6">
                Get notified about service updates and incidents via email or SMS
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">Subscribe to Updates</Button>
                <Button variant="outline" size="lg">RSS Feed</Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Status;