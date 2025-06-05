import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const streamUrl = 'wss://fasttrk-connect.vercel.app/api/stream'; 
  const twiml = `
    <Response>
      <Connect>
        <Stream url="${streamUrl}" />
      </Connect>
    </Response>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml);
}
