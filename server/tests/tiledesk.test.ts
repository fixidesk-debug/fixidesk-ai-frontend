import { describe, it, expect } from 'vitest';
import tiledesk from '../src/adapters/tiledesk';

describe('tiledesk adapter', () => {
  it('handles bot message without DB', async () => {
    const req: any = { body: { type: 'bot_message', org_id: '00000000-0000-0000-0000-000000000000' }, query: {} };
    const res: any = { json: (b: any) => b };
    const r = await tiledesk.webhook(req, res);
    expect(r).toEqual({ ok: true });
  });
});
