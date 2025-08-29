import { describe, it, expect } from 'vitest';
import chatwoot from '../src/adapters/chatwoot';

describe('chatwoot adapter', () => {
  it('handles unsupported event', async () => {
    const req: any = { body: { event: 'x' }, query: {} };
    const res: any = { status: (c: number) => ({ json: (b: any) => ({ c, b }) }), json: (b: any) => b };
    const r = await chatwoot.webhook(req, res);
    expect(r).toBeDefined();
  });
});
