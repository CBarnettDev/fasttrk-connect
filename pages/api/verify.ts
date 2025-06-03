import type { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'
import axios from 'axios'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const renterName = 'John Doe'
    const testPhone = '9518184668'
    const script = `Hi, I'm calling to verify insurance for ${renterName}.`

    // 🎤 Generate voice with ElevenLabs
    const elevenResponse = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL/stream',
      {
        text: script,
        model_id: 'eleven_monolingual_v1',
        voice_settings: { stability: 0.4, similarity_boost: 1 }
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY!,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        responseType: 'arraybuffer'
      }
    )

    const audioBuffer = elevenResponse.data
    const base64Audio = Buffer.from(audioBuffer).toString('base64')
    const audioUrl = `data:audio/mpeg;base64,${base64Audio}`

    // 📧 Send Email via SendGrid with inline audio
    const msg = {
      to: process.env.FASTTRK_EMAIL!,
      from: 'no-reply@fasttrk.ai',
      subject: '✅ Fasttrk Bot Triggered',
      html: `
        <p><strong>Bot would call ${testPhone}</strong> and say:</p>
        <blockquote>${script}</blockquote>
        <p><strong>Preview Audio:</strong></p>
        <audio controls src="${audioUrl}"></audio>
      `
    }

    await sgMail.send(msg)
    return res.status(200).json({ success: true })
  } catch (err: any) {
    console.error('❌ ERROR:', err.response?.data || err.message)
    return res.status(500).json({ error: 'Bot failed to trigger' })
  }
}
