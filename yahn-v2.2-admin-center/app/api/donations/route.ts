import { NextResponse } from 'next/server';
import { callDonorBackend } from '@/lib/backend';

type ProofBody = {
  name?: unknown;
  mimeType?: unknown;
  size?: unknown;
  base64?: unknown;
};

type DonationBody = {
  name?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  amount?: unknown;
  method?: unknown;
  anonymous?: unknown;
  proof?: ProofBody;
};

const MAX_PROOF_SIZE = 3 * 1024 * 1024;
const ALLOWED_PROOF_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DonationBody;
    const amount = Number(body.amount);
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const whatsapp = String(body.whatsapp || '').trim();

    if (!name || !email || !whatsapp || !Number.isFinite(amount) || amount < 10000) {
      return NextResponse.json(
        { status: 'error', message: 'Nama, email, WhatsApp, dan nominal minimal Rp10.000 wajib diisi.' },
        { status: 400 }
      );
    }

    const proof = body.proof;
    if (!proof?.base64) {
      return NextResponse.json(
        { status: 'error', message: 'Bukti pembayaran wajib dilampirkan untuk proses verifikasi.' },
        { status: 400 }
      );
    }

    const size = Number(proof.size || 0);
    const mimeType = String(proof.mimeType || '');
    if (!ALLOWED_PROOF_TYPES.includes(mimeType)) {
      return NextResponse.json(
        { status: 'error', message: 'Format bukti pembayaran harus JPG, PNG, WEBP, atau PDF.' },
        { status: 400 }
      );
    }
    if (!Number.isFinite(size) || size <= 0 || size > MAX_PROOF_SIZE) {
      return NextResponse.json(
        { status: 'error', message: 'Ukuran bukti pembayaran maksimal 3 MB.' },
        { status: 400 }
      );
    }

    const data = await callDonorBackend('submitDonation', { ...body, amount });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: error instanceof Error ? error.message : 'Gagal mencatat donasi.' },
      { status: 400 }
    );
  }
}
