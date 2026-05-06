# ARTIFY Server - Vercel Deployment Guide

## Prerequisites

- Node.js 18+ installed locally
- Vercel account (https://vercel.com)
- Vercel CLI installed globally (`npm install -g vercel`)
- Git repository initialized and pushed to GitHub

## Environment Variables Setup

The application requires the following environment variables to be set in Vercel:

### 1. **MONGODB_URI** (Required)

MongoDB connection string with credentials:

```
mongodb+srv://ARTIFY:L89EWqO0X0LaGrKj@cluster0.1ezipje.mongodb.net/?appName=Cluster0
```

### 2. **FIREBASE_SERVICE_KEY** (Required)

Base64-encoded Firebase service account key. This is already in your `.env` file.

### 3. **NODE_ENV**

Set to `production` for production deployment

## Deployment Steps

### Step 1: Local Testing

```bash
npm install
npm start
```

The server should be available at `http://localhost:3000`

### Step 2: Prepare for Deployment

1. Ensure all changes are committed to git:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. **DO NOT commit `.env` file** - Verify `.gitignore` contains `.env`

### Step 3: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended for beginners)

1. Go to https://vercel.com/import
2. Connect your GitHub repository
3. Select the project
4. Under "Environment Variables", add:
   - `MONGODB_URI`: Your MongoDB connection string
   - `FIREBASE_SERVICE_KEY`: Your base64-encoded Firebase key
   - `NODE_ENV`: `production`
5. Click "Deploy"

#### Option B: Using Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

When prompted for environment variables, enter:

- MONGODB_URI
- FIREBASE_SERVICE_KEY
- NODE_ENV=production

### Step 4: Verify Deployment

After deployment, test your API endpoints:

```bash
curl https://your-project-name.vercel.app/
```

You should see: `Hello ARTIFY!`

## File Structure

```
artify-server/
├── .env                        # Local environment variables (not committed)
├── .env.example               # Template for required variables
├── .gitignore                 # Includes .env
├── package.json               # Node.js dependencies
├── vercel.json                # Vercel configuration
├── index.js                   # Main application file (exports for Vercel)
└── encode.js                  # Utility for encoding Firebase keys
```

## API Endpoints

- **GET** `/` - Health check
- **GET** `/arts` - Get all artworks
- **GET** `/arts/:id` - Get specific artwork
- **POST** `/arts` - Create new artwork
- **PATCH** `/arts/:id` - Update artwork
- **DELETE** `/arts/:id` - Delete artwork
- **GET** `/users` - Get all users
- **GET** `/users/:id` - Get specific user
- **POST** `/users` - Create new user
- **PATCH** `/users/:id` - Update user
- **DELETE** `/users/:id` - Delete user
- **GET** `/orders` - Get all orders
- **GET** `/orders/:id` - Get specific order
- **POST** `/orders` - Create new order
- **PATCH** `/orders/:id` - Update order
- **DELETE** `/orders/:id` - Delete order

## Troubleshooting

### Issue: "Cannot find module 'express'"

**Solution:** Run `npm install` before deploying

### Issue: "MONGODB_URI is not defined"

**Solution:** Add MONGODB_URI to Vercel environment variables in project settings

### Issue: "Firebase credential error"

**Solution:**

1. Ensure FIREBASE_SERVICE_KEY is properly base64 encoded
2. Verify the key hasn't been corrupted during copy-paste
3. Use `node encode.js <path-to-firebase-key.json>` to regenerate

### Issue: "Function timeout"

**Solution:** Check MongoDB connection - may need to allowlist Vercel IP in MongoDB Atlas

## MongoDB Atlas Configuration

For Vercel deployments, you must allowlist Vercel's IP addresses in MongoDB Atlas:

1. Go to MongoDB Atlas > Network Access
2. Add IP address: `0.0.0.0/0` (allows all IPs) or allowlist specific Vercel regions
3. Or enable "Allow access from anywhere" temporarily for testing

## Local Development

For local development, ensure your `.env` file contains all necessary variables from `.env.example`:

```bash
# Copy template to actual .env
cp .env.example .env

# Edit .env with your actual credentials
nano .env

# Run locally
npm start
```

## Security Best Practices

1. ✅ **Never commit `.env` file** - Already configured in `.gitignore`
2. ✅ **Use environment variables for secrets** - Configured in Vercel dashboard
3. ✅ **Keep MongoDB credentials safe** - Use environment variables only
4. ✅ **Rotate Firebase keys periodically** - Consider regenerating quarterly
5. ✅ **Monitor deployment logs** - Use Vercel dashboard for debugging

## Performance Considerations

- **Cold starts**: Vercel serverless functions may have initial latency
- **Database connections**: MongoDB connections are reused across invocations
- **Execution limits**: Vercel limits function execution time (check current limits)

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Express.js on Vercel](https://vercel.com/docs/runtimes/nodejs#express)
- [MongoDB Connection Best Practices](https://docs.mongodb.com/drivers/node/current/fundamentals/connection/mongoclient/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

## Support

For deployment issues, check:

1. Vercel project logs: `vercel logs` or dashboard
2. MongoDB connection status
3. Firebase credential validity
4. CORS configuration for frontend requests
