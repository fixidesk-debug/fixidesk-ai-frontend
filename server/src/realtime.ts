import { Server as HttpServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { verifyToken } from './utils/jwt';
import { logger } from './utils/logger';

const channels = new Map<string, Set<WebSocket>>();

export function publish(channel: string, data: any) {
  const subs = channels.get(channel);
  if (!subs) return;
  const payload = JSON.stringify(data);
  for (const ws of subs) {
    if ((ws as any).readyState === ws.OPEN) ws.send(payload);
  }
}

function subscribe(ws: WebSocket, channel: string) {
  if (!channels.has(channel)) channels.set(channel, new Set());
  channels.get(channel)!.add(ws);
}

export function attachToServer(server: HttpServer) {
  const wss = new WebSocketServer({ server, path: '/v1/realtime' });

  wss.on('connection', async (ws, req) => {
    const url = new URL(req.url || '', 'http://localhost');
    const token = url.searchParams.get('token') || '';
    let orgId: string | null = null;
    if (token) {
      try {
        const payload = await verifyToken(token);
        orgId = (payload as any).org_id || null;
        (ws as any).org_id = orgId;
      } catch (e) {
        logger.warn('WS auth failed');
      }
    }
    ws.on('message', (raw: Buffer) => {
      try {
        const msg = JSON.parse(raw.toString());
        if (msg.type === 'subscribe' && typeof msg.channel === 'string') {
          if (orgId && !msg.channel.startsWith(`org:${orgId}:`)) {
            return ws.send(JSON.stringify({ ok: false, error: 'forbidden_channel' }));
          }
          subscribe(ws, msg.channel);
          return ws.send(JSON.stringify({ ok: true, subscribed: msg.channel }));
        }
      } catch {}
    });
    ws.on('close', () => {
      for (const set of channels.values()) set.delete(ws);
    });
  });
}
