import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

// Replace with your preferred test values or use req.body
const TEST_NAME = 'John Doe'
const TEST_PHONE = '9518184668'
const SCRIPT = `Hi, I'm calling to verify insurance for ${TEST_NAME}. Is this the correct line?`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // TODO: Use GPT + ElevenLabs in next step. For now, use placeholder
    const audioUrl = 'https://fasttrk-31bea.web.app/audio/aria-verified-demo.mp3' // Put real MP3 here

    // TODO: Trigger Twilio call
    console.log(`Would call ${TEST_PHONE} and play: ${audioUrl}`)

    // Email confirmation
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fasttrk.bot@gmail.com',
        pass: 'your-password-here' // Replace with real email pass or app password
      }
    })

    await transporter.sendMail({
      from: '"Fasttrk Bot" <fasttrk.bot@gmail.com>',
      to: 'cameron@barnettmedias.com',
      subject: 'Fasttrk Bot Triggered',
      html: `<p>Bot called <strong>${TEST_PHONE}</strong> and played audio: <a href="${audioUrl}">Play MP3</a></p>`
    })

    return res.status(200).json({ success: true })
  } catch (err: any) {
    console.error('API verify error:', err)
    return res.status(500).json({ error: err.message })
  }
}
