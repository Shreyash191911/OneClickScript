export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function getScriptUsage(): { count: number; date: string } {
  if (typeof window === 'undefined') return { count: 0, date: '' }
  
  const today = new Date().toDateString()
  const stored = localStorage.getItem('scriptUsage')
  
  if (!stored) {
    return { count: 0, date: today }
  }
  
  const usage = JSON.parse(stored)
  
  if (usage.date !== today) {
    return { count: 0, date: today }
  }
  
  return usage
}

export function incrementScriptUsage(): void {
  if (typeof window === 'undefined') return
  
  const today = new Date().toDateString()
  const current = getScriptUsage()
  
  const newUsage = {
    count: current.date === today ? current.count + 1 : 1,
    date: today
  }
  
  localStorage.setItem('scriptUsage', JSON.stringify(newUsage))
}

export function hasReachedLimit(): boolean {
  const usage = getScriptUsage()
  return usage.count >= 3
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    return new Promise((resolve, reject) => {
      if (document.execCommand('copy')) {
        resolve()
      } else {
        reject(new Error('Failed to copy'))
      }
      document.body.removeChild(textArea)
    })
  }
}
