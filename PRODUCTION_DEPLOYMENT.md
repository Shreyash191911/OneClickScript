# 🚀 Production Deployment Guide - Dodo Payments Live Mode

## ✅ Pre-Deployment Checklist

### 1. Dodo Payments Setup

#### Get Your Live API Credentials
1. **Login to Dodo Payments Dashboard**: https://dashboard.dodopayments.com
2. **Navigate to API Keys** section
3. **Copy your LIVE API Key** (not test key!)
4. **Copy your Webhook Secret**

#### Configure Webhooks in Dodo Dashboard
1. Go to **Webhooks** section in Dodo Payments Dashboard
2. Click **"Add Endpoint"**
3. **Webhook URL**: `https://yourdomain.com/api/webhooks/dodo`
4. **Select Events to Listen**:
   - `checkout.session.completed`
   - `payment.succeeded`
   - `payment.failed`
   - `subscription.created`
   - `subscription.updated`
   - `subscription.cancelled`
5. **Save** and copy the Webhook Secret

### 2. Environment Variables for Production

Update your `.env.local` (or production environment) with these values:

```env
# Google Gemini API Key
GOOGLE_API_KEY=your_live_google_api_key

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Dodo Payments - LIVE MODE
DODO_PAYMENTS_API_KEY=your_live_dodo_api_key_here
DODO_PAYMENTS_WEBHOOK_SECRET=your_webhook_secret_from_dashboard
DODO_PAYMENTS_ENVIRONMENT=live_mode  # Change from test_mode to live_mode

# Next.js
NEXTAUTH_URL=https://yourdomain.com  # Your production domain
NEXTAUTH_SECRET=your_secure_random_secret_here
```

⚠️ **IMPORTANT**: Make sure `DODO_PAYMENTS_ENVIRONMENT=live_mode` to enable real payments!

### 3. Test the Integration Locally First

Before going live, test with live credentials locally:

```bash
# Set environment variables
export DODO_PAYMENTS_ENVIRONMENT=live_mode
export DODO_PAYMENTS_API_KEY=your_live_key

# Run the app
npm run dev
```

Test the payment flow:
1. Click "Upgrade Now"
2. Should redirect to real Dodo Payments checkout
3. Complete a test payment
4. Verify webhook is received (check console logs)

## 🌍 Deploy to Vercel (Recommended)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Dodo Payments live integration"
git push origin main
```

### Step 2: Deploy to Vercel

1. **Go to**: https://vercel.com
2. **Import your GitHub repository**
3. **Configure Project**:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variables** in Vercel Dashboard:
   - Click **"Environment Variables"** tab
   - Add all the variables from your `.env.local`
   - Make sure to set `DODO_PAYMENTS_ENVIRONMENT=live_mode`

5. **Deploy!**

### Step 3: Update Dodo Payments Webhook URL

After deployment:
1. Go back to **Dodo Payments Dashboard → Webhooks**
2. Update webhook URL to: `https://your-vercel-domain.vercel.app/api/webhooks/dodo`
3. **Save changes**

## 🔒 Security Checklist

- [ ] Using LIVE API keys (not test keys)
- [ ] `DODO_PAYMENTS_ENVIRONMENT` set to `live_mode`
- [ ] Webhook signature verification enabled
- [ ] HTTPS enabled on production domain
- [ ] All environment variables properly set
- [ ] `NEXTAUTH_SECRET` is a strong random string
- [ ] OAuth callback URLs updated for production domain

## 💳 Payment Methods Supported

Your Dodo Payments integration supports:
- **Credit/Debit Cards** (Visa, Mastercard, Amex)
- **UPI** (Google Pay, PhonePe, Paytm)
- **Net Banking** (All major Indian banks)
- **Wallets** (Paytm, MobiKwik, etc.)
- **International Cards** (For global customers)

## 📊 Monitoring & Maintenance

### Check Payment Status
1. **Dodo Payments Dashboard**: Monitor all transactions
2. **Webhook Logs**: Check your server logs for webhook events
3. **Error Tracking**: Set up error monitoring (Sentry, LogRocket)

### Test Webhook Locally (ngrok)
```bash
# Install ngrok
npm install -g ngrok

# Expose local server
ngrok http 3000

# Use ngrok URL in Dodo Payments webhook settings
# Example: https://abc123.ngrok.io/api/webhooks/dodo
```

## 🐛 Troubleshooting

### Issue: Payment redirects but doesn't complete
**Solution**: 
- Check webhook is properly configured
- Verify webhook URL is accessible (HTTPS required)
- Check server logs for webhook errors

### Issue: "Invalid API Key" error
**Solution**:
- Verify you're using LIVE API key (not test)
- Check `DODO_PAYMENTS_ENVIRONMENT=live_mode`
- Ensure no typos in API key

### Issue: Webhook signature verification fails
**Solution**:
- Verify `DODO_PAYMENTS_WEBHOOK_SECRET` is correct
- Check the signature header name (might be `dodo-signature` or `x-dodo-signature`)
- Ensure webhook secret from Dodo dashboard matches env variable

## 📝 Post-Launch Tasks

After your app is live:

1. **Test with Real Payment**: Make a real ₹99 payment to verify everything works
2. **Monitor Webhooks**: Check webhook delivery for first few payments
3. **Set Up Alerts**: Configure email/Slack alerts for failed payments
4. **Document Support**: Create help docs for users having payment issues
5. **Backup Plan**: Have customer support email ready for payment issues

## 💰 Pricing & Fees

- **Dodo Payments Fee**: Check your Dodo Payments dashboard for current rates
- **Your Plan**: ₹99/month for unlimited scripts
- **Consider**: Transaction fees when setting your pricing

## 🎉 You're Ready to Launch!

Once all checklist items are complete, your app will:
- ✅ Accept real payments from customers worldwide
- ✅ Process payments securely through Dodo Payments
- ✅ Handle webhooks for subscription management
- ✅ Provide seamless checkout experience

---

**Need Help?**
- Dodo Payments Docs: https://docs.dodopayments.com
- Dodo Payments Support: support@dodopayments.com
- Your App Status: Check Vercel Dashboard

Good luck with your launch! 🚀
