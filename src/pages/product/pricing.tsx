import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Zap, Users, Shield, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small teams getting started",
    features: [
      "1,000 conversations/month",
      "Basic AI Assistant",
      "Email support",
      "Standard security",
      "Basic analytics"
    ],
    buttonText: "Get Started",
    popular: false
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "For growing businesses with more needs",
    features: [
      "5,000 conversations/month",
      "Advanced AI Assistant",
      "Priority support",
      "Advanced security",
      "Advanced analytics",
      "API access",
      "Custom branding"
    ],
    buttonText: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with complex needs",
    features: [
      "Unlimited conversations",
      "Custom AI models",
      "24/7 dedicated support",
      "Enterprise security",
      "Custom analytics",
      "SLA & Uptime guarantees",
      "On-premise deployment"
    ],
    buttonText: "Contact Sales",
    popular: false
  }
];

const features = [
  {
    name: "Conversations",
    tiers: {
      Starter: "1,000/month",
      Professional: "5,000/month",
      Enterprise: "Unlimited"
    }
  },
  {
    name: "AI Assistant",
    tiers: {
      Starter: "Basic",
      Professional: "Advanced",
      Enterprise: "Custom"
    }
  },
  {
    name: "Support",
    tiers: {
      Starter: "Email",
      Professional: "Priority",
      Enterprise: "24/7 Dedicated"
    }
  },
  {
    name: "Security",
    tiers: {
      Starter: "Standard",
      Professional: "Advanced",
      Enterprise: "Enterprise"
    }
  },
  {
    name: "API Access",
    tiers: {
      Starter: false,
      Professional: true,
      Enterprise: true
    }
  },
  {
    name: "Custom Branding",
    tiers: {
      Starter: false,
      Professional: true,
      Enterprise: true
    }
  }
];

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose the perfect plan for your business needs
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, i) => (
          <Card 
            key={i} 
            className={`relative ${plan.popular ? 'border-blue-500 shadow-lg' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="flex items-baseline mt-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" asChild>
                <Link href="/signup">
                  {plan.buttonText}
                  {!plan.popular && <ArrowRight className="ml-2 h-4 w-4" />}
                  {plan.popular && <Zap className="ml-2 h-4 w-4" />}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Compare Plans</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 pr-8">Features</th>
                <th className="text-center py-4 px-4">Starter</th>
                <th className="text-center py-4 px-4">Professional</th>
                <th className="text-center py-4 pl-4">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={i} className="border-b">
                  <td className="py-4 pr-8">{feature.name}</td>
                  <td className="text-center py-4 px-4">
                    {typeof feature.tiers.Starter === 'string' 
                      ? feature.tiers.Starter 
                      : (feature.tiers.Starter ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : '—')
                    }
                  </td>
                  <td className="text-center py-4 px-4">
                    {typeof feature.tiers.Professional === 'string' 
                      ? feature.tiers.Professional 
                      : (feature.tiers.Professional ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : '—')
                    }
                  </td>
                  <td className="text-center py-4 pl-4">
                    {typeof feature.tiers.Enterprise === 'string' 
                      ? feature.tiers.Enterprise 
                      : (feature.tiers.Enterprise ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : '—')
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our team is here to help you choose the right plan for your business needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">
              Contact Sales
            </Link>
          </Button>
          <Button size="lg" variant="ghost" asChild>
            <Link href="/faq">
              View FAQ
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
