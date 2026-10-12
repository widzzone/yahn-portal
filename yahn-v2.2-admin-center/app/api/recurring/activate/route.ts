import { NextResponse } from 'next/server';
import { callDonorBackend } from '@/lib/backend';

const MIN_MONTHLY = 1_000_000;
const MAX_PROOF_SIZE = 3 * 1024 * 1024;
const ALLOWED_PROOF_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = Number(body.amount || 0);
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const whatsapp = String(body.whatsapp || '').trim();
    const proof = body.proof;

    if (!name || !email || !whatsapp) {
      return NextResponse.json({ status: 'error', message: 'Nama, email, dan WhatsApp wajib diisi.' }, { status: 400 });
    }
    if (!Number.isFinite(amount) || amount < MIN_MONTHLY) {
      return NextResponse.json({ status: 'error', message: 'Dukungan bulanan dimulai dari Rp1.000.000.' }, { status: 400 });
    }
    if (!proof?.base64) {
      return NextResponse.json({ status: 'error', message: 'Bukti pembayaran bulan pertama wajib dilampirkan.' }, { status: 400 });
    }
    if (!ALLOWED_PROOF_TYPES.includes(String(proof.mimeType || ''))) {
      return NextResponse.json({ status: 'error', message: 'Format bukti harus JPG, PNG, WEBP, atau PDF.' }, { status: 400 });
    }
    const size = Number(proof.size || 0);
    if (!Number.isFinite(size) || size <= 0 || size > MAX_PROOF_SIZE) {
      return NextResponse.json({ status: 'error', message: 'Ukuran bukti pembayaran maksimal 3 MB.' }, { status: 400 });
    }

    const data = await callDonorBackend('registerRecurringWithPayment', { ...body, amount });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ status: 'error', message: error instanceof Error ? error.message : 'Gagal mengaktifkan dukungan bulanan.' }, { status: 400 });
  }
}
