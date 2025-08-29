import { describe, it, expect } from 'vitest';
import tiledesk from '../src/adapters/tiledesk';

describe('tiledesk adapter', () => {
  it('handles handoff', async () => {
    const req: any = { body: { type: 'handoff', reason: 'manual', transcript: 'hi', org_id: '00000000-0000-0000-0000-000000000000' }, query: {} };
    const res: any = { json: (b: any) => b };
    const r = await tiledesk.webhook(req, res);
    expect(r).toBeDefined();
  });
});
