export async function callDonorBackend(action: string, payload: Record<string, unknown> = {}) {
  const backend = process.env.APPS_SCRIPT_WEB_APP_URL;
  const secret = process.env.YAHN_API_SECRET;
  if (!backend || !secret) throw new Error('Backend donor belum dikonfigurasi di Vercel.');
  const res = await fetch(backend, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, secret, payload }),
    cache: 'no-store'
  });
  const text = await res.text();
  let data: any;
  try { data = JSON.parse(text); } catch { throw new Error('Respons Apps Script donor tidak valid.'); }
  if (data.status !== 'success') throw new Error(data.message || 'Permintaan donor gagal.');
  return data;
}

export async function callScholarshipBackend(action: string, payload: Record<string, unknown> = {}) {
  const backend = process.env.SCHOLARSHIP_APPS_SCRIPT_WEB_APP_URL || process.env.NEXT_PUBLIC_SCHOLARSHIP_PORTAL_URL;
  const secret = process.env.YAHN_SCHOLARSHIP_API_SECRET;
  if (!backend || !secret) throw new Error('Backend beasiswa Vercel belum dikonfigurasi.');
  const res = await fetch(backend, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, secret, payload }),
    cache: 'no-store'
  });
  const text = await res.text();
  let data: any;
  try { data = JSON.parse(text); } catch { throw new Error('Respons Apps Script beasiswa tidak valid.'); }
  if (data.status !== 'success') throw new Error(data.message || 'Permintaan beasiswa gagal.');
  return data;
}
