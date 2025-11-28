# 🆕 Create New GitHub Repository & Upload Your Code

## 🎯 **Complete Step-by-Step Guide**

Since the repository doesn't exist yet, let's create it fresh!

---

## **Part 1: Create Repository on GitHub**

### Step 1: Go to GitHub
1. Open your browser
2. Go to: **https://github.com**
3. Sign in to your account

### Step 2: Create New Repository
1. Click the **"+"** icon (top right corner)
2. Select **"New repository"**

### Step 3: Fill in Repository Details
- **Repository name**: `learn-hub`
- **Description**: `LearnHub - Online Learning Platform with Quiz, Practicals & Discussion`
- **Visibility**: Choose **Public** (so you can deploy to Vercel for free)
- **DO NOT** check any boxes (no README, no .gitignore, no license)
- Click **"Create repository"**

### Step 4: Copy the Repository URL
After creation, you'll see a page with instructions. Copy this URL:
```
https://github.com/YOUR_USERNAME/learn-hub.git
```
(Replace YOUR_USERNAME with your actual GitHub username)

---

## **Part 2: Connect Your Local Code to GitHub**

### Option A: Using GitHub Desktop (EASIEST!)

#### Step 1: Download GitHub Desktop
1. Go to: **https://desktop.github.com/**
2. Download and install
3. Sign in with your GitHub account

#### Step 2: Publish Your Repository
1. Open GitHub Desktop
2. Click **File** → **Add Local Repository**
3. Browse to: `C:\Users\Nmesoma\Desktop\learnhub\learn-hub`
4. Click **Add Repository**
5. Click **"Publish repository"** button at the top
6. Uncheck "Keep this code private" (if you want it public)
7. Click **"Publish repository"**
8. Done! ✅

---

### Option B: Using Command Line

Open PowerShell in your project folder and run:

```powershell
# Remove old remote (if any)
git remote remove origin

# Add new remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/learn-hub.git

# Push your code
git push -u origin main
```

When prompted for credentials:
- Use your GitHub username
- For password, use a Personal Access Token (see below)

---

## **Part 3: Create Personal Access Token (For Command Line)**

If using command line, you need a token:

### Step 1: Go to Token Settings
1. Go to: **https://github.com/settings/tokens**
2. Click **"Generate new token"** → **"Generate new token (classic)"**

### Step 2: Configure Token
- **Note**: `LearnHub Deploy`
- **Expiration**: Choose 90 days or No expiration
- **Select scopes**: Check ✅ **repo** (Full control of private repositories)
- Click **"Generate token"**

### Step 3: Copy Token
- **IMPORTANT**: Copy the token NOW (you won't see it again!)
- Save it somewhere safe

### Step 4: Use Token
When pushing, use:
- **Username**: Your GitHub username
- **Password**: Paste the token (not your GitHub password!)

---

## **Part 4: Deploy to Vercel**

Once your code is on GitHub:

### Step 1: Go to Vercel
1. Visit: **https://vercel.com**
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. You should see **"learn-hub"** in the list
3. Click **"Import"**

### Step 3: Configure & Deploy
Vercel will auto-detect:
- ✅ Framework Preset: **Vite**
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Install Command: `npm install`

Just click **"Deploy"**!

### Step 4: Wait for Deployment
- Takes 2-3 minutes
- You'll get a URL like: `https://learn-hub-xyz.vercel.app`
- Click the URL to see your live site! 🎉

---

## **Part 5: Future Updates**

After initial setup, updating is easy:

### Using GitHub Desktop:
1. Make changes to your code
2. Open GitHub Desktop
3. Write commit message
4. Click **"Commit to main"**
5. Click **"Push origin"**
6. Vercel auto-deploys! ✅

### Using Command Line:
```powershell
git add .
git commit -m "Your update message"
git push origin main
```

---

## 📋 **Quick Checklist**

- [ ] Create new repository on GitHub
- [ ] Name it `learn-hub`
- [ ] Make it Public
- [ ] Don't initialize with anything
- [ ] Download GitHub Desktop (recommended)
- [ ] Add local repository in GitHub Desktop
- [ ] Publish repository
- [ ] Go to Vercel.com
- [ ] Sign in with GitHub
- [ ] Import your repository
- [ ] Click Deploy
- [ ] Get your live URL!

---

## 🎁 **What You're Deploying**

All the features I built:
- ✅ Quiz tab with interactive questions
- ✅ Practicals tab with exercises
- ✅ Discussion Room with posting capability
- ✅ YouTube video player for lessons
- ✅ Settings page with Light/Dark theme
- ✅ One-on-One mentorship booking
- ✅ Teacher dashboard
- ✅ Student dashboard
- ✅ Course player with tabs
- ✅ Beautiful UI with animations
- ✅ Responsive design

**Total: 455+ lines of new code!**

---

## 💡 **My Recommendation**

**Use GitHub Desktop** - It's the easiest way:
1. Install it once
2. Publish in 2 clicks
3. Future updates are 1 click
4. No command line needed
5. No tokens needed

Download: **https://desktop.github.com/**

---

## ❓ **Need Help?**

If you get stuck on any step, let me know which step and I'll help you through it!

Your code is ready to go live! 🚀
