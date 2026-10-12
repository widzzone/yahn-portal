import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { callDonorBackend } from '@/lib/backend';
import { readSessionToken } from '@/lib/session';

const MAX_PROOF_SIZE = 3 * 1024 * 1024;
const ALLOWED_PROOF_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

export async function POST(req: Request) {
  try {
    const store = await cookies();
    const session = readSessionToken(store.get('yahn_donor_session')?.value);
    if (!session || session.kind !== 'donor') {
      return NextResponse.json({ status: 'error', message: 'Silakan masuk ke Portal Sahabat terlebih dahulu.' }, { status: 401 });
    }
    const body = await req.json();
    const proof = body.proof;
    if (!body.recurringId) {
      return NextResponse.json({ status: 'error', message: 'Komitmen bulanan tidak ditemukan.' }, { status: 400 });
    }
    if (!proof?.base64) {
      return NextResponse.json({ status: 'error', message: 'Bukti pembayaran wajib dilampirkan.' }, { status: 400 });
    }
    if (!ALLOWED_PROOF_TYPES.includes(String(proof.mimeType || ''))) {
      return NextResponse.json({ status: 'error', message: 'Format bukti harus JPG, PNG, WEBP, atau PDF.' }, { status: 400 });
    }
    const size = Number(proof.size || 0);
    if (!Number.isFinite(size) || size <= 0 || size > MAX_PROOF_SIZE) {
      return NextResponse.json({ status: 'error', message: 'Ukuran bukti pembayaran maksimal 3 MB.' }, { status: 400 });
    }
    const data = await callDonorBackend('submitRecurringPayment', { ...body, email: session.email });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ status: 'error', message: error instanceof Error ? error.message : 'Gagal mencatat pembayaran bulanan.' }, { status: 400 });
  }
}
