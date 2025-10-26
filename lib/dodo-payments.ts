import axios from 'axios'

// Dodo Payments API Configuration
// Try multiple possible API endpoints
const DODO_API_ENDPOINTS = [
  'https://api.dodopayments.com',
  'https://app.dodopayments.com/api',
  'https://dodopayments.com/api'
]
export const PLAN_AMOUNT = 299 // $2.99 in cents (USD)

interface CreatePaymentResponse {
  paymentId: string
  paymentUrl: string
  amount: number
  currency: string
}

// Try to call Dodo API with different endpoints
async function tryDodoAPICall(apiKey: string, customerEmail: string, baseUrl: string): Promise<any> {
  console.log(`Trying Dodo API endpoint: ${baseUrl}`)
  
  const response = await axios.post(
    `${baseUrl}/v1/checkout/sessions`,
    {
      amount: PLAN_AMOUNT,
      currency: 'USD',
      description: 'OneClick Script Writer - Unlimited Plan',
      customer_email: customerEmail,
      metadata: {
        plan: 'unlimited_monthly',
        product: 'script_writer_unlimited',
        subscription: 'monthly'
      },
      success_url: `${process.env.NEXTAUTH_URL}/success?payment_id={PAYMENT_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
      payment_methods: ['card']
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 15000
    }
  )
  
  return response
}

export async function createDodoPayment(customerEmail?: string): Promise<CreatePaymentResponse> {
  const apiKey = process.env.DODO_PAYMENTS_API_KEY
  const email = customerEmail || 'customer@example.com'
  
  // Validate API key
  if (!apiKey || apiKey.length < 20) {
    throw new Error('Invalid Dodo Payments API key. Please configure DODO_PAYMENTS_API_KEY in environment variables.')
  }
  
  console.log('Creating real Dodo Payments checkout session')
  console.log('Amount: $2.99 USD (299 cents)')
  console.log('Customer:', email)
  
  // Try multiple API endpoints
  let lastError: any = null
  
  for (const endpoint of DODO_API_ENDPOINTS) {
    try {
      const response = await tryDodoAPICall(apiKey, email, endpoint)
      
      console.log(`✅ Success with endpoint: ${endpoint}`)
      console.log('Response data:', JSON.stringify(response.data, null, 2))
      
      return {
        paymentId: response.data.id || response.data.payment_id || response.data.session_id,
        paymentUrl: response.data.url || response.data.checkout_url || response.data.payment_url,
        amount: PLAN_AMOUNT,
        currency: 'USD'
      }
    } catch (error) {
      console.log(`❌ Failed with endpoint: ${endpoint}`)
      if (axios.isAxiosError(error)) {
        console.log('Status:', error.response?.status)
        console.log('Error data:', error.response?.data)
        console.log('Error message:', error.message)
      }
      lastError = error
      // Continue to try next endpoint
    }
  }
  
  // All endpoints failed
  console.error('All Dodo Payments API endpoints failed!')
  console.error('Last error:', lastError)
  
  throw new Error(`Failed to create Dodo payment. Please check your API key and contact Dodo Payments support. Error: ${lastError.message}`)
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
