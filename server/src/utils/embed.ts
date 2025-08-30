import crypto from 'crypto';

const DIM = 1536;

export function embedText(text: string): number[] {
  const buf = Buffer.from(text.normalize('NFKC'));
  const vec = new Float32Array(DIM);
  for (let i = 0; i < buf.length; i++) {
    const idx = buf[i] % DIM;
    vec[idx] += 1;
  }
  // L2 normalize
  let norm = 0;
  for (let i = 0; i < DIM; i++) norm += vec[i] * vec[i];
  norm = Math.sqrt(norm) || 1;
  for (let i = 0; i < DIM; i++) vec[i] /= norm;
  return Array.from(vec);
}
