'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { User, LogOut, Menu, X, Zap } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  return (
    <nav className="bg-black/80 backdrop-blur-xl border-b-2 border-cyan-500/50 sticky top-0 z-50 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-3 transform hover:scale-105 transition-all duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/50 blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <span className="relative text-3xl">⚡</span>
            </div>
            <div className="relative">
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 animate-gradient-x font-mono tracking-wider">
                ONECLICK_SCRIPT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="relative group text-cyan-400 hover:text-cyan-300 transition-all duration-300 font-mono font-bold tracking-wider"
            >
              <span className="relative z-10">[HOME]</span>
              <div className="absolute inset-0 bg-cyan-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="#pricing" 
              className="relative group text-fuchsia-400 hover:text-fuchsia-300 transition-all duration-300 font-mono font-bold tracking-wider"
            >
              <span className="relative z-10">[PRICING]</span>
              <div className="absolute inset-0 bg-fuchsia-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            {status === 'loading' ? (
              <div className="bg-gradient-to-r from-cyan-900/50 to-fuchsia-900/50 border border-cyan-500/50 text-cyan-400 px-4 py-2 rounded-lg font-mono animate-pulse">
                LOADING...
              </div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-cyan-900/30 to-fuchsia-900/30 border border-cyan-500/50 px-4 py-2 rounded-lg group hover:border-cyan-400 transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  <div className="relative">
                    <User className="h-5 w-5 text-cyan-400" />
                    <div className="absolute inset-0 bg-cyan-500/50 blur-md group-hover:blur-lg transition-all"></div>
                  </div>
                  <span className="text-sm text-white font-mono truncate max-w-[150px]">{session.user?.name || session.user?.email}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="group relative bg-gradient-to-r from-red-600 to-fuchsia-600 hover:from-red-500 hover:to-fuchsia-500 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.8)] flex items-center space-x-2 font-mono font-bold overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <LogOut className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">LOGOUT</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="group relative bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,1)] font-mono font-bold flex items-center space-x-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Zap className="h-4 w-4 relative z-10 animate-pulse" />
                <span className="relative z-10">LOGIN</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 border-2 border-cyan-500/50 rounded-lg hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-4 pt-4 pb-4 space-y-3 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border-2 border-cyan-500/50 rounded-lg mt-2 mb-4 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
              <Link 
                href="/" 
                className="block text-cyan-400 hover:text-cyan-300 transition-all py-3 px-4 rounded-lg hover:bg-cyan-900/30 border-l-4 border-cyan-500 hover:border-cyan-400 font-mono font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                [HOME]
              </Link>
              <Link 
                href="#pricing" 
                className="block text-fuchsia-400 hover:text-fuchsia-300 transition-all py-3 px-4 rounded-lg hover:bg-fuchsia-900/30 border-l-4 border-fuchsia-500 hover:border-fuchsia-400 font-mono font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                [PRICING]
              </Link>
              
              {status === 'loading' ? (
                <div className="block text-cyan-400 py-3 px-4 font-mono animate-pulse">LOADING...</div>
              ) : session ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-white py-3 px-4 bg-gradient-to-r from-cyan-900/30 to-fuchsia-900/30 border border-cyan-500/50 rounded-lg">
                    <User className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-mono truncate">{session.user?.name || session.user?.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      signOut()
                      setIsMenuOpen(false)
                    }}
                    className="w-full bg-gradient-to-r from-red-600 to-fuchsia-600 hover:from-red-500 hover:to-fuchsia-500 text-white px-4 py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] font-mono font-bold flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>LOGOUT</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    signIn()
                    setIsMenuOpen(false)
                  }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-white py-3 px-4 rounded-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.6)] font-mono font-bold flex items-center justify-center space-x-2"
                >
                  <Zap className="h-4 w-4 animate-pulse" />
                  <span>LOGIN</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
