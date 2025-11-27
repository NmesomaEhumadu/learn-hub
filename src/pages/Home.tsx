import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { BookOpen, Users, Award, TrendingUp, ArrowRight, Star, Quote } from "lucide-react";

const Home = () => {
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-background py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-glow animate-fade-up">
                Unlock Your Potential with <span className="text-primary">LearnHub</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-foreground/80 animate-fade-up-delay-1">
                Master new skills with our expert-led courses. From coding to design, we have everything you need to succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up-delay-2">
                <Link to="/courses">
                  <Button size="lg" className="text-lg px-8 glow hover:glow-strong transition-all duration-300">
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="text-lg px-8 neon-border hover:glow transition-all duration-300">
                    View Path
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-up-delay-3 hidden lg:block">
              <div className="relative z-10 rounded-2xl overflow-hidden neon-border glow-strong transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  alt="Students learning"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass p-4 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-8 w-8 rounded-full border-2 border-background overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" />
                          </div>
                        ))}
                      </div>
                      <div className="text-sm font-medium">
                        <span className="text-primary font-bold">10k+</span> Students Enrolled
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/30 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center glass p-6 rounded-lg neon-border animate-fade-up hover:glow transition-all duration-300">
              <BookOpen className="h-10 w-10 text-primary mx-auto mb-2 glow" />
              <div className="text-3xl font-bold text-foreground text-glow">500+</div>
              <div className="text-muted-foreground">Courses</div>
            </div>
            <div className="text-center glass p-6 rounded-lg neon-border animate-fade-up-delay-1 hover:glow transition-all duration-300">
              <Users className="h-10 w-10 text-primary mx-auto mb-2 glow" />
              <div className="text-3xl font-bold text-foreground text-glow">50K+</div>
              <div className="text-muted-foreground">Students</div>
            </div>
            <div className="text-center glass p-6 rounded-lg neon-border animate-fade-up-delay-2 hover:glow transition-all duration-300">
              <Award className="h-10 w-10 text-primary mx-auto mb-2 glow" />
              <div className="text-3xl font-bold text-foreground text-glow">100+</div>
              <div className="text-muted-foreground">Expert Instructors</div>
            </div>
            <div className="text-center glass p-6 rounded-lg neon-border animate-fade-up-delay-3 hover:glow transition-all duration-300">
              <TrendingUp className="h-10 w-10 text-primary mx-auto mb-2 glow" />
              <div className="text-3xl font-bold text-foreground text-glow">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">Featured Courses</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our most popular courses taught by industry experts
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
          <div className="text-center animate-fade-up-delay-1">
            <Link to="/courses">
              <Button size="lg" variant="outline" className="neon-border hover:glow transition-all duration-300">
                View All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">Why Choose LearnHub?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We provide the best learning experience to help you achieve your goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Expert-Led Courses",
                description: "Learn from industry professionals who have real-world experience in their fields."
              },
              {
                icon: Users,
                title: "Interactive Learning",
                description: "Engage with quizzes, assignments, and hands-on projects to reinforce your knowledge."
              },
              {
                icon: Award,
                title: "Recognized Certificates",
                description: "Earn certificates upon completion to showcase your skills to potential employers."
              }
            ].map((feature, index) => (
              <Card key={index} className="glass neon-border hover:glow-strong transition-all duration-500 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-8 text-center">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-primary glow" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">What Our Students Say</h2>
            <p className="text-muted-foreground text-lg">Real success stories from our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Thompson",
                role: "Web Developer",
                content: "LearnHub transformed my career. The courses are practical, engaging, and taught by real experts in the field.",
                rating: 5
              },
              {
                name: "Maria Garcia",
                role: "Digital Marketer",
                content: "The best investment in my professional development. I've learned more here than in years of traditional education.",
                rating: 5
              },
              {
                name: "James Wilson",
                role: "Data Analyst",
                content: "Outstanding quality and support. The instructors are always available to help, and the community is amazing.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className={`relative glass neon-border hover:glow transition-all duration-500 animate-fade-up-delay-${index + 1}`}>
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/30 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow animate-fade-up">
            Start Your Learning Journey Today
          </h2>
          <p className="text-xl mb-8 text-foreground/80 max-w-2xl mx-auto animate-fade-up-delay-1">
            Join thousands of students already learning on LearnHub. Get access to all courses with a single subscription.
          </p>
          <Link to="/courses">
            <Button size="lg" className="text-lg px-8 glow-strong hover:scale-105 transition-all duration-300 animate-fade-up-delay-2">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
