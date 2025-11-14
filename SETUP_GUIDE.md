# 🚀 SETUP GUIDE - Fix Player Creation Error & Enable Tournament Controls

## Problem 1: Player Creation Fails with "fetch failed" Error

**Root Cause:** Your `.env` file doesn't have real Supabase credentials.

### ✅ Solution: Get Your Supabase Credentials

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Create a new project** (if you haven't already):
   - Project name: `pub-golf-xmas`
   - Database password: pubGolfQuique
   - Region: Choose closest to you

3. **Get your credentials**:
   - Click on **Settings** (gear icon)
   - Click on **API**
   - Copy these values:
     - **Project URL** → `PUBLIC_SUPABASE_URL`
     - **anon public** key → `PUBLIC_SUPABASE_ANON_KEY`
     - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (click to reveal)

4. **Update your `.env` file**:
   ```env
   PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
   ADMIN_PASSWORD=xmas2024
   ```

5. **Restart your dev server**:
   ```bash
   # Stop current server (Ctrl+C in terminal)
   npm run dev
   ```

---

## Problem 2: Tournament Progress Shows Wrong Pub

**Root Cause:** Database needs tournament settings table and updated pubs data.

### ✅ Solution: Run SQL Scripts

#### Step 1: Setup Database Schema

Go to your Supabase project → **SQL Editor** and run these scripts **in order**:

**1. First, run `DATABASE_SCHEMA.md` SQL** (the main setup script)

**2. Then run `UPDATE_TOURNAMENT.sql`** (updates pubs with Christmas data)

**3. Finally run `ADD_TOURNAMENT_SETTINGS.sql`** (adds current pub tracking)

---

## Problem 3: Admin Needs to Control Current Pub

**Status:** ✅ FIXED!

### New Features Added:

1. **Tournament Settings Table** - Tracks current pub
2. **Admin Controls** - Previous/Next buttons and dropdown to change pub
3. **Live Updates** - Leaderboard shows progress based on current pub
4. **Visual Progress** - Completed pubs show in amber/gold color

### How to Use:

1. Login to admin: http://localhost:4322/admin/login
2. Password: `xmas2024`
3. See **"Change Current Pub"** section at top
4. Use Previous/Next buttons or dropdown to change location
5. Public leaderboard updates automatically!

---

## 📋 Complete Setup Checklist

- [ ] Create Supabase project
- [ ] Copy credentials to `.env`
- [ ] Run `DATABASE_SCHEMA.md` SQL in Supabase
- [ ] Run `UPDATE_TOURNAMENT.sql` in Supabase  
- [ ] Run `ADD_TOURNAMENT_SETTINGS.sql` in Supabase
- [ ] Restart dev server (`npm run dev`)
- [ ] Login to admin dashboard
- [ ] Add players (should work now!)
- [ ] Change current pub (use new controls)
- [ ] Verify leaderboard shows correct pub

---

## 🎯 What's Working Now

✅ **Admin can set current pub** - Previous/Next buttons + dropdown  
✅ **Progress bar shows all 7 pubs** - With visual progress  
✅ **Current pub updates everywhere** - Admin and public pages  
✅ **Real-time sync** - Changes reflect immediately  
✅ **Proper pub names** - Once you run UPDATE_TOURNAMENT.sql  
✅ **Challenge details** - Shows drink, challenge, and par  

---

## 🆘 Still Having Issues?

### If player creation still fails:
1. Check browser console (F12) for errors
2. Verify `.env` credentials are correct (no quotes, no spaces)
3. Restart dev server after changing `.env`
4. Check Supabase project is not paused (free tier pauses after 1 week inactivity)

### If pub names still wrong:
1. Run the SQL: `SELECT * FROM pubs ORDER BY order_index;`
2. Should show 7 pubs with Christmas challenges
3. If not, re-run `UPDATE_TOURNAMENT.sql`

### If tournament settings not working:
1. Run: `SELECT * FROM tournament_settings;`
2. Should show 1 row with current_pub_id
3. If not, re-run `ADD_TOURNAMENT_SETTINGS.sql`

---

## 🎄 You're Ready!

Once you complete the checklist above, you'll have:
- ✅ Working player management
- ✅ Admin controls for pub navigation  
- ✅ Real-time tournament progress
- ✅ All 7 Christmas pubs loaded
- ✅ Complete score tracking system

**Let's make this the best pub golf tournament ever! 🎅⛳🍻**
