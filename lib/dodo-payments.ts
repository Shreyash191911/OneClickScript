import DodoPayments from 'dodopayments'

// Dodo Payments SDK Configuration
// Official SDK: https://github.com/dodopayments/dodopayments-typescript
export const PLAN_AMOUNT = 299 // $2.99 in cents (USD)

// Initialize Dodo Payments client
function getDodoClient() {
  const apiKey = process.env.DODO_PAYMENTS_API_KEY
  
  if (!apiKey) {
    throw new Error('DODO_PAYMENTS_API_KEY is not configured')
  }
  
  // SDK environment values are 'test_mode' or 'live_mode'
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT === 'test_mode' ? 'test_mode' : 'live_mode'
  
  console.log('Initializing Dodo SDK with:')
  console.log('- Environment:', environment)
  console.log('- API Key prefix:', apiKey.substring(0, 10) + '...')
  console.log('- API Key length:', apiKey.length)
  
  return new DodoPayments({
    bearerToken: apiKey,
    environment: environment as 'test_mode' | 'live_mode'
  })
}

interface CreatePaymentResponse {
  paymentId: string
  paymentUrl: string
  amount: number
  currency: string
}

export async function createDodoPayment(customerEmail?: string): Promise<CreatePaymentResponse> {
  try {
    const client = getDodoClient()
    const email = customerEmail || 'customer@example.com'
    
    console.log('=== Creating Dodo Payments Checkout Session (using official SDK) ===')
    console.log('Environment:', process.env.DODO_PAYMENTS_ENVIRONMENT || 'live_mode')
    console.log('Amount: $2.99 USD (299 cents)')
    console.log('Customer:', email)
    
    // NOTE: Dodo Payments SDK requires a product_id from your dashboard
    // You need to create a product in your Dodo dashboard first
    // For now, we'll try to create a session and show helpful error if product is missing
    
    const productId = process.env.DODO_PRODUCT_ID
    
    if (!productId) {
      throw new Error(
        'DODO_PRODUCT_ID is not configured. Please create a product in your Dodo Payments dashboard ' +
        'and add the product ID to your environment variables.'
      )
    }
    
    // Create checkout session using official SDK
    // https://github.com/dodopayments/dodopayments-typescript
    const checkoutSession = await client.checkoutSessions.create({
      product_cart: [
        {
          product_id: productId,
          quantity: 1
        }
      ],
      customer: {
        email: email
      },
      return_url: `${process.env.NEXTAUTH_URL}/success`,
      metadata: {
        plan: 'unlimited_monthly',
        product: 'OneClick Script Writer'
      }
    })
    
    console.log('✅ Checkout session created successfully!')
    console.log('Session ID:', checkoutSession.session_id)
    console.log('Checkout URL:', checkoutSession.checkout_url)
    
    return {
      paymentId: checkoutSession.session_id,
      paymentUrl: checkoutSession.checkout_url,
      amount: PLAN_AMOUNT,
      currency: 'USD'
    }
    
  } catch (error) {
    console.error('❌ Dodo Payments SDK Error:')
    console.error('Full error:', error)
    
    // Handle SDK-specific errors
    if (error && typeof error === 'object' && 'status' in error) {
      const apiError = error as any
      console.error('Status:', apiError.status)
      console.error('Error body:', apiError.error)
      
      if (apiError.status === 401) {
        throw new Error('Invalid API key. Please check your DODO_PAYMENTS_API_KEY environment variable.')
      } else if (apiError.status === 404) {
        throw new Error('API endpoint not found. Please verify your Dodo Payments account is properly set up.')
      } else if (apiError.error) {
        throw new Error(`Dodo Payments error: ${JSON.stringify(apiError.error)}`)
      }
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    throw new Error(`Failed to create Dodo payment: ${errorMessage}`)
  }
}

export async function verifyDodoPayment(paymentId: string): Promise<boolean> {
  try {
    const client = getDodoClient()
    
    console.log(`Verifying Dodo payment: ${paymentId}`)
    
    // Get payment details using SDK
    const payment = await client.payments.retrieve(paymentId)
    
    console.log('Payment verification response:', payment)
    console.log('Payment status:', payment.status)
    
    // Check if payment was successful
    // Valid statuses: 'succeeded' | 'failed' | 'cancelled' | 'processing' | etc.
    return payment.status === 'succeeded'
  } catch (error) {
    console.error('Payment verification error:', error)
    return false
  }
}