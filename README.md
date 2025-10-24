# OneClick Script Writer

An AI-powered web application that instantly turns YouTube video ideas into complete, engaging scripts. Built with Next.js 14, TypeScript, and OpenAI's GPT-4.

## 🚀 Features

- **AI-Powered Script Generation**: Uses GPT-4 to create professional YouTube scripts
- **Multiple Tones**: Educational, Funny, Dramatic, Motivational
- **Flexible Lengths**: Short (30 sec), Medium (1-3 min), Long (8-10 min)
- **Free Tier**: 3 scripts per day for free users
- **Subscription Model**: ₹99/month for unlimited access
- **Modern UI**: Glassmorphism design with gradient backgrounds
- **Copy & Download**: Easy script export functionality

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **AI**: Google Gemini Pro API
- **Payments**: Dodo Payments integration
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yt-script-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Google Gemini API Key
   GOOGLE_API_KEY=your_google_api_key_here
   
   # OAuth Providers
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   GITHUB_CLIENT_ID=your_github_client_id_here
   GITHUB_CLIENT_SECRET=your_github_client_secret_here
   
   # Dodo Payments (Mock Implementation)
   DODO_PAYMENTS_API_KEY=your_dodo_api_key_here
   DODO_PAYMENTS_WEBHOOK_SECRET=your_dodo_webhook_secret_here
   DODO_PAYMENTS_ENVIRONMENT=test_mode
   
   # Next.js
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Google Gemini Setup
1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env.local` file as `GOOGLE_API_KEY`

### OAuth Setup
1. **Google OAuth:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

2. **GitHub OAuth:**
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create a new OAuth App
   - Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### Dodo Payments Setup

This app supports both test mode (mock payments) and live mode (real payments).

**For Development/Testing:**
1. Set `DODO_PAYMENTS_ENVIRONMENT=test_mode` in `.env.local`
2. App will use mock payment processing
3. No real payments will be processed

**For Production (Live Payments):**
1. Create a Dodo Payments account at [dodopayments.com](https://dodopayments.com)
2. Get your **LIVE API key** from the Dodo Payments Dashboard
3. Get your **Webhook Secret** from webhook settings
4. Update `.env.local`:
   ```env
   DODO_PAYMENTS_API_KEY=your_live_api_key
   DODO_PAYMENTS_WEBHOOK_SECRET=your_webhook_secret
   DODO_PAYMENTS_ENVIRONMENT=live_mode  # Change to live_mode!
   ```
5. Configure webhook URL in Dodo Dashboard: `https://yourdomain.com/api/webhooks/dodo`
6. Test the integration before going live

📖 **Full deployment guide**: See [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy with Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

### Environment Variables for Production
Make sure to add these in your Vercel dashboard:
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXTAUTH_URL` (your production URL)
- `NEXTAUTH_SECRET`

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── generateScript/
│   │   └── create-checkout/
│   ├── success/
│   ├── cancel/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ScriptCard.tsx
│   └── LimitModal.tsx
├── lib/
│   ├── openai.ts
│   ├── stripe.ts
│   └── utils.ts
└── README.md
```

## 🎯 Usage

1. **Enter your video topic** in the input field
2. **Choose tone** (Educational, Funny, Dramatic, Motivational)
3. **Select length** (Short, Medium, Long)
4. **Click "Generate Script"** to create your script
5. **Copy or download** the generated script

## 💳 Pricing

- **Free**: 3 scripts per day
- **Unlimited**: ₹99/month for unlimited access

## 🔒 Security

- API keys are stored securely in environment variables
- Stripe handles all payment processing securely
- User data is stored locally (localStorage) for usage tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact support at support@oneclickscriptwriter.com

## 🎉 Acknowledgments

- Google for the Gemini Pro API
- Dodo Payments for payment processing
- Vercel for hosting
- Next.js team for the amazing framework
