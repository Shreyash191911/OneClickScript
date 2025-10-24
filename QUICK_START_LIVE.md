# ⚡ Quick Start - Go Live with Dodo Payments

## 🎯 3-Minute Setup for Live Payments

### Step 1: Get Your Dodo Payments Credentials (2 min)

1. Login to **Dodo Payments Dashboard**: https://dashboard.dodopayments.com
2. Go to **API Keys** → Copy your **LIVE API Key**
3. Go to **Webhooks** → Add endpoint: `https://yourdomain.com/api/webhooks/dodo`
4. Select events: `checkout.session.completed`, `payment.succeeded`, `subscription.*`
5. **Copy the Webhook Secret**

### Step 2: Update Environment Variables (30 sec)

In your `.env.local` file, change these 3 lines:

```env
DODO_PAYMENTS_API_KEY=pk_live_xxxxxxxxxxxxx  # Your LIVE key
DODO_PAYMENTS_WEBHOOK_SECRET=whsec_xxxxxxxxx # From webhook settings
DODO_PAYMENTS_ENVIRONMENT=live_mode          # Change from test_mode
```

### Step 3: Test Locally (30 sec)

```bash
npm run dev
```

1. Click "Upgrade Now"
2. Should redirect to real Dodo Payments checkout
3. ✅ If it redirects → You're ready to deploy!

### Step 4: Deploy to Production (Instant)

```bash
git add .
git commit -m "Enable live payments"
git push origin main
```

Then deploy to Vercel or your hosting platform.

---

## 🔥 That's It!

Your app is now accepting **REAL PAYMENTS** from customers worldwide! 🎉

### What Your Customers Can Pay With:
- 💳 Credit/Debit Cards
- 📱 UPI (PhonePe, Google Pay, Paytm)
- 🏦 Net Banking
- 💰 Wallets

### Need More Help?
See [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) for detailed guide.
