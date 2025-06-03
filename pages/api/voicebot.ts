import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { default: twilio } = await import('twilio');
    const { VoiceResponse } = twilio.twiml;

    const script = `Hi, this is Turbo Rentals calling from Fort Lauderdale regarding one of your insurance policyholders. We’re verifying active coverage for John Smith, who plans to rent a Lamborghini Huracán for 3 days starting May 18, 2025. Does the policy cover liability extension, physical damage, theft, and vandalism? Please confirm that this coverage is valid for rental vehicles.`;

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL/stream`,
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

    const audioBase64 = Buffer.from(response.data, 'binary').toString('base64');

    const twiml = new VoiceResponse();
    const playUrl = `data:audio/mpeg;base64,${audioBase64}`;
    twiml.play({}, playUrl);

    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(twiml.toString());
  } catch (err) {
    console.error('❌ Twilio bot error:', err);
    const { VoiceResponse } = await (await import('twilio')).twiml;
    const errorTwiml = new VoiceResponse();
    errorTwiml.say(
      'Sorry, the verification bot encountered an error. Please try again later.'
    );
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(errorTwiml.toString());
  }
}
