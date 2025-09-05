import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { 
  Phone, 
  PhoneCall, 
  Clock, 
  Users, 
  Mic,
  MicOff,
  Play,
  Pause,
  Settings,
  ExternalLink
} from "lucide-react";

export default function CallAssistant() {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);

  const handleMakeCall = () => {
    if (!phoneNumber) {
      toast({ title: 'Phone number required', description: 'Please enter a phone number to call.', variant: 'destructive' });
      return;
    }
    setIsCallActive(true);
    toast({ title: 'Call initiated', description: `Calling ${phoneNumber}...` });
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsMuted(false);
    setIsOnHold(false);
    toast({ title: 'Call ended', description: 'Call has been terminated.' });
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    toast({ title: isMuted ? 'Unmuted' : 'Muted', description: `Call ${isMuted ? 'unmuted' : 'muted'}.` });
  };

  const handleHold = () => {
    setIsOnHold(!isOnHold);
    toast({ title: isOnHold ? 'Call resumed' : 'Call on hold', description: `Call ${isOnHold ? 'resumed' : 'placed on hold'}.` });
  };

  const handleSettings = () => {
    toast({ title: 'Settings', description: 'Call settings panel opened.' });
  };

  const handleConfigureAI = () => {
    toast({ title: 'AI Configuration', description: 'AI assistant configuration opened.' });
  };

  const handleRecordingSettings = () => {
    toast({ title: 'Recording Settings', description: 'Recording configuration opened.' });
  };

  const openTelnyxDashboard = () => {
    window.open('https://portal.telnyx.com', '_blank');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">AI Call Assistant</h1>
            <p className="text-muted-foreground">
              Manage calls and AI-powered voice interactions with Telnyx
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSettings}>
              <Settings className="h-4 w-4 mr-2" />
              Call Settings
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PhoneCall className="h-4 w-4 mr-2" />
                  Make Call
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Make a Call</DialogTitle>
                  <DialogDescription>Enter the phone number you want to call</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1234567890"
                      type="tel"
                    />
                  </div>
                  <Button onClick={handleMakeCall} className="w-full">
                    <PhoneCall className="h-4 w-4 mr-2" />
                    Start Call
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No calls made yet</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Calls</CardTitle>
              <PhoneCall className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No active calls</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Call Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0m</div>
              <p className="text-xs text-muted-foreground">No data available</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-xs text-muted-foreground">No calls completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="calls" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calls">Call History</TabsTrigger>
            <TabsTrigger value="live">Live Calls</TabsTrigger>
            <TabsTrigger value="recordings">Recordings</TabsTrigger>
          </TabsList>

          <TabsContent value="calls">
            <Card>
              <CardHeader>
                <CardTitle>Call History</CardTitle>
                <CardDescription>View your recent call activity and logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Phone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No calls yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Your call history will appear here once you start making calls
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <PhoneCall className="h-4 w-4 mr-2" />
                        Make Your First Call
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Make a Call</DialogTitle>
                        <DialogDescription>Enter the phone number you want to call</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="phone2">Phone Number</Label>
                          <Input 
                            id="phone2" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+1234567890"
                            type="tel"
                          />
                        </div>
                        <Button onClick={handleMakeCall} className="w-full">
                          <PhoneCall className="h-4 w-4 mr-2" />
                          Start Call
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="live">
            <Card>
              <CardHeader>
                <CardTitle>Live Call Dashboard</CardTitle>
                <CardDescription>Monitor and control active calls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <PhoneCall className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No active calls</h3>
                  <p className="text-muted-foreground mb-4">
                    Active calls will be displayed here with real-time controls
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" onClick={handleMute} disabled={!isCallActive}>
                      {isMuted ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                      {isMuted ? 'Unmute' : 'Mute'}
                    </Button>
                    <Button variant="outline" onClick={handleHold} disabled={!isCallActive}>
                      <Pause className="h-4 w-4 mr-2" />
                      {isOnHold ? 'Resume' : 'Hold'}
                    </Button>
                    {isCallActive && (
                      <Button variant="destructive" onClick={handleEndCall}>
                        <Phone className="h-4 w-4 mr-2" />
                        End Call
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recordings">
            <Card>
              <CardHeader>
                <CardTitle>Call Recordings</CardTitle>
                <CardDescription>Access and manage your call recordings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No recordings available</h3>
                  <p className="text-muted-foreground mb-4">
                    Call recordings will be stored here for review and analysis
                  </p>
                  <Button variant="outline" onClick={handleRecordingSettings}>
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Recording Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common call management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-20 flex-col">
                    <PhoneCall className="h-6 w-6 mb-2" />
                    Make Outbound Call
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Make Outbound Call</DialogTitle>
                    <DialogDescription>Enter the phone number for your outbound call</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone3">Phone Number</Label>
                      <Input 
                        id="phone3" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1234567890"
                        type="tel"
                      />
                    </div>
                    <Button onClick={handleMakeCall} className="w-full">
                      <PhoneCall className="h-4 w-4 mr-2" />
                      Start Call
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="h-20 flex-col" onClick={handleConfigureAI}>
                <Settings className="h-6 w-6 mb-2" />
                Configure AI Assistant
              </Button>
              <Button variant="outline" className="h-20 flex-col" onClick={openTelnyxDashboard}>
                <ExternalLink className="h-6 w-6 mb-2" />
                Telnyx Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}