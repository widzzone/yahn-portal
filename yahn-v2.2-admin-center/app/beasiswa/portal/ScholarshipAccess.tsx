'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type Mode='login'|'register'|'recovery';

export default function ScholarshipAccess() {
  const router = useRouter();
  const [mode,setMode]=useState<Mode>('login');
  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [nim,setNim]=useState('');
  const [code,setCode]=useState('');
  const [sent,setSent]=useState(false);
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState('');
  const [hint,setHint]=useState('');
  const [lookupDone,setLookupDone]=useState(false);
  const [whatsapp,setWhatsapp]=useState('');
  const [newEmail,setNewEmail]=useState('');

  function reset(next:Mode){setMode(next);setSent(false);setCode('');setMsg('');setHint('');setLookupDone(false);setNewEmail('')}

  async function requestOtp(e:FormEvent){
    e.preventDefault();setLoading(true);setMsg('');setHint('');
    try{
      const r=await fetch('/api/scholarship/request-otp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,name,nim,mode})});
      const d=await r.json();
      if(!r.ok){
        if(d.maskedEmail)setHint(d.maskedEmail);
        throw new Error(d.message||'Gagal mengirim kode akses.');
      }
      setSent(true);setMsg('Kode akses telah dikirim ke email Anda.');
    }catch(e){setMsg(e instanceof Error?e.message:'Gagal mengirim kode akses.')}finally{setLoading(false)}
  }

  async function verify(e:FormEvent){
    e.preventDefault();setLoading(true);setMsg('');
    try{
      const r=await fetch('/api/scholarship/verify-otp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,code})});
      const d=await r.json();if(!r.ok)throw new Error(d.message||'Kode akses tidak valid.');
      router.push('/beasiswa/dashboard');router.refresh();
    }catch(e){setMsg(e instanceof Error?e.message:'Kode akses tidak valid.')}finally{setLoading(false)}
  }

  async function lookupAccount(e:FormEvent){
    e.preventDefault();setLoading(true);setMsg('');setHint('');
    try{
      const r=await fetch('/api/scholarship/account-lookup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nim,name,whatsapp})});
      const d=await r.json();if(!r.ok)throw new Error(d.message||'Akun tidak ditemukan.');
      setHint(d.maskedEmail||'');setLookupDone(true);setMsg('Akun ditemukan. Jika Anda masih punya akses ke email tersebut, kembali ke halaman Masuk.');
    }catch(e){setMsg(e instanceof Error?e.message:'Akun tidak ditemukan.')}finally{setLoading(false)}
  }

  async function requestRecovery(e:FormEvent){
    e.preventDefault();setLoading(true);setMsg('');
    try{
      const r=await fetch('/api/scholarship/account-recovery',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nim,name,whatsapp,newEmail})});
      const d=await r.json();if(!r.ok)throw new Error(d.message||'Pemulihan akun gagal.');
      setMsg(d.message);setNewEmail('');
    }catch(e){setMsg(e instanceof Error?e.message:'Pemulihan akun gagal.')}finally{setLoading(false)}
  }

  if(mode==='recovery')return <div className="scholarship-login-card recovery28-card">
    <div className="scholarship-login-heading">
      <span className="scholarship-login-eyebrow">Pemulihan Akun</span>
      <h2>Cari akun YAHN Anda</h2>
      <p>Gunakan NIM dan data yang pernah dipakai saat mendaftar. Email akan ditampilkan dalam bentuk tersamarkan.</p>
    </div>
    {!lookupDone?<form className="scholarship-access-form" onSubmit={lookupAccount}>
      <label className="scholarship-field"><span>NIM</span><input required value={nim} onChange={e=>setNim(e.target.value.toUpperCase())} placeholder="G540XXXXX"/></label>
      <label className="scholarship-field"><span>Nama lengkap</span><input required value={name} onChange={e=>setName(e.target.value)} placeholder="Sesuai data pendaftaran"/></label>
      <label className="scholarship-field"><span>WhatsApp lama (jika pernah diisi)</span><input value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} placeholder="08xxxxxxxxxx"/></label>
      <button className="scholarship-primary-button" disabled={loading}>{loading?'Mencari akun...':'Cari akun saya →'}</button>
    </form>:<div className="recovery28-found">
      <span>Akun ditemukan</span><strong>{hint}</strong><p>Masih punya akses ke email ini? Kembali ke halaman masuk dan gunakan email tersebut.</p>
      <button className="scholarship-primary-button" type="button" onClick={()=>reset('login')}>Kembali ke Masuk</button>
      <div className="recovery28-divider"><span>atau</span></div>
      <form className="scholarship-access-form" onSubmit={requestRecovery}>
        <label className="scholarship-field"><span>Email baru</span><input type="email" required value={newEmail} onChange={e=>setNewEmail(e.target.value)} placeholder="emailbaru@gmail.com"/></label>
        <button className="scholarship-secondary-button recovery28-request" disabled={loading}>{loading?'Mengirim permintaan...':'Saya sudah tidak punya akses · Ajukan perubahan email'}</button>
      </form>
    </div>}
    {msg&&<div className="scholarship-form-message">{msg}</div>}
    <button type="button" className="text-button recovery28-back" onClick={()=>reset('login')}>← Kembali ke Portal Beasiswa</button>
  </div>;

  return <div className="scholarship-login-card">
    <div className="scholarship-auth-tabs" role="tablist" aria-label="Pilihan akses portal beasiswa">
      <button type="button" className={mode==='login'?'active':''} onClick={()=>reset('login')}>Masuk</button>
      <button type="button" className={mode==='register'?'active':''} onClick={()=>reset('register')}>Daftar Akun</button>
    </div>
    <div className="scholarship-login-heading">
      <span className="scholarship-login-eyebrow">Portal Beasiswa YAHN</span>
      <h2>{sent?'Cek email Anda':mode==='login'?'Masuk ke Portal Beasiswa':'Buat Akun Peserta'}</h2>
      <p>{sent?`Masukkan kode 6 digit yang kami kirim ke ${email}.`:mode==='login'?'Gunakan email terdaftar untuk menerima kode akses sekali pakai.':'Satu NIM hanya memiliki satu akun permanen. Akun ini dapat dipakai kembali pada pembukaan beasiswa berikutnya.'}</p>
    </div>
    {!sent?<form className="scholarship-access-form" onSubmit={requestOtp}>
      {mode==='register'&&<>
        <label className="scholarship-field"><span>Nama lengkap</span><input required value={name} onChange={e=>setName(e.target.value)} placeholder="Sesuai KTM" autoComplete="name"/></label>
        <label className="scholarship-field"><span>NIM</span><input required value={nim} onChange={e=>setNim(e.target.value.toUpperCase())} placeholder="G540XXXXX"/></label>
      </>}
      <label className="scholarship-field"><span>{mode==='login'?'Email terdaftar':'Email aktif'}</span><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="nama@email.com" autoComplete="email"/></label>
      <button className="scholarship-primary-button" disabled={loading}>{loading?'Mengirim kode...':mode==='login'?'Kirim Kode Masuk →':'Daftar & Kirim Kode →'}</button>
    </form>:<form className="scholarship-access-form" onSubmit={verify}>
      <label className="scholarship-field"><span>Kode 6 digit</span><input className="scholarship-otp-input" inputMode="numeric" maxLength={6} required value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,''))} placeholder="000000" autoComplete="one-time-code"/></label>
      <button className="scholarship-primary-button" disabled={loading||code.length!==6}>{loading?'Memverifikasi...':'Masuk ke Portal →'}</button>
      <button type="button" className="scholarship-secondary-button" onClick={()=>{setSent(false);setCode('');setMsg('')}}>Kirim ulang / ganti email</button>
    </form>}
    {hint&&<div className="account28-hint"><b>Akun lama terdeteksi</b><span>Email tersamarkan: {hint}</span><button type="button" onClick={()=>reset('recovery')}>Saya lupa / tidak bisa akses email lama →</button></div>}
    {msg&&<div className="scholarship-form-message">{msg}</div>}
    {!sent&&<div className="scholarship-recovery-link">Pernah daftar tetapi lupa email? <button type="button" onClick={()=>reset('recovery')}>Cari Akun Saya</button></div>}
    <div className="scholarship-security-note"><span aria-hidden="true">✓</span>Satu akun menyimpan riwayat pendaftaran Anda lintas periode.</div>
  </div>;
}
