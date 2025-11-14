# VibeCoding 🎵

> Your perfect coding environment with lo-fi music, focus timers, and productivity tracking.

VibeCoding is a full-stack web application that helps developers get in the zone and stay productive by combining ambient music, Pomodoro-style focus timers, and detailed analytics to track your coding sessions.

## ✨ Features

- 🎵 **Music Player** with multiple genres (Lo-Fi, Ambient, Jazz, Classical, Rain, Nature)
- 🔊 **Ambient Sounds** (Rain, Ocean, Forest, Café, Fireplace)
- ⏱️ **Pomodoro Timer** with customizable session lengths
- 📊 **Analytics Dashboard** with productivity insights
- 🎯 **Focus Score** tracking for each session
- 🌙 **Dark Mode** support
- 🔐 **Authentication** with email/password and OAuth (GitHub, Google)
- 📱 **Fully Responsive** design for all devices

## 🚀 Tech Stack

- **Framework**: Next.js 14.2.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: NextAuth.js v5
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand
- **Audio**: Howler.js
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**:
```bash
git clone <your-repo-url>
cd vibe-coding
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/vibecoding?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# OAuth Providers (Optional)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# App Settings
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

To generate a secure NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

4. **Set up the database**:

```bash
# Push the schema to your database
npm run db:push

# (Optional) Open Prisma Studio to view/edit data
npm run db:studio
```

## 🎮 Running the App

**Development mode**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production build**:
```bash
npm run build
npm start
```

## 📁 Project Structure

```
vibe-coding/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── analytics/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   ├── sessions/
│   │   ├── analytics/
│   │   └── preferences/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── slider.tsx
│   │   └── toast.tsx
│   ├── music-player.tsx
│   ├── session-timer.tsx
│   └── theme-provider.tsx
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   └── utils.ts
├── store/
│   ├── audio-store.ts
│   └── session-store.ts
├── prisma/
│   └── schema.prisma
└── package.json
```

## 🗄️ Database Setup

### PostgreSQL Setup

**Using Docker**:
```bash
docker run --name vibecoding-postgres -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres
```

**Or install PostgreSQL locally**:
- macOS: `brew install postgresql@15`
- Ubuntu: `sudo apt-get install postgresql`
- Windows: Download from [postgresql.org](https://www.postgresql.org/download/)

### Database Migrations

```bash
# Generate Prisma Client
npm run db:generate

# Push schema changes to database
npm run db:push

# Open Prisma Studio
npm run db:studio
```

## 🔐 Authentication Setup

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set callback URL to: `http://localhost:3000/api/auth/callback/github`
4. Add credentials to `.env`

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project and enable Google+ API
3. Create OAuth 2.0 credentials
4. Set callback URL to: `http://localhost:3000/api/auth/callback/google`
5. Add credentials to `.env`

## 🚀 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables

3. **Set up Database**:
   - Use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or
   - Use [Supabase](https://supabase.com) or
   - Use [Railway](https://railway.app) or [Neon](https://neon.tech)

4. **Deploy**:
```bash
npm run build
```

The app will be automatically deployed on every push to main branch.

## 📝 Usage Guide

### Starting a Coding Session

1. **Login/Register** to your account
2. **Select music genre** and ambient sounds
3. **Adjust volume** to your preference
4. **Click Start** to begin your focus session
5. **Stay focused** - your session is being tracked!

### Viewing Analytics

1. Navigate to **Analytics** page
2. View your:
   - Total sessions and coding time
   - Focus score trends
   - Daily coding patterns
   - Favorite music genres
3. Switch between time periods (Last 7 days, This Week, This Month)

### Customizing Settings

1. Go to **Settings** page
2. Adjust:
   - Default session length
   - Break duration
   - Default music genre
   - Volume preferences

## 🎨 Customization

### Adding New Music Genres

Edit `store/audio-store.ts`:
```typescript
const musicUrls: Record<MusicGenre, string> = {
  // Add your new genre
  newgenre: "/audio/newgenre.mp3",
};
```

### Changing Color Scheme

Edit `app/globals.css` to customize CSS variables for light/dark themes.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ by AlphaClone Systems**

Happy Coding! 🚀
