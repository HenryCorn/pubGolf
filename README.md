# Pub Golf VOL.4 - THE XMAS ONE 🎄⛳

A production-ready, real-time tournament scoring application built with Astro, Supabase, and glassmorphism design.

## 🚀 Features

- **Real-time Leaderboard**: Live score updates using Supabase Realtime
- **Admin Dashboard**: Secure admin interface for score management
- **Beautiful UI**: Glassmorphism design with festive Christmas theming
- **Performance Analytics**: Interactive charts with ECharts
- **Mobile-First**: Optimized for use during the tournament
- **Server-Side Rendering**: Fast initial page loads with Astro SSR
- **Type-Safe**: Full TypeScript support throughout

## 📋 Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works great)
- A Vercel account for deployment (optional)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API to find your keys
3. Copy `.env.example` to `.env` and fill in your Supabase credentials:

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
ADMIN_PASSWORD=your_admin_password_here
```

### 3. Setup Database

Run the SQL script in `DATABASE_SCHEMA.md` in your Supabase SQL editor. This will:
- Create tables (players, pubs, scores)
- Set up Row Level Security (RLS) policies
- Enable Realtime for live updates
- Insert initial pub data

### 4. Development

```bash
npm run dev
```

Visit `http://localhost:4321` to see the app.

## 📁 Project Structure

```
pub-golf-app/
├── src/
│   ├── components/         # Reusable Astro components
│   │   ├── GlassCard.astro
│   │   ├── GlassButton.astro
│   │   └── GlassInput.astro
│   ├── layouts/           # Page layouts
│   │   └── BaseLayout.astro
│   ├── lib/              # Supabase clients
│   │   ├── supabase.ts
│   │   └── supabaseAdmin.ts
│   ├── pages/            # Route pages
│   │   ├── index.astro      # Leaderboard
│   │   ├── stats.astro      # Statistics
│   │   └── admin/
│   │       ├── index.astro  # Admin dashboard
│   │       └── login.astro  # Admin login
│   ├── types/            # TypeScript types
│   │   └── database.ts
│   └── utils/            # Utility functions
│       └── score.ts
├── public/               # Static assets
├── DATABASE_SCHEMA.md    # Database setup guide
└── astro.config.mjs     # Astro configuration
```

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 🎮 Usage

### Public Pages

- **`/`** - Live leaderboard with real-time updates
- **`/stats`** - Tournament analytics and visualizations

### Admin Pages

- **`/admin/login`** - Secure admin login
- **`/admin`** - Score management dashboard

### Admin Features

- Add/remove players
- Enter scores for each pub
- Real-time leaderboard updates
- Export tournament data

## 🚀 Deployment to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
4. Deploy!

## 🔒 Security

- Row Level Security (RLS) on all database tables
- Admin operations use service role key (server-side only)
- Password-protected admin dashboard
- Public read-only access to scores

## 📝 Next Steps

See `DATABASE_SCHEMA.md` for database setup instructions.

---

**Ready to tee off!** 🏌️‍♂️🍺
