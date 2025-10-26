import axios from 'axios'

// Dodo Payments API Configuration
// Official API endpoints from https://docs.dodopayments.com/api-reference/introduction
const DODO_API_BASE_URL = process.env.DODO_PAYMENTS_ENVIRONMENT === 'test_mode' 
  ? 'https://test.dodopayments.com'
  : 'https://live.dodopayments.com'

export const PLAN_AMOUNT = 299 // $2.99 in cents (USD)

interface CreatePaymentResponse {
  paymentId: string
  paymentUrl: string
  amount: number
  currency: string
}

export async function createDodoPayment(customerEmail?: string): Promise<CreatePaymentResponse> {
  const apiKey = process.env.DODO_PAYMENTS_API_KEY
  const email = customerEmail || 'customer@example.com'
  
  // Validate API key
  if (!apiKey || apiKey.length < 20) {
    throw new Error('Invalid Dodo Payments API key. Please configure DODO_PAYMENTS_API_KEY in environment variables.')
  }
  
  console.log('=== Creating Dodo Payments Checkout Session ===')
  console.log('API Base URL:', DODO_API_BASE_URL)
  console.log('Amount: $2.99 USD (299 cents)')
  console.log('Customer:', email)
  
  try {
    // Create checkout session according to Dodo Payments API docs
    // https://docs.dodopayments.com/api-reference/checkout-sessions/create-checkout-session
    const response = await axios.post(
      `${DODO_API_BASE_URL}/v1/checkout-sessions`,
      {
        amount: PLAN_AMOUNT,
        currency: 'USD',
        payment_link_id: null, // Not using a pre-created payment link
        customer_email: email,
        success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
        metadata: {
          plan: 'unlimited_monthly',
          product: 'OneClick Script Writer',
          subscription_type: 'monthly'
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 20000
      }
    )
    
    console.log('✅ Checkout session created successfully!')
    console.log('Session ID:', response.data.id || response.data.checkout_session_id)
    console.log('Payment URL:', response.data.payment_link)
    
    return {
      paymentId: response.data.id || response.data.checkout_session_id,
      paymentUrl: response.data.payment_link,
      amount: PLAN_AMOUNT,
      currency: 'USD'
    }
  } catch (error) {
    console.error('❌ Dodo Payments API Error:')
    
    if (axios.isAxiosError(error)) {
      console.error('Status:', error.response?.status)
      console.error('Status Text:', error.response?.statusText)
      console.error('Error Data:', JSON.stringify(error.response?.data, null, 2))
      console.error('Request URL:', error.config?.url)
      
      // Provide helpful error messages
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your DODO_PAYMENTS_API_KEY environment variable.')
      } else if (error.response?.status === 404) {
        throw new Error('API endpoint not found. Please verify you are using the correct Dodo Payments environment (test/live).')
      } else if (error.response?.data) {
        throw new Error(`Dodo Payments API error: ${JSON.stringify(error.response.data)}`)
      }
    }
    
    console.error('Full error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    throw new Error(`Failed to create Dodo payment: ${errorMessage}`)
  }
}

export async function verifyDodoPayment(sessionId: string): Promise<boolean> {
  try {
    const apiKey = process.env.DODO_PAYMENTS_API_KEY
    
    if (!apiKey) {
      console.log(`Mock verification for session: ${sessionId}`)
      return true
    }
    
    console.log(`Verifying Dodo payment session: ${sessionId}`)
    
    // Get checkout session details to verify payment
    // https://docs.dodopayments.com/api-reference/checkout-sessions
    const response = await axios.get(
      `${DODO_API_BASE_URL}/v1/checkout-sessions/${sessionId}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json'
        }
      }
    )

    console.log('Payment verification response:', response.data)
    
    // Check if payment was successful
    const status = response.data.status || response.data.payment_status
    return status === 'completed' || status === 'succeeded' || status === 'paid'
  } catch (error) {
    console.error('Payment verification error:', error)
    if (axios.isAxiosError(error)) {
      console.error('Verification error details:', error.response?.data)
    }
    return false
  }
}
