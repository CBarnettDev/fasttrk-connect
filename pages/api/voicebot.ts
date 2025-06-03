import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { default: twilio } = await import('twilio');
    const VoiceResponse = twilio.twiml.VoiceResponse;

    const script = `Hello, this is Fasttrk Connect calling on behalf of Murci Rentals. We're verifying insurance coverage for a customer planning to rent a Lamborghini Huracán starting May 18, 2025. Can you please confirm whether the policy includes liability extension, comprehensive and collision coverage, theft, and vandalism coverage for rental vehicles? Thank you.`;

    const elevenResponse = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/8LVfoRdkh4zgjr8v5ObE/stream',
      {
        text: script,
        model_id: 'eleven_monolingual_v1',
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY!,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    const audioBase64 = Buffer.from(elevenResponse.data, 'binary').toString('base64');
    const twimlResponse = new VoiceResponse();
    twimlResponse.play({}, `data:audio/mpeg;base64,${audioBase64}`);

    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(twimlResponse.toString());

  } catch (err) {
    console.error('❌ Voicebot Error:', err);
    try {
      const { default: twilio } = await import('twilio');
      const VoiceResponse = twilio.twiml.VoiceResponse;
      const errorTwiml = new VoiceResponse();
      errorTwiml.say('Sorry, something went wrong. Please try again later.');
      res.setHeader('Content-Type', 'text/xml');
      res.status(200).send(errorTwiml.toString());
    } catch (secondaryErr) {
      console.error('❌ Fallback Twilio Error:', secondaryErr);
      res.status(500).end();
    }
  }
}
