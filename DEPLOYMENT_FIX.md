# 🔧 Deployment Authentication Fix

## Problem
Authentication error: "There is a problem with the server configuration"

## Root Cause
The `NEXTAUTH_URL` and OAuth redirect URIs don't match your actual Vercel deployment URL.

## Solution

### 1. Update Vercel Environment Variable

Go to: https://vercel.com/shreyashs-projects-a0a83870/yt-script-generator/settings/environment-variables

**Edit `NEXTAUTH_URL` to:**
```
https://yt-script-generator-eight.vercel.app
```

### 2. Update Google OAuth

1. Go to: https://console.cloud.google.com/apis/credentials
2. Select your OAuth 2.0 Client ID
3. Click **Edit**
4. Under **Authorized JavaScript origins**, ensure you have:
   ```
   https://yt-script-generator-eight.vercel.app
   ```
5. Under **Authorized redirect URIs**, add:
   ```
   https://yt-script-generator-eight.vercel.app/api/auth/callback/google
   ```
6. Click **Save**

### 3. Update GitHub OAuth

1. Go to: https://github.com/settings/developers
2. Click on your OAuth App
3. Update **Authorization callback URL** to:
   ```
   https://yt-script-generator-eight.vercel.app/api/auth/callback/github
   ```
4. Click **Update application**

### 4. Redeploy

After updating all settings:
1. Go to your Vercel project
2. Click on the latest deployment
3. Click **Redeploy**

### 5. Test

After redeployment:
1. Visit: https://yt-script-generator-eight.vercel.app
2. Click **Login**
3. Try signing in with Google or GitHub
4. Test the **Upgrade Now** button

## Quick Checklist

- [ ] Updated `NEXTAUTH_URL` in Vercel to: `https://yt-script-generator-eight.vercel.app`
- [ ] Added redirect URI in Google Console: `https://yt-script-generator-eight.vercel.app/api/auth/callback/google`
- [ ] Updated callback URL in GitHub: `https://yt-script-generator-eight.vercel.app/api/auth/callback/github`
- [ ] Redeployed app in Vercel
- [ ] Tested login functionality
- [ ] Tested upgrade button

## Notes

- OAuth providers can take a few minutes to propagate changes
- Make sure there are no typos in the URLs
- All URLs should use `https://` (not `http://`)
- The callback paths are case-sensitive

## If Still Having Issues

1. Check browser console for errors (F12 → Console)
2. Check Vercel deployment logs
3. Verify all environment variables are set correctly
4. Clear browser cache and cookies
5. Try in an incognito/private window


