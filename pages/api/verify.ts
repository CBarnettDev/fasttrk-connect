import type { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const renterName = 'John Doe'
    const testPhone = '9518184668'
    const script = `Hi, I'm calling to verify insurance for ${renterName}.`

    // Log confirmation
    console.log(`🚀 Bot would call ${testPhone} with: ${script}`)

    // Send confirmation email via SendGrid
    const msg = {
      to: 'cameron@barnettmedias.com',
      from: 'no-reply@fasttrk.ai',
      subject: '✅ Fasttrk Bot Triggered',
      html: `<p>Bot would call <strong>${testPhone}</strong> and say:</p><blockquote>${script}</blockquote>`
    }

    await sgMail.send(msg)

    res.status(200).json({ success: true })
  } catch (err: any) {
    console.error('❌ API error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
