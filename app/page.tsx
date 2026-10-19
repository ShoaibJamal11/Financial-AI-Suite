'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, Brain, TrendingUp, FileText, ArrowRight, Activity, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react'

const stats = [
  {
    label: 'Total Revenue',
    value: '$4.82M',
    change: '+12.4%',
    positive: true,
    icon: DollarSign,
    color: 'text-cyan-400',
    bg: 'bg-cyan-950/30',
    border: 'border-cyan-900/40',
  },
  {
    label: 'Cash Flow',
    value: '$1.23M',
    change: '+8.1%',
    positive: true,
    icon: TrendingUp,
    color: 'text-blue-400',
    bg: 'bg-blue-950/30',
    border: 'border-blue-900/40',
  },
  {
    label: 'Overdue Invoices',
    value: '$248K',
    change: '-3.2%',
    positive: false,
    icon: AlertTriangle,
    color: 'text-amber-400',
    bg: 'bg-amber-950/30',
    border: 'border-amber-900/40',
  },
  {
    label: 'Collected (MTD)',
    value: '$892K',
    change: '+21.7%',
    positive: true,
    icon: CheckCircle,
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/30',
    border: 'border-emerald-900/40',
  },
]

const modules = [
  {
    title: 'ProfitGuard',
    description: 'AI-powered cash flow forecasting and predictive financial health monitoring. Stay ahead of liquidity risks.',
    href: '/profitguard',
    icon: Shield,
    gradient: 'from-cyan-600 to-blue-700',
    shadow: 'shadow-cyan-500/10',
    badge: 'Predictive',
    badgeColor: 'bg-cyan-950/60 text-cyan-400 border-cyan-800/50',
    features: ['Cash Flow Forecast', 'Risk Alerts', 'Burn Rate Analysis'],
  },
  {
    title: 'CollectAI',
    description: 'Intelligent invoice collection automation. Trigger n8n workflows to chase overdue payments automatically.',
    href: '/collectai',
    icon: Brain,
    gradient: 'from-purple-600 to-violet-700',
    shadow: 'shadow-purple-500/10',
    badge: 'Automated',
    badgeColor: 'bg-purple-950/60 text-purple-400 border-purple-800/50',
    features: ['Invoice Triggers', 'Workflow Automation', 'Collection Reports'],
  },
]

export default function DashboardPage() {
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    )
  }, [])

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page header */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-slate-600 mb-1">{dateStr}</p>
        <h1 className="text-2xl font-bold text-white">
          Good morning, CFO{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            👋
          </span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Here&apos;s your financial intelligence overview. All figures are real-time.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`relative rounded-xl p-5 ${stat.bg} border ${stat.border} gradient-border overflow-hidden`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white tabular-nums">
                    {stat.value}
                  </p>
                  <p className={`mt-1 text-xs font-medium ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.change} vs last month
                  </p>
                </div>
                <div className={`p-2.5 rounded-lg ${stat.bg} border ${stat.border}`}>
                  <Icon size={18} className={stat.color} />
                </div>
              </div>
              {/* Subtle chart line decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-10" />
            </div>
          )
        })}
      </div>

      {/* Module cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {modules.map((mod) => {
          const Icon = mod.icon
          return (
            <div
              key={mod.title}
              className={`group relative rounded-2xl p-6 bg-[#111827] border border-[#1e293b] hover:border-slate-700 transition-all duration-300 shadow-xl ${mod.shadow}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">{mod.title}</h2>
                    <span className={`inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${mod.badgeColor}`}>
                      {mod.badge}
                    </span>
                  </div>
                </div>
                <Activity size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
              </div>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed mb-5">{mod.description}</p>

              {/* Features */}
              <ul className="flex flex-wrap gap-2 mb-6">
                {mod.features.map((f) => (
                  <li key={f} className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-slate-400">
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={mod.href}
                className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${mod.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
              >
                Open {mod.title}
                <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )
        })}
      </div>

      {/* Footer note */}
      <p className="text-center text-[11px] text-slate-700 font-mono">
        Financial AI Suite · Powered by n8n + Supabase · Next.js 16
      </p>
    </div>
  )
}
