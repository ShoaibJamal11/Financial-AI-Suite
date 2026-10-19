import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

/**
 * Creates a Supabase admin client using server-side environment variables.
 * Uses SUPABASE_SERVICE_ROLE_KEY (not the anon key) for elevated server access.
 * This function is only called inside Route Handlers — never exposed to the client.
 */
function createSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing required environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'
    )
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      // Disable auto refresh / session persistence for server-side admin client
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

/**
 * GET /api/profitguard
 *
 * Fetches cash flow and financial metrics from Supabase.
 * Currently returns placeholder data — replace the TODO sections with real queries.
 */
export async function GET(_request: NextRequest) {
  let supabase: ReturnType<typeof createSupabaseAdmin>

  try {
    supabase = createSupabaseAdmin()
  } catch (err) {
    console.error('[ProfitGuard] Supabase init error:', err)
    return Response.json(
      {
        error:
          err instanceof Error
            ? err.message
            : 'Failed to initialise Supabase client.',
      },
      { status: 500 }
    )
  }

  try {
    // ── TODO: Replace with your real Supabase queries ─────────────────────────

    // Example — fetch cash flow records for the last 6 months:
    // const { data: cashFlowData, error: cashFlowError } = await supabase
    //   .from('cash_flow')
    //   .select('month, inflow, outflow')
    //   .order('month', { ascending: true })
    //   .limit(6)
    //
    // if (cashFlowError) throw cashFlowError

    // Example — fetch overdue invoices:
    // const { data: overdueInvoices, error: invoiceError } = await supabase
    //   .from('invoices')
    //   .select('id, client, amount, due_date, status')
    //   .eq('status', 'overdue')
    //
    // if (invoiceError) throw invoiceError

    // ─────────────────────────────────────────────────────────────────────────

    // Placeholder response until real tables are created
    const placeholderData = {
      cashFlow: [
        { month: 'May', inflow: 820000, outflow: 610000 },
        { month: 'Jun', inflow: 940000, outflow: 720000 },
        { month: 'Jul', inflow: 780000, outflow: 650000 },
        { month: 'Aug', inflow: 1100000, outflow: 830000 },
        { month: 'Sep', inflow: 960000, outflow: 740000 },
        { month: 'Oct', inflow: 1230000, outflow: 890000 },
      ],
      forecast: [
        { month: 'Nov', projected: 1350000, confidence: 0.92 },
        { month: 'Dec', projected: 1480000, confidence: 0.85 },
        { month: 'Jan', projected: 1190000, confidence: 0.78 },
      ],
      summary: {
        netCashFlowMtd: 340000,
        monthlyBurnRate: 890000,
        cashRunwayMonths: 14,
        accountsReceivable: 248000,
      },
      meta: {
        source: 'supabase-placeholder',
        generatedAt: new Date().toISOString(),
      },
    }

    return Response.json(placeholderData)
  } catch (err) {
    console.error('[ProfitGuard] Query error:', err)
    return Response.json(
      {
        error:
          err instanceof Error
            ? err.message
            : 'Failed to fetch data from Supabase.',
      },
      { status: 500 }
    )
  }
}

