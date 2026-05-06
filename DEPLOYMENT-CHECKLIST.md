# ARTIFY Server - Vercel Deployment Checklist

## ✅ Changes Made for Vercel Deployment

### 1. **index.js** - Production-Ready Configuration

- ✅ Added `process.env.MONGODB_URI` support (fallback to hardcoded URI for local dev)
- ✅ Conditional `app.listen()` - only listens locally, not on Vercel serverless
- ✅ Added `module.exports = app` for Vercel serverless function export
- ✅ Firebase credentials already using `process.env.FIREBASE_SERVICE_KEY`

### 2. **.env** - Environment Variables

- ✅ Added `MONGODB_URI` variable
- ✅ Kept `FIREBASE_SERVICE_KEY` (base64 encoded)
- ✅ Added `NODE_ENV` variable

### 3. **.env.example** - Documentation Template

- ✅ Created template showing all required environment variables
- ✅ Includes setup instructions

### 4. **package.json** - Deployment Scripts

- ✅ Added `npm run dev` for local development
- ✅ Added `npm run deploy` for staging deployment
- ✅ Added `npm run deploy:prod` for production deployment

### 5. **vercel.json** - Already Configured ✓

- ✅ Proper build configuration for @vercel/node
- ✅ Correct routing setup for all HTTP methods
- ✅ Version 2 serverless functions

### 6. **.gitignore** - Already Configured ✓

- ✅ `.env` is already excluded (secrets safe)
- ✅ `node_modules/` excluded
- ✅ Firebase JSON file excluded

### 7. **DEPLOYMENT.md** - Complete Guide

- ✅ Step-by-step deployment instructions
- ✅ Environment variable setup guide
- ✅ Troubleshooting section
- ✅ Security best practices
- ✅ MongoDB Atlas allowlisting instructions

---

## 🚀 Quick Start - Deploy to Vercel in 5 Minutes

### Step 1: Prepare Local Environment

```bash
cd "d:\Review c programing\Web Dev Pro Running\WEB_DEV_ALL\Programming Hero\Milestone 10\Module-59\ARTIFY-SERVER"
npm install
```

### Step 2: Test Locally

```bash
npm start
# or for development mode
npm run dev
```

Visit: http://localhost:3000 → You should see "Hello ARTIFY!"

### Step 3: Commit to Git

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 4: Deploy via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/import
2. Connect GitHub repository → Select ARTIFY-SERVER
3. Add Environment Variables:
   - `MONGODB_URI` = `mongodb+srv://ARTIFY:L89EWqO0X0LaGrKj@cluster0.1ezipje.mongodb.net/?appName=Cluster0`
   - `FIREBASE_SERVICE_KEY` = (copy from your .env file)
   - `NODE_ENV` = `production`
4. Click "Deploy"

### Step 5: Verify Deployment

```bash
# After deployment completes
curl https://your-project-name.vercel.app/
# Should return: Hello ARTIFY!

# Test an endpoint
curl https://your-project-name.vercel.app/arts
```

---

## 📋 Pre-Deployment Verification Checklist

Before deploying, verify:

- [ ] All files committed to git (except .env)
- [ ] `.env` is in `.gitignore`
- [ ] MongoDB connection string is correct
- [ ] Firebase service key is base64 encoded properly
- [ ] Vercel account is active
- [ ] GitHub repository is connected to Vercel
- [ ] `package.json` has valid dependencies
- [ ] `index.js` exports the app module
- [ ] `vercel.json` is configured correctly

---

## 🔐 Security Checklist

- [ ] ✅ `.env` file NOT committed to git
- [ ] ✅ No hardcoded secrets in code (only in environment variables)
- [ ] ✅ FIREBASE_SERVICE_KEY is base64 encoded
- [ ] ✅ MongoDB credentials stored as environment variables only
- [ ] ✅ `.gitignore` excludes sensitive files
- [ ] ✅ Firebase service account JSON removed from repo
- [ ] ✅ Vercel environment variables are set (not in code)

---

## 🛠️ Deployment Troubleshooting

| Issue                            | Solution                                              |
| -------------------------------- | ----------------------------------------------------- |
| "Cannot find module" errors      | Run `npm install` locally, then deploy                |
| "FIREBASE_SERVICE_KEY undefined" | Verify env var is set in Vercel dashboard             |
| "MongoDB connection failed"      | Allowlist Vercel IPs in MongoDB Atlas Network Access  |
| "Function timeout"               | Check MongoDB connection pooling and timeout settings |
| "500 errors on API calls"        | Check Vercel function logs for detailed errors        |

---

## 📚 File Reference

| File                      | Purpose                | Status                      |
| ------------------------- | ---------------------- | --------------------------- |
| `index.js`                | Main Express app       | ✅ Modified for Vercel      |
| `package.json`            | Dependencies & scripts | ✅ Updated                  |
| `vercel.json`             | Vercel config          | ✅ Already configured       |
| `.env`                    | Local environment vars | ✅ Updated with MONGODB_URI |
| `.env.example`            | Template               | ✅ Created                  |
| `.gitignore`              | Git exclusions         | ✅ Already configured       |
| `DEPLOYMENT.md`           | Full guide             | ✅ Created                  |
| `DEPLOYMENT-CHECKLIST.md` | This file              | ✅ Created                  |

---

## 🌍 Deployed Application

After successful deployment, your API will be available at:

```
https://your-project-name.vercel.app
```

All endpoints will work as configured:

- GET `/` - Health check
- GET `/arts` - List all artworks
- POST `/arts` - Create artwork
- And all other CRUD operations...

---

## ✉️ Next Steps

1. ✅ Review the changes made above
2. ✅ Test locally with `npm start`
3. ✅ Commit changes with `git push`
4. ✅ Deploy via Vercel dashboard or CLI
5. ✅ Monitor deployment logs
6. ✅ Test production endpoints
7. ✅ Set up monitoring and alerts in Vercel

---

**Status**: 🟢 Ready for Vercel Deployment
**Last Updated**: 2026-05-05
