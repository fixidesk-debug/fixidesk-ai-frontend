import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Monitor, Smartphone, Palette, Settings } from "lucide-react";

export default function ChatWidget() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold">
            Chat Widget
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-muted-foreground mt-2">
            Preview and customize your website chat widget
          </motion.p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Widget Preview
                </CardTitle>
                <CardDescription>Live preview of your chat widget</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-hero rounded-lg p-8 relative overflow-hidden">
                  <div className="absolute bottom-6 right-6">
                    <div className="bg-card border border-border rounded-xl shadow-luxurious w-80 h-96">
                      <div className="bg-primary text-primary-foreground p-4 rounded-t-xl">
                        <h3 className="font-semibold">FixiDesk Support</h3>
                        <p className="text-sm opacity-90">We're here to help!</p>
                      </div>
                      <div className="p-4 space-y-3 h-64 overflow-y-auto">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex-shrink-0"></div>
                          <div className="bg-muted p-3 rounded-lg flex-1">
                            <p className="text-sm">Hi! How can I help you today?</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-t">
                        <div className="flex gap-2">
                          <input 
                            className="flex-1 px-3 py-2 border rounded-lg text-sm" 
                            placeholder="Type your message..."
                            disabled
                          />
                          <Button size="sm" variant="hero">Send</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Widget Settings</CardTitle>
                <CardDescription>Customize appearance and behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enable Widget</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show Online Status</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-greet Visitors</span>
                  <Switch />
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}