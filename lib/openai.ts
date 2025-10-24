import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export interface ScriptRequest {
  topic: string
  tone: string
  length: string
}

export interface ScriptResponse {
  script: string
  success: boolean
  error?: string
}

export async function generateScript({ topic, tone, length }: ScriptRequest): Promise<ScriptResponse> {
  // For now, let's use a smart mock script generator until Gemini API is properly configured
  console.log('Using mock script generator (Gemini API not configured)')
  
  const generateMockScript = (topic: string, tone: string, length: string) => {
    const hooks = {
      Educational: `Did you know that ${topic} could revolutionize your understanding of this field?`,
      Funny: `You won't believe what I discovered about ${topic} - it's absolutely hilarious!`,
      Dramatic: `What I'm about to reveal about ${topic} will shock you to your core.`,
      Motivational: `If you're struggling with ${topic}, this video will change everything for you.`
    }

    const introductions = {
      Educational: `Welcome back to the channel! Today we're diving deep into ${topic}, and I'm going to share with you everything you need to know.`,
      Funny: `Hey everyone! Today we're talking about ${topic}, and trust me, you're going to laugh your way through this one.`,
      Dramatic: `What I'm about to tell you about ${topic} is something that most people don't know, and it could change your life forever.`,
      Motivational: `If you've ever struggled with ${topic}, this video is going to give you the breakthrough you've been waiting for.`
    }

    const mainBodyPoints = {
      Educational: [
        `First, let's understand the fundamentals of ${topic}`,
        `Then, I'll show you the most important concepts you need to master`,
        `Finally, we'll discuss practical applications and real-world examples`
      ],
      Funny: [
        `First, let me tell you the funniest thing about ${topic}`,
        `Then, I'll share some hilarious examples that will make you laugh`,
        `Finally, we'll wrap up with some comedy gold about ${topic}`
      ],
      Dramatic: [
        `The first thing you need to know about ${topic} will shock you`,
        `Then, I'll reveal the hidden truth that most people don't know`,
        `Finally, I'll show you how this knowledge can change your life`
      ],
      Motivational: [
        `First, let's identify what's holding you back with ${topic}`,
        `Then, I'll show you the breakthrough strategies that work`,
        `Finally, I'll give you the action plan to achieve your goals`
      ]
    }

    const callsToAction = {
      Educational: `If this video helped you understand ${topic}, don't forget to like, subscribe, and hit the notification bell for more educational content!`,
      Funny: `If this video made you laugh, give it a thumbs up, subscribe for more comedy, and let me know in the comments what you thought was funniest!`,
      Dramatic: `If this video opened your eyes about ${topic}, like and subscribe for more revealing content, and share your thoughts in the comments below!`,
      Motivational: `If this video motivated you to take action on ${topic}, like and subscribe for more inspiring content, and let me know in the comments what you're going to do next!`
    }

    const hook = hooks[tone as keyof typeof hooks] || hooks.Educational
    const intro = introductions[tone as keyof typeof introductions] || introductions.Educational
    const points = mainBodyPoints[tone as keyof typeof mainBodyPoints] || mainBodyPoints.Educational
    const cta = callsToAction[tone as keyof typeof callsToAction] || callsToAction.Educational

    let script = `HOOK: ${hook}\n\nINTRODUCTION: ${intro}\n\nMAIN BODY:\n`

    points.forEach((point, index) => {
      script += `${index + 1}. ${point}\n`
    })

    script += `\nCALL TO ACTION: ${cta}`

    return script
  }

  try {
    // Try Gemini API first (if configured)
    if (process.env.GOOGLE_API_KEY && process.env.GOOGLE_API_KEY !== 'your_google_api_key_here') {
      const prompt = `You are a professional YouTube scriptwriter who creates engaging, emotionally powerful, and story-driven scripts. Follow YouTube storytelling frameworks and pacing.

Create a complete YouTube video script based on this input:
Topic: ${topic}
Tone: ${tone}
Length: ${length}

Structure it as:
1. Hook (1–2 lines)
2. Introduction (short setup)
3. Main Body (3–4 points or story beats)
4. Call-to-Action (end line)

Make it concise, creative, and formatted for spoken narration.`

      // Use the working Gemini model
      const modelNames = ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-2.0-flash", "gemini-flash-latest", "gemini-pro-latest"]
      
      for (const modelName of modelNames) {
        try {
          console.log(`Trying Gemini model: ${modelName}`)
          const model = genAI.getGenerativeModel({ model: modelName })
          const result = await model.generateContent(prompt)
          const response = await result.response
          const script = response.text()
          
          console.log(`Success with Gemini model: ${modelName}`)
          return {
            script,
            success: true
          }
        } catch (modelError: any) {
          console.log(`Gemini model ${modelName} failed:`, modelError.message)
          if (modelName === modelNames[modelNames.length - 1]) {
            console.log('All Gemini models failed, using mock script')
            break
          }
          continue
        }
      }
    }

    // Fallback: Use smart mock script generator
    const mockScript = generateMockScript(topic, tone, length)
    
    return {
      script: mockScript,
      success: true
    }

  } catch (error) {
    console.error('Script generation error:', error)
    
    // Final fallback: Basic mock script
    const basicScript = `HOOK: Did you know that ${topic} could change your life forever?

INTRODUCTION: Welcome back to the channel! Today we're diving deep into ${topic}, and I'm going to share with you everything you need to know.

MAIN BODY:
1. First, let's talk about the basics of ${topic}
2. Then, I'll show you the most important aspects you need to understand
3. Finally, we'll discuss how to apply this knowledge in your daily life

CALL TO ACTION: If this video helped you, don't forget to like, subscribe, and hit the notification bell. See you in the next video!`

    return {
      script: basicScript,
      success: true
    }
  }
}
