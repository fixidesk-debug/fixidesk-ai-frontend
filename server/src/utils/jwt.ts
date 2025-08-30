import { createRemoteJWKSet, jwtVerify, JWTPayload } from 'jose';
import { config } from '../config';

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;

function getJwks() {
  if (!jwks) {
    const url = new URL('/auth/v1/keys', config.supabaseUrl);
    jwks = createRemoteJWKSet(url);
  }
  return jwks!;
}

export async function verifyToken(token: string): Promise<JWTPayload & { org_id?: string; role?: string; email?: string }> {
  const { payload } = await jwtVerify(token, getJwks(), {
    issuer: 'supabase',
  });
  return payload as any;
}
