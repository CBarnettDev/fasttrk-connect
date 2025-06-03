// pages/api/verify.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, vehicle } = req.body;

    const response = await fetch('https://devcam27.app.n8n.cloud/webhook/8888630f-b51fa-472f-b850-2513753716a6', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, vehicle }),
    });

    const result = await response.json();
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: (error as Error).message });
  }
}
