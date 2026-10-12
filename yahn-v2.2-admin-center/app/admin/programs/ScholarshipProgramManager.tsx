'use client';

import Link from 'next/link';
import { FormEvent,useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';

const money=(v:any)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Number(v||0));
const dt=(v:any)=>{if(!v)return'-';const d=new Date(v);return Number.isNaN(d.getTime())?String(v):d.toLocaleDateString('id-ID')};

export default function ScholarshipProgramManager({admin}:{admin:{name:string;email:string}}){
  const router=useRouter();const[data,setData]=useState<any>(null);const[msg,setMsg]=useState('');const[loading,setLoading]=useState(true);const[busy,setBusy]=useState('');
  const[form,setForm]=useState<any>({programId:'',name:'',year:new Date().getFullYear()+1,batch:1,openDate:'',closeDate:'',status:'DRAFT',semesters:'4,6',minIpk:3,maxBenefit:9000000});
  async function load(){setLoading(true);try{const r=await fetch('/api/admin/overview',{cache:'no-store'});const d=await r.json();if(r.status===401){router.push('/admin/masuk');return}if(!r.ok)throw new Error(d.message);setData(d)}catch(e){setMsg(e instanceof Error?e.message:'Gagal memuat data.')}finally{setLoading(false)}}
  useEffect(()=>{load()},[]);
  async function action(actionName:string,payload:any){setBusy(actionName);setMsg('');try{const r=await fetch('/api/admin/scholarship/action',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:actionName,payload})});const d=await r.json();if(!r.ok)throw new Error(d.message);setMsg(d.message||'Berhasil.');await load();return true}catch(e){setMsg(e instanceof Error?e.message:'Aksi gagal.');return false}finally{setBusy('')}}
  async function saveProgram(e:FormEvent){e.preventDefault();const ok=await action('adminUpsertScholarshipProgram',form);if(ok)setForm({...form,programId:'',name:'',status:'DRAFT'})}
  const scholarship=data?.scholarship||{};const programs=scholarship.programs||[];const recoveries=scholarship.recoveries||[];
  return <main className="admin28-program-page"><header className="admin28-program-top"><div><Link href="/admin/dashboard" className="text-link">← Kembali ke Admin Center</Link><p className="eyebrow">Scholarship Cycle Management · V2.8</p><h1>Program & Pemulihan Akun</h1><p>Kelola pembukaan batch baru tanpa menghapus riwayat pendaftar lama.</p></div><div className="admin28-admin-chip"><span>{admin.name}</span><small>{admin.email}</small></div></header>
    {msg&&<div className="admin-flash">{msg}<button onClick={()=>setMsg('')}>×</button></div>}
    <div className="admin28-program-grid">
      <section className="admin-panel"><header><div><h2>Buat / Ubah Program</h2><p>Satu program berstatus OPEN akan menjadi batch aktif di Portal Mahasiswa.</p></div></header>
        <form className="admin-form-grid" onSubmit={saveProgram}>
          <label>Program ID<input className="input" value={form.programId} onChange={e=>setForm({...form,programId:e.target.value})} placeholder="Kosongkan untuk otomatis"/></label>
          <label>Nama Program<input className="input" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Beasiswa YAHN 2027"/></label>
          <label>Tahun<input className="input" type="number" value={form.year} onChange={e=>setForm({...form,year:Number(e.target.value)})}/></label>
          <label>Batch<input className="input" type="number" min="1" value={form.batch} onChange={e=>setForm({...form,batch:Number(e.target.value)})}/></label>
          <label>Tanggal Buka<input className="input" type="date" value={form.openDate} onChange={e=>setForm({...form,openDate:e.target.value})}/></label>
          <label>Tanggal Tutup<input className="input" type="date" value={form.closeDate} onChange={e=>setForm({...form,closeDate:e.target.value})}/></label>
          <label>Semester eligible<input className="input" value={form.semesters} onChange={e=>setForm({...form,semesters:e.target.value})} placeholder="4,6"/></label>
          <label>IPK minimum<input className="input" type="number" step="0.01" value={form.minIpk} onChange={e=>setForm({...form,minIpk:Number(e.target.value)})}/></label>
          <label>Maksimum bantuan<input className="input" type="number" value={form.maxBenefit} onChange={e=>setForm({...form,maxBenefit:Number(e.target.value)})}/></label>
          <label>Status<select className="input" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>DRAFT</option><option>OPEN</option><option>CLOSED</option><option>ARCHIVED</option></select></label>
          <div className="admin-span-2 admin-form-actions"><button className="btn btn-primary" disabled={!!busy}>Simpan Program</button></div>
        </form>
      </section>
      <section className="admin-panel"><header><div><h2>Daftar Program</h2><p>{programs.length} periode tersimpan.</p></div></header><div className="admin28-program-list">{programs.map((p:any)=><article key={p.programId}><div><span className={`admin-badge ${p.status==='OPEN'?'success':p.status==='DRAFT'?'warning':'neutral'}`}>{p.status}</span><h3>{p.name}</h3><p>{p.programId} · Batch {p.batch} · {p.year}</p><small>{p.openDate||'-'} → {p.closeDate||'-'} · maks {money(p.maxBenefit)}</small></div><button className="mini-btn" onClick={()=>setForm({...p,programId:p.programId,openDate:String(p.openDate||'').slice(0,10),closeDate:String(p.closeDate||'').slice(0,10)})}>Edit</button></article>)}</div></section>
    </div>
    <section className="admin-panel admin28-recovery-panel"><header><div><h2>Pemulihan Akun Mahasiswa</h2><p>Perubahan email dilakukan hanya setelah verifikasi admin.</p></div><span className="admin-count-pill">{recoveries.filter((x:any)=>String(x.Status).toUpperCase()==='PENDING').length} pending</span></header>
      {loading?<div className="admin-loading"><h2>Memuat...</h2></div>:recoveries.length===0?<div className="admin-empty">◎<b>Belum ada permintaan pemulihan akun.</b></div>:<div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Mahasiswa</th><th>Email baru</th><th>Diminta</th><th>Status</th><th>Aksi</th></tr></thead><tbody>{recoveries.slice().reverse().map((x:any)=><tr key={x['Recovery ID']}><td><b>{x.Nama}</b><small>{x.NIM} · {x['Old Email Masked']}<br/>{x.WhatsApp}</small></td><td>{x['New Email']}</td><td>{dt(x['Requested At'])}</td><td><span className={`admin-badge ${x.Status==='APPROVED'?'success':x.Status==='REJECTED'?'danger':'warning'}`}>{x.Status}</span></td><td>{String(x.Status).toUpperCase()==='PENDING'?<div className="table-actions"><button className="mini-btn success" onClick={()=>window.confirm(`Setujui perubahan email ${x.Nama}?`)&&action('adminResolveAccountRecovery',{recoveryId:x['Recovery ID'],decision:'APPROVED',note:'Disetujui melalui Admin Center'})}>Setujui</button><button className="mini-btn danger" onClick={()=>action('adminResolveAccountRecovery',{recoveryId:x['Recovery ID'],decision:'REJECTED',note:'Ditolak melalui Admin Center'})}>Tolak</button></div>:'-'}</td></tr>)}</tbody></table></div>}
    </section>
  </main>
}
