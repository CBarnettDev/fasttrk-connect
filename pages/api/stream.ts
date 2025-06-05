import { Server } from 'ws'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}

let wss: Server | undefined

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket?.server?.wss) {
    wss = new Server({ noServer: true })

    res.socket.server.on('upgrade', (req, socket, head) => {
      if (req.url === '/api/stream') {
        wss?.handleUpgrade(req, socket, head, (ws) => {
          wss?.emit('connection', ws, req)
        })
      }
    })

    wss.on('connection', (ws) => {
      console.log('🧠 Connected to Twilio Media Stream')

      ws.on('message', async (msg) => {
        const payload = JSON.parse(msg.toString())

        if (payload.event === 'start') {
          console.log('Stream started')
        }

        if (payload.event === 'media') {
          const audio = payload.media.payload
          // TODO: send to transcriber, GPT, ElevenLabs, and return speech
        }

        if (payload.event === 'stop') {
          console.log('Stream ended')
          ws.close()
        }
      })

      ws.on('close', () => {
        console.log('WebSocket closed')
      })
    })

    res.socket.server.wss = wss
  }

  res.end()
}
