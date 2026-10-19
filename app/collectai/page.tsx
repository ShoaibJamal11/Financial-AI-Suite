'use client'

import { useState } from 'react'
import {
  Brain,
  Send,
  CheckCircle2,
  XCircle,
  Loader2,
  FileText,
  Clock,
  DollarSign,
  RefreshCw,
  ChevronDown,
} from 'lucide-react'

type TriggerStatus = 'idle' | 'loading' | 'success' | 'error'

interface InvoiceRecord {
  id: string
  client: string
  amount: string
  dueDate: string
  daysOverdue: number
  status: 'overdue' | 'pending' | 'sent'
}

const mockInvoices: InvoiceRecord[] = [
  { id: 'INV-2026-001', client: 'Apex Technologies', amount: '$12,400', dueDate: '2026-09-15', daysOverdue: 35, status: 'overdue' },
  { id: 'INV-2026-004', client: 'Blue Horizon Ltd', amount: '$8,750', dueDate: '2026-09-28', daysOverdue: 22, status: 'overdue' },
  { id: 'INV-2026-007', client: 'Nova Dynamics', amount: '$31,200', dueDate: '2026-10-01', daysOverdue: 19, status: 'overdue' },
  { id: 'INV-2026-009', client: 'Cascade Systems', amount: '$5,990', dueDate: '2026-10-10', daysOverdue: 10, status: 'pending' },
  { id: 'INV-2026-012', client: 'Vertex Corp', amount: '$18,600', dueDate: '2026-10-14', daysOverdue: 6, status: 'sent' },
]

const statusColors: Record<InvoiceRecord['status'], string> = {
  overdue: 'text-red-400 bg-red-950/40 border-red-900/50',
  pending: 'text-amber-400 bg-amber-950/40 border-amber-900/50',
  sent: 'text-blue-400 bg-blue-950/40 border-blue-900/50',
}

export default function CollectAIPage() {
  const [status, setStatus] = useState<TriggerStatus>('idle')
  const [message, setMessage] = useState('')
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])
  const [lastTriggered, setLastTriggered] = useState<string | null>(null)

  function toggleInvoice(id: string) {
    setSelectedInvoices((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  function selectAll() {
    setSelectedInvoices(
      selectedInvoices.length === mockInvoices.length
        ? []
        : mockInvoices.map((i) => i.id)
    )
  }

  async function handleTrigger() {
    if (selectedInvoices.length === 0) {
      setMessage('Please select at least one invoice to trigger collection.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/collectai/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceIds: selectedInvoices }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? `Server error: ${res.status}`)
      }

      setStatus('success')
      setMessage(data.message ?? 'Collection workflow triggered successfully!')
      setLastTriggered(new Date().toLocaleTimeString())
      setSelectedInvoices([])
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'An unknown error occurred.')
    }
  }

  function reset() {
    setStatus('idle')
    setMessage('')
  }

  const overdueCount = mockInvoices.filter((i) => i.status === 'overdue').length
  const totalOverdue = '$52,350'

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Brain size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">CollectAI</h1>
          </div>
          <p className="text-sm text-slate-500 ml-12">
            Intelligent invoice collection — powered by n8n workflow automation.
          </p>
        </div>

        {lastTriggered && (
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
            <Clock size={11} />
            Last triggered: {lastTriggered}
          </div>
        )}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Overdue Invoices', value: String(overdueCount), icon: FileText, color: 'text-red-400', bg: 'bg-red-950/20 border-red-900/30' },
          { label: 'Total Overdue Value', value: totalOverdue, icon: DollarSign, color: 'text-amber-400', bg: 'bg-amber-950/20 border-amber-900/30' },
          { label: 'Selected to Collect', value: String(selectedInvoices.length), icon: CheckCircle2, color: 'text-purple-400', bg: 'bg-purple-950/20 border-purple-900/30' },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className={`rounded-xl p-4 border ${s.bg}`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className={s.color} />
                <span className="text-xs text-slate-500">{s.label}</span>
              </div>
              <p className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
            </div>
          )
        })}
      </div>

      {/* Invoice table */}
      <div className="rounded-xl border border-[#1e293b] bg-[#111827] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e293b]">
          <h2 className="text-sm font-semibold text-white">Overdue &amp; Pending Invoices</h2>
          <button
            onClick={selectAll}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            {selectedInvoices.length === mockInvoices.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        <div className="divide-y divide-[#1a2234]">
          {mockInvoices.map((invoice) => {
            const isSelected = selectedInvoices.includes(invoice.id)
            return (
              <label
                key={invoice.id}
                className={`flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-colors ${
                  isSelected ? 'bg-purple-950/20' : 'hover:bg-slate-800/30'
                }`}
              >
                {/* Checkbox */}
                <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-purple-600 border-purple-600'
                    : 'border-slate-600 bg-transparent'
                }`}>
                  {isSelected && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => toggleInvoice(invoice.id)}
                />

                {/* Invoice ID */}
                <span className="text-xs font-mono text-slate-500 w-28 flex-shrink-0">{invoice.id}</span>

                {/* Client */}
                <span className="text-sm text-slate-300 flex-1 font-medium">{invoice.client}</span>

                {/* Amount */}
                <span className="text-sm font-semibold text-white tabular-nums w-24 text-right">{invoice.amount}</span>

                {/* Days overdue */}
                <span className="text-xs text-slate-500 w-24 text-right">
                  {invoice.daysOverdue}d overdue
                </span>

                {/* Status badge */}
                <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full border w-20 text-center flex-shrink-0 ${statusColors[invoice.status]}`}>
                  {invoice.status}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Trigger section */}
      <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-1">Trigger Collection Workflow</h3>
            <p className="text-xs text-slate-500">
              This will fire your n8n webhook to initiate automated collection emails, SMS reminders,
              and escalation sequences for the selected invoices.
            </p>

            {/* Status message */}
            {status !== 'idle' && message && (
              <div className={`flex items-center gap-2 mt-3 text-sm rounded-lg px-3 py-2 ${
                status === 'success'
                  ? 'bg-emerald-950/40 border border-emerald-900/40 text-emerald-400'
                  : status === 'error'
                  ? 'bg-red-950/40 border border-red-900/40 text-red-400'
                  : 'bg-slate-800/40 text-slate-400'
              }`}>
                {status === 'success' && <CheckCircle2 size={14} />}
                {status === 'error' && <XCircle size={14} />}
                <span>{message}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {(status === 'success' || status === 'error') && (
              <button
                onClick={reset}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
                title="Reset"
              >
                <RefreshCw size={14} />
              </button>
            )}
            <button
              onClick={handleTrigger}
              disabled={status === 'loading'}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all shadow-lg shadow-purple-500/20"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Triggering…
                </>
              ) : (
                <>
                  <Send size={14} />
                  Trigger Collection
                  {selectedInvoices.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-white/20">
                      {selectedInvoices.length}
                    </span>
                  )}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Webhook info */}
        <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-600 font-mono">
          <ChevronDown size={10} />
          POST → /api/collectai/trigger → n8n webhook → automated collection sequences
        </div>
      </div>
    </div>
  )
}

