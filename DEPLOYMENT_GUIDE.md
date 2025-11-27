# 🚀 Deployment Guide - LearnHub

## Step 1: Push to GitHub

Your code is committed and ready to push! However, you need to authenticate first.

### Option A: Using GitHub Desktop (Easiest)
1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Sign in with your GitHub account
3. Open your repository in GitHub Desktop
4. Click "Push origin" button

### Option B: Using Git Credential Manager
1. Open PowerShell and run:
   ```powershell
   git config --global credential.helper manager-core
   ```
2. Then try pushing again:
   ```powershell
   git push origin main
   ```
3. A browser window will open asking you to sign in to GitHub
4. After signing in, the push will complete automatically

### Option C: Using Personal Access Token
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "LearnHub Deploy"
4. Select scopes: `repo` (full control)
5. Generate and copy the token
6. When pushing, use the token as your password:
   ```powershell
   git push origin main
   ```
   Username: Your GitHub username
   Password: Paste the token

## Step 2: Deploy to Vercel

Once your code is on GitHub:

### Quick Deploy (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `NmesomaEhumadu/learn-hub`
4. Vercel will auto-detect it's a Vite project
5. Click "Deploy" (no configuration needed!)

### Build Settings (Auto-detected)
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables (Optional)
If you need any environment variables later:
- Go to Project Settings → Environment Variables
- Add variables like `VITE_API_URL` if needed

## Step 3: Access Your Live Site

After deployment (takes ~2-3 minutes):
- Vercel will give you a URL like: `https://learn-hub-xyz.vercel.app`
- Every push to `main` branch will auto-deploy!

## 🎯 Quick Commands Reference

```powershell
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

## 🔧 Troubleshooting

### "Permission denied" error
- Use one of the authentication methods above (Option A is easiest)

### Build fails on Vercel
- Check the build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Verify the build works locally: `npm run build`

### Site loads but shows errors
- Check browser console for errors
- Verify all routes work in production
- Check Vercel function logs if using API routes

## 📝 Notes

- Your repository: `https://github.com/NmesomaEhumadu/learn-hub`
- All changes have been committed locally
- Just need to authenticate and push!

---

**Need help?** The easiest way is to use GitHub Desktop (Option A above) - it handles authentication automatically!
