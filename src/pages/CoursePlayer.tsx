import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { courses } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Play, BookOpen, Video, FileText, ArrowLeft, ArrowRight, MessageSquare, ClipboardList, Code } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const course = courses.find(c => c.id === Number(id));
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [discussionPost, setDiscussionPost] = useState("");

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
            <Link to="/courses">
              <Button>Back to Courses</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Check if course is free or user is enrolled
  if (!course.isFree && !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <Card className="glass neon-border max-w-md">
            <CardContent className="pt-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Enrollment Required</h2>
              <p className="text-muted-foreground mb-6">
                Please enroll in this course to access the content.
              </p>
              <Link to={`/courses/${course.id}`}>
                <Button className="glow">Enroll Now</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course.lessons || course.lessons.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Course Content Coming Soon</h1>
            <Link to="/courses">
              <Button>Back to Courses</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const lesson = course.lessons[currentLesson];
  const progress = ((completedLessons.length + (completedLessons.includes(currentLesson + 1) ? 0 : 0)) / course.lessons.length) * 100;

  const handleCompleteLesson = () => {
    if (!completedLessons.includes(lesson.id)) {
      setCompletedLessons([...completedLessons, lesson.id]);
      toast.success("Lesson marked as complete!");
    }
  };

  const handleNextLesson = () => {
    if (currentLesson < course.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const handlePostDiscussion = () => {
    if (discussionPost.trim()) {
      toast.success("Discussion post added!");
      setDiscussionPost("");
    } else {
      toast.error("Please write something before posting");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navigation />

      {/* Header */}
      <section className="bg-background border-b neon-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link to={`/courses/${course.id}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Course
                </Button>
              </Link>
              <h1 className="text-2xl font-bold mt-2 text-glow">{course.title}</h1>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {course.isFree ? "FREE" : `$${course.price}`}
            </Badge>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress: {Math.round(progress)}%</span>
              <span>Lesson {currentLesson + 1} of {course.lessons.length}</span>
            </div>
            <Progress value={progress} />
          </div>
        </div>
      </section>

      <div className="flex-1 flex">
        {/* Main Content */}
        <div className="flex-1">
          <div className="container mx-auto px-4 py-6">
            <Card className="glass neon-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {lesson.type === "video" && <Video className="h-5 w-5 text-primary" />}
                      {lesson.type === "reading" && <BookOpen className="h-5 w-5 text-primary" />}
                      {lesson.type === "project" && <FileText className="h-5 w-5 text-primary" />}
                      <Badge variant="secondary">{lesson.type}</Badge>
                      <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                    </div>
                    <CardTitle className="text-2xl text-glow">{lesson.title}</CardTitle>
                  </div>
                  {completedLessons.includes(lesson.id) && (
                    <Badge className="bg-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="lesson" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="lesson">
                      <Play className="h-4 w-4 mr-2" />
                      Lesson
                    </TabsTrigger>
                    <TabsTrigger value="quiz">
                      <ClipboardList className="h-4 w-4 mr-2" />
                      Quiz
                    </TabsTrigger>
                    <TabsTrigger value="practicals">
                      <Code className="h-4 w-4 mr-2" />
                      Practicals
                    </TabsTrigger>
                    <TabsTrigger value="discussion">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Discussion
                    </TabsTrigger>
                  </TabsList>

                  {/* Lesson Tab */}
                  <TabsContent value="lesson" className="space-y-4">
                    <p className="text-muted-foreground mb-6">{lesson.description}</p>

                    {lesson.type === "video" && (
                      <div className="aspect-video mb-6 rounded-lg overflow-hidden bg-black">
                        <iframe
                          src={lesson.content}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}

                    {lesson.type === "reading" && (
                      <div className="space-y-4 mb-6">
                        <Card className="bg-muted/50">
                          <CardContent className="pt-6">
                            <h3 className="font-semibold mb-2">Reading Material</h3>
                            <p className="text-muted-foreground mb-4">{lesson.readingMaterial}</p>
                            <div className="prose max-w-none">
                              <p className="mb-4">
                                {lesson.content}
                              </p>
                              <div className="bg-background p-4 rounded-lg border border-border">
                                <h4 className="font-semibold mb-2">Key Points:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                  <li>Practice the concepts you've learned</li>
                                  <li>Complete all exercises</li>
                                  <li>Review the material before moving on</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {lesson.type === "project" && (
                      <div className="space-y-4 mb-6">
                        <Card className="bg-muted/50">
                          <CardContent className="pt-6">
                            <h3 className="font-semibold mb-2">Project Instructions</h3>
                            <p className="text-muted-foreground mb-4">{lesson.content}</p>
                            {lesson.readingMaterial && (
                              <div className="bg-background p-4 rounded-lg border border-border">
                                <h4 className="font-semibold mb-2">Project Guide:</h4>
                                <p className="text-sm">{lesson.readingMaterial}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        onClick={handlePrevLesson}
                        disabled={currentLesson === 0}
                        className="flex-1"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>
                      <Button
                        onClick={handleCompleteLesson}
                        variant={completedLessons.includes(lesson.id) ? "secondary" : "default"}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {completedLessons.includes(lesson.id) ? "Completed" : "Mark Complete"}
                      </Button>
                      <Button
                        onClick={handleNextLesson}
                        disabled={currentLesson === course.lessons.length - 1}
                        className="flex-1"
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Quiz Tab */}
                  <TabsContent value="quiz" className="space-y-4">
                    <Card className="bg-muted/50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ClipboardList className="h-5 w-5 text-primary" />
                          Lesson Quiz
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground mb-4">
                          Test your knowledge of this lesson with a quick quiz.
                        </p>

                        {/* Sample Quiz Question */}
                        <div className="space-y-4">
                          <div className="bg-background p-4 rounded-lg border border-border">
                            <h4 className="font-semibold mb-3">Question 1: What did you learn in this lesson?</h4>
                            <div className="space-y-2">
                              <label className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted cursor-pointer">
                                <input type="radio" name="q1" value="a" className="w-4 h-4" />
                                <span>Basic concepts and fundamentals</span>
                              </label>
                              <label className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted cursor-pointer">
                                <input type="radio" name="q1" value="b" className="w-4 h-4" />
                                <span>Advanced techniques</span>
                              </label>
                              <label className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted cursor-pointer">
                                <input type="radio" name="q1" value="c" className="w-4 h-4" />
                                <span>Practical applications</span>
                              </label>
                              <label className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted cursor-pointer">
                                <input type="radio" name="q1" value="d" className="w-4 h-4" />
                                <span>All of the above</span>
                              </label>
                            </div>
                          </div>

                          <Button className="w-full glow" onClick={() => toast.success("Quiz submitted! Great job!")}>
                            Submit Quiz
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Practicals Tab */}
                  <TabsContent value="practicals" className="space-y-4">
                    <Card className="bg-muted/50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Code className="h-5 w-5 text-primary" />
                          Practical Exercises
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground mb-4">
                          Apply what you've learned with hands-on exercises.
                        </p>

                        <div className="bg-background p-4 rounded-lg border border-border">
                          <h4 className="font-semibold mb-2">Exercise 1: Practice Task</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Complete the following task to reinforce your learning:
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-sm mb-4">
                            <li>Review the lesson content</li>
                            <li>Try implementing the concepts yourself</li>
                            <li>Experiment with different approaches</li>
                            <li>Share your results in the discussion</li>
                          </ul>
                          <Textarea
                            placeholder="Write your solution or notes here..."
                            className="min-h-[150px] mb-3"
                          />
                          <Button className="w-full" onClick={() => toast.success("Exercise submitted!")}>
                            Submit Exercise
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Discussion Tab */}
                  <TabsContent value="discussion" className="space-y-4">
                    <Card className="bg-muted/50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-primary" />
                          Discussion Room
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground mb-4">
                          Share your thoughts, ask questions, and engage with other learners.
                        </p>

                        {/* Post Discussion */}
                        <div className="space-y-3">
                          <Textarea
                            placeholder="Share your thoughts or ask a question..."
                            value={discussionPost}
                            onChange={(e) => setDiscussionPost(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <Button className="w-full glow" onClick={handlePostDiscussion}>
                            Post to Discussion
                          </Button>
                        </div>

                        {/* Sample Discussion Posts */}
                        <div className="space-y-3 pt-4 border-t border-border">
                          <h4 className="font-semibold">Recent Discussions</h4>

                          <Card className="bg-background">
                            <CardContent className="pt-4">
                              <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-sm font-bold">JD</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold">John Doe</span>
                                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                                  </div>
                                  <p className="text-sm">
                                    Great lesson! The examples really helped me understand the concepts better.
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-background">
                            <CardContent className="pt-4">
                              <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-sm font-bold">SM</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold">Sarah Miller</span>
                                    <span className="text-xs text-muted-foreground">5 hours ago</span>
                                  </div>
                                  <p className="text-sm">
                                    Can someone explain the difference between the two approaches mentioned?
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar - Lesson List */}
        <div className="w-80 bg-background border-l border-border p-6 overflow-y-auto">
          <h3 className="font-bold text-lg mb-4 text-glow">Course Content</h3>
          <div className="space-y-2">
            {course.lessons.map((l, index) => (
              <button
                key={l.id}
                onClick={() => setCurrentLesson(index)}
                className={`w-full text-left p-3 rounded-lg transition-all ${currentLesson === index
                  ? "bg-primary text-primary-foreground glow"
                  : "bg-muted/50 hover:bg-muted"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {completedLessons.includes(l.id) ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-current" />
                    )}
                    <span className="text-sm font-medium">{l.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {l.type === "video" && <Video className="h-3 w-3" />}
                    {l.type === "reading" && <BookOpen className="h-3 w-3" />}
                    {l.type === "project" && <FileText className="h-3 w-3" />}
                    <span>{l.duration}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CoursePlayer;

