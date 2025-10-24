'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function SuccessPage() {
  const [paymentId, setPaymentId] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('payment_id') || urlParams.get('paymentId')
    if (id) setPaymentId(id)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-gray-300">
            Welcome to OneClick Script Writer! You now have unlimited access to generate scripts.
          </p>
        </div>

        {paymentId && (
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-300">
              Payment ID: <span className="font-mono text-white">{paymentId}</span>
            </p>
          </div>
        )}

        <Link
          href="/"
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <span>Start Creating Scripts</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}
