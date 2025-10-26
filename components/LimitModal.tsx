'use client'

import { useState } from 'react'
import { X, Zap, CreditCard } from 'lucide-react'
import DodoPayment from './DodoPayment'

interface LimitModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: () => void
  isAuthenticated?: boolean
}

export default function LimitModal({ isOpen, onClose, onUpgrade, isAuthenticated = false }: LimitModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border-2 border-yellow-500/50 rounded-2xl p-8 max-w-md w-full shadow-[0_0_60px_rgba(234,179,8,0.4)] animate-fade-in-up">
        {/* Corner accent lights */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-yellow-400 rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-400 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-fuchsia-400 rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-yellow-400 rounded-br-2xl"></div>
        
        {/* Animated glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/20 via-cyan-500/20 to-fuchsia-500/20 opacity-50 blur-xl animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="relative bg-gradient-to-r from-yellow-500/30 to-yellow-600/30 p-3 rounded-lg shadow-[0_0_20px_rgba(234,179,8,0.5)]">
                <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold font-mono">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-fuchsia-400">
                  {isAuthenticated ? '[UPGRADE]' : '[LOGIN]'}
                </span>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="group text-gray-400 hover:text-yellow-400 transition-all duration-300 p-2 hover:bg-yellow-900/20 rounded-lg border-2 border-transparent hover:border-yellow-500/50"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-900/20 to-cyan-900/20 border-2 border-yellow-500/30 rounded-xl p-4">
              <p className="text-gray-200 leading-relaxed font-mono text-sm">
                {isAuthenticated 
                  ? ">> LIMIT_REACHED: You've maxed out your daily quota. Upgrade to [UNLIMITED] mode for infinite script generation!"
                  : ">> FREE_LIMIT_EXCEEDED: Daily limit reached. [LOGIN] for 10 scripts/day or [UPGRADE] for unlimited access!"
                }
              </p>
            </div>

            <div className="relative bg-gradient-to-r from-cyan-900/30 to-fuchsia-900/30 border-2 border-cyan-500/50 rounded-xl p-5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 opacity-50"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h3 className="text-cyan-400 font-bold font-mono mb-1">
                    {isAuthenticated ? '[UNLIMITED_PLAN]' : '[LOGIN_BENEFITS]'}
                  </h3>
                  <p className="text-gray-300 text-sm font-mono">
                    {isAuthenticated 
                      ? '∞ Unlimited scripts'
                      : '10 scripts/day + features'
                    }
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black font-mono">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-fuchsia-400 to-cyan-400 animate-gradient-x">
                      {isAuthenticated ? '$2.99' : 'FREE'}
                    </span>
                  </div>
                  <div className="text-gray-400 text-xs font-mono">
                    {isAuthenticated ? '/month' : 'with login'}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {isAuthenticated ? (
                <DodoPayment
                  onSuccess={() => {
                    onUpgrade()
                    onClose()
                  }}
                  onError={(error) => {
                    console.error('Payment error:', error)
                  }}
                />
              ) : (
                <button
                  onClick={onUpgrade}
                  className="group relative w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-white px-6 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:shadow-[0_0_40px_rgba(6,182,212,1)] font-mono font-bold overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CreditCard className="h-5 w-5 relative z-10 animate-pulse" />
                  <span className="relative z-10">&gt;&gt; LOGIN_NOW</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="w-full text-gray-400 hover:text-yellow-400 transition-all duration-300 py-3 font-mono font-bold border-2 border-gray-700 hover:border-yellow-500/50 rounded-lg hover:bg-yellow-900/10"
              >
                [CANCEL]
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
