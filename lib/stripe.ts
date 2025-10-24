import Razorpay from 'razorpay'

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export const PLAN_AMOUNT = 9900 // ₹99 in paise

export async function createRazorpayOrder(customerEmail?: string) {
  try {
    const options = {
      amount: PLAN_AMOUNT,
      currency: 'INR',
      receipt: `subscription_${Date.now()}`,
      notes: {
        email: customerEmail || 'customer@example.com',
        plan: 'unlimited_monthly',
        description: 'OneClick Script Writer - Unlimited Plan'
      }
    }

    const order = await razorpay.orders.create(options)
    
    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    }
  } catch (error) {
    console.error('Razorpay error:', error)
    throw new Error('Failed to create Razorpay order')
  }
}

export async function verifyPayment(paymentId: string, orderId: string, signature: string) {
  try {
    const crypto = require('crypto')
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${orderId}|${paymentId}`)
      .digest('hex')

    return expectedSignature === signature
  } catch (error) {
    console.error('Payment verification error:', error)
    return false
  }
}
