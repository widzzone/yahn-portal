import { NextResponse } from 'next/server';
import { callDonorBackend } from '@/lib/backend';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const data = id ? await callDonorBackend('getPublicRecipient', { recipientId: id }) : await callDonorBackend('getPublicRecipients');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ status: 'error', message: error instanceof Error ? error.message : 'Gagal memuat penerima.' }, { status: 400 });
  }
}
