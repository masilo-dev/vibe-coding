# VibeCoding - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

Follow these steps to get VibeCoding running on your local machine:

### Step 1: Copy Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add:
- Database connection string
- Generate NEXTAUTH_SECRET: `openssl rand -base64 32`

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Database

Option A - **Using Docker (Recommended)**:
```bash
docker run --name vibecoding-db -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres
```

Update your `.env`:
```
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/vibecoding?schema=public"
```

Option B - **Use existing PostgreSQL**:
Update DATABASE_URL in `.env` with your connection string.

### Step 4: Initialize Database

```bash
npm run db:push
```

### Step 5: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🔧 Optional: OAuth Setup

### GitHub OAuth (Optional)

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - Application name: `VibeCoding Local`
   - Homepage URL: `http://localhost:3000`
   - Callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env`

### Google OAuth (Optional)

1. Go to https://console.cloud.google.com/
2. Create new project
3. Enable Google+ API
4. Create OAuth credentials
5. Add callback: `http://localhost:3000/api/auth/callback/google`
6. Copy credentials to `.env`

## 📝 First Time Usage

1. Go to http://localhost:3000
2. Click "Sign up"
3. Create an account
4. Start your first coding session!

## 🎵 Note About Audio Files

The music player references audio files in `/public/audio/`. You'll need to add your own audio files or integrate with a streaming service like:
- Spotify API
- YouTube Music API
- Or use royalty-free music from sites like Incompetech

## 🐛 Troubleshooting

**Can't connect to database?**
- Make sure PostgreSQL is running
- Check DATABASE_URL in `.env`

**Module not found errors?**
- Run `npm install` again
- Delete `node_modules` and `.next`, then reinstall

**Prisma errors?**
- Run `npm run db:generate`
- Run `npm run db:push`

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Customize colors in `app/globals.css`
- Add your music files to `/public/audio/`
- Deploy to Vercel for production

Happy Coding! 🚀
