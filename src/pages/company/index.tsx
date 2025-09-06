import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Globe, Rocket, BarChart, Heart, Award } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "10,000+", label: "Businesses" },
  { value: "50M+", label: "Daily Messages" },
  { value: "100+", label: "Countries" },
  { value: "99.9%", label: "Uptime" }
];

const values = [
  {
    icon: <Users className="h-6 w-6 text-blue-600" />,
    title: "Customer First",
    description: "We put our customers at the heart of everything we do."
  },
  {
    icon: <Rocket className="h-6 w-6 text-green-600" />,
    title: "Innovation",
    description: "We embrace change and constantly push boundaries."
  },
  {
    icon: <Globe className="h-6 w-6 text-purple-600" />,
    title: "Global Impact",
    description: "We build solutions that work for everyone, everywhere."
  },
  {
    icon: <BarChart className="h-6 w-6 text-orange-600" />,
    title: "Data-Driven",
    description: "We make decisions based on data and evidence."
  },
  {
    icon: <Heart className="h-6 w-6 text-red-600" />,
    title: "Passion",
    description: "We love what we do and it shows in our work."
  },
  {
    icon: <Award className="h-6 w-6 text-amber-600" />,
    title: "Excellence",
    description: "We strive for the highest standards in everything."
  }
];

const team = [
  {
    name: "Alex Johnson",
    role: "CEO & Co-founder",
    image: "/team/alex.jpg"
  },
  {
    name: "Sarah Chen",
    role: "CTO & Co-founder",
    image: "/team/sarah.jpg"
  },
  {
    name: "Michael Rodriguez",
    role: "VP of Engineering",
    image: "/team/michael.jpg"
  },
  {
    name: "Emily Wilson",
    role: "Head of Product",
    image: "/team/emily.jpg"
  }
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About Us
        </h1>
        <p className="text-xl text-muted-foreground">
          Empowering businesses through innovative AI solutions
        </p>
      </div>

      <div className="bg-muted/50 rounded-xl p-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Story</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg">
              Founded in 2020, our company began with a simple mission: to make AI-powered conversations accessible to businesses of all sizes. 
              What started as a small team of passionate engineers has grown into a global company serving thousands of customers worldwide.
            </p>
            <p>
              Today, we're proud to be at the forefront of conversational AI, helping businesses transform their customer experience and 
              streamline their operations with our cutting-edge technology.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((stat, i) => (
          <Card key={i} className="text-center p-6">
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className="text-muted-foreground">{stat.label}</div>
          </Card>
        ))}
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <Card key={i} className="p-6 group hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Leadership Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <Card key={i} className="overflow-hidden group">
              <div className="aspect-square bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 flex items-end p-4">
                  <div>
                    <h3 className="text-white font-medium">{member.name}</h3>
                    <p className="text-sm text-white/80">{member.role}</p>
                  </div>
                </div>
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 group-hover:scale-105 transition-transform duration-300" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl p-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking for talented individuals to join our growing team.
          </p>
          <Button asChild>
            <Link href="/careers">
              View Open Positions
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
