import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  // Read environment variables (server-only — never exposed to the client)
  const webhookUrl = process.env.N8N_WEBHOOK_URL
  const webhookSecret = process.env.N8N_WEBHOOK_SECRET

  if (!webhookUrl) {
    return Response.json(
      { error: 'N8N_WEBHOOK_URL is not configured in environment variables.' },
      { status: 500 }
    )
  }

  // Parse the request body from the frontend
  let body: { invoiceIds?: string[] }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON in request body.' }, { status: 400 })
  }

  const { invoiceIds } = body

  if (!invoiceIds || !Array.isArray(invoiceIds) || invoiceIds.length === 0) {
    return Response.json(
      { error: 'At least one invoice ID must be provided.' },
      { status: 400 }
    )
  }

  // Build the payload to send to n8n
  const n8nPayload = {
    trigger: 'invoice-collection',
    triggeredAt: new Date().toISOString(),
    invoiceIds,
    meta: {
      source: 'financial-ai-suite',
      environment: process.env.NODE_ENV ?? 'development',
    },
  }

  // Build request headers — include the secret if provided
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (webhookSecret) {
    // Attach as a bearer token or custom header — adjust to match your n8n webhook auth config
    headers['Authorization'] = `Bearer ${webhookSecret}`
  }

  // Forward the request to n8n
  let n8nResponse: Response
  try {
    n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(n8nPayload),
    })
  } catch (err) {
    console.error('[CollectAI] Failed to reach n8n webhook:', err)
    return Response.json(
      { error: 'Could not reach the n8n webhook. Check N8N_WEBHOOK_URL.' },
      { status: 502 }
    )
  }

  if (!n8nResponse.ok) {
    const errText = await n8nResponse.text().catch(() => '')
    console.error(`[CollectAI] n8n responded with ${n8nResponse.status}:`, errText)
    return Response.json(
      {
        error: `n8n webhook returned ${n8nResponse.status}. ${errText}`.trim(),
      },
      { status: 502 }
    )
  }

  return Response.json({
    message: `Collection workflow triggered for ${invoiceIds.length} invoice(s).`,
    triggeredAt: n8nPayload.triggeredAt,
    invoiceIds,
  })
}

