import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Cpu, Zap, Terminal, BookOpen, Key, GitBranch, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const features = [
  {
    icon: <Cpu className="h-6 w-6 text-blue-600" />,
    title: "RESTful API",
    description: "Standard REST endpoints for easy integration with any language or framework."
  },
  {
    icon: <Zap className="h-6 w-6 text-green-600" />,
    title: "Real-time Updates",
    description: "WebSocket support for real-time events and notifications."
  },
  {
    icon: <Shield className="h-6 w-6 text-purple-600" />,
    title: "OAuth 2.0",
    description: "Secure authentication with industry-standard OAuth 2.0 protocol."
  },
  {
    icon: <GitBranch className="h-6 w-6 text-orange-600" />,
    title: "Versioning",
    description: "Stable API versions with clear upgrade paths and backward compatibility."
  },
  {
    icon: <Clock className="h-6 w-6 text-red-600" />,
    title: "Rate Limiting",
    description: "Predictable rate limits with clear headers and documentation."
  },
  {
    icon: <BookOpen className="h-6 w-6 text-amber-600" />,
    title: "Interactive Docs",
    description: "Comprehensive documentation with interactive API explorer."
  }
];

const codeExamples = {
  javascript: `// Initialize the API client
const client = new ChatAPI({
  apiKey: 'your_api_key_here',
  environment: 'production'
});

// Send a message
async function sendMessage() {
  try {
    const response = await client.messages.create({
      channel: 'support',
      text: 'Hello, world!',
      metadata: {
        user_id: 'user_123',
        source: 'website'
      }
    });
    console.log('Message sent:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}`,
  python: `from chatapi import Client

# Initialize the client
client = Client(api_key='your_api_key_here')

# Send a message
try:
    response = client.messages.create(
        channel="support",
        text="Hello, world!",
        metadata={
            "user_id": "user_123",
            "source": "website"
        }
    )
    print(f"Message sent: {response}")
except Exception as e:
    print(f"Error sending message: {e}")`,
  curl: `# Send a message with cURL
curl -X POST https://api.example.com/v1/messages \
  -H "Authorization: Bearer your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "channel": "support",
    "text": "Hello, world!",
    "metadata": {
      "user_id": "user_123",
      "source": "website"
    }
  }'`
};

const sdks = [
  { name: 'JavaScript/Node.js', version: 'v3.2.1' },
  { name: 'Python', version: 'v2.5.0' },
  { name: 'Ruby', version: 'v1.8.3' },
  { name: 'PHP', version: 'v2.1.0' },
  { name: 'Java', version: 'v1.5.2' },
  { name: 'Go', version: 'v0.8.1' }
];

export default function ApiPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          API Reference
        </h1>
        <p className="text-xl text-muted-foreground">
          Build powerful integrations with our comprehensive API
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, i) => (
          <Card key={i} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 rounded-xl p-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Start</h2>
          
          <Tabs defaultValue="javascript" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="curl">cURL</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <TabsContent value="javascript">
                <pre className="text-sm text-gray-300">
                  <code>{codeExamples.javascript}</code>
                </pre>
              </TabsContent>
              <TabsContent value="python">
                <pre className="text-sm text-gray-300">
                  <code>{codeExamples.python}</code>
                </pre>
              </TabsContent>
              <TabsContent value="curl">
                <pre className="text-sm text-gray-300">
                  <code>{codeExamples.curl}</code>
                </pre>
              </TabsContent>
              
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" className="text-xs">
                  <Code className="mr-2 h-3 w-3" />
                  Copy Code
                </Button>
              </div>
            </div>
          </Tabs>
          
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/docs/api/authentication">
                View Authentication Guide
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <Terminal className="h-6 w-6" />
            </div>
            <CardTitle>SDKs & Libraries</CardTitle>
            <CardDescription>
              Official libraries for popular programming languages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sdks.map((sdk, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center">
                    <Code className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="font-medium">{sdk.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{sdk.version}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
              <Key className="h-6 w-6" />
            </div>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>
              Manage your API keys and permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Production Key</span>
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">Active</span>
              </div>
              <div className="flex items-center justify-between bg-background p-2 rounded text-sm font-mono">
                <span className="truncate">sk_live_••••••••••••••••••••••••••••••••</span>
                <Button variant="ghost" size="sm" className="ml-2">
                  Copy
                </Button>
              </div>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/settings/api-keys">
                Manage API Keys
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Need help with our API?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our developer documentation has everything you need to get started, from authentication to advanced features.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/docs">
              View Full Documentation
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/support/contact">
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
