import { useTheme } from "@/components/theme-provider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { Moon, Sun, User, Bell, Shield } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
    const { theme, setTheme } = useTheme();
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />

            <div className="container mx-auto px-4 py-12 flex-1">
                <h1 className="text-3xl font-bold mb-8 text-glow">Settings</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="md:col-span-1">
                        <Card className="glass neon-border">
                            <CardContent className="p-4 space-y-2">
                                <Button variant="ghost" className="w-full justify-start text-primary bg-primary/10">
                                    <User className="mr-2 h-4 w-4" />
                                    General
                                </Button>
                                <Button variant="ghost" className="w-full justify-start">
                                    <Bell className="mr-2 h-4 w-4" />
                                    Notifications
                                </Button>
                                <Button variant="ghost" className="w-full justify-start">
                                    <Shield className="mr-2 h-4 w-4" />
                                    Privacy & Security
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Appearance */}
                        <Card className="glass neon-border animate-fade-up">
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                                <CardDescription>Customize how LearnHub looks on your device</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Theme Mode</Label>
                                        <p className="text-sm text-muted-foreground">
                                            {theme === "dark" ? "Dark mode is active" : "Light mode is active"}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Sun className="h-4 w-4 text-muted-foreground" />
                                        <Switch
                                            checked={theme === "dark"}
                                            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                                        />
                                        <Moon className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Profile Settings */}
                        <Card className="glass neon-border animate-fade-up-delay-1">
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-20 w-20 rounded-full bg-muted overflow-hidden border-2 border-primary/20">
                                        <img
                                            src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{user?.name || "User"}</h3>
                                        <p className="text-sm text-muted-foreground">{user?.email || "user@example.com"}</p>
                                        <Button variant="outline" size="sm" className="mt-2">Change Avatar</Button>
                                    </div>
                                </div>

                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Full Name</Label>
                                            <div className="p-2 rounded-md border bg-muted/50 text-muted-foreground">
                                                {user?.name || "Not set"}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Email</Label>
                                            <div className="p-2 rounded-md border bg-muted/50 text-muted-foreground">
                                                {user?.email || "Not set"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button onClick={() => toast.success("Profile updated successfully!")}>
                                        Save Changes
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Settings;
