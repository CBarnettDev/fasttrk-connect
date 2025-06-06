// pages/api/stream.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as WebSocketServer } from 'ws';
import type { WebSocket } from 'ws';
import http from 'http';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!res.socket?.server) {
    res.status(500).end('Internal Server Error');
    return;
  }

  if (!(res.socket.server as any).wss) {
    const server = res.socket.server as any;

    const wss = new WebSocketServer({ noServer: true });

    server.on('upgrade', (request: http.IncomingMessage, socket, head) => {
      const { url } = request;
      if (url?.includes('/api/stream')) {
        wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
          wss.emit('connection', ws, request);
        });
      }
    });

    wss.on('connection', (ws: WebSocket) => {
      ws.on('message', (msg: Buffer) => {
        const message = msg.toString();

        if (message.includes('start')) {
          console.log('Twilio stream started');
        } else if (message.includes('media')) {
          const parsed = JSON.parse(message);
          const audio = parsed.media.payload;
          // TODO: Handle live audio stream (e.g., transcription, analysis, etc.)
        } else if (message.includes('stop')) {
          console.log('Twilio stream stopped');
        }
      });

      ws.on('close', () => {
        console.log('WebSocket connection closed');
      });
    });

    (res.socket.server as any).wss = wss;
  }

  res.end();
};

export default handler;
