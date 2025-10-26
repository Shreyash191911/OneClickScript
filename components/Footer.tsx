import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-black/80 backdrop-blur-xl border-t-2 border-cyan-500/50 mt-20 shadow-[0_-10px_30px_rgba(6,182,212,0.2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/50 blur-lg"></div>
                <span className="relative text-2xl">⚡</span>
              </div>
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 animate-gradient-x font-mono">
                ONECLICK_SCRIPT
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              <span className="text-cyan-400 font-semibold">Neural AI</span> powered script generation. 
              Create <span className="text-fuchsia-400 font-semibold">viral content</span> that dominates YouTube.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative p-3 bg-gradient-to-r from-cyan-900/30 to-cyan-500/20 border border-cyan-500/50 rounded-lg hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              >
                <svg className="h-6 w-6 text-cyan-400 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://producthunt.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative p-3 bg-gradient-to-r from-fuchsia-900/30 to-fuchsia-500/20 border border-fuchsia-500/50 rounded-lg hover:border-fuchsia-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,70,239,0.5)]"
              >
                <svg className="h-6 w-6 text-fuchsia-400 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h3.02c.264-3.312 2.99-5.9 6.455-5.9s6.191 2.588 6.455 5.9h3.02C23.711 6.443 19.121 2 13.5 2zM2.025 12c.264 5.557 4.379 10 9.475 10s9.211-4.443 9.475-10h-3.02c-.264 3.312-2.99 5.9-6.455 5.9s-6.191-2.588-6.455-5.9H2.025z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-cyan-400 font-bold mb-4 font-mono text-lg">[PRODUCT]</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="group text-gray-300 hover:text-cyan-400 transition-all duration-300 font-mono flex items-center space-x-2">
                  <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                  <span>Features</span>
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="group text-gray-300 hover:text-cyan-400 transition-all duration-300 font-mono flex items-center space-x-2">
                  <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                  <span>Pricing</span>
                </Link>
              </li>
              <li>
                <Link href="/api" className="group text-gray-300 hover:text-cyan-400 transition-all duration-300 font-mono flex items-center space-x-2">
                  <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                  <span>API</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-fuchsia-400 font-bold mb-4 font-mono text-lg">[SUPPORT]</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="group text-gray-300 hover:text-fuchsia-400 transition-all duration-300 font-mono flex items-center space-x-2">
                  <span className="text-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                  <span>Help Center</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="group text-gray-300 hover:text-fuchsia-400 transition-all duration-300 font-mono flex items-center space-x-2">
                  <span className="text-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="group text-gray-300 hover:text-fuchsia-400 transition-all duration-300 font-mono flex items-center space-x-2">
                  <span className="text-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                  <span>Privacy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-cyan-500/30 mt-8 pt-8">
          <p className="text-gray-400 text-center font-mono">
            <span className="text-cyan-400">©</span> 2024 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">ONECLICK_SCRIPT</span> // All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}


