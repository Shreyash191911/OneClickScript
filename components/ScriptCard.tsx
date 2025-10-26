'use client'

import { useState } from 'react'
import { Copy, Check, Download } from 'lucide-react'
import { copyToClipboard } from '@/lib/utils'

interface ScriptCardProps {
  script: string
  topic: string
  tone: string
  length: string
}

export default function ScriptCard({ script, topic, tone, length }: ScriptCardProps) {
  const [copied, setCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleCopy = async () => {
    try {
      await copyToClipboard(script)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy script:', error)
    }
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const blob = new Blob([script], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `youtube-script-${topic.toLowerCase().replace(/\s+/g, '-')}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download script:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border-2 border-cyan-500/50 rounded-2xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.3)] hover:shadow-[0_0_80px_rgba(6,182,212,0.5)] transition-all duration-500 animate-fade-in">
      {/* Corner accent lights */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400 rounded-tl-2xl"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-fuchsia-400 rounded-tr-2xl"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-yellow-400 rounded-bl-2xl"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400 rounded-br-2xl"></div>
      
      <div className="mb-6">
        <h3 className="text-3xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 animate-gradient-x font-mono">
            &gt;&gt; GENERATED_SCRIPT.output
          </span>
        </h3>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="bg-gradient-to-r from-cyan-900/40 to-cyan-500/20 border border-cyan-500/50 px-4 py-2 rounded-lg text-cyan-400 font-mono font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            <strong className="text-cyan-300">TOPIC:</strong> {topic}
          </span>
          <span className="bg-gradient-to-r from-fuchsia-900/40 to-fuchsia-500/20 border border-fuchsia-500/50 px-4 py-2 rounded-lg text-fuchsia-400 font-mono font-bold shadow-[0_0_10px_rgba(217,70,239,0.3)]">
            <strong className="text-fuchsia-300">TONE:</strong> {tone}
          </span>
          <span className="bg-gradient-to-r from-yellow-900/40 to-yellow-500/20 border border-yellow-500/50 px-4 py-2 rounded-lg text-yellow-400 font-mono font-bold shadow-[0_0_10px_rgba(234,179,8,0.3)]">
            <strong className="text-yellow-300">LENGTH:</strong> {length}
          </span>
        </div>
      </div>

      <div className="relative bg-black/50 border-2 border-cyan-500/30 rounded-xl p-6 mb-6 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>
        <pre className="text-gray-100 whitespace-pre-wrap font-mono text-sm leading-relaxed relative z-10 max-h-[500px] overflow-y-auto custom-scrollbar">
          {script}
        </pre>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleCopy}
          className="group relative flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] font-mono font-bold overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {copied ? (
            <>
              <Check className="h-5 w-5 relative z-10 animate-pulse" />
              <span className="relative z-10">&gt;&gt; COPIED!</span>
            </>
          ) : (
            <>
              <Copy className="h-5 w-5 relative z-10" />
              <span className="relative z-10">&gt;&gt; COPY_SCRIPT</span>
            </>
          )}
        </button>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="group relative flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-400 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(217,70,239,0.5)] hover:shadow-[0_0_35px_rgba(217,70,239,0.8)] font-mono font-bold overflow-hidden disabled:cursor-not-allowed disabled:transform-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Download className="h-5 w-5 relative z-10" />
          <span className="relative z-10">{isDownloading ? '&gt;&gt; DOWNLOADING...' : '&gt;&gt; DOWNLOAD'}</span>
        </button>
      </div>
    </div>
  )
}


