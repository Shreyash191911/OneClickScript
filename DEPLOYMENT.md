# 🚀 Deployment Guide

## Quick Deploy to Vercel

### 1. Prepare Your Repository
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: OneClick Script Writer"

# Push to GitHub
git remote add origin https://github.com/yourusername/oneclick-script-writer.git
git push -u origin main
```

### 2. Deploy with Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Import your repository**
5. **Configure environment variables:**

   | Variable | Description | Example |
   |----------|-------------|---------|
   | `OPENAI_API_KEY` | Your OpenAI API key | `sk-...` |
   | `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` |
   | `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_...` |
   | `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` |
   | `NEXTAUTH_URL` | Your production URL | `https://your-app.vercel.app` |
   | `NEXTAUTH_SECRET` | Random secret string | `your-secret-here` |

6. **Click "Deploy"**

### 3. Configure Stripe

1. **Create a product in Stripe Dashboard**
2. **Set price to ₹99/month**
3. **Update `PRICE_ID` in `lib/stripe.ts`**
4. **Set up webhooks for payment success**

### 4. Test Your Deployment

1. **Visit your deployed URL**
2. **Test script generation**
3. **Test payment flow**
4. **Verify all features work**

## Alternative Deployment Options

### Netlify
```bash
# Build the project
npm run build

# Deploy to Netlify
npx netlify deploy --prod --dir=out
```

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## Environment Variables Reference

### Required for Production
- `OPENAI_API_KEY`: Your OpenAI API key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `NEXTAUTH_URL`: Your production domain
- `NEXTAUTH_SECRET`: Random secret for NextAuth

### Optional
- `STRIPE_WEBHOOK_SECRET`: For webhook verification
- `NODE_ENV`: Set to "production"

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Stripe products and prices created
- [ ] Domain configured (if using custom domain)
- [ ] SSL certificate active
- [ ] Analytics tracking set up
- [ ] Error monitoring configured
- [ ] Performance monitoring active

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check all environment variables are set
   - Verify package.json dependencies
   - Check TypeScript errors

2. **API Errors**
   - Verify OpenAI API key is valid
   - Check Stripe keys are correct
   - Ensure API routes are accessible

3. **Payment Issues**
   - Verify Stripe webhook endpoints
   - Check price IDs are correct
   - Test with Stripe test mode first

### Getting Help

- Check the [Issues](https://github.com/your-repo/issues) page
- Review Vercel deployment logs
- Check Stripe Dashboard for payment issues
- Verify OpenAI API usage and limits

## Performance Optimization

1. **Enable Vercel Analytics**
2. **Set up caching for API routes**
3. **Optimize images and assets**
4. **Monitor Core Web Vitals**
5. **Set up CDN for global performance**

Happy deploying! 🚀


