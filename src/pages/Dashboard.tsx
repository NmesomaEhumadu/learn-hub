import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { BookOpen, Award, Clock, TrendingUp, Settings, LogOut, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { courses } from "@/data/courses";

const Dashboard = () => {
  const { user, logout, updateProfile, isTeacher, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Redirect teachers and admins to their dashboards
  useEffect(() => {
    if (isTeacher) {
      navigate("/teacher-dashboard");
    } else if (isAdmin) {
      navigate("/admin");
    }
  }, [isTeacher, isAdmin, navigate]);

  // Calculate real stats from user data
  const enrolledCoursesCount = user?.enrolledCourses?.length || 0;
  const totalLessonsCompleted = user?.enrolledCourses?.reduce((acc, course) =>
    acc + (course.completedLessons?.length || 0), 0) || 0;

  const stats = [
    { icon: BookOpen, label: "Courses Enrolled", value: enrolledCoursesCount.toString() },
    { icon: Clock, label: "Lessons Completed", value: totalLessonsCompleted.toString() },
    { icon: Award, label: "Certificates", value: "0" },
    { icon: TrendingUp, label: "Completion Rate", value: enrolledCoursesCount > 0 ? "In Progress" : "0%" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="relative bg-background py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between">
            <div className="animate-fade-up">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-glow">Welcome Back, Student!</h1>
              <p className="text-foreground/80">Continue your learning journey</p>
            </div>
            <div className="flex gap-2 animate-fade-up-delay-1">
              <Link to="/settings">
                <Button variant="secondary" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="secondary" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="glass neon-border hover:glow transition-all duration-500 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 text-primary mb-2 glow" />
                  <div className="text-2xl font-bold mb-1 text-glow">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Enrolled Courses */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">My Courses</h2>
                <Link to="/courses">
                  <Button variant="outline">Browse More</Button>
                </Link>
              </div>

              {user?.enrolledCourses && user.enrolledCourses.length > 0 ? (
                user.enrolledCourses.map((enrolledCourse) => {
                  const courseDetails = courses.find(c => c.id === enrolledCourse.id);
                  if (!courseDetails) return null;

                  // Calculate progress based on completed lessons vs total lessons
                  const totalLessons = courseDetails.lessons?.length || 0;
                  const completedCount = enrolledCourse.completedLessons?.length || 0;
                  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

                  return (
                    <Card key={enrolledCourse.id} className="glass neon-border hover:glow transition-all duration-500 animate-fade-up">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-48 aspect-video overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                          <img src={courseDetails.image} alt={courseDetails.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary">{courseDetails.category}</Badge>
                            <span className="text-sm font-medium text-primary">{progress}% Complete</span>
                          </div>
                          <h3 className="text-xl font-bold mb-3">{courseDetails.title}</h3>
                          <Progress value={progress} className="mb-4" />
                          <div className="flex gap-2">
                            <Link to={`/learn/${courseDetails.id}`}>
                              <Button>Continue Learning</Button>
                            </Link>
                            <Link to={`/courses/${courseDetails.id}`}>
                              <Button variant="outline">View Details</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <Card className="glass neon-border p-8 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">No Courses Yet</h3>
                    <p className="text-muted-foreground max-w-md">
                      You haven't enrolled in any courses yet. Browse our catalog to start learning!
                    </p>
                    <Link to="/courses">
                      <Button size="lg" className="glow">Browse Courses</Button>
                    </Link>
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column - Profile & Achievements */}
            <div className="space-y-6">
              {/* Profile */}
              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-glow">My Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Student"}
                      alt="Profile"
                      className="h-20 w-20 rounded-full bg-muted object-cover border-2 border-border"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{user?.name || "Student"}</h3>
                      <p className="text-sm text-muted-foreground">{user?.email || "user@example.com"}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setProfileData({
                        name: user?.name || "",
                        email: user?.email || "",
                        avatar: user?.avatar || "",
                      });
                      setAvatarPreview(null);
                      setShowEditDialog(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Edit Profile Dialog */}
              <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent className="glass neon-border">
                  <DialogHeader>
                    <DialogTitle className="text-glow">Edit Profile</DialogTitle>
                    <DialogDescription>
                      Update your profile information
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {/* Profile Picture Upload */}
                    <div className="space-y-2">
                      <Label>Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={avatarPreview || profileData.avatar || user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Student"}
                            alt="Profile"
                            className="h-20 w-20 rounded-full bg-muted object-cover border-2 border-border"
                          />
                          <label
                            htmlFor="avatar-upload"
                            className="absolute bottom-0 right-0 h-6 w-6 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                          >
                            <Edit className="h-3 w-3 text-primary-foreground" />
                          </label>
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 5 * 1024 * 1024) {
                                  toast.error("Image size must be less than 5MB");
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const result = reader.result as string;
                                  setAvatarPreview(result);
                                  setProfileData({ ...profileData, avatar: result });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">
                            Click the icon to upload a new profile picture
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Max size: 5MB. Supported formats: JPG, PNG, GIF
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        updateProfile(profileData);
                        setShowEditDialog(false);
                        toast.success("Profile updated successfully!");
                      }}
                      className="glow"
                    >
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Achievements */}
              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up-delay-1">
                <CardHeader>
                  <CardTitle className="text-glow">Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">First Course</div>
                        <div className="text-sm text-muted-foreground">Completed your first course</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">Quick Learner</div>
                        <div className="text-sm text-muted-foreground">100 hours of learning</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Goals */}
              <Card className="glass neon-border hover:glow transition-all duration-500 animate-fade-up-delay-2">
                <CardHeader>
                  <CardTitle className="text-glow">Learning Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Weekly Goal</span>
                        <span className="font-medium">7/10 hours</span>
                      </div>
                      <Progress value={70} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Monthly Goal</span>
                        <span className="font-medium">28/40 hours</span>
                      </div>
                      <Progress value={70} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
