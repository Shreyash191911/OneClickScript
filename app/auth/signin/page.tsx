'use client'

import { signIn, getProviders } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Github, Chrome } from 'lucide-react'

export default function SignIn() {
  const [providers, setProviders] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    fetchProviders()
  }, [])

  const handleSignIn = (providerId: string) => {
    signIn(providerId, { callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-3xl">🎬</span>
            <h1 className="text-2xl font-bold text-white">OneClick Script Writer</h1>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Welcome Back!</h2>
          <p className="text-gray-300">Sign in to access unlimited script generation</p>
        </div>

        <div className="space-y-4">
          {providers && Object.values(providers).map((provider: any) => (
            <button
              key={provider.name}
              onClick={() => handleSignIn(provider.id)}
              className="w-full flex items-center justify-center space-x-3 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {provider.name === 'Google' ? (
                <Chrome className="h-5 w-5" />
              ) : (
                <Github className="h-5 w-5" />
              )}
              <span>Continue with {provider.name}</span>
            </button>
          ))}

          <div className="text-center">
            <button
              onClick={() => router.back()}
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-300 text-sm">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}


