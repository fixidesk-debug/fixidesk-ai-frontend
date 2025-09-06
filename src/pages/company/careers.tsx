import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, DollarSign, Clock, Users, Zap, Heart, BarChart, Code, MessageSquare, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: <DollarSign className="h-6 w-6 text-blue-600" />,
    title: "Competitive Salary",
    description: "We offer industry-leading compensation packages."
  },
  {
    icon: <Clock className="h-6 w-6 text-green-600" />,
    title: "Flexible Hours",
    description: "Work when you're most productive."
  },
  {
    icon: <Users className="h-6 w-6 text-purple-600" />,
    title: "Remote Work",
    description: "Work from anywhere in the world."
  },
  {
    icon: <Zap className="h-6 w-6 text-orange-600" />,
    title: "Learning Budget",
    description: "Annual stipend for professional development."
  },
  {
    icon: <Heart className="h-6 w-6 text-red-600" />,
    title: "Health & Wellness",
    description: "Comprehensive health coverage and wellness programs."
  },
  {
    icon: <Briefcase className="h-6 w-6 text-amber-600" />,
    title: "Unlimited PTO",
    description: "Take time off when you need it."
  }
];

const values = [
  {
    title: "Customer Obsession",
    description: "We start with the customer and work backwards.",
    icon: <Heart className="h-5 w-5" />
  },
  {
    title: "Ownership",
    description: "We're all owners and act on behalf of the entire company.",
    icon: <Shield className="h-5 w-5" />
  },
  {
    title: "Invent & Simplify",
    description: "We expect and require innovation and invention from our teams.",
    icon: <Zap className="h-5 w-5" />
  },
  {
    title: "Learn & Be Curious",
    description: "We're never done learning and seeking new opportunities.",
    icon: <BarChart className="h-5 w-5" />
  }
];

const openPositions = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    icon: <Code className="h-5 w-5 text-blue-600" />
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    type: "Full-time",
    location: "San Francisco, CA",
    icon: <MessageSquare className="h-5 w-5 text-green-600" />
  },
  {
    id: 3,
    title: "Customer Success Manager",
    department: "Customer Success",
    type: "Full-time",
    location: "Remote",
    icon: <Users className="h-5 w-5 text-purple-600" />
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    icon: <Code className="h-5 w-5 text-orange-600" />
  },
  {
    id: 5,
    title: "Content Marketing Manager",
    department: "Marketing",
    type: "Full-time",
    location: "New York, NY",
    icon: <MessageSquare className="h-5 w-5 text-red-600" />
  }
];

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Join Our Team
        </h1>
        <p className="text-xl text-muted-foreground">
          Help us build the future of AI-powered conversations
        </p>
      </div>

      <div className="bg-muted/50 rounded-xl p-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Work With Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start">
                <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mr-4 mt-0.5">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-medium">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <Card key={i} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <CardTitle className="text-lg">{value.title}</CardTitle>
                <CardDescription>{value.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Open Positions</h2>
            <p className="text-muted-foreground">Find the perfect role for you</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="w-full md:w-auto">
              All Departments
            </Button>
            <Button variant="outline" className="w-full md:w-auto">
              All Locations
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {openPositions.map((position) => (
            <Card key={position.id} className="group hover:shadow-lg transition-shadow">
              <Link href={`/careers/${position.id}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        {position.icon}
                      </div>
                      <div>
                        <h3 className="font-medium group-hover:text-blue-600 transition-colors">
                          {position.title}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Briefcase className="h-3.5 w-3.5 mr-1.5" />
                            {position.department}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1.5" />
                            {position.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                            {position.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" className="ml-auto hidden md:flex items-center">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Don't see a role that fits? We're always looking for talented individuals.
          </p>
          <Button variant="outline">
            Join Our Talent Network
          </Button>
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Life at Our Company</h2>
          <p className="text-muted-foreground mb-6">
            We're a diverse team of passionate individuals working together to build something amazing.
            Join us and be part of our journey.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
              </div>
            ))}
          </div>
          <Button asChild>
            <Link href="/about">
              Learn More About Us
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
