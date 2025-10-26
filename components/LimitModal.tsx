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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-500/20 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {isAuthenticated ? 'Upgrade Required' : 'Login Required'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-300">
            {isAuthenticated 
              ? "You've reached your limit of 10 scripts per day. Upgrade to unlimited access and create as many scripts as you want!"
              : "You've reached your free limit of 3 scripts per day. Login to get 10 scripts per day, or upgrade for unlimited access!"
            }
          </p>

          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">
                  {isAuthenticated ? 'Unlimited Plan' : 'Login Benefits'}
                </h3>
                <p className="text-gray-300 text-sm">
                  {isAuthenticated 
                    ? 'Generate unlimited scripts'
                    : 'Get 10 scripts per day + more features'
                  }
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {isAuthenticated ? '$2.99' : 'Free'}
                </div>
                <div className="text-gray-300 text-sm">
                  {isAuthenticated ? 'per month' : 'with login'}
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
                  // You could show a toast notification here
                }}
              />
            ) : (
              <button
                onClick={onUpgrade}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                <CreditCard className="h-5 w-5" />
                <span>Login Now</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full text-gray-300 hover:text-white transition-colors py-2"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
