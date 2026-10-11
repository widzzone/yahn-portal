import { NextResponse } from 'next/server';
import { callDonorBackend } from '@/lib/backend';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ status: 'error', message: 'Email wajib diisi.' }, { status: 400 });
    const data = await callDonorBackend('requestDonorOtp', { email });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ status: 'error', message: error instanceof Error ? error.message : 'Gagal mengirim kode.' }, { status: 400 });
  }
}
