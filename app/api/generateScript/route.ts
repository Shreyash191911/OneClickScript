import { NextRequest, NextResponse } from 'next/server'
import { generateScript } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { topic, tone, length } = await request.json()

    if (!topic || !tone || !length) {
      return NextResponse.json(
        { error: 'Missing required fields: topic, tone, length' },
        { status: 400 }
      )
    }

    const result = await generateScript({ topic, tone, length })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to generate script' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      script: result.script,
      success: true
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


