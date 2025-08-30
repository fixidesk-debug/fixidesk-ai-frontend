import { createHmac } from 'crypto';

const SECRET = process.env.SECRET_ENCRYPTION_KEY || 'change-me';

export function signPayload(body: any): string {
  const payload = typeof body === 'string' ? body : JSON.stringify(body);
  return createHmac('sha256', SECRET).update(payload).digest('hex');
}
