# 🚀 Deploy to Vercel - Quick Steps

Your app is committed and ready! Here's what to do:

## Option 1: Deploy via Vercel Dashboard (Easiest)

### 1. Go to Vercel
Visit: https://vercel.com/new

### 2. Import Your GitHub Repository
- Click **"Import Git Repository"**
- Select: `HenryCorn/pubGolf`
- Click **"Import"**

### 3. Configure Project
- **Root Directory**: Change to `pub-golf-app` ⚠️ Important!
- **Framework Preset**: Astro (should auto-detect)
- **Build Command**: `npm run build` (default is fine)
- **Output Directory**: `dist` (default is fine)

### 4. Add Environment Variables
Click **"Environment Variables"** and add these 4 variables:

| Name | Value |
|------|-------|
| `PUBLIC_SUPABASE_URL` | `https://uxrpdlpddqkgghohypfv.supabase.co` |
| `PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4cnBkbHBkZHFrZ2dob2h5cGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMjY2NTcsImV4cCI6MjA3ODcwMjY1N30.Y39YW4O-9nDF_Zx74nWlu6T5p1OdNBVZYp7CZFmJxiI` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4cnBkbHBkZHFrZ2dob2h5cGZ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzEyNjY1NywiZXhwIjoyMDc4NzAyNjU3fQ.r2bpLtUBmbJdg9JZ4NxlkEUBrx2D_ZAfZ_gs7oHSQ_Y` |
| `ADMIN_PASSWORD` | `xmas2024` |

### 5. Deploy!
Click **"Deploy"** and wait ~2 minutes

### 6. Your App is Live! 🎉
- Public Leaderboard: `https://your-project.vercel.app/`
- Admin Dashboard: `https://your-project.vercel.app/admin/login`

---

## Option 2: Deploy via Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from project directory
cd /Users/quique/repo/pubGolf/pub-golf-app
vercel

# Follow prompts and add environment variables when asked
```

---

## After Deployment

### Test Everything:
1. ✅ Visit leaderboard - should show tournament progress
2. ✅ Login to admin (password: `xmas2024`)
3. ✅ Add a test player
4. ✅ Enter a test score
5. ✅ Change current pub location
6. ✅ Verify real-time updates work

### Share with Players:
Send them the public URL! They can:
- View live leaderboard
- See tournament progress
- Check stats page

### Tournament Day:
Only you (admin) can:
- Change current pub location
- Add/remove players
- Enter/update scores

---

## Important Notes

⚠️ **Set Root Directory to `pub-golf-app`** - This is crucial!
⚠️ **Keep SUPABASE_SERVICE_ROLE_KEY secret** - Never share publicly
✅ **Automatic deployments** - Every git push will auto-deploy
✅ **Free tier** - More than enough for your tournament

---

## Troubleshooting

### "Build failed"
- Make sure Root Directory is set to `pub-golf-app`
- Check build logs in Vercel dashboard

### "Can't connect to database"
- Verify all 4 environment variables are correct
- No quotes around values in Vercel

### "Admin password doesn't work"
- Check ADMIN_PASSWORD environment variable
- Redeploy after changing env vars

---

**You're ready to deploy! Just go to vercel.com/new and follow the steps above.** 🎄⛳
