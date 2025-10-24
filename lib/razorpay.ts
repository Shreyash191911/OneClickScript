import axios from 'axios'

export const DODO_API_BASE = process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' 
  ? 'https://api.dodopayments.com' 
  : 'https://api-sandbox.dodopayments.com'

export const PLAN_AMOUNT = 9900 // ₹99 in paise

export async function createDodoPayment(customerEmail?: string) {
  try {
    const response = await axios.post(`${DODO_API_BASE}/v1/payments`, {
      amount: PLAN_AMOUNT,
      currency: 'INR',
      description: 'OneClick Script Writer - Unlimited Plan',
      customer_email: customerEmail || 'customer@example.com',
      metadata: {
        plan: 'unlimited_monthly',
        product: 'script_writer_unlimited'
      },
      return_url: `${process.env.NEXTAUTH_URL}/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cancel`
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    return {
      paymentId: response.data.id,
      paymentUrl: response.data.payment_url,
      amount: response.data.amount,
      currency: response.data.currency
    }
  } catch (error) {
    console.error('Dodo Payments error:', error)
    throw new Error('Failed to create Dodo payment')
  }
}

export async function verifyDodoPayment(paymentId: string) {
  try {
    const response = await axios.get(`${DODO_API_BASE}/v1/payments/${paymentId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`
      }
    })

    return response.data.status === 'completed'
  } catch (error) {
    console.error('Payment verification error:', error)
    return false
  }
}
