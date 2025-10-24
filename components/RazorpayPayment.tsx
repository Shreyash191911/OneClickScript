'use client'

import { useState } from 'react'
import { CreditCard, Loader2 } from 'lucide-react'

interface DodoPaymentProps {
  onSuccess: () => void
  onError: (error: string) => void
}

export default function DodoPayment({ onSuccess, onError }: DodoPaymentProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)
    
    try {
      // Create Dodo payment
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: '' }),
      })

      const paymentData = await response.json()

      if (!response.ok) {
        throw new Error(paymentData.error || 'Failed to create payment')
      }

      // Redirect to Dodo payment page
      window.location.href = paymentData.paymentUrl

    } catch (error) {
      console.error('Payment error:', error)
      onError(error instanceof Error ? error.message : 'Payment failed')
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors font-medium"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <CreditCard className="h-5 w-5" />
          <span>Pay ₹99 with Dodo Payments</span>
        </>
      )}
    </button>
  )
}
