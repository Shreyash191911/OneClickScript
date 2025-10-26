'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CreditCard, CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function MockPaymentPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [paymentId, setPaymentId] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const paymentId = searchParams.get('payment_id')
    if (paymentId) {
      setPaymentId(paymentId)
      
      // Simulate payment processing
      setTimeout(() => {
        // Simulate 90% success rate for demo
        const isSuccess = Math.random() > 0.1
        setStatus(isSuccess ? 'success' : 'failed')
      }, 2000)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        {status === 'loading' && (
          <>
            <div className="mb-6">
              <Loader2 className="h-16 w-16 text-blue-400 mx-auto mb-4 animate-spin" />
              <h1 className="text-3xl font-bold text-white mb-2">Processing Payment</h1>
              <p className="text-gray-300">
                Please wait while we process your payment...
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-300">
                Payment ID: <span className="font-mono text-white">{paymentId}</span>
              </p>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
              <p className="text-gray-300">
                Your payment has been processed successfully. You now have unlimited access to generate scripts!
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-300">
                Payment ID: <span className="font-mono text-white">{paymentId}</span>
              </p>
              <p className="text-sm text-gray-300 mt-2">
                Amount: <span className="font-semibold text-white">$2.99 USD</span>
              </p>
            </div>
            <Link
              href="/success"
              className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <span>Continue to App</span>
            </Link>
          </>
        )}

        {status === 'failed' && (
          <>
            <div className="mb-6">
              <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">Payment Failed</h1>
              <p className="text-gray-300">
                We couldn't process your payment. Please try again or contact support.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-300">
                Payment ID: <span className="font-mono text-white">{paymentId}</span>
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/cancel"
                className="block w-full text-gray-300 hover:text-white transition-colors py-2"
              >
                Cancel Payment
              </Link>
            </div>
          </>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            This is a mock payment page for development and testing purposes.
          </p>
        </div>
      </div>
    </div>
  )
}
