// File: /pages/api/voicebot.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { VoiceResponse } from 'twilio';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const script = `Hi, this is Turbo Rentals calling from Fort Lauderdale regarding one of your insurance policyholders. We're verifying active coverage for John Smith, who plans to rent a Lamborghini Huracán for 3 days starting May 18, 2025.\n\nDoes the policy cover: liability extension, physical damage, theft, and vandalism?\n\nPlease confirm that this coverage is valid for rental vehicles. Thank you.`;

    const response = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL/stream',
      {
        text: script,
        model_id: 'eleven_monolingual_v1'
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY!,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    );

    const audioBase64 = Buffer.from(response.data, 'binary').toString('base64');

    const twiml = new VoiceResponse();
    const playUrl = `data:audio/mpeg;base64,${audioBase64}`;
    twiml.play({}, playUrl);

    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(twiml.toString());
  } catch (err) {
    console.error('❌ Voicebot Error:', err);
    const errorTwiml = new VoiceResponse();
    errorTwiml.say('We are sorry, the verification bot encountered an error. Please try again later.');
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(errorTwiml.toString());
  }
}
