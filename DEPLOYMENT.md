# Deployment Guide for Vercel

This guide will help you deploy your Pub Golf app to Vercel.

## Prerequisites

- GitHub account with your code pushed
- Vercel account (sign up at vercel.com)
- Supabase project set up with database

## Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## Step 2: Import Project in Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Select your GitHub repository
4. Vercel will auto-detect Astro

## Step 3: Configure Environment Variables

In the Vercel deployment screen, add these environment variables:

| Name | Value | Where to Find |
|------|-------|---------------|
| `PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase → Settings → API → Project URL |
| `PUBLIC_SUPABASE_ANON_KEY` | Your anon/public key | Supabase → Settings → API → Project API keys → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | Supabase → Settings → API → Project API keys → service_role (⚠️ keep secret!) |
| `ADMIN_PASSWORD` | Your chosen admin password | Create a secure password |

## Step 4: Deploy

1. Click **"Deploy"**
2. Wait ~2 minutes for build to complete
3. Your app will be live at `https://your-project.vercel.app`

## Step 5: Custom Domain (Optional)

1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

## Deployment Settings

The `vercel.json` file includes:

```json
{
  "buildCommand": "npm run build",
  "framework": "astro"
}
```

Vercel will automatically:
- Install dependencies
- Build your Astro site
- Deploy serverless functions for API routes
- Enable edge caching
- Provide SSL certificates

## Automatic Deployments

Every push to `main` branch will automatically trigger a new deployment.

For preview deployments, create a pull request and Vercel will deploy a preview URL.

## Monitoring

View deployment logs in Vercel dashboard:
- Build logs
- Function logs
- Error tracking

## Rollback

If needed, rollback to a previous deployment:
1. Go to Vercel dashboard
2. Select "Deployments"
3. Click "..." on previous deployment
4. Click "Promote to Production"

## Troubleshooting

### Build Fails
- Check build logs in Vercel
- Ensure all dependencies are in `package.json`
- Verify TypeScript has no errors locally

### Environment Variables Not Working
- Make sure variable names match exactly
- Redeploy after changing environment variables
- Check that PUBLIC_ prefix is used for client-side variables

### API Routes Not Working
- Verify Vercel adapter is installed: `@astrojs/vercel`
- Check `astro.config.mjs` has `output: 'server'`
- Look at Function logs in Vercel dashboard

### Supabase Connection Issues
- Verify all three Supabase keys are correct
- Check Supabase project is active
- Test database connection locally first

## Performance Optimization

Vercel automatically provides:
- Global CDN
- Edge caching
- Automatic compression
- Image optimization (if using Astro Image)

## Cost

- Free tier includes:
  - 100GB bandwidth
  - 100 serverless function invocations
  - Unlimited static requests

Perfect for a tournament event!

---

Your app should now be live and ready for the tournament! 🎉
