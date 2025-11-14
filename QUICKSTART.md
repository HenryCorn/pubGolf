# 🚀 Quick Start Guide - Pub Golf App

This guide will get you from zero to deployed in under 30 minutes.

## Step 1: Clone and Install (2 minutes)

```bash
cd /Users/quique/repo/pubGolf/pub-golf-app
npm install
```

## Step 2: Create Supabase Project (5 minutes)

1. Go to [https://supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - **Project name**: `pub-golf-vol4`
   - **Database password**: (create a strong password)
   - **Region**: Choose closest to your users
4. Wait for project to be created (~2 minutes)

## Step 3: Get Supabase Keys (1 minute)

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (starts with: `eyJhbG...`)
   - **service_role key** (starts with: `eyJhbG...` - keep this secret!)

## Step 4: Configure Environment (2 minutes)

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and paste your Supabase keys:
   ```env
   PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=eyJhbG...your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=eyJhbG...your_service_role_key
   ADMIN_PASSWORD=xmas2024
   ```

## Step 5: Setup Database (5 minutes)

1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire SQL script from `DATABASE_SCHEMA.md`
4. Click **Run**
5. Verify tables were created in **Table Editor**

You should see:
- ✅ `players` table
- ✅ `pubs` table (with 7 pubs pre-populated)
- ✅ `scores` table

## Step 6: Enable Realtime (2 minutes)

1. In Supabase, go to **Database** → **Replication**
2. Find the `scores` table
3. Click the toggle to **enable** replication
4. Click **Save**

## Step 7: Test Locally (5 minutes)

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to: `http://localhost:4321`

3. You should see:
   - ✅ Hero section with "PUB GOLF VOL.4"
   - ✅ Empty leaderboard (no players yet)
   - ✅ Navigation bar at bottom

### Add a Test Player

1. In Supabase, go to **Table Editor** → **players**
2. Click **Insert** → **Insert row**
3. Fill in:
   - **name**: `Test Player`
   - **avatar**: `👨‍🦰`
4. Click **Save**
5. Refresh your app - you should see the player!

### Add a Test Score

1. In Supabase, go to **Table Editor** → **scores**
2. Click **Insert** → **Insert row**
3. Fill in:
   - **player_id**: (copy the UUID from your player)
   - **pub_id**: `lamb-flag`
   - **sips**: `3`
   - **penalties**: `1`
   - **bonuses**: `0`
4. Click **Save**
5. Refresh your app - leaderboard updates!

## Step 8: Deploy to Vercel (5 minutes)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit - Pub Golf app"
   git push origin main
   ```

2. Go to [https://vercel.com](https://vercel.com)
3. Click **Import Project**
4. Select your GitHub repository
5. In **Environment Variables**, add:
   - `PUBLIC_SUPABASE_URL` = (your Supabase URL)
   - `PUBLIC_SUPABASE_ANON_KEY` = (your anon key)
   - `SUPABASE_SERVICE_ROLE_KEY` = (your service role key)
   - `ADMIN_PASSWORD` = `xmas2024` (or your choice)
6. Click **Deploy**
7. Wait ~2 minutes for deployment

## ✅ You're Done!

Your app is now live at: `https://your-app.vercel.app`

### What You Can Do Now:

1. **Public View**: Share the URL with participants
2. **Admin Access**: Go to `/admin/login` with your password
3. **Add Players**: Use the admin dashboard
4. **Enter Scores**: As the tournament progresses
5. **Watch Live**: Real-time updates on all devices!

---

## 🆘 Troubleshooting

### "Missing Supabase environment variables"
- Check `.env` file exists and has all 3 Supabase values
- Restart dev server: `npm run dev`

### "Row Level Security" errors
- Make sure you ran the SQL script completely
- Check RLS is enabled in **Database** → **Tables** → select table → **RLS enabled** should be ON

### Realtime not working
- Verify replication is enabled for `scores` table
- Check browser console for connection errors
- Try refreshing the page

### Can't login to admin
- Check `ADMIN_PASSWORD` in `.env` matches what you're typing
- Password is case-sensitive

---

## 📚 Next Steps

1. Read the main `README.md` for full documentation
2. Customize the design colors in `BaseLayout.astro`
3. Add your tournament logo to `/public/`
4. Invite players and start scoring!

**Happy Pub Golfing!** 🏌️‍♂️🍺
