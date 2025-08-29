import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const ENC_ALGO = 'aes-256-gcm';
const KEY = Buffer.from((process.env.SECRET_ENCRYPTION_KEY || '').padEnd(32, '0').slice(0,32));

export function encryptString(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ENC_ALGO, KEY, iv);
  const enc = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]).toString('base64');
}

export function decryptString(encB64: string): string {
  const buf = Buffer.from(encB64, 'base64');
  const iv = buf.subarray(0,12);
  const tag = buf.subarray(12,28);
  const data = buf.subarray(28);
  const decipher = createDecipheriv(ENC_ALGO, KEY, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(data), decipher.final()]);
  return dec.toString('utf8');
}
