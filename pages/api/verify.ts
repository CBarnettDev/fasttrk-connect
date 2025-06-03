import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, vehicle } = req.body;

  if (!name || !email || !vehicle) {
    return res.status(400).json({ error: 'Missing fields in request body' });
  }

  try {
    const response = await fetch('https://devcam27.app.n8n.cloud/webhook/8888630f-b51fa-472f-b850-2513753716a6', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, vehicle })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`n8n webhook failed: ${errorText}`);
    }

    return res.status(200).json({ success: true, message: 'Webhook triggered successfully' });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Failed to send request to n8n webhook', details: error.message });
  }
}
