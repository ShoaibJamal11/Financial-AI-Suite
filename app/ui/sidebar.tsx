'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Shield,
  Brain,
  LayoutDashboard,
  TrendingUp,
  FileText,
  Zap,
  Activity,
  ChevronRight,
} from 'lucide-react'

const navSections = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    ],
  },
  {
    title: 'ProfitGuard',
    icon: Shield,
    color: 'text-cyan-400',
    items: [
      { label: 'Cash Flow', href: '/profitguard', icon: TrendingUp },
      { label: 'Analytics', href: '/profitguard/analytics', icon: Activity },
    ],
  },
  {
    title: 'CollectAI',
    icon: Brain,
    color: 'text-purple-400',
    items: [
      { label: 'Invoice Collection', href: '/collectai', icon: FileText },
      { label: 'Automations', href: '/collectai/automations', icon: Zap },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-[#0d1117] border-r border-[#1e293b] shrink-0">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#1e293b]">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
          <Zap size={18} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-white tracking-wide leading-none">
            FinAI Suite
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5 font-mono uppercase tracking-widest">
            CFO Command Center
          </p>
        </div>
      </div>

      {/* Status badge */}
      <div className="mx-4 mt-4 mb-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-900/50">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
        <span className="text-[11px] text-emerald-400 font-mono">
          All Systems Operational
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.title}>
            {/* Section header */}
            <div className="flex items-center gap-2 px-2 mb-2">
              {section.icon && (
                <section.icon size={13} className={section.color ?? 'text-slate-500'} />
              )}
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                {section.title}
              </span>
            </div>

            {/* Section items */}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                        ${isActive
                          ? 'bg-blue-600/15 text-blue-300 border border-blue-500/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                        }
                      `}
                    >
                      <Icon
                        size={15}
                        className={isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}
                      />
                      <span className="flex-1">{item.label}</span>
                      {isActive && (
                        <ChevronRight size={12} className="text-blue-400" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#1e293b]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-[11px] font-bold text-white">
            CF
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-300 truncate">CFO Admin</p>
            <p className="text-[10px] text-slate-600 truncate">admin@finaisuite.io</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

