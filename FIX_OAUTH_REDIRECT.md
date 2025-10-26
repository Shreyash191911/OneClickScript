# 🔧 Fix Google OAuth Redirect URI Mismatch

## Error
**"Error 400: redirect_uri_mismatch"**

This means the redirect URI in your Google OAuth configuration doesn't match your Vercel deployment URL.

## Solution: Update Google Cloud Console

### Step 1: Go to Google Cloud Console
1. Open: https://console.cloud.google.com/apis/credentials
2. Find your OAuth 2.0 Client ID (the one with ID: `712277178727-d5i94rumi6l6092a54di31r3o8p6n52i`)
3. Click **Edit** (pencil icon)

### Step 2: Update Authorized Redirect URIs

In the **"Authorized redirect URIs"** section, make sure you have these EXACT URLs:

```
https://yt-script-generator-eight.vercel.app/api/auth/callback/google
http://localhost:3000/api/auth/callback/google
```

**Important Notes:**
- ✅ Use `https://` for production URL
- ✅ Use `http://` for localhost
- ✅ The path must be EXACTLY `/api/auth/callback/google`
- ✅ No trailing slashes

### Step 3: Update Authorized JavaScript Origins

In the **"Authorized JavaScript origins"** section, add:

```
https://yt-script-generator-eight.vercel.app
http://localhost:3000
```

### Step 4: Save Changes

1. Click **Save** at the bottom
2. Wait a few minutes for changes to propagate (Google can take 5-10 minutes)

---

## Fix GitHub OAuth Too

While you're at it, update GitHub OAuth:

### Step 1: Go to GitHub Developer Settings
1. Open: https://github.com/settings/developers
2. Click on your OAuth App
3. Find **"Authorization callback URL"**

### Step 2: Update the Callback URL

Set it to:
```
https://yt-script-generator-eight.vercel.app/api/auth/callback/github
```

### Step 3: Save

Click **Update application**

---

## After Fixing

1. Wait 5-10 minutes for Google's changes to propagate
2. Clear your browser cache and cookies
3. Try logging in again at: https://yt-script-generator-eight.vercel.app
4. It should work! ✅

---

## Common Mistakes to Avoid

❌ **Wrong:** `https://yt-script-generator-eight.vercel.app/api/auth/callback/google/`
✅ **Correct:** `https://yt-script-generator-eight.vercel.app/api/auth/callback/google`

❌ **Wrong:** `http://yt-script-generator-eight.vercel.app/api/auth/callback/google`
✅ **Correct:** `https://yt-script-generator-eight.vercel.app/api/auth/callback/google`

❌ **Wrong:** Using old deployment URL
✅ **Correct:** Using current URL (`yt-script-generator-eight.vercel.app`)

