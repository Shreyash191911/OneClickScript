import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex')
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  } catch (error) {
    console.error('Signature verification error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('dodo-signature') || request.headers.get('x-dodo-signature') || ''
    
    console.log('Dodo Payments webhook received')
    
    // Verify webhook signature for production
    const webhookSecret = process.env.DODO_PAYMENTS_WEBHOOK_SECRET
    if (webhookSecret && process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode') {
      const isValid = verifyWebhookSignature(body, signature, webhookSecret)
      
      if (!isValid) {
        console.error('Invalid webhook signature')
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        )
      }
    }
    
    const event = JSON.parse(body)
    const { type, data } = event
    
    console.log('Webhook event type:', type)
    
    switch (type) {
      case 'checkout.session.completed':
      case 'payment.succeeded':
        console.log('Payment succeeded:', data)
        // TODO: Update user subscription status in database
        // TODO: Grant unlimited access
        // TODO: Send confirmation email
        // Example:
        // await updateUserSubscription(data.customer_email, {
        //   status: 'active',
        //   plan: 'unlimited',
        //   paymentId: data.payment_id,
        //   startDate: new Date(),
        //   endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        // })
        break
        
      case 'payment.failed':
        console.log('Payment failed:', data)
        // TODO: Handle failed payment
        // TODO: Send failure notification
        break
        
      case 'payment.cancelled':
      case 'checkout.session.expired':
        console.log('Payment cancelled/expired:', data)
        // TODO: Handle cancelled payment
        break
        
      case 'subscription.created':
        console.log('Subscription created:', data)
        // TODO: Handle new subscription
        break
        
      case 'subscription.updated':
        console.log('Subscription updated:', data)
        // TODO: Handle subscription update
        break
        
      case 'subscription.cancelled':
        console.log('Subscription cancelled:', data)
        // TODO: Revoke unlimited access
        // TODO: Send cancellation email
        break
        
      default:
        console.log('Unhandled webhook event:', type)
    }
    
    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
