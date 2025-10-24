#!/bin/bash

echo "🎬 OneClick Script Writer - Installation Script"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOL
# Google Gemini API Key
GOOGLE_API_KEY=your_google_api_key_here

# Stripe Keys
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
EOL
    echo "✅ Created .env.local file"
    echo "⚠️  Please update the environment variables in .env.local"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🎉 Installation complete!"
echo ""
echo "Next steps:"
echo "1. Update your environment variables in .env.local"
echo "2. Get your Google API key from: https://makersuite.google.com/app/apikey"
echo "3. Set up Stripe account at: https://stripe.com"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "Happy coding! 🚀"
