'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

const MIN_MONTHLY = 1_000_000;
const presets = [1_000_000, 2_500_000, 5_000_000, 10_000_000];
const MAX_PROOF_SIZE = 3 * 1024 * 1024;
const ALLOWED_PROOF_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const fmt=(v:number)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(v||0);
const periodKey=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`};
const periodLabel=()=>new Date().toLocaleDateString('id-ID',{month:'long',year:'numeric'});
function fileToBase64(file:File){return new Promise<string>((resolve,reject)=>{const r=new FileReader();r.onload=()=>{const s=String(r.result||'');resolve(s.includes(',')?s.split(',')[1]:s)};r.onerror=()=>reject(new Error('Bukti pembayaran gagal dibaca.'));r.readAsDataURL(file)});}
function fileSize(v:number){return v<1024*1024?`${Math.max(1,Math.round(v/1024))} KB`:`${(v/(1024*1024)).toFixed(1)} MB`;}

export default function RecurringDonationForm({initialAmount=MIN_MONTHLY,initialDay=5}:{initialAmount?:number;initialDay?:number}){
  const router=useRouter();
  const safeInitial=Math.max(MIN_MONTHLY,initialAmount||MIN_MONTHLY);
  const [amount,setAmount]=useState(safeInitial),[custom,setCustom]=useState(''),[day,setDay]=useState(initialDay);
  const [method,setMethod]=useState<'QRIS'|'Transfer Bank'>('QRIS');
  const [proof,setProof]=useState<File|null>(null),[loading,setLoading]=useState(false),[message,setMessage]=useState(''),[copied,setCopied]=useState(false);
  const finalAmount=useMemo(()=>custom?Number(custom)||0:amount,[custom,amount]);
  const bank=process.env.NEXT_PUBLIC_DONATION_BANK||'Bank BRI';
  const account=process.env.NEXT_PUBLIC_DONATION_ACCOUNT||'038701004655566';
  const accountName=process.env.NEXT_PUBLIC_DONATION_ACCOUNT_NAME||'Yayasan Andi Hakim Nasoetion';

  function onProofChange(e:ChangeEvent<HTMLInputElement>){const f=e.target.files?.[0]||null;setMessage('');if(!f){setProof(null);return}if(!ALLOWED_PROOF_TYPES.includes(f.type)){e.target.value='';setProof(null);setMessage('Format bukti harus JPG, PNG, WEBP, atau PDF.');return}if(f.size>MAX_PROOF_SIZE){e.target.value='';setProof(null);setMessage('Ukuran bukti maksimal 3 MB.');return}setProof(f)}
  async function copyAccount(){try{await navigator.clipboard.writeText(account);setCopied(true);setTimeout(()=>setCopied(false),1500)}catch{}}
  async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setMessage('');if(finalAmount<MIN_MONTHLY){setMessage('Dukungan bulanan dimulai dari Rp1.000.000.');return}if(!proof){setMessage('Bukti pembayaran bulan pertama wajib dilampirkan.');return}setLoading(true);const fd=new FormData(e.currentTarget);try{const proofPayload={name:proof.name,mimeType:proof.type,size:proof.size,base64:await fileToBase64(proof)};const r=await fetch('/api/recurring/activate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:fd.get('name'),email:fd.get('email'),whatsapp:fd.get('whatsapp'),amount:finalAmount,reminderDay:day,method,period:periodKey(),proof:proofPayload})});const d=await r.json();if(!r.ok)throw new Error(d.message||'Gagal mengaktifkan dukungan bulanan.');const q=new URLSearchParams({donationId:String(d.donationId||''),amount:String(finalAmount),method,monthly:'1',proof:'uploaded',period:String(d.period||periodKey())});router.push(`/donasi/terima-kasih?${q.toString()}`)}catch(err){setMessage(err instanceof Error?err.message:'Terjadi kesalahan.')}finally{setLoading(false)}}

  return <form className="donation24-shell recurring26-shell recurring13-shell" onSubmit={submit}>
    <div className="donation24-main recurring26-main">
      <div className="donation24-intro"><span className="pill">Dukungan bulanan</span><h2>Aktifkan komitmen dan selesaikan pembayaran pertama dalam satu alur.</h2><p>Setelah pembayaran pertama terverifikasi, bulan berikutnya dapat dibayar dari Portal Sahabat.</p></div>

      <section className="donation24-step"><div className="donation24-step-head"><b>1</b><div><strong>Pilih nominal bulanan</strong><span>Program dimulai dari Rp1.000.000 per bulan.</span></div></div><div className="amounts donation121-monthly-amounts">{presets.map(v=><button type="button" key={v} className={`amount ${!custom&&amount===v?'active':''}`} onClick={()=>{setAmount(v);setCustom('')}}>{fmt(v)}</button>)}</div><div className="field donation24-custom-field"><label>Nominal lainnya</label><input className="input" type="number" min={MIN_MONTHLY} step="50000" value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Minimal 1000000"/></div></section>

      <section className="donation24-step"><div className="donation24-step-head"><b>2</b><div><strong>Pilih tanggal pengingat</strong><span>Pengingat dikirim setiap bulan sampai pembayaran periode tersebut terverifikasi.</span></div></div><div className="recurring26-days">{[1,5,10,15,20,25].map(d=><button key={d} type="button" className={`amount ${day===d?'active':''}`} onClick={()=>setDay(d)}>Tgl {d}</button>)}</div></section>

      <section className="donation24-step"><div className="donation24-step-head"><b>3</b><div><strong>Lengkapi kontak</strong><span>Email dan WhatsApp wajib untuk pengingat dan status pembayaran.</span></div></div><div className="form-row donation24-form-row"><div className="field"><label>Nama lengkap</label><input className="input" name="name" required placeholder="Nama lengkap"/></div><div className="field"><label>Email aktif</label><input className="input" type="email" name="email" required placeholder="nama@email.com"/></div></div><div className="field"><label>WhatsApp aktif</label><input className="input" name="whatsapp" required placeholder="08xxxxxxxxxx"/></div></section>

      <section className="donation24-step"><div className="donation24-step-head"><b>4</b><div><strong>Bayar bulan pertama · {periodLabel()}</strong><span>Pilih QRIS atau transfer lalu unggah bukti pembayaran.</span></div></div><div className="donation24-payment-tabs compact-tabs"><button type="button" className={method==='QRIS'?'active':''} onClick={()=>setMethod('QRIS')}>QRIS</button><button type="button" className={method==='Transfer Bank'?'active':''} onClick={()=>setMethod('Transfer Bank')}>Transfer</button></div>
      {method==='QRIS'?<div className="donation24-pay-panel donation24-qris-panel premium-pay-card recurring13-pay"><div className="qris donation24-qris-box"><img src="/qris-yahn.jpeg" alt="QRIS YAHN"/></div><div className="donation24-pay-copy"><span className="pill">Pembayaran pertama</span><h3>{fmt(finalAmount)}</h3><p>Scan QRIS resmi YAHN. Untuk pembayaran dari HP yang sama, simpan QRIS lalu pilih scan dari galeri pada aplikasi m-banking.</p><div className="qris121-actions"><a href="/qris-yahn.jpeg" download="QRIS-YAHN.jpeg">↓ Download QRIS</a><a href="/qris-yahn.jpeg" target="_blank" rel="noreferrer">↗ Buka QRIS</a></div></div></div>:<div className="donation24-pay-panel donation24-transfer-panel premium-pay-card recurring13-pay"><div className="donation24-bank-logo-wrap"><img src="/logo-yahn.png" alt="YAHN" className="donation24-bank-logo"/></div><div className="donation24-pay-copy"><span className="pill">Transfer resmi</span><h3>{bank}</h3><div className="donation24-account-row"><strong>{account}</strong><button type="button" onClick={copyAccount}>{copied?'Tersalin ✓':'Salin'}</button></div><p>a.n. <b>{accountName}</b><br/>Nominal pembayaran pertama: <b>{fmt(finalAmount)}</b></p></div></div>}
      <div className={`proof11-upload recurring13-proof ${proof?'has-file':''}`}><div className="proof11-upload-head"><div><span className="proof11-icon">↥</span><div><strong>Bukti pembayaran</strong><small>JPG, PNG, WEBP, atau PDF · maks. 3 MB</small></div></div><span className="proof11-badge required">Wajib</span></div>{!proof?<label className="proof11-picker"><input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={onProofChange}/><span>Pilih bukti pembayaran</span></label>:<div className="proof11-file"><div className="proof11-file-icon">✓</div><div><strong>{proof.name}</strong><span>{fileSize(proof.size)}</span></div><button type="button" onClick={()=>setProof(null)}>Hapus</button></div>}</div></section>

      <div className="donation24-submit-wrap"><button className="btn btn-accent btn-block donation24-confirm-btn" disabled={loading||finalAmount<MIN_MONTHLY||!proof}>{loading?'Menyimpan & mengunggah...':'Aktifkan dukungan bulanan →'}</button>{message&&<div className="notice notice-warn">{message}</div>}</div>
    </div>

    <aside className="donation24-side recurring26-side"><div className="donation24-summary-card recurring13-summary"><div className="donation24-summary-head"><span className="pill">Ringkasan</span><h3>Dukungan bulanan Anda</h3></div><div className="donation24-summary-amount">{fmt(finalAmount)} <small>/ bulan</small></div><div className="donation24-summary-list"><div><span>Pengingat</span><strong>Tanggal {day}</strong></div><div><span>Periode pertama</span><strong>{periodLabel()}</strong></div><div><span>Pembayaran</span><strong>{method}</strong></div><div><span>Bukti</span><strong>{proof?'Siap diupload ✓':'Belum dilampirkan'}</strong></div></div><div className="donation24-summary-note">Dukungan bulanan adalah komitmen berkala dengan pengingat pembayaran, bukan pendebetan otomatis.</div></div></aside>
  </form>;
}
