import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, Briefcase, Heart, Coffee, Globe, Zap } from "lucide-react";

const Careers = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs."
    },
    {
      icon: Clock,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and unlimited PTO policy."
    },
    {
      icon: Users,
      title: "Learning & Growth",
      description: "Professional development budget, mentorship programs, and conference attendance."
    },
    {
      icon: Coffee,
      title: "Great Perks",
      description: "Catered meals, team events, latest tech equipment, and office stipend."
    },
    {
      icon: Globe,
      title: "Global Team",
      description: "Work with talented people from around the world in an inclusive environment."
    },
    {
      icon: Zap,
      title: "Impact",
      description: "Your work directly impacts thousands of businesses and millions of customers."
    }
  ];

  const openPositions = [
    {
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      description: "Join our core engineering team to build scalable AI-powered customer support solutions.",
      requirements: ["5+ years full-stack experience", "React, Node.js, TypeScript", "Experience with AI/ML systems"],
      posted: "2 days ago"
    },
    {
      title: "Product Manager - AI Platform",
      department: "Product",
      location: "Remote / New York", 
      type: "Full-time",
      description: "Lead product strategy for our AI automation features and drive customer-centric innovation.",
      requirements: ["3+ years PM experience", "B2B SaaS background", "AI/ML product experience"],
      posted: "1 week ago"
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote / Austin",
      type: "Full-time", 
      description: "Help our enterprise customers achieve success and drive product adoption.",
      requirements: ["2+ years customer success", "SaaS experience", "Excellent communication"],
      posted: "3 days ago"
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build and maintain our cloud infrastructure supporting millions of customer interactions.",
      requirements: ["3+ years DevOps experience", "AWS/GCP", "Kubernetes, Docker"],
      posted: "5 days ago"
    },
    {
      title: "Sales Development Representative",
      department: "Sales",
      location: "Remote / Boston",
      type: "Full-time",
      description: "Generate qualified leads and help grow our customer base through outbound prospecting.",
      requirements: ["1+ years sales experience", "B2B SaaS preferred", "Goal-oriented mindset"],
      posted: "1 week ago"
    },
    {
      title: "Marketing Designer",
      department: "Marketing",
      location: "Remote / Seattle",
      type: "Full-time",
      description: "Create compelling visual content and brand experiences across all marketing channels.",
      requirements: ["3+ years design experience", "Figma, Adobe Creative Suite", "Brand design experience"],
      posted: "4 days ago"
    }
  ];

  const departments = ["All", "Engineering", "Product", "Sales", "Marketing", "Customer Success"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">We're Hiring</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Join Our <span className="text-primary">Mission</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Help us transform customer support for businesses worldwide. Join a team of passionate 
                individuals building the future of AI-powered automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">View Open Positions</Button>
                <Button variant="outline" size="lg">Learn About Our Culture</Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Company Culture */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6">Why FixiDesk?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We're building something extraordinary - a platform that makes exceptional customer 
                  support accessible to every business. Our team is united by a shared vision of 
                  transforming how companies connect with their customers.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Here, you'll work alongside brilliant minds, tackle complex challenges, and see 
                  your impact on thousands of businesses and millions of customer interactions daily.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Remote-First</Badge>
                    <span className="text-muted-foreground">Work from anywhere</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Fast-Growing</Badge>
                    <span className="text-muted-foreground">Series B startup</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Global Impact</Badge>
                    <span className="text-muted-foreground">50+ countries served</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  loading="lazy"
                  decoding="async"
                  className="rounded-lg shadow-lg w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Benefits & Perks</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We invest in our people with comprehensive benefits and a culture that promotes growth.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <benefit.icon className="h-8 w-8 text-primary mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Open Positions</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Find your next opportunity to make an impact.
              </p>
              
              {/* Department Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {departments.map((dept) => (
                  <Badge
                    key={dept}
                    variant={dept === "All" ? "default" : "secondary"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  >
                    {dept}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <motion.div
                  key={position.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <h3 className="text-xl font-semibold text-foreground">{position.title}</h3>
                            <Badge variant="outline">{position.department}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">{position.description}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {position.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {position.type}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Posted {position.posted}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {position.requirements.map((req) => (
                              <Badge key={req} variant="secondary" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="lg:ml-6">
                          <Button size="lg">Apply Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Don't see a role that fits? We're always looking for exceptional talent.
              </p>
              <Button variant="outline" size="lg">Send Us Your Resume</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;