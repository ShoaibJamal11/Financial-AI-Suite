import {
  Shield,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  BarChart2,
  Activity,
  Clock,
  Flame,
} from 'lucide-react'

// ─── Dummy data ────────────────────────────────────────────────────────────────

const cashFlowMonths = [
  { month: 'May', inflow: 820, outflow: 610 },
  { month: 'Jun', inflow: 940, outflow: 720 },
  { month: 'Jul', inflow: 780, outflow: 650 },
  { month: 'Aug', inflow: 1100, outflow: 830 },
  { month: 'Sep', inflow: 960, outflow: 740 },
  { month: 'Oct', inflow: 1230, outflow: 890 },
]

const forecastMonths = [
  { month: 'Nov', value: 1350, confidence: 92 },
  { month: 'Dec', value: 1480, confidence: 85 },
  { month: 'Jan', value: 1190, confidence: 78 },
]

const riskAlerts = [
  { severity: 'high', message: 'Apex Technologies — payment 35 days overdue (\$12,400)', time: '2h ago' },
  { severity: 'medium', message: 'Q4 burn rate 8% above forecast threshold', time: '5h ago' },
  { severity: 'low', message: 'Runway extended to 14 months with current cash position', time: '1d ago' },
]

const kpis = [
  { label: 'Net Cash Flow (MTD)', value: '+\$340K', trend: 'up', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-950/20 border-emerald-900/30' },
  { label: 'Monthly Burn Rate', value: '\$890K', trend: 'down', icon: Flame, color: 'text-amber-400', bg: 'bg-amber-950/20 border-amber-900/30' },
  { label: 'Cash Runway', value: '14 mo.', trend: 'up', icon: Clock, color: 'text-cyan-400', bg: 'bg-cyan-950/20 border-cyan-900/30' },
  { label: 'Accounts Receivable', value: '\$248K', trend: 'down', icon: DollarSign, color: 'text-blue-400', bg: 'bg-blue-950/20 border-blue-900/30' },
]

// ─── Mini bar chart component (pure CSS / SVG) ─────────────────────────────────

function CashFlowChart() {
  const maxVal = Math.max(...cashFlowMonths.flatMap((m) => [m.inflow, m.outflow]))
  const chartH = 100

  return (
    <div className="flex items-end gap-3 h-28 px-2">
      {cashFlowMonths.map((m) => {
        const inflowH = (m.inflow / maxVal) * chartH
        const outflowH = (m.outflow / maxVal) * chartH
        return (
          <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-end gap-0.5 w-full justify-center" style={{ height: chartH }}>
              <div
                className="w-3 rounded-t bg-cyan-500/70 bar-animate"
                style={{ height: `${inflowH}px` }}
                title={`Inflow \$${m.inflow}K`}
              />
              <div
                className="w-3 rounded-t bg-red-500/50 bar-animate"
                style={{ height: `${outflowH}px`, animationDelay: '0.1s' }}
                title={`Outflow \$${m.outflow}K`}
              />
            </div>
            <span className="text-[10px] text-slate-600 font-mono">{m.month}</span>
          </div>
        )
      })}
    </div>
  )
}

function ForecastChart() {
  const max = Math.max(...forecastMonths.map((m) => m.value))
  return (
    <div className="space-y-3">
      {forecastMonths.map((m) => (
        <div key={m.month} className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-500 w-8">{m.month}</span>
          <div className="flex-1 h-2.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 bar-animate"
              style={{ width: `${(m.value / max) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold tabular-nums text-white w-16 text-right">
            \${m.value}K
          </span>
          <span className="text-[10px] text-slate-500 w-10 text-right">{m.confidence}%</span>
        </div>
      ))}
      <div className="flex justify-end gap-4 pt-1">
        <span className="text-[10px] text-slate-600">value</span>
        <span className="text-[10px] text-slate-600">confidence</span>
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ProfitGuardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Shield size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">ProfitGuard</h1>
          </div>
          <p className="text-sm text-slate-500 ml-12">
            AI-driven cash flow intelligence and predictive financial health monitoring.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
          <Activity size={11} className="text-cyan-500" />
          Synced 2 min ago
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown
          return (
            <div key={kpi.label} className={`rounded-xl p-4 border ${kpi.bg}`}>
              <div className="flex items-center justify-between mb-3">
                <Icon size={15} className={kpi.color} />
                <TrendIcon
                  size={13}
                  className={kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}
                />
              </div>
              <p className={`text-xl font-bold tabular-nums ${kpi.color}`}>{kpi.value}</p>
              <p className="mt-1 text-[11px] text-slate-500">{kpi.label}</p>
            </div>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Cash flow bar chart */}
        <div className="rounded-xl bg-[#111827] border border-[#1e293b] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white">Cash Flow (6-Month)</h2>
              <p className="text-[11px] text-slate-600 mt-0.5">Inflow vs Outflow · USD thousands</p>
            </div>
            <BarChart2 size={15} className="text-slate-600" />
          </div>

          <CashFlowChart />

          {/* Legend */}
          <div className="flex items-center gap-4 mt-3 px-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 rounded-sm bg-cyan-500/70 inline-block" />
              <span className="text-[10px] text-slate-500">Inflow</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 rounded-sm bg-red-500/50 inline-block" />
              <span className="text-[10px] text-slate-500">Outflow</span>
            </div>
          </div>
        </div>

        {/* Forecast chart */}
        <div className="rounded-xl bg-[#111827] border border-[#1e293b] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white">3-Month Forecast</h2>
              <p className="text-[11px] text-slate-600 mt-0.5">AI-predicted cash inflow · USD thousands</p>
            </div>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-950/40 border border-blue-900/40 px-2 py-0.5 rounded-full">
              AI MODEL
            </span>
          </div>
          <ForecastChart />
        </div>
      </div>

      {/* Risk alerts */}
      <div className="rounded-xl bg-[#111827] border border-[#1e293b] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e293b]">
          <div className="flex items-center gap-2">
            <AlertTriangle size={14} className="text-amber-400" />
            <h2 className="text-sm font-semibold text-white">Risk Alerts</h2>
          </div>
          <span className="text-[10px] font-mono text-slate-600">
            {riskAlerts.length} active
          </span>
        </div>

        <div className="divide-y divide-[#1a2234]">
          {riskAlerts.map((alert, i) => {
            const severityStyles = {
              high: { bar: 'bg-red-500', badge: 'text-red-400 bg-red-950/40 border-red-900/40' },
              medium: { bar: 'bg-amber-500', badge: 'text-amber-400 bg-amber-950/40 border-amber-900/40' },
              low: { bar: 'bg-emerald-500', badge: 'text-emerald-400 bg-emerald-950/40 border-emerald-900/40' },
            }[alert.severity as 'high' | 'medium' | 'low']

            return (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-800/20 transition-colors">
                <div className={`w-1 h-8 rounded-full ${severityStyles.bar} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 truncate">{alert.message}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border ${severityStyles.badge}`}>
                    {alert.severity}
                  </span>
                  <span className="text-[10px] text-slate-600 font-mono">{alert.time}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Data source note */}
      <p className="text-[11px] text-slate-700 font-mono text-center">
        Data sourced from Supabase · Forecasts powered by ProfitGuard AI Model v2.4
      </p>
    </div>
  )
}

