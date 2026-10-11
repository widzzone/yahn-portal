import { createHmac, timingSafeEqual } from 'crypto';

export type SessionPayload = {
  kind: 'donor' | 'scholarship' | 'admin';
  email: string;
  name: string;
  id?: string;
  role?: string;
  exp: number;
};

function secret() {
  const value = process.env.YAHN_SESSION_SECRET || process.env.YAHN_API_SECRET;
  if (!value) throw new Error('YAHN_SESSION_SECRET/YAHN_API_SECRET belum dikonfigurasi.');
  return value;
}

function sign(raw: string) {
  return createHmac('sha256', secret()).update(raw).digest('base64url');
}

export function createSessionToken(payload: Omit<SessionPayload, 'exp'>, days = 7) {
  const full: SessionPayload = { ...payload, exp: Date.now() + days * 24 * 60 * 60 * 1000 };
  const raw = Buffer.from(JSON.stringify(full)).toString('base64url');
  return `${raw}.${sign(raw)}`;
}

export function readSessionToken(token?: string | null): SessionPayload | null {
  if (!token) return null;
  const [raw, sig] = token.split('.');
  if (!raw || !sig) return null;
  const expected = sign(raw);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8')) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch { return null; }
}
