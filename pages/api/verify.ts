import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, vehicle } = req.body

  if (!name || !email || !vehicle) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    const response = await fetch('https://devcam27.app.n8n.cloud/webhook/8888630f-b51fa-472f-b850-2513753716a6', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, vehicle })
    })

    if (!response.ok) {
      throw new Error(`Webhook call failed with status ${response.status}`)
    }

    return res.status(200).json({ success: true, message: 'Webhook triggered' })
  } catch (error) {
    console.error('Webhook error:', error)
    return res.status(500).json({ error: 'Webhook request failed' })
  }
}
