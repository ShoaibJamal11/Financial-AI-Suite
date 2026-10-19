import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Sidebar from '@/app/ui/sidebar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Financial AI Suite — CFO Command Center',
  description: 'AI-powered financial intelligence: ProfitGuard & CollectAI',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="h-full flex antialiased bg-[#0a0c14] text-slate-200">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-h-screen overflow-auto">
          {/* Top bar */}
          <header className="sticky top-0 z-10 flex items-center justify-between h-14 px-6 bg-[#0a0c14]/80 backdrop-blur-md border-b border-[#1e293b]">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="font-mono text-[10px] uppercase tracking-widest">
                Q4 2026
              </span>
              <span className="text-slate-700">·</span>
              <span className="text-slate-400">Fiscal Year Active</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Live indicator */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                  Live
                </span>
              </div>

              {/* Notification dot */}
              <button className="relative p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
              </button>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
