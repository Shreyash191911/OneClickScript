# 🆘 Dodo Payments API Issue - Help Needed

## Problem
The Dodo Payments REST API endpoint `api.dodopayments.com` cannot be resolved (DNS error).

## What We've Tried
1. ✅ `https://api.dodopayments.com/v1/checkout/sessions`
2. ✅ `https://app.dodopayments.com/api/v1/checkout/sessions`
3. ✅ `https://dodopayments.com/api/v1/checkout/sessions`

All endpoints return: `ENOTFOUND` - domain doesn't exist

## What's Working
- ✅ Your webhook URL is configured: `https://yt-script-generator-h5qxk44n7-shreyashs-projects-a0a83870.vercel.app/api/webhooks/dodo`
- ✅ You have a valid API key: `i62Llmfwhsec_ub8BICyZbN5PmcEgcXV3nTpax1xPT4Wn`
- ✅ Webhook signing secret: `whsec_ub8BICyZbN5PmcEgcXV3nTpax1xPT4Wn`
- ✅ Live mode is enabled in your dashboard

## Request to Dodo Payments Support

Dear Dodo Payments Support,

I'm trying to integrate your payment gateway into my Next.js application but I'm getting a DNS resolution error for `api.dodopayments.com`.

**My Integration Details:**
- API Key: `i62Llmfwhsec_ub8BICyZbN5PmcEgcXV3nTpax1xPT4Wn` (Live mode)
- Webhook: Successfully configured at app.dodopayments.com
- Error: `getaddrinfo ENOTFOUND api.dodopayments.com`

**Questions:**
1. What is the correct base URL for your REST API?
2. Do you have official documentation for creating checkout sessions via REST API?
3. Should I use your SDK instead of direct API calls?
4. Are there any IP whitelist requirements?

**My API Call:**
```bash
curl -X POST https://api.dodopayments.com/v1/checkout/sessions \
  -H "Authorization: Bearer i62Llmfwhsec_ub8BICyZbN5PmcEgcXV3nTpax1xPT4Wn" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 299,
    "currency": "USD",
    "description": "OneClick Script Writer - Unlimited Plan",
    "customer_email": "customer@example.com",
    "success_url": "https://myapp.com/success",
    "cancel_url": "https://myapp.com/cancel"
  }'
```

Please provide the correct API endpoint and any documentation.

Thank you!

---

## Contact Dodo Payments

### Option 1: Dashboard Support
1. Go to: https://app.dodopayments.com
2. Look for "Support" or "Help" in the sidebar
3. Open a support ticket

### Option 2: Documentation
1. Check: https://docs.dodopayments.com
2. Look for "API Reference" → "Checkout Sessions"
3. Find the correct base URL

### Option 3: Email/Chat
Look for support email or live chat on their website

---

## Alternative Solution: Use Razorpay (Recommended)

If Dodo Payments doesn't respond quickly, we can switch to Razorpay:

### Why Razorpay?
- ✅ Most popular payment gateway in India
- ✅ Well-documented REST API
- ✅ Excellent developer experience
- ✅ Supports international payments
- ✅ Free for first ₹50,000 in transactions
- ✅ Integration time: ~1 hour

### Razorpay Setup (Quick)
1. Sign up at: https://razorpay.com
2. Get API keys from dashboard
3. Update environment variables
4. I'll update the code to use Razorpay
5. Everything will work immediately

Would you like me to switch to Razorpay instead?

---

## Current Status

**App Status:**
- ✅ Authentication working (Google & GitHub)
- ✅ Script generation working
- ✅ UI/UX complete
- ❌ Payments not working (Dodo API unreachable)

**What Works:**
- All features except actual payment processing
- Pricing updated to $2.99 USD
- Payment flow UI ready

**What's Needed:**
- Correct Dodo API endpoint OR
- Switch to Razorpay/Stripe

