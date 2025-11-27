import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, Video, Star, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const teachers = [
    {
        id: 1,
        name: "Dr. Sarah Wilson",
        role: "Senior Web Developer",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        rating: 4.9,
        reviews: 128,
        specialty: "React & Node.js",
        price: 50
    },
    {
        id: 2,
        name: "Prof. Michael Chen",
        role: "Data Scientist",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        rating: 4.8,
        reviews: 95,
        specialty: "Python & AI",
        price: 60
    },
    {
        id: 3,
        name: "Emma Davis",
        role: "UX Designer",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        rating: 5.0,
        reviews: 72,
        specialty: "Figma & Prototyping",
        price: 45
    }
];

const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"
];

const OneOnOne = () => {
    const { bookSession } = useAuth();
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedTeacher, setSelectedTeacher] = useState<typeof teachers[0] | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const handleBookSession = () => {
        if (!date || !selectedTime || !selectedTeacher) return;

        // Generate a unique meeting link
        const meetingLink = `https://meet.learnhub.com/${Math.random().toString(36).substring(7)}`;

        bookSession({
            teacherName: selectedTeacher.name,
            teacherId: selectedTeacher.id,
            date: date,
            time: selectedTime,
            meetingLink: meetingLink
        });

        setIsBookingOpen(false);
        toast.success(`Session booked successfully! Meeting link: ${meetingLink}`);
        setSelectedTime(null);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />

            <div className="container mx-auto px-4 py-12 flex-1">
                <div className="text-center mb-12 animate-fade-up">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-glow">One-on-One Mentorship</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Book personalized video sessions with industry experts to accelerate your learning.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teachers.map((teacher, index) => (
                        <Card key={teacher.id} className="glass neon-border hover:glow transition-all duration-300 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <CardHeader className="text-center">
                                <div className="w-24 h-24 mx-auto mb-4 relative">
                                    <Avatar className="w-24 h-24 border-2 border-primary/20">
                                        <AvatarImage src={teacher.image} alt={teacher.name} />
                                        <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute bottom-0 right-0 bg-background rounded-full p-1 border border-border">
                                        <Video className="h-4 w-4 text-primary" />
                                    </div>
                                </div>
                                <CardTitle>{teacher.name}</CardTitle>
                                <CardDescription>{teacher.role}</CardDescription>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                    <Badge variant="secondary">{teacher.specialty}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mb-6 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                        <span className="font-medium">{teacher.rating}</span>
                                        <span className="text-muted-foreground">({teacher.reviews})</span>
                                    </div>
                                    <div className="font-bold text-primary">${teacher.price}/hr</div>
                                </div>

                                <Dialog open={isBookingOpen && selectedTeacher?.id === teacher.id} onOpenChange={(open) => {
                                    setIsBookingOpen(open);
                                    if (open) setSelectedTeacher(teacher);
                                }}>
                                    <DialogTrigger asChild>
                                        <Button className="w-full glow hover:glow-strong">Book Session</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px] glass neon-border">
                                        <DialogHeader>
                                            <DialogTitle>Book Session with {teacher.name}</DialogTitle>
                                            <DialogDescription>
                                                Select a date and time for your one-on-one mentorship session.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="grid gap-6 py-4">
                                            <div className="flex flex-col items-center">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    className="rounded-md border bg-background/50"
                                                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                                />
                                            </div>

                                            <div>
                                                <h4 className="font-medium mb-3 flex items-center gap-2">
                                                    <Clock className="h-4 w-4" /> Available Times
                                                </h4>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {timeSlots.map((time) => (
                                                        <Button
                                                            key={time}
                                                            variant={selectedTime === time ? "default" : "outline"}
                                                            className={selectedTime === time ? "glow" : ""}
                                                            onClick={() => setSelectedTime(time)}
                                                        >
                                                            {time}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setIsBookingOpen(false)}>Cancel</Button>
                                            <Button
                                                onClick={handleBookSession}
                                                disabled={!date || !selectedTime}
                                                className="glow"
                                            >
                                                Confirm Booking
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 rounded-lg bg-muted/30 animate-fade-up-delay-1">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Video className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-bold mb-2">HD Video Calls</h3>
                        <p className="text-muted-foreground text-sm">Crystal clear video and audio for seamless communication.</p>
                    </div>
                    <div className="p-6 rounded-lg bg-muted/30 animate-fade-up-delay-2">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CalendarIcon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-bold mb-2">Flexible Scheduling</h3>
                        <p className="text-muted-foreground text-sm">Book sessions that fit your schedule, reschedule easily.</p>
                    </div>
                    <div className="p-6 rounded-lg bg-muted/30 animate-fade-up-delay-3">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-bold mb-2">Satisfaction Guaranteed</h3>
                        <p className="text-muted-foreground text-sm">Not satisfied? Get a full refund or book another expert for free.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default OneOnOne;
