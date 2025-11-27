import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface EnrolledCourse {
  id: number;
  progress: number;
  completedLessons: number[];
}

export interface BookedSession {
  id: string;
  teacherName: string;
  teacherId: number;
  date: Date;
  time: string;
  meetingLink: string;
  status: "upcoming" | "completed" | "cancelled";
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "teacher";
  avatar?: string;
  enrolledCourses: EnrolledCourse[];
  bookedSessions?: BookedSession[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  enrollCourse: (courseId: number) => void;
  updateCourseProgress: (courseId: number, completedLessonId: number) => void;
  bookSession: (session: Omit<BookedSession, "id" | "status">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem("learnhub_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("learnhub_user");
      }
    }
    setIsInitialized(true);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication - in production, call API
    const emailLower = email.toLowerCase();
    const isAdminEmail = emailLower === "admin@learnhub.com" || emailLower === "admin";
    const isTeacherEmail = emailLower === "teacher@learnhub.com";
    const isAdminPassword = password === "admin123";
    const isTeacherPassword = password === "teacher123";

    // Check admin credentials - MUST have correct password
    if (isAdminEmail) {
      if (!isAdminPassword) {
        return false; // Wrong password for admin
      }
      const userData: User = {
        id: "admin-1",
        name: "Admin User",
        email: email,
        role: "admin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
        enrolledCourses: []
      };
      setUser(userData);
      localStorage.setItem("learnhub_user", JSON.stringify(userData));
      return true;
    }

    // Teacher login - MUST have correct password
    if (isTeacherEmail) {
      if (!isTeacherPassword) {
        return false; // Wrong password for teacher
      }

      // Always force correct teacher data, ignoring any potentially wrong cached data
      const userData: User = {
        id: "teacher-1",
        name: "Teacher User",
        email: email,
        role: "teacher",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher",
        enrolledCourses: []
      };

      // Update storage with correct data
      const storedUsers = JSON.parse(localStorage.getItem("learnhub_users_db") || "{}");
      storedUsers[emailLower] = userData;
      localStorage.setItem("learnhub_users_db", JSON.stringify(storedUsers));

      setUser(userData);
      localStorage.setItem("learnhub_user", JSON.stringify(userData));
      return true;
    }

    // Regular user login (any email/password combination works for demo)
    const storedUsers = JSON.parse(localStorage.getItem("learnhub_users_db") || "{}");
    let userData = storedUsers[emailLower];

    if (!userData) {
      userData = {
        id: `user-${Date.now()}`,
        name: email.split("@")[0],
        email: email,
        role: "user",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        enrolledCourses: []
      };
      // Save new user to "db"
      storedUsers[emailLower] = userData;
      localStorage.setItem("learnhub_users_db", JSON.stringify(storedUsers));
    }

    setUser(userData);
    localStorage.setItem("learnhub_user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("learnhub_user");
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("learnhub_user", JSON.stringify(updatedUser));

      // Update in "db" as well
      const storedUsers = JSON.parse(localStorage.getItem("learnhub_users_db") || "{}");
      if (storedUsers[user.email.toLowerCase()]) {
        storedUsers[user.email.toLowerCase()] = updatedUser;
        localStorage.setItem("learnhub_users_db", JSON.stringify(storedUsers));
      }
    }
  };

  const enrollCourse = (courseId: number) => {
    if (user) {
      if (user.enrolledCourses.some(c => c.id === courseId)) return;

      const newEnrollment: EnrolledCourse = {
        id: courseId,
        progress: 0,
        completedLessons: []
      };

      const updatedUser = {
        ...user,
        enrolledCourses: [...user.enrolledCourses, newEnrollment]
      };

      setUser(updatedUser);
      localStorage.setItem("learnhub_user", JSON.stringify(updatedUser));

      // Update in "db"
      const storedUsers = JSON.parse(localStorage.getItem("learnhub_users_db") || "{}");
      if (storedUsers[user.email.toLowerCase()]) {
        storedUsers[user.email.toLowerCase()] = updatedUser;
        localStorage.setItem("learnhub_users_db", JSON.stringify(storedUsers));
      }
    }
  };

  const updateCourseProgress = (courseId: number, completedLessonId: number) => {
    if (user) {
      const courseIndex = user.enrolledCourses.findIndex(c => c.id === courseId);
      if (courseIndex === -1) return;

      const course = user.enrolledCourses[courseIndex];
      if (course.completedLessons.includes(completedLessonId)) return;

      const updatedCompletedLessons = [...course.completedLessons, completedLessonId];

      const updatedEnrolledCourses = [...user.enrolledCourses];
      updatedEnrolledCourses[courseIndex] = {
        ...course,
        completedLessons: updatedCompletedLessons
      };

      const updatedUser = { ...user, enrolledCourses: updatedEnrolledCourses };
      setUser(updatedUser);
      localStorage.setItem("learnhub_user", JSON.stringify(updatedUser));

      // Update in "db"
      const storedUsers = JSON.parse(localStorage.getItem("learnhub_users_db") || "{}");
      if (storedUsers[user.email.toLowerCase()]) {
        storedUsers[user.email.toLowerCase()] = updatedUser;
        localStorage.setItem("learnhub_users_db", JSON.stringify(storedUsers));
      }
    }
  };

  const bookSession = (session: Omit<BookedSession, "id" | "status">) => {
    if (user) {
      const newSession: BookedSession = {
        ...session,
        id: `session-${Date.now()}`,
        status: "upcoming",
        date: new Date(session.date)
      };

      const updatedUser = {
        ...user,
        bookedSessions: [...(user.bookedSessions || []), newSession]
      };

      setUser(updatedUser);
      localStorage.setItem("learnhub_user", JSON.stringify(updatedUser));

      // Update in "db"
      const storedUsers = JSON.parse(localStorage.getItem("learnhub_users_db") || "{}");
      if (storedUsers[user.email.toLowerCase()]) {
        storedUsers[user.email.toLowerCase()] = updatedUser;
        localStorage.setItem("learnhub_users_db", JSON.stringify(storedUsers));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isTeacher: user?.role === "teacher",
        isInitialized,
        login,
        logout,
        updateProfile,
        enrollCourse,
        updateCourseProgress,
        bookSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
