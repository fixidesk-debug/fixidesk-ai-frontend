import http from 'http';
import { WebSocketServer } from 'ws';
import app from './app';
import { config } from './config';
import { logger } from './utils/logger';

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/v1/realtime' });

const channels = new Map<string, Set<any>>();

function subscribe(ws: any, channel: string) {
  if (!channels.has(channel)) channels.set(channel, new Set());
  channels.get(channel)!.add(ws);
}
function publish(channel: string, data: any) {
  const subs = channels.get(channel);
  if (!subs) return;
  const payload = JSON.stringify(data);
  for (const ws of subs) {
    if (ws.readyState === ws.OPEN) ws.send(payload);
  }
}

wss.on('connection', (ws) => {
  ws.on('message', (raw: Buffer) => {
    try {
      const msg = JSON.parse(raw.toString());
      if (msg.type === 'subscribe' && typeof msg.channel === 'string') {
        subscribe(ws, msg.channel);
        ws.send(JSON.stringify({ ok: true, subscribed: msg.channel }));
      }
    } catch {}
  });
  ws.on('close', () => {
    for (const set of channels.values()) set.delete(ws);
  });
});

(server as any).publish = publish;

server.listen(config.port, () => logger.info({ port: config.port }, 'FixiDesk API listening'));

export { publish };
