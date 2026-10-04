'use client';
import { FormEvent, useMemo, useState } from 'react';

const presets = [50000,100000,250000,500000,1000000];
const fmt = (v:number) => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(v);

export default function DonationForm() {
  const [amount,setAmount] = useState(250000);
  const [custom,setCustom] = useState('');
  const [status,setStatus] = useState('');
  const [loading,setLoading] = useState(false);
  const bank = process.env.NEXT_PUBLIC_DONATION_BANK || 'Bank akan ditentukan';
  const account = process.env.NEXT_PUBLIC_DONATION_ACCOUNT || '0000000000';
  const accountName = process.env.NEXT_PUBLIC_DONATION_ACCOUNT_NAME || 'Yayasan Andi Hakim Nasoetion';
  const qris = process.env.NEXT_PUBLIC_QRIS_IMAGE_URL || '';
  const finalAmount = useMemo(() => custom ? Number(custom) || 0 : amount,[custom,amount]);

  async function submit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setStatus('');
    const form = new FormData(e.currentTarget);
    const payload = { name: form.get('name'), email: form.get('email'), whatsapp: form.get('whatsapp'), amount: finalAmount, method: form.get('method'), anonymous: form.get('anonymous') === 'on' };
    try {
      const res = await fetch('/api/donations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const data = await res.json();
      if(!res.ok) throw new Error(data.message || 'Gagal menyimpan');
      setStatus(data.mode === 'demo' ? 'Preview berhasil. Data belum masuk Google Sheet karena Apps Script API belum dikonfigurasi.' : 'Terima kasih. Konfirmasi donasi Anda sudah tercatat dan menunggu verifikasi YAHN.');
    } catch(err) { setStatus(err instanceof Error ? err.message : 'Terjadi kesalahan.'); }
    finally { setLoading(false); }
  }

  return <form className="form-shell" onSubmit={submit}>
    <div className="eyebrow">Donasi satu kali</div><h2 style={{fontSize:30,margin:'8px 0'}}>Pilih nominal kontribusi</h2>
    <div className="amounts">{presets.map(v=><button type="button" key={v} className={`amount ${!custom && amount===v?'active':''}`} onClick={()=>{setAmount(v);setCustom('')}}>{fmt(v)}</button>)}</div>
    <div className="field"><label>Nominal lainnya</label><input className="input" type="number" min="10000" value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Contoh: 750000"/></div>
    <div className="notice notice-info">Nominal dipilih: <strong>{fmt(finalAmount)}</strong></div>

    <div className="payment-box">
      <strong>Metode pembayaran tersedia</strong>
      <div className="qris">{qris ? <img src={qris} alt="QRIS YAHN"/> : <span>QRIS YAHN<br/>set NEXT_PUBLIC_QRIS_IMAGE_URL</span>}</div>
      <div style={{textAlign:'center',lineHeight:1.7}}><strong>{bank}</strong><br/>{account}<br/><span style={{color:'#60727a'}}>{accountName}</span></div>
    </div>

    <div className="form-row">
      <div className="field"><label>Nama</label><input className="input" name="name" required placeholder="Nama donatur"/></div>
      <div className="field"><label>Email</label><input className="input" name="email" type="email" required placeholder="nama@email.com"/></div>
    </div>
    <div className="form-row">
      <div className="field"><label>WhatsApp</label><input className="input" name="whatsapp" placeholder="08xxxxxxxxxx"/></div>
      <div className="field"><label>Metode</label><select className="input" name="method"><option>QRIS</option><option>Transfer Bank</option></select></div>
    </div>
    <label style={{display:'flex',gap:9,alignItems:'center',fontSize:13,color:'#536a72',marginBottom:18}}><input type="checkbox" name="anonymous"/> Tampilkan sebagai donatur anonim pada laporan publik.</label>
    <button className="btn btn-accent" disabled={loading || finalAmount < 10000} style={{width:'100%'}}>{loading?'Menyimpan...':'Saya Sudah Berdonasi'}</button>
    {status && <div className="status">{status}</div>}
    <div className="notice notice-warn">MVP ini mencatat konfirmasi donasi. Verifikasi transaksi tetap dilakukan oleh admin YAHN sampai payment gateway diaktifkan.</div>
  </form>;
}
