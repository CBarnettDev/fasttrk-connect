import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const body = req.body;

  if (!webhookUrl) {
    return res.status(500).json({ error: "Missing N8N_WEBHOOK_URL" });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const result = await response.text();
    return res.status(200).json({ message: "Webhook triggered", result });
  } catch (err) {
    return res.status(500).json({ error: "Failed to trigger webhook", details: err });
  }
}