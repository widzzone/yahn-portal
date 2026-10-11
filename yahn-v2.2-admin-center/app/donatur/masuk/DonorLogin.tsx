'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DonorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function requestCode(e: FormEvent) {
    e.preventDefault(); setLoading(true); setMessage('');
    try {
      const r = await fetch('/api/donor/request-otp', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email }) });
      const data = await r.json(); if (!r.ok) throw new Error(data.message);
      setSent(true); setMessage('Kode akses sudah dikirim ke email donatur yang terdaftar.');
    } catch (e) { setMessage(e instanceof Error ? e.message : 'Gagal mengirim kode.'); }
    finally { setLoading(false); }
  }

  async function verify(e: FormEvent) {
    e.preventDefault(); setLoading(true); setMessage('');
    try {
      const r = await fetch('/api/donor/verify-otp', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, code }) });
      const data = await r.json(); if (!r.ok) throw new Error(data.message);
      router.push('/donatur/dashboard'); router.refresh();
    } catch (e) { setMessage(e instanceof Error ? e.message : 'Kode tidak valid.'); }
    finally { setLoading(false); }
  }

  return <section className="donor25-login-card">
    <div className="donor25-login-icon">♡</div>
    <span className="eyebrow">Portal Donatur</span>
    <h2>{sent ? 'Masukkan kode akses' : 'Masuk ke dashboard Anda'}</h2>
    <p>{sent ? `Kode 6 digit telah dikirim ke ${email}.` : 'Tidak perlu password. Masukkan email yang pernah digunakan saat berdonasi.'}</p>
    {!sent ? <form onSubmit={requestCode}>
      <div className="field"><label>Email donatur</label><input className="input" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="nama@email.com" /></div>
      <button className="btn btn-primary btn-block" disabled={loading}>{loading ? 'Mengirim...' : 'Kirim kode akses →'}</button>
    </form> : <form onSubmit={verify}>
      <div className="field"><label>Kode 6 digit</label><input className="input otp-input" inputMode="numeric" maxLength={6} required value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,''))} placeholder="000000" /></div>
      <button className="btn btn-primary btn-block" disabled={loading || code.length !== 6}>{loading ? 'Memverifikasi...' : 'Masuk ke dashboard →'}</button>
      <button className="text-button" type="button" onClick={()=>{setSent(false);setCode('');setMessage('')}}>Gunakan email lain</button>
    </form>}
    {message && <div className="notice notice-info donor25-message">{message}</div>}
    <div className="donor25-login-foot">Belum pernah berdonasi? <a href="/donasi/sekarang">Mulai donasi pertama →</a></div>
  </section>;
}
