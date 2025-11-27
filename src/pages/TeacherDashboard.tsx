import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import {
    BookOpen,
    Users,
    Calendar,
    Upload,
    Plus,
    MoreVertical,
    CheckCircle,
    Clock,
    FileText,
    MessageSquare
} from "lucide-react";
import { courses } from "@/data/courses";
import { Badge } from "@/components/ui/badge";

const TeacherDashboard = () => {
    const { user } = useAuth();

    // Mock data for teacher's courses (in a real app, this would come from an API based on user ID)
    const myCourses = courses.slice(0, 2);

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />

            <div className="container mx-auto px-4 py-12 flex-1">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-glow">Teacher Dashboard</h1>
                        <p className="text-muted-foreground">Manage your courses, students, and content</p>
                    </div>
                    <Button className="glow hover:glow-strong">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Course
                    </Button>
                </div>

                <Tabs defaultValue="overview" className="space-y-8">
                    <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="courses">Courses</TabsTrigger>
                        <TabsTrigger value="schedule">Schedule</TabsTrigger>
                        <TabsTrigger value="students">Students</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-8 animate-fade-up">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <Card className="glass neon-border hover:glow transition-all duration-300">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                                            <h3 className="text-2xl font-bold">1,234</h3>
                                        </div>
                                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Users className="h-5 w-5 text-primary" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="glass neon-border hover:glow transition-all duration-300">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                                            <h3 className="text-2xl font-bold">4</h3>
                                        </div>
                                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <BookOpen className="h-5 w-5 text-primary" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="glass neon-border hover:glow transition-all duration-300">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Assignments</p>
                                            <h3 className="text-2xl font-bold">28</h3>
                                        </div>
                                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <FileText className="h-5 w-5 text-primary" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="glass neon-border hover:glow transition-all duration-300">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Upcoming Classes</p>
                                            <h3 className="text-2xl font-bold">3</h3>
                                        </div>
                                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Calendar className="h-5 w-5 text-primary" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activity & Schedule */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card className="glass neon-border">
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription>Latest updates from your courses</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                                                <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
                                                    <MessageSquare className="h-4 w-4 text-secondary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">New question in "Web Development Bootcamp"</p>
                                                    <p className="text-sm text-muted-foreground">Student John Doe asked about React Hooks</p>
                                                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="glass neon-border">
                                <CardHeader>
                                    <CardTitle>Today's Schedule</CardTitle>
                                    <CardDescription>Your upcoming live sessions</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                                            <div className="text-center min-w-[60px]">
                                                <div className="text-sm font-bold text-primary">10:00</div>
                                                <div className="text-xs text-muted-foreground">AM</div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold">Live Q&A Session</h4>
                                                <p className="text-sm text-muted-foreground">Web Development Bootcamp</p>
                                            </div>
                                            <Button size="sm" variant="secondary">Join</Button>
                                        </div>
                                        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border">
                                            <div className="text-center min-w-[60px]">
                                                <div className="text-sm font-bold">02:00</div>
                                                <div className="text-xs text-muted-foreground">PM</div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold">Project Review</h4>
                                                <p className="text-sm text-muted-foreground">UI/UX Design Essentials</p>
                                            </div>
                                            <Button size="sm" variant="outline">Details</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Courses Tab */}
                    <TabsContent value="courses" className="space-y-6 animate-fade-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myCourses.map((course) => (
                                <Card key={course.id} className="glass neon-border hover:glow transition-all duration-300 group">
                                    <div className="aspect-video overflow-hidden rounded-t-lg relative">
                                        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-2 right-2">
                                            <Badge variant="secondary" className="glass">{course.category}</Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="font-bold text-lg mb-2 line-clamp-1">{course.title}</h3>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                            <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {course.students} Students</span>
                                            <span className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500" /> {course.rating}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button className="flex-1" variant="outline">
                                                <Upload className="mr-2 h-4 w-4" />
                                                Content
                                            </Button>
                                            <Button className="flex-1">Manage</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Add New Course Card */}
                            <Card className="glass neon-border border-dashed flex items-center justify-center min-h-[300px] hover:bg-muted/50 transition-colors cursor-pointer group">
                                <div className="text-center">
                                    <div className="h-16 w-16 rounded-full bg-muted group-hover:bg-primary/20 flex items-center justify-center mx-auto mb-4 transition-colors">
                                        <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Create New Course</h3>
                                    <p className="text-muted-foreground text-sm mt-1">Start building your next class</p>
                                </div>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Schedule Tab */}
                    <TabsContent value="schedule" className="animate-fade-up">
                        <Card className="glass neon-border">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Class Schedule</CardTitle>
                                        <CardDescription>Manage your upcoming live sessions and office hours</CardDescription>
                                    </div>
                                    <Button variant="outline">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Sync Calendar
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { day: "Today", time: "10:00 AM", title: "Live Q&A Session", course: "Web Development Bootcamp", students: 45 },
                                        { day: "Today", time: "02:00 PM", title: "Project Review", course: "UI/UX Design Essentials", students: 32 },
                                        { day: "Tomorrow", time: "11:00 AM", title: "React Hooks Deep Dive", course: "Web Development Bootcamp", students: 50 },
                                        { day: "Wed, Nov 29", time: "09:00 AM", title: "Intro to Python", course: "Data Science Fundamentals", students: 28 },
                                        { day: "Fri, Dec 01", time: "03:00 PM", title: "Weekly Mentorship", course: "All Courses", students: 12 },
                                    ].map((session, index) => (
                                        <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center gap-4 md:w-48">
                                                <div className="bg-primary/10 text-primary font-bold p-3 rounded-lg text-center min-w-[80px]">
                                                    <div className="text-xs uppercase tracking-wider">{session.day.split(',')[0]}</div>
                                                    <div className="text-lg">{session.time.split(' ')[0]}</div>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-lg">{session.title}</h4>
                                                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                                                    <BookOpen className="h-3 w-3" />
                                                    <span>{session.course}</span>
                                                    <span className="mx-2">•</span>
                                                    <Users className="h-3 w-3" />
                                                    <span>{session.students} Attending</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 w-full md:w-auto">
                                                <Button className="flex-1 md:flex-none" variant="outline">Reschedule</Button>
                                                <Button className="flex-1 md:flex-none">Start Class</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Students Tab */}
                    <TabsContent value="students" className="animate-fade-up">
                        <Card className="glass neon-border">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Student Management</CardTitle>
                                        <CardDescription>View and manage enrolled students</CardDescription>
                                    </div>
                                    <Button variant="outline">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Export CSV
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { name: "Alice Johnson", email: "alice@example.com", course: "Web Development", progress: 85, status: "Active" },
                                        { name: "Bob Smith", email: "bob@example.com", course: "UI/UX Design", progress: 42, status: "Active" },
                                        { name: "Charlie Brown", email: "charlie@example.com", course: "Data Science", progress: 12, status: "Inactive" },
                                        { name: "Diana Prince", email: "diana@example.com", course: "Web Development", progress: 98, status: "Completed" },
                                        { name: "Evan Wright", email: "evan@example.com", course: "UI/UX Design", progress: 65, status: "Active" },
                                    ].map((student, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                                                    <span className="font-bold text-secondary">{student.name.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{student.name}</h4>
                                                    <p className="text-sm text-muted-foreground">{student.email}</p>
                                                </div>
                                            </div>
                                            <div className="hidden md:block text-sm">
                                                <div className="font-medium">{student.course}</div>
                                                <div className="text-muted-foreground">Course</div>
                                            </div>
                                            <div className="hidden md:block text-sm">
                                                <div className="font-medium">{student.progress}%</div>
                                                <div className="text-muted-foreground">Progress</div>
                                            </div>
                                            <div>
                                                <Badge variant={student.status === "Active" ? "default" : student.status === "Completed" ? "secondary" : "outline"}>
                                                    {student.status}
                                                </Badge>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            <Footer />
        </div>
    );
};

// Helper component for Star icon since it wasn't imported
const Star = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

export default TeacherDashboard;
