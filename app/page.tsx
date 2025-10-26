'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScriptCard from '@/components/ScriptCard'
import LimitModal from '@/components/LimitModal'
import { getScriptUsage, incrementScriptUsage, hasReachedLimit } from '@/lib/utils'
import { Loader2, Sparkles, Zap, Users, TrendingUp, LogIn } from 'lucide-react'

interface GeneratedScript {
  script: string
  topic: string
  tone: string
  length: string
}

export default function Home() {
  const { data: session, status } = useSession()
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('Educational')
  const [length, setLength] = useState('Medium: 1–3 min')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedScript, setGeneratedScript] = useState<GeneratedScript | null>(null)
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [usage, setUsage] = useState({ count: 0, date: '' })
  const [isUpgrading, setIsUpgrading] = useState(false)

  useEffect(() => {
    setUsage(getScriptUsage())
  }, [])

  const handleGenerate = async () => {
    if (!topic.trim()) return

    if (hasReachedLimit()) {
      setShowLimitModal(true)
      return
    }

    setIsGenerating(true)
    setGeneratedScript(null)

    try {
      const response = await fetch('/api/generateScript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, tone, length }),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedScript({
          script: data.script,
          topic,
          tone,
          length
        })
        incrementScriptUsage()
        setUsage(getScriptUsage())
      } else {
        alert(data.error || 'Failed to generate script')
      }
    } catch (error) {
      console.error('Error generating script:', error)
      alert('Failed to generate script. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleUpgrade = async () => {
    console.log('Upgrade button clicked')
    
    // If not logged in, redirect to login
    if (!session) {
      console.log('User not logged in, redirecting to signin')
      window.location.href = '/api/auth/signin'
      return
    }

    setIsUpgrading(true)
    console.log('Creating payment session...')

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.user?.email || '' }),
      })

      const data = await response.json()
      console.log('Payment response:', data)
      
      if (data.paymentUrl) {
        console.log('Redirecting to payment page:', data.paymentUrl)
        window.location.href = data.paymentUrl
      } else {
        console.error('No payment URL in response:', data)
        alert('Failed to create payment session')
        setIsUpgrading(false)
      }
    } catch (error) {
      console.error('Error creating checkout:', error)
      alert('Failed to start checkout process')
      setIsUpgrading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {session && (
              <div className="mb-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 inline-block">
                  <p className="text-white text-lg">
                    Welcome back, <span className="font-semibold">{session.user?.name || session.user?.email}</span>! 👋
                  </p>
                </div>
              </div>
            )}
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Turn your video idea into a{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                viral YouTube script
              </span>{' '}
              in seconds
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              AI-powered script generation that creates engaging, story-driven content 
              that captivates your audience and drives views.
            </p>
            <button
              onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {session ? 'Generate Script' : 'Try Free'}
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Why Choose OneClick Script Writer?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
                <div className="bg-blue-500/20 p-4 rounded-xl w-fit mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">AI-Powered</h3>
                <p className="text-gray-300">
                  Advanced AI creates compelling scripts that follow proven YouTube storytelling frameworks.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
                <div className="bg-green-500/20 p-4 rounded-xl w-fit mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
                <p className="text-gray-300">
                  Generate professional scripts in seconds, not hours. Focus on creating, not writing.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
                <div className="bg-purple-500/20 p-4 rounded-xl w-fit mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Proven Results</h3>
                <p className="text-gray-300">
                  Scripts designed to maximize engagement, retention, and viral potential.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Script Generator Section */}
        <section id="generator" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Generate Your Script
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Enter your video topic or idea
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., How to start a successful YouTube channel"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Tone</label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Educational">Educational</option>
                      <option value="Funny">Funny</option>
                      <option value="Dramatic">Dramatic</option>
                      <option value="Motivational">Motivational</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Length</label>
                    <select
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Short: 30 sec">Short: 30 sec</option>
                      <option value="Medium: 1–3 min">Medium: 1–3 min</option>
                      <option value="Long: 8–10 min">Long: 8–10 min</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                  <div className="text-white">
                    <span className="font-medium">
                      {session ? 'Scripts Today:' : 'Free Scripts Today:'}
                    </span>
                    <span className="ml-2 text-blue-300">
                      {session ? `${usage.count}/10` : `${usage.count}/3`}
                    </span>
                  </div>
                  {!session && usage.count >= 3 && (
                    <button
                      onClick={() => setShowLimitModal(true)}
                      className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                    >
                      Login for more
                    </button>
                  )}
                  {session && usage.count >= 10 && (
                    <button
                      onClick={() => setShowLimitModal(true)}
                      className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                    >
                      Upgrade for unlimited
                    </button>
                  )}
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim() || hasReachedLimit()}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Generating Script...</span>
                    </>
                  ) : (
                    <span>Generate Script</span>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Script Display */}
            {generatedScript && (
              <div className="mt-8">
                <ScriptCard
                  script={generatedScript.script}
                  topic={generatedScript.topic}
                  tone={generatedScript.tone}
                  length={generatedScript.length}
                />
              </div>
            )}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Simple, Transparent Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Free</h3>
                <div className="text-4xl font-bold text-white mb-4">₹0</div>
                <ul className="space-y-3 text-gray-300 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    3 scripts per day
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    All AI models
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Copy & download
                  </li>
                </ul>
                <button className="w-full bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-colors">
                  Current Plan
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-purple-600 border border-white/20 rounded-2xl p-8 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Unlimited</h3>
                <div className="text-4xl font-bold text-white mb-4">$2.99<span className="text-lg">/month</span></div>
                <ul className="space-y-3 text-gray-200 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Unlimited scripts
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    All AI models
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Advanced features
                  </li>
                </ul>
                <button
                  onClick={handleUpgrade}
                  disabled={isUpgrading}
                  className="w-full bg-white text-blue-600 hover:bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  {isUpgrading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Upgrade Now</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Limit Modal */}
      <LimitModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        onUpgrade={handleUpgrade}
        isAuthenticated={!!session}
      />
    </div>
  )
}
