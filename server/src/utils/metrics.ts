import client from 'prom-client';
import type { Request, Response, NextFunction } from 'express';

client.collectDefaultMetrics();

export const requestCounter = new client.Counter({
  name: 'fixidesk_requests_total',
  help: 'Total requests',
  labelNames: ['org_id', 'endpoint'],
});

export const tokensCounter = new client.Counter({
  name: 'llm_tokens_used_total',
  help: 'LLM tokens used',
  labelNames: ['org_id', 'model'],
});

export const twilioMinutes = new client.Counter({
  name: 'twilio_call_minutes',
  help: 'Twilio call minutes used',
  labelNames: ['org_id'],
});

export const slaBreaches = new client.Counter({
  name: 'sla_breaches',
  help: 'SLA breaches',
  labelNames: ['org_id'],
});

export function metricsMiddleware(req: Request, _res: Response, next: NextFunction) {
  const orgId = (req as any).auth?.org_id || 'unknown';
  requestCounter.labels(orgId, req.path).inc();
  next();
}

export async function metricsHandler(_req: Request, res: Response) {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
}
