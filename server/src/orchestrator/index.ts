import { getSupabaseClient } from '../utils/db';
import { randomUUID } from 'crypto';
import { tokensCounter } from '../utils/metrics';

export async function triage(org_id: string, message: string) {
  const lower = message.toLowerCase();
  let intent = 'general_question';
  let action: any = null;
  if (lower.includes('refund')) { intent = 'refund_request'; action = { name: 'refund', params: { amount: null } }; }
  if (lower.includes('shipping') || lower.includes('where is my order')) { intent = 'shipping_update'; action = { name: 'shipping_update', params: {} }; }
  const suggested_reply = intent === 'refund_request' ? 'I can help with a refund. Could you share your order ID?' : 'Thanks for reaching out! Could you provide more details?';
  const supabase = getSupabaseClient();
  await supabase.from('ai_logs').insert({ id: randomUUID(), org_id, prompt_hash: 'stub', response_id: randomUUID(), llm_model: 'stub', tokens_used: 16, meta: { message } });
  tokensCounter.labels(org_id, 'stub').inc(16);
  return { intent, confidence: 0.6, action, suggested_reply, sources: [] };
}
