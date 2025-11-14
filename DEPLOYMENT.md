# 🚀 VibeCoding Deployment Guide

## Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy your Next.js app. Follow these steps:

### Prerequisites
- GitHub account
- Vercel account (free at vercel.com)
- PostgreSQL database (we'll set this up)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: VibeCoding app"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Set Up Database

Choose one of these PostgreSQL providers:

#### Option A: Vercel Postgres (Recommended)
1. Go to vercel.com/dashboard
2. Click "Storage" → "Create Database"
3. Select "Postgres"
4. Copy the connection string

#### Option B: Supabase (Free)
1. Go to supabase.com
2. Create new project
3. Go to Settings → Database
4. Copy connection string (use "Transaction" pooler)

#### Option C: Neon (Free)
1. Go to neon.tech
2. Create new project
3. Copy connection string

#### Option D: Railway (Free tier)
1. Go to railway.app
2. New Project → Provision PostgreSQL
3. Copy connection string

### Step 3: Deploy to Vercel

1. Go to vercel.com/new
2. Import your GitHub repository
3. Configure your project:

**Environment Variables** (Add these in Vercel):
```
DATABASE_URL=your-postgres-connection-string
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-generated-secret
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

4. Click "Deploy"

### Step 4: Run Database Migrations

After first deployment:

1. Go to your project in Vercel
2. Click "Settings" → "Environment Variables"
3. Make sure DATABASE_URL is set
4. In your terminal:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Pull environment variables
vercel env pull

# Run migrations
npx prisma db push
```

### Step 5: Set Up OAuth (Optional)

#### GitHub OAuth
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Update callback URL to: `https://your-app.vercel.app/api/auth/callback/github`
3. Add to Vercel environment variables:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`

#### Google OAuth
1. Go to Google Cloud Console
2. Update callback URL to: `https://your-app.vercel.app/api/auth/callback/google`
3. Add to Vercel environment variables:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

### Step 6: Redeploy

After adding OAuth credentials:
```bash
vercel --prod
```

Or push to GitHub to trigger automatic deployment.

---

## Alternative: Deploy to Railway

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy

1. Go to railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add PostgreSQL service to your project

### Step 3: Configure

Add environment variables:
```
DATABASE_URL=${{Postgres.DATABASE_URL}}
NEXTAUTH_URL=https://your-app.railway.app
NEXTAUTH_SECRET=your-generated-secret
```

### Step 4: Deploy

Railway will automatically build and deploy your app.

---

## Alternative: Deploy to Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build your app: `npm run build`
3. Deploy: `netlify deploy --prod`
4. Set up environment variables in Netlify dashboard
5. Connect external PostgreSQL database

---

## Post-Deployment Checklist

- [ ] App loads correctly
- [ ] Database connection works
- [ ] User registration works
- [ ] Login works
- [ ] Session creation works
- [ ] Analytics page loads
- [ ] Settings save correctly
- [ ] OAuth providers work (if configured)

---

## Troubleshooting

### "Database connection error"
- Check DATABASE_URL is correct
- Make sure database allows connections from Vercel IPs
- For Supabase, use "Transaction" pooler connection string

### "NEXTAUTH_SECRET is not set"
- Add NEXTAUTH_SECRET to environment variables
- Redeploy after adding

### "Module not found"
- Make sure all dependencies are in package.json
- Try: `rm -rf node_modules && npm install`

### "Prisma Client not generated"
- Add `postinstall` script to package.json:
  ```json
  "postinstall": "prisma generate"
  ```

### OAuth not working
- Check callback URLs match exactly
- Make sure OAuth apps are not in development mode
- Verify client ID and secret are correct

---

## Performance Optimization

### Enable Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Enable Image Optimization

Images are automatically optimized by Next.js on Vercel.

### Database Connection Pooling

For production, use connection pooling:
- Supabase: Use "Transaction" pooler
- Neon: Connection pooling is automatic
- Vercel Postgres: Connection pooling is automatic

---

## Monitoring

### View Logs
```bash
vercel logs your-app-name
```

### Database Monitoring
- Vercel Postgres: Check dashboard
- Supabase: Check database health
- Neon: Check project dashboard

---

## Updating Your App

1. Make changes locally
2. Test locally: `npm run dev`
3. Commit: `git add . && git commit -m "Update"`
4. Push: `git push`
5. Vercel automatically deploys!

---

## Custom Domain (Optional)

1. Go to Vercel project settings
2. Add your domain
3. Update DNS records as instructed
4. Update NEXTAUTH_URL to your custom domain

---

**Your VibeCoding app is now live! 🎉**

Share your deployment URL and start coding with the perfect vibe!
