import axios from 'axios'

// Dodo Payments API Configuration
const DODO_API_BASE = 'https://api.dodopayments.com'
export const PLAN_AMOUNT = 9900 // ₹99 in paise (99.00 INR)

interface CreatePaymentResponse {
  paymentId: string
  paymentUrl: string
  amount: number
  currency: string
}

export async function createDodoPayment(customerEmail?: string): Promise<CreatePaymentResponse> {
  try {
    const apiKey = process.env.DODO_PAYMENTS_API_KEY
    const environment = process.env.DODO_PAYMENTS_ENVIRONMENT || 'test_mode'
    
    // If no API key or in test mode, use mock implementation
    if (!apiKey || environment === 'test_mode') {
      console.log('Using mock Dodo Payments (test mode)')
      const mockPaymentId = `dodo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        paymentId: mockPaymentId,
        paymentUrl: `${process.env.NEXTAUTH_URL}/mock-payment?payment_id=${mockPaymentId}`,
        amount: PLAN_AMOUNT,
        currency: 'INR'
      }
    }
    
    // Real Dodo Payments API call for live mode
    console.log('Creating real Dodo Payments checkout session')
    
    const response = await axios.post(
      `${DODO_API_BASE}/v1/checkout/sessions`,
      {
        amount: PLAN_AMOUNT,
        currency: 'INR',
        description: 'OneClick Script Writer - Unlimited Plan',
        customer_email: customerEmail || 'customer@example.com',
        metadata: {
          plan: 'unlimited_monthly',
          product: 'script_writer_unlimited',
          subscription: 'monthly'
        },
        success_url: `${process.env.NEXTAUTH_URL}/success?payment_id={PAYMENT_ID}`,
        cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
        payment_methods: ['card', 'upi', 'netbanking', 'wallet']
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return {
      paymentId: response.data.id || response.data.payment_id,
      paymentUrl: response.data.url || response.data.checkout_url,
      amount: response.data.amount,
      currency: response.data.currency
    }
  } catch (error) {
    console.error('Dodo Payments error:', error)
    if (axios.isAxiosError(error)) {
      console.error('API Response:', error.response?.data)
    }
    throw new Error('Failed to create Dodo payment')
  }
}

export async function verifyDodoPayment(paymentId: string): Promise<boolean> {
  try {
    const apiKey = process.env.DODO_PAYMENTS_API_KEY
    const environment = process.env.DODO_PAYMENTS_ENVIRONMENT || 'test_mode'
    
    // If no API key or in test mode, use mock verification
    if (!apiKey || environment === 'test_mode') {
      console.log(`Verifying mock payment: ${paymentId}`)
      await new Promise(resolve => setTimeout(resolve, 500))
      return true
    }
    
    // Real Dodo Payments API verification
    console.log(`Verifying real payment: ${paymentId}`)
    
    const response = await axios.get(
      `${DODO_API_BASE}/v1/payments/${paymentId}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      }
    )

    return response.data.status === 'completed' || response.data.status === 'succeeded'
  } catch (error) {
    console.error('Payment verification error:', error)
    return false
  }
}
