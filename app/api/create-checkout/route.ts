import { NextRequest, NextResponse } from 'next/server'
import { createDodoPayment } from '@/lib/dodo-payments'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    const paymentData = await createDodoPayment(email)

    return NextResponse.json({
      paymentId: paymentData.paymentId,
      paymentUrl: paymentData.paymentUrl,
      amount: paymentData.amount,
      currency: paymentData.currency
    })

  } catch (error) {
    console.error('Dodo Payments creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create Dodo payment' },
      { status: 500 }
    )
  }
}
