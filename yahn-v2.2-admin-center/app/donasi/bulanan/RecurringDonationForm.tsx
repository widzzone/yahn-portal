'use client';
import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';

const presets=[50000,100000,250000,500000,1000000];
const fmt=(v:number)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(v||0);

export default function RecurringDonationForm({initialAmount=100000,initialDay=5}:{initialAmount?:number;initialDay?:number}){
  const [amount,setAmount]=useState(initialAmount);const[custom,setCustom]=useState('');const[day,setDay]=useState(initialDay);const[loading,setLoading]=useState(false);const[success,setSuccess]=useState(false);const[msg,setMsg]=useState('');
  const finalAmount=useMemo(()=>custom?Number(custom)||0:amount,[custom,amount]);
  async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setLoading(true);setMsg('');setSuccess(false);const form=new FormData(e.currentTarget);try{const r=await fetch('/api/recurring',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:form.get('name'),email:form.get('email'),whatsapp:form.get('whatsapp'),amount:finalAmount,reminderDay:day})});const d=await r.json();if(!r.ok)throw new Error(d.message||'Gagal menyimpan.');setSuccess(true);setMsg(d.message||'Komitmen bulanan berhasil disimpan.')}catch(e){setMsg(e instanceof Error?e.message:'Terjadi kesalahan.')}finally{setLoading(false)}}
  return <form className="form-shell donation23-monthly-form" onSubmit={submit}>
    <div className="donation23-form-heading"><span className="pill">Donatur Bulanan</span><h2>Jadikan kebaikan sebagai kebiasaan.</h2><p>Tentukan nominal dan tanggal pengingat. Tim YAHN akan mengelola komunikasi dengan pendekatan CRM yang ringan dan tidak mengganggu.</p></div>
    <div className="donation23-step-title"><b>1</b><div><strong>Pilih komitmen bulanan</strong><span>Nominal dapat diperbarui kemudian.</span></div></div>
    <div className="amounts">{presets.map(v=><button type="button" key={v} className={`amount ${!custom&&amount===v?'active':''}`} onClick={()=>{setAmount(v);setCustom('')}}>{fmt(v)}</button>)}</div>
    <div className="field"><label>Nominal lainnya</label><input className="input" type="number" min="10000" value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Contoh: 750000"/></div>
    <div className="selected-amount"><span>Komitmen per bulan</span><strong>{fmt(finalAmount)}</strong></div>

    <div className="donation23-step-title"><b>2</b><div><strong>Pilih tanggal pengingat</strong><span>Pengingat berhenti setelah pembayaran bulan tersebut terverifikasi.</span></div></div>
    <div className="donation23-day-picker">{[1,5,10,15,20,25,28].map(d=><button type="button" key={d} className={day===d?'active':''} onClick={()=>setDay(d)}>Tanggal {d}</button>)}</div>

    <div className="donation23-step-title"><b>3</b><div><strong>Data kontak</strong><span>Dipakai untuk riwayat kontribusi dan pengingat.</span></div></div>
    <div className="form-row"><div className="field"><label>Nama lengkap</label><input className="input" name="name" required placeholder="Nama donatur"/></div><div className="field"><label>Email aktif</label><input className="input" name="email" type="email" required placeholder="nama@email.com"/></div></div>
    <div className="field"><label>WhatsApp</label><input className="input" name="whatsapp" placeholder="08xxxxxxxxxx"/></div>
    <button className="btn btn-primary btn-block" disabled={loading||finalAmount<10000}>{loading?'Menyimpan...':'Aktifkan komitmen bulanan →'}</button>
    {msg&&<div className={`notice ${success?'notice-success':'notice-warn'}`}>{msg}{success&&<div style={{marginTop:10}}><Link className="text-link" href="/donatur/masuk">Masuk ke Portal Donatur →</Link></div>}</div>}
    <div className="form-security">Anda tetap memegang kendali. Komitmen bulanan adalah pengingat terkelola, bukan pendebitan otomatis.</div>
  </form>
}
