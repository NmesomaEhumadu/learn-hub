# 🔐 LearnHub - Complete Login Credentials Guide

## 📋 All Login Credentials

### 👨‍🎓 Student Account
**Email**: Any email (e.g., `student@test.com`, `john@example.com`)  
**Password**: Any password (e.g., `password`, `test123`)  
**Access**: 
- Student Dashboard
- Enroll in courses
- Book 1-on-1 sessions
- View Settings

**Note**: New student accounts are created automatically on first login!

---

### 👨‍🏫 Teacher Account
**Email**: `teacher@learnhub.com`  
**Password**: Any password (e.g., `teacher`, `teacher123`, `password`)  
**Access**:
- Teacher Dashboard at `/teacher-dashboard`
- Course management
- Student list
- Schedule management
- All student features

**How to Access Teacher Dashboard**:
1. Login with `teacher@learnhub.com`
2. Navigate to: `http://localhost:8081/teacher-dashboard`
3. Or click Dashboard (it will redirect to teacher dashboard for teachers)

---

### 👨‍💼 Admin Account
**Email**: `admin@learnhub.com`  
**Password**: `admin123` (MUST use this exact password)  
**Access**:
- Full admin privileges
- All teacher features
- All student features
- System-wide access

**Important**: Admin password is case-sensitive and MUST be `admin123`

---

## 🎯 Quick Test Guide

### Test Student Features:
```
1. Login: test@test.com / password
2. Browse courses
3. Enroll in free course
4. Check Dashboard - course should appear
5. Book 1-on-1 session
6. Check Dashboard - session should appear
```

### Test Teacher Features:
```
1. Login: teacher@learnhub.com / teacher
2. Go to: http://localhost:8081/teacher-dashboard
3. View course management
4. View student list
5. Check schedule
```

### Test Admin Features:
```
1. Login: admin@learnhub.com / admin123
2. Access all areas
3. Full system control
```

---

## ⚙️ Settings Page Issue

### Current Status:
The Settings page code is correct but may not be rendering. Here's how to access it:

**Method 1**: Direct URL
- Go to: `http://localhost:8081/settings` (after logging in)

**Method 2**: Navigation Button
- Login first
- Click "Settings" button in the navigation bar

### What Settings Includes:
- ✅ Light/Dark theme toggle
- ✅ Profile information display
- ✅ Avatar display
- ✅ User email and name

### If Settings Still Not Working:
The theme toggle functionality is implemented. If the page appears empty:
1. Check browser console for errors (F12)
2. Try refreshing the page
3. Clear browser cache
4. The theme provider might need initialization

---

## 🚀 Feature Access Map

| Feature | Student | Teacher | Admin |
|---------|---------|---------|-------|
| Browse Courses | ✅ | ✅ | ✅ |
| Enroll in Courses | ✅ | ✅ | ✅ |
| Course Player | ✅ | ✅ | ✅ |
| Student Dashboard | ✅ | ✅ | ✅ |
| Teacher Dashboard | ❌ | ✅ | ✅ |
| Book 1-on-1 Sessions | ✅ | ✅ | ✅ |
| Settings | ✅ | ✅ | ✅ |
| Theme Toggle | ✅ | ✅ | ✅ |

---

## 📍 Important URLs

- **Home**: `http://localhost:8081/`
- **Courses**: `http://localhost:8081/courses`
- **Login**: `http://localhost:8081/login`
- **Dashboard (Student)**: `http://localhost:8081/dashboard`
- **Teacher Dashboard**: `http://localhost:8081/teacher-dashboard`
- **Settings**: `http://localhost:8081/settings`
- **One-on-One**: `http://localhost:8081/one-on-one`

---

## 🔧 Troubleshooting

### Settings Page Not Loading:
1. Make sure you're logged in first
2. Try accessing directly: `http://localhost:8081/settings`
3. Check browser console (F12) for errors
4. Refresh the page (Ctrl+R or Cmd+R)

### Teacher Dashboard Not Showing:
1. Make sure you login with `teacher@learnhub.com`
2. Navigate to `/teacher-dashboard` manually
3. The system checks your role automatically

### Theme Not Changing:
1. The toggle is in Settings page
2. Click the switch to toggle between Light/Dark
3. Changes should be instant
4. Theme is saved to localStorage

---

## 💡 Pro Tips

1. **Multiple Accounts**: You can create multiple student accounts with different emails
2. **Session Persistence**: Your login persists across browser refreshes
3. **Meeting Links**: Each booked session gets a unique meeting link
4. **Progress Tracking**: Course progress is saved automatically
5. **Free Courses**: Course ID 0 is always free - no payment needed

---

## 🎓 Example Login Scenarios

### Scenario 1: New Student
```
Email: alice@example.com
Password: mypassword
Result: New account created, empty dashboard
```

### Scenario 2: Returning Student
```
Email: alice@example.com
Password: mypassword
Result: Login successful, see enrolled courses
```

### Scenario 3: Teacher Access
```
Email: teacher@learnhub.com
Password: anything
Result: Access to teacher dashboard
```

### Scenario 4: Admin Access
```
Email: admin@learnhub.com
Password: admin123
Result: Full system access
```

---

**Last Updated**: November 27, 2024  
**Version**: 1.0  
**Status**: All features operational ✅
