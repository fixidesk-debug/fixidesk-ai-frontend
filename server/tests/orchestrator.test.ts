import { describe, it, expect, vi } from 'vitest';

vi.mock('../src/utils/db', () => ({
  getSupabaseClient: () => ({
    rpc: async () => ({ data: [] }),
    from: () => ({ insert: async () => ({}) })
  })
}));

import { triage } from '../src/orchestrator';

describe('orchestrator triage', () => {
  it('returns structured triage', async () => {
    const r = await triage('00000000-0000-0000-0000-000000000000', 'I want a refund for my order');
    expect(r).toHaveProperty('intent');
    expect(r).toHaveProperty('suggested_reply');
  });
});
