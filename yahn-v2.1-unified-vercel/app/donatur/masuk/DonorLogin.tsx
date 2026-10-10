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
      setSent(true); setMessage('Kode akses dikirim ke email yang terdaftar sebagai donatur YAHN.');
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

  return <div className="auth-card">
    <div className="auth-icon">♡</div>
    <div className="eyebrow">Portal Donatur</div>
    <h2>{sent ? 'Masukkan kode akses' : 'Lihat dampak kontribusi Anda'}</h2>
    <p>{sent ? `Kami mengirim kode 6 digit ke ${email}.` : 'Masuk tanpa password. Kami akan mengirim kode akses satu kali ke email donatur yang terdaftar.'}</p>
    {!sent ? <form onSubmit={requestCode}>
      <div className="field"><label>Email donatur</label><input className="input" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="nama@email.com" /></div>
      <button className="btn btn-primary btn-block" disabled={loading}>{loading ? 'Mengirim...' : 'Kirim kode akses →'}</button>
    </form> : <form onSubmit={verify}>
      <div className="otp-row"><input className="input otp-input" inputMode="numeric" maxLength={6} required value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,''))} placeholder="000000" /></div>
      <button className="btn btn-primary btn-block" disabled={loading || code.length !== 6}>{loading ? 'Memverifikasi...' : 'Masuk ke dashboard →'}</button>
      <button className="text-button" type="button" onClick={()=>{setSent(false);setCode('');setMessage('')}}>Gunakan email lain</button>
    </form>}
    {message && <div className="notice notice-info">{message}</div>}
    <div className="auth-foot">Belum pernah berdonasi? <a href="/donasi/sekarang">Mulai dari donasi pertama</a></div>
  </div>;
}
