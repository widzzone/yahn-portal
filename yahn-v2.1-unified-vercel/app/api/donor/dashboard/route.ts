import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { callDonorBackend } from '@/lib/backend';
import { readSessionToken } from '@/lib/session';

export async function GET() {
  try {
    const store = await cookies();
    const session = readSessionToken(store.get('yahn_donor_session')?.value);
    if (!session || session.kind !== 'donor') return NextResponse.json({ status: 'error', message: 'Sesi donor tidak tersedia.' }, { status: 401 });
    const data = await callDonorBackend('getDonorDashboard', { email: session.email });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ status: 'error', message: error instanceof Error ? error.message : 'Gagal memuat dashboard.' }, { status: 400 });
  }
}
