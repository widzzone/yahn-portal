import { NextResponse } from 'next/server';
import { callDonorBackend } from '@/lib/backend';
import { createSessionToken } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();
    if (!email || !code) return NextResponse.json({ status: 'error', message: 'Email dan kode wajib diisi.' }, { status: 400 });
    const data = await callDonorBackend('verifyDonorOtp', { email, code });
    const token = createSessionToken({ kind: 'donor', email: data.donor.email, name: data.donor.name, id: data.donor.donorId });
    const res = NextResponse.json({ status: 'success', donor: data.donor });
    res.cookies.set('yahn_donor_session', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (error) {
    return NextResponse.json({ status: 'error', message: error instanceof Error ? error.message : 'Kode tidak valid.' }, { status: 400 });
  }
}
