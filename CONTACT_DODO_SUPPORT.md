# 🆘 Contact Dodo Payments Support - Urgent API Help Needed

## Issue Summary

We're trying to integrate Dodo Payments but getting **404 Not Found** errors on all API endpoints.

## What We've Tried

According to your documentation at https://docs.dodopayments.com/api-reference/introduction:
- Base URL: `https://live.dodopayments.com` ✅ (This works!)
- Base URL: `https://test.dodopayments.com` ✅ (For testing)

But ALL these endpoints return **404**:
- ❌ `POST /v1/checkout-sessions`
- ❌ `POST /v1/payments`
- ❌ `POST /checkout-sessions`
- ❌ `POST /payments`

## Our Setup

**API Key**: `i62Llmfwhsec_ub8BICyZbN5PmcEgcXV3nTpax1xPT4Wn` (Live mode)
**Webhook**: Already configured and working
**Authorization**: `Bearer {API_KEY}` format

## Request Details

```bash
curl -X POST https://live.dodopayments.com/v1/checkout-sessions \
  -H "Authorization: Bearer i62Llmfwhsec_ub8BICyZbN5PmcEgcXV3nTpax1xPT4Wn" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "amount": 299,
    "currency": "USD",
    "customer_email": "customer@example.com",
    "success_url": "https://myapp.com/success?session_id={CHECKOUT_SESSION_ID}",
    "cancel_url": "https://myapp.com/cancel"
  }'
```

**Response**: `404 Not Found`

## Questions for Support

1. **What is the EXACT endpoint path for creating checkout sessions?**
   - Is it `/v1/checkout-sessions`, `/v1/payments`, or something else?

2. **Are there any additional headers required?**
   - We're using: Authorization, Content-Type, Accept

3. **Do we need to create a "Product" first in the dashboard?**
   - Or can we create one-time payments directly?

4. **Is there a Postman collection or example curl command that works?**

5. **Should we use your TypeScript SDK instead of direct API calls?**
   - Link: https://docs.dodopayments.com/developer-resources/dodo-payments-sdks

## How to Contact Support

### Option 1: Dodo Dashboard
1. Go to: https://app.dodopayments.com
2. Look for "Support" or "Help" button
3. Open a ticket with these details

### Option 2: Discord Community
Join the Dodo Payments Discord community for developer support

### Option 3: Email
Look for support email on the website

### Option 4: Documentation Issue
If the docs are incorrect, report it so others don't have the same problem!

## What We Need

**URGENT**: The exact, working API endpoint path for creating payment checkout sessions.

Our production app is ready to go live - we just need the correct API endpoint!

## Temporary Workaround

In the meantime, we've implemented:
1. Code that tries multiple endpoint variations
2. Detailed logging of all attempts and responses
3. The app will work as soon as the correct endpoint is found

## Thank You!

We love Dodo Payments and want to use your service. Please help us get unstuck so we can start processing payments!

---

**Project**: OneClick Script Writer (YouTube script generator)
**Tech Stack**: Next.js 14, TypeScript, Vercel
**Expected Usage**: $2.99 one-time payments
**Ready to Launch**: Just need working API endpoint!

