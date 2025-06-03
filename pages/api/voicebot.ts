import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { twiml } = await import('twilio');
    const VoiceResponse = twiml.VoiceResponse;

    const script = `Hi, this is Turbo Rentals calling from Fort Lauderdale regarding one of your insurance policyholders. We’re verifying active coverage for John Smith, who plans to rent a Lamborghini Huracán for 3 days starting May 18, 2025. Does the policy cover liability extension, physical damage, theft, and vandalism? Please confirm that this coverage is valid for rental vehicles.`;

    const elevenResponse = await axios.post(
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

    const audioBase64 = Buffer.from(elevenResponse.data, 'binary').toString('base64');
    const twimlResponse = new VoiceResponse();
    twimlResponse.play({}, `data:audio/mpeg;base64,${audioBase64}`);

    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(twimlResponse.toString());
  } catch (err) {
    console.error('❌ Voicebot Error:', err);
    const { twiml } = await import('twilio');
    const VoiceResponse = twiml.VoiceResponse;
    const errorTwiml = new VoiceResponse();
    errorTwiml.say('Sorry, something went wrong. Please try again later.');

    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(errorTwiml.toString());
  }
}
