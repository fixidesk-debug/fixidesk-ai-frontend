import { describe, it, expect, vi } from 'vitest';
import { idempotency } from '../src/middleware/idempotency';

vi.mock('../src/utils/db', () => ({
  getSupabaseClient: () => ({
    from: () => ({ insert: async () => ({ error: null }) })
  })
}));

describe('idempotency middleware', () => {
  it('passes through when key not present', async () => {
    const req: any = { headers: {}, auth: { org_id: 'org' } };
    const res: any = {};
    let progressed = false;
    await idempotency()(req, res, () => { progressed = true; });
    expect(progressed).toBe(true);
  });

  it('returns 409 on duplicate', async () => {
    vi.doMock('../src/utils/db', () => ({
      getSupabaseClient: () => ({ from: () => ({ insert: async () => ({ error: { code: '23505' } }) }) })
    }));
    const req: any = { headers: { 'idempotency-key': 'abc' }, auth: { org_id: 'org' } };
    const res: any = { status: (c: number) => ({ json: (b: any) => ({ c, b }) }) };
    const r: any = await idempotency()(req, res, () => {});
    expect(r?.c).toBe(409);
  });
});
