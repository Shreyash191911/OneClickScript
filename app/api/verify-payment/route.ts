import { NextRequest, NextResponse } from 'next/server'
import { verifyDodoPayment } from '@/lib/dodo-payments'

export async function POST(request: NextRequest) {
  try {
    const { paymentId } = await request.json()

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Missing payment ID' },
        { status: 400 }
      )
    }

    const isValid = await verifyDodoPayment(paymentId)

    if (isValid) {
      // Here you would typically:
      // 1. Update user's subscription status in database
      // 2. Send confirmation email
      // 3. Log the successful payment
      
      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully'
      })
    } else {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
