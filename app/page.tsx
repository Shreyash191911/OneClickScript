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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Cyberpunk animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]"></div>
        {/* Neon glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[128px] animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-[128px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              {session && (
                <div className="mb-6 animate-fade-in">
                  <div className="bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 backdrop-blur-xl border border-cyan-500/50 rounded-xl p-4 inline-block shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all duration-300">
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-lg font-bold">
                      Welcome back, <span className="text-yellow-400">{session.user?.name || session.user?.email}</span>! ⚡
                    </p>
                  </div>
                </div>
              )}
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-yellow-400 animate-gradient-x drop-shadow-[0_0_30px_rgba(6,182,212,0.8)]">
                  GENERATE
                </span>
                <br />
                <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                  YouTube Scripts
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-fuchsia-400 to-cyan-400 animate-gradient-x">
                  IN SECONDS
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-100 leading-relaxed">
                <span className="text-cyan-400 font-semibold">AI-powered</span> script generation with 
                <span className="text-fuchsia-400 font-semibold"> neural networks</span> that creates 
                <span className="text-yellow-400 font-semibold"> viral content</span>
              </p>
              <button
                onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-white px-10 py-5 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-110 shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_40px_rgba(6,182,212,1)] animate-fade-in-up delay-200"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Zap className="h-5 w-5 animate-pulse" />
                  <span>{session ? 'START GENERATING' : 'TRY FOR FREE'}</span>
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 to-fuchsia-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                PREMIUM FEATURES
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative bg-gradient-to-br from-cyan-900/20 to-cyan-500/5 backdrop-blur-xl border border-cyan-500/50 rounded-2xl p-8 text-center hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 p-4 rounded-xl w-fit mx-auto mb-4 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                    <Sparkles className="h-8 w-8 text-cyan-400 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">NEURAL AI</h3>
                  <p className="text-gray-300">
                    Advanced neural networks create <span className="text-cyan-400">viral scripts</span> that maximize engagement
                  </p>
                </div>
              </div>
              <div className="group relative bg-gradient-to-br from-fuchsia-900/20 to-fuchsia-500/5 backdrop-blur-xl border border-fuchsia-500/50 rounded-2xl p-8 text-center hover:border-fuchsia-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-fuchsia-500/30 to-fuchsia-600/30 p-4 rounded-xl w-fit mx-auto mb-4 shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                    <Zap className="h-8 w-8 text-fuchsia-400 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-fuchsia-400 mb-3">ULTRA FAST</h3>
                  <p className="text-gray-300">
                    Generate <span className="text-fuchsia-400">professional scripts</span> in seconds with quantum processing
                  </p>
                </div>
              </div>
              <div className="group relative bg-gradient-to-br from-yellow-900/20 to-yellow-500/5 backdrop-blur-xl border border-yellow-500/50 rounded-2xl p-8 text-center hover:border-yellow-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-yellow-500/30 to-yellow-600/30 p-4 rounded-xl w-fit mx-auto mb-4 shadow-[0_0_20px_rgba(234,179,8,0.5)]">
                    <TrendingUp className="h-8 w-8 text-yellow-400 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">VIRAL BOOST</h3>
                  <p className="text-gray-300">
                    Algorithms designed to <span className="text-yellow-400">maximize views</span> and viral potential
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Script Generator Section */}
        <section id="generator" className="py-16 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border-2 border-cyan-500/50 rounded-2xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.3)] hover:shadow-[0_0_80px_rgba(6,182,212,0.5)] transition-all duration-500">
              {/* Corner accent lights */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400 rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-fuchsia-400 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-yellow-400 rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-400 rounded-br-2xl"></div>
              
              <h2 className="text-4xl font-bold text-center mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 animate-gradient-x">
                  // GENERATE_SCRIPT.EXE
                </span>
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-cyan-400 font-bold mb-2 text-sm uppercase tracking-wider">
                    &gt; VIDEO_TOPIC.input
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter your topic..."
                    className="w-full px-4 py-4 bg-black/50 border-2 border-cyan-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300 font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-fuchsia-400 font-bold mb-2 text-sm uppercase tracking-wider">
                      &gt; TONE.select
                    </label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full px-4 py-4 bg-black/50 border-2 border-fuchsia-500/50 rounded-lg text-white focus:outline-none focus:border-fuchsia-400 focus:shadow-[0_0_20px_rgba(217,70,239,0.5)] transition-all duration-300 font-mono"
                    >
                      <option value="Educational" className="bg-gray-900">Educational</option>
                      <option value="Funny" className="bg-gray-900">Funny</option>
                      <option value="Dramatic" className="bg-gray-900">Dramatic</option>
                      <option value="Motivational" className="bg-gray-900">Motivational</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-yellow-400 font-bold mb-2 text-sm uppercase tracking-wider">
                      &gt; LENGTH.select
                    </label>
                    <select
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full px-4 py-4 bg-black/50 border-2 border-yellow-500/50 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all duration-300 font-mono"
                    >
                      <option value="Short: 30 sec" className="bg-gray-900">Short: 30 sec</option>
                      <option value="Medium: 1–3 min" className="bg-gray-900">Medium: 1–3 min</option>
                      <option value="Long: 8–10 min" className="bg-gray-900">Long: 8–10 min</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-gradient-to-r from-cyan-900/20 to-fuchsia-900/20 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-white font-mono">
                    <span className="text-cyan-400 font-bold">
                      {session ? '[AUTHENTICATED]' : '[FREE_MODE]'}
                    </span>
                    <span className="ml-3 text-yellow-400 font-bold">
                      {session ? `${usage.count}/10` : `${usage.count}/3`}
                    </span>
                    <span className="ml-1 text-gray-400">scripts</span>
                  </div>
                  {!session && usage.count >= 3 && (
                    <button
                      onClick={() => setShowLimitModal(true)}
                      className="text-yellow-400 hover:text-yellow-300 text-sm font-bold uppercase tracking-wider hover:shadow-[0_0_10px_rgba(234,179,8,0.5)] transition-all"
                    >
                      [LOGIN]
                    </button>
                  )}
                  {session && usage.count >= 10 && (
                    <button
                      onClick={() => setShowLimitModal(true)}
                      className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-bold uppercase tracking-wider hover:shadow-[0_0_10px_rgba(217,70,239,0.5)] transition-all"
                    >
                      [UPGRADE]
                    </button>
                  )}
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim() || hasReachedLimit()}
                  className="group relative w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-5 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] flex items-center justify-center space-x-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin relative z-10" />
                      <span className="relative z-10 font-mono">&gt;&gt; GENERATING_SCRIPT...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-6 w-6 relative z-10 group-hover:animate-pulse" />
                      <span className="relative z-10 font-mono">&gt;&gt; EXECUTE_GENERATION</span>
                    </>
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
        <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                // SELECT_YOUR_PLAN
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border-2 border-gray-600/50 rounded-2xl p-8 hover:border-gray-500 transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-400 mb-4 font-mono">[FREE_TIER]</h3>
                <div className="text-5xl font-bold text-gray-400 mb-6 font-mono">$0</div>
                <ul className="space-y-4 text-gray-300 mb-8">
                  <li className="flex items-center font-mono">
                    <span className="text-cyan-400 mr-3 text-xl">▸</span>
                    <span>3 scripts/day</span>
                  </li>
                  <li className="flex items-center font-mono">
                    <span className="text-cyan-400 mr-3 text-xl">▸</span>
                    <span>Neural AI access</span>
                  </li>
                  <li className="flex items-center font-mono">
                    <span className="text-cyan-400 mr-3 text-xl">▸</span>
                    <span>Basic features</span>
                  </li>
                </ul>
                <button className="w-full bg-gray-700/50 text-gray-400 px-6 py-4 rounded-lg font-mono font-bold cursor-not-allowed">
                  [CURRENT_PLAN]
                </button>
              </div>

              <div className="relative bg-gradient-to-br from-cyan-900/40 via-fuchsia-900/40 to-yellow-900/40 backdrop-blur-xl border-2 border-cyan-500/50 rounded-2xl p-8 hover:border-cyan-400 transition-all duration-500 shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] hover:-translate-y-2">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-yellow-400 to-fuchsia-500 text-black px-6 py-2 rounded-full text-sm font-bold font-mono shadow-[0_0_20px_rgba(234,179,8,0.8)] animate-pulse">
                    ⚡ PREMIUM ⚡
                  </span>
                </div>
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-yellow-500 opacity-20 blur-xl animate-pulse"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 mb-4 font-mono">[UNLIMITED]</h3>
                  <div className="text-5xl font-bold mb-2 font-mono">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-fuchsia-400 to-cyan-400 animate-gradient-x">
                      $2.99
                    </span>
                    <span className="text-lg text-gray-300">/mo</span>
                  </div>
                  <ul className="space-y-4 text-gray-200 mb-8">
                    <li className="flex items-center font-mono">
                      <span className="text-cyan-400 mr-3 text-xl">⚡</span>
                      <span className="text-white font-bold">∞ Unlimited scripts</span>
                    </li>
                    <li className="flex items-center font-mono">
                      <span className="text-fuchsia-400 mr-3 text-xl">⚡</span>
                      <span className="text-white font-bold">Full AI power</span>
                    </li>
                    <li className="flex items-center font-mono">
                      <span className="text-yellow-400 mr-3 text-xl">⚡</span>
                      <span className="text-white font-bold">Priority support</span>
                    </li>
                    <li className="flex items-center font-mono">
                      <span className="text-cyan-400 mr-3 text-xl">⚡</span>
                      <span className="text-white font-bold">Advanced features</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleUpgrade}
                    disabled={isUpgrading}
                    className="group relative w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg font-bold font-mono transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:shadow-[0_0_50px_rgba(6,182,212,1)] flex items-center justify-center space-x-2 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isUpgrading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin relative z-10" />
                        <span className="relative z-10">PROCESSING...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5 relative z-10 animate-pulse" />
                        <span className="relative z-10">&gt;&gt; UPGRADE_NOW</span>
                      </>
                    )}
                  </button>
                </div>
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
    </div>
  )
}

