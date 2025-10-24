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
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Your YouTube Script</h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
          <span className="bg-white/20 px-3 py-1 rounded-full">
            <strong>Topic:</strong> {topic}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full">
            <strong>Tone:</strong> {tone}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full">
            <strong>Length:</strong> {length}
          </span>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-6 mb-6">
        <pre className="text-white whitespace-pre-wrap font-mono text-sm leading-relaxed">
          {script}
        </pre>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
        >
          {copied ? (
            <>
              <Check className="h-5 w-5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-5 w-5" />
              <span>Copy Script</span>
            </>
          )}
        </button>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-500 text-white px-6 py-3 rounded-lg transition-colors font-medium"
        >
          <Download className="h-5 w-5" />
          <span>{isDownloading ? 'Downloading...' : 'Download'}</span>
        </button>
      </div>
    </div>
  )
}


