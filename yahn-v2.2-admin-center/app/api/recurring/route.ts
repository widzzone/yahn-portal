import { callDonorBackend } from '@/lib/backend';

const MIN_MONTHLY = 1_000_000;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = Number(body.amount || 0);
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const whatsapp = String(body.whatsapp || '').trim();
    if (!name || !email || !whatsapp) {
      return Response.json({ status: 'error', message: 'Nama, email, dan WhatsApp wajib diisi.' }, { status: 400 });
    }
    if (!Number.isFinite(amount) || amount < MIN_MONTHLY) {
      return Response.json({ status: 'error', message: 'Komitmen bulanan dimulai dari Rp1.000.000.' }, { status: 400 });
    }
    const data = await callDonorBackend('registerRecurringDonor', { ...body, amount });
    return Response.json(data);
  } catch (e) {
    return Response.json({ status: 'error', message: e instanceof Error ? e.message : 'Gagal menyimpan komitmen bulanan.' }, { status: 400 });
  }
}
