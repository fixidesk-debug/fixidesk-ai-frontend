import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Clock,
  User
} from "lucide-react";

interface CallState {
  status: 'idle' | 'dialing' | 'ringing' | 'connected' | 'ended';
  duration: number;
  isMuted: boolean;
  isSpeakerOn: boolean;
  callId?: string;
  contactName?: string;
  contactNumber?: string;
}

interface TelnyxCallWidgetProps {
  onCallStart?: (number: string) => void;
  onCallEnd?: (callId: string, duration: number) => void;
  onCallLog?: (callData: any) => void;
}

export function TelnyxCallWidget({ onCallStart, onCallEnd, onCallLog }: TelnyxCallWidgetProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callState, setCallState] = useState<CallState>({
    status: 'idle',
    duration: 0,
    isMuted: false,
    isSpeakerOn: false
  });
  
  const intervalRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<Date>();

  // Simulate call timer
  useEffect(() => {
    if (callState.status === 'connected') {
      startTimeRef.current = new Date();
      intervalRef.current = setInterval(() => {
        setCallState(prev => ({
          ...prev,
          duration: prev.duration + 1
        }));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [callState.status]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const initiateCall = async () => {
    if (!phoneNumber.trim()) return;

    try {
      setCallState(prev => ({
        ...prev,
        status: 'dialing',
        contactNumber: phoneNumber,
        duration: 0
      }));

      onCallStart?.(phoneNumber);

      // Simulate Telnyx API call
      // In production, this would use the actual Telnyx SDK
      const response = await fetch('/api/telnyx/initiate-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
          from: process.env.VITE_TELNYX_PHONE_NUMBER || '+1234567890'
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Simulate call progression
        setTimeout(() => {
          setCallState(prev => ({ ...prev, status: 'ringing' }));
        }, 1000);

        setTimeout(() => {
          setCallState(prev => ({ 
            ...prev, 
            status: 'connected',
            callId: data.callId || 'call_' + Date.now()
          }));
        }, 3000);
      } else {
        throw new Error('Failed to initiate call');
      }
    } catch (error) {
      console.error('Call initiation failed:', error);
      setCallState(prev => ({ ...prev, status: 'idle' }));
    }
  };

  const endCall = async () => {
    try {
      if (callState.callId) {
        // In production, this would call Telnyx API to end the call
        await fetch(`/api/telnyx/end-call/${callState.callId}`, {
          method: 'POST'
        });

        onCallEnd?.(callState.callId, callState.duration);
        
        // Log call data
        const callData = {
          callId: callState.callId,
          to: callState.contactNumber,
          duration: callState.duration,
          status: 'completed',
          timestamp: new Date().toISOString()
        };
        
        onCallLog?.(callData);
      }

      setCallState({
        status: 'idle',
        duration: 0,
        isMuted: false,
        isSpeakerOn: false
      });
      setPhoneNumber("");
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  const toggleMute = () => {
    setCallState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    // In production, this would call Telnyx API to mute/unmute
  };

  const toggleSpeaker = () => {
    setCallState(prev => ({ ...prev, isSpeakerOn: !prev.isSpeakerOn }));
    // In production, this would control audio output
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'dialing':
      case 'ringing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'ended': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'dialing': return 'Dialing...';
      case 'ringing': return 'Ringing...';
      case 'connected': return 'Connected';
      case 'ended': return 'Call Ended';
      default: return 'Ready';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Voice Calling
        </CardTitle>
        <CardDescription>
          Make outbound calls using Telnyx
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Call Status */}
        <div className="text-center">
          <Badge className={getStatusColor(callState.status)}>
            {getStatusText(callState.status)}
          </Badge>
          {callState.status === 'connected' && (
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {formatDuration(callState.duration)}
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        {callState.status === 'idle' && (
          <div className="space-y-2">
            <Input
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="text-center text-lg"
            />
            <Button 
              onClick={initiateCall}
              disabled={!phoneNumber.trim()}
              className="w-full"
              size="lg"
            >
              <PhoneCall className="h-4 w-4 mr-2" />
              Call
            </Button>
          </div>
        )}

        {/* Active Call Controls */}
        {callState.status !== 'idle' && (
          <div className="space-y-4">
            {/* Contact Info */}
            {callState.contactNumber && (
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">
                    {callState.contactName || 'Unknown Contact'}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {callState.contactNumber}
                </div>
              </div>
            )}

            {/* Call Controls */}
            {callState.status === 'connected' && (
              <div className="flex justify-center gap-2">
                <Button
                  variant={callState.isMuted ? "default" : "outline"}
                  size="icon"
                  onClick={toggleMute}
                >
                  {callState.isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                
                <Button
                  variant={callState.isSpeakerOn ? "default" : "outline"}
                  size="icon"
                  onClick={toggleSpeaker}
                >
                  {callState.isSpeakerOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              </div>
            )}

            {/* End Call Button */}
            <Button 
              onClick={endCall}
              variant="destructive"
              className="w-full"
              size="lg"
            >
              <PhoneOff className="h-4 w-4 mr-2" />
              End Call
            </Button>
          </div>
        )}

        {/* Quick Dial Numbers */}
        {callState.status === 'idle' && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Quick Dial</div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPhoneNumber("+1 (555) 123-4567")}
              >
                Support Line
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPhoneNumber("+1 (555) 987-6543")}
              >
                Sales Team
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

