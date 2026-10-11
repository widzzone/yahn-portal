'use client';
import { FormEvent,useMemo,useState } from 'react';
import Link from 'next/link';
const presets=[50000,100000,250000,500000,1000000];
const fmt=(v:number)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(v||0);
export default function DonationForm({initialAmount=100000,initialMethod='QRIS'}:{initialAmount?:number;initialMethod?:'QRIS'|'Transfer Bank'}){
  const[amount,setAmount]=useState(initialAmount);const[custom,setCustom]=useState('');const[method,setMethod]=useState<'QRIS'|'Transfer Bank'>(initialMethod);const[copied,setCopied]=useState(false);const[status,setStatus]=useState('');const[success,setSuccess]=useState(false);const[loading,setLoading]=useState(false);
  const bank=process.env.NEXT_PUBLIC_DONATION_BANK||'Rekening belum dikonfigurasi';const account=process.env.NEXT_PUBLIC_DONATION_ACCOUNT||'-';const accountName=process.env.NEXT_PUBLIC_DONATION_ACCOUNT_NAME||'Yayasan Andi Hakim Nasoetion';const qris=process.env.NEXT_PUBLIC_QRIS_IMAGE_URL||'';const finalAmount=useMemo(()=>custom?Number(custom)||0:amount,[custom,amount]);
  async function copyAccount(){try{await navigator.clipboard.writeText(account);setCopied(true);setTimeout(()=>setCopied(false),1800)}catch{}}
  async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setLoading(true);setStatus('');setSuccess(false);const form=new FormData(e.currentTarget);try{const r=await fetch('/api/donations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:form.get('name'),email:form.get('email'),whatsapp:form.get('whatsapp'),amount:finalAmount,method,anonymous:form.get('anonymous')==='on'})});const d=await r.json();if(!r.ok)throw new Error(d.message||'Gagal menyimpan.');setSuccess(true);setStatus(`Konfirmasi donasi ${d.donationId||''} berhasil dicatat. Tim YAHN akan melakukan verifikasi transaksi.`);}catch(e){setStatus(e instanceof Error?e.message:'Terjadi kesalahan.')}finally{setLoading(false)}}
  return <form className="form-shell donation-shell donation23-direct-form" onSubmit={submit}>
    <div className="donation23-form-heading"><span className="pill">Tanpa akun</span><h2>Terima kasih sudah memilih untuk berbagi.</h2><p>Anda hanya perlu menentukan nominal, melakukan pembayaran, lalu mengirim data singkat untuk verifikasi.</p></div>

    <div className="donation23-step-title"><b>1</b><div><strong>Pilih nominal donasi</strong><span>Mulai dari Rp10.000, sesuaikan dengan kenyamanan Anda.</span></div></div>
    <div className="amounts donation23-form-amounts">{presets.map(v=><button type="button" key={v} className={`amount ${!custom&&amount===v?'active':''}`} onClick={()=>{setAmount(v);setCustom('')}}>{fmt(v)}</button>)}</div>
    <div className="field"><label>Nominal lainnya</label><input className="input" type="number" min="10000" value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Contoh: 750000"/></div>
    <div className="selected-amount"><span>Donasi Anda</span><strong>{fmt(finalAmount)}</strong></div>

    <div className="donation23-step-title"><b>2</b><div><strong>Pilih cara pembayaran</strong><span>Keduanya menggunakan kanal resmi YAHN.</span></div></div>
    <div className="donation23-payment-tabs"><button type="button" className={method==='QRIS'?'active':''} onClick={()=>setMethod('QRIS')}>▦ QRIS</button><button type="button" className={method==='Transfer Bank'?'active':''} onClick={()=>setMethod('Transfer Bank')}>▣ Transfer Bank</button></div>
    {method==='QRIS'?<div className="donation23-pay-panel"><div className="donation23-qris-wrap"><div className="qris">{qris?<img src={qris} alt="QRIS YAHN"/>:<span>QRIS belum dikonfigurasi.<br/>Hubungi admin YAHN.</span>}</div></div><div className="donation23-pay-copy"><span className="pill">Scan & bayar</span><h3>Scan QRIS YAHN</h3><p>Buka aplikasi bank atau dompet digital yang mendukung QRIS, scan kode di samping, lalu masukkan nominal <b>{fmt(finalAmount)}</b>.</p><div className="donation23-pay-tip">Setelah pembayaran berhasil, lanjutkan ke langkah konfirmasi di bawah.</div></div></div>:<div className="donation23-pay-panel"><div className="donation23-bank-badge">YAHN</div><div className="donation23-pay-copy"><span className="pill">Transfer resmi</span><h3>{bank}</h3><div className="donation23-account-row"><strong>{account}</strong><button type="button" onClick={copyAccount}>{copied?'Tersalin ✓':'Salin'}</button></div><p>a.n. <b>{accountName}</b><br/>Transfer sesuai nominal <b>{fmt(finalAmount)}</b> agar lebih mudah diverifikasi.</p></div></div>}

    <div className="donation23-step-title"><b>3</b><div><strong>Kirim konfirmasi</strong><span>Data ini dipakai untuk pencatatan dan verifikasi, bukan dipublikasikan tanpa persetujuan.</span></div></div>
    <div className="form-row"><div className="field"><label>Nama donatur</label><input className="input" name="name" required placeholder="Nama lengkap"/></div><div className="field"><label>Email aktif</label><input className="input" name="email" type="email" required placeholder="nama@email.com"/></div></div>
    <div className="field"><label>WhatsApp <span style={{fontWeight:500,textTransform:'none'}}>(opsional)</span></label><input className="input" name="whatsapp" placeholder="08xxxxxxxxxx"/></div>
    <label className="check-single"><input type="checkbox" name="anonymous"/><span>Saya ingin nama saya ditampilkan sebagai anonim pada laporan publik.</span></label>
    <button className="btn btn-accent btn-block donation23-confirm-btn" disabled={loading||finalAmount<10000}>{loading?'Menyimpan konfirmasi...':'Saya sudah membayar · Kirim konfirmasi →'}</button>
    {status&&<div className={`notice ${success?'notice-success':'notice-warn'}`}>{status}{success&&<div style={{marginTop:10}}><Link href="/donatur/masuk" className="text-link">Masuk ke Portal Donatur →</Link></div>}</div>}
    <div className="form-security">🔒 Konfirmasi Anda masuk ke database YAHN. Status final ditentukan setelah admin mencocokkan transaksi pada kanal pembayaran resmi.</div>
  </form>
}
