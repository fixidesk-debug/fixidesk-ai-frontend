import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Calendar, User, Clock, Search, Tag } from "lucide-react";

const Blog = () => {
  const categories = ["All", "Product Updates", "Customer Success", "Industry Insights", "Best Practices"];
  
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Customer Support: 2024 Trends",
      excerpt: "Discover how artificial intelligence is revolutionizing customer support and what trends to watch in 2024.",
      category: "Industry Insights",
      author: "Sarah Chen",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "How TechCorp Reduced Response Time by 90% with FixiDesk",
      excerpt: "A detailed case study on how one of our enterprise clients transformed their customer support operations.",
      category: "Customer Success",
      author: "Marcus Rodriguez",
      date: "March 12, 2024", 
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Introducing Smart Ticket Routing 2.0",
      excerpt: "Our latest product update brings even more intelligent automation to your support workflow.",
      category: "Product Updates",
      author: "Emily Watson",
      date: "March 10, 2024",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "5 Best Practices for Multichannel Customer Support",
      excerpt: "Learn how to provide consistent, excellent support across all customer touchpoints.",
      category: "Best Practices",
      author: "David Kim",
      date: "March 8, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Building a Customer-Centric Culture in Remote Teams",
      excerpt: "Strategies for maintaining exceptional customer focus when your team is distributed globally.",
      category: "Best Practices",
      author: "Lisa Park",
      date: "March 5, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Q4 Platform Updates: What's New in FixiDesk",
      excerpt: "A comprehensive overview of all the new features and improvements released this quarter.",
      category: "Product Updates",
      author: "Alex Chen",
      date: "March 1, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                FixiDesk <span className="text-primary">Blog</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Insights, updates, and best practices from the world of customer support automation.
              </p>
              
              {/* Search */}
              <div className="flex gap-2 max-w-md mx-auto mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search articles..." className="pl-10" />
                </div>
                <Button variant="outline">Search</Button>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={category === "All" ? "default" : "secondary"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative">
                    <img
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover min-h-[300px]"
                    />
                    <Badge className="absolute top-4 left-4">Featured</Badge>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <Badge variant="secondary" className="mb-3 w-fit">
                      <Tag className="h-3 w-3 mr-1" />
                      {blogPosts[0].category}
                    </Badge>
                    <h2 className="text-2xl font-bold text-foreground mb-4">{blogPosts[0].title}</h2>
                    <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {blogPosts[0].author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {blogPosts[0].date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {blogPosts[0].readTime}
                      </div>
                    </div>
                    <Button className="w-fit">Read Article</Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge variant="secondary" className="absolute top-3 left-3">
                        <Tag className="h-3 w-3 mr-1" />
                        {post.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">Load More Articles</Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Stay Updated</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get the latest articles, product updates, and customer support insights delivered to your inbox.
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button>Subscribe</Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;