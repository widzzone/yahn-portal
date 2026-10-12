'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Donation = { id:string; date:string; amount:number; method:string; status:string; source?:string; period?:string };
type MonthlyPayment = { id:string; date:string; amount:number; method:string; status:string; period:string; recurringId:string };
type Sponsorship = { id:string; recipientId:string; recipientName:string; program:string; semester:string; supportType:string; amount:number; period:string; status:string };
type DashboardData = {
  donor:{donorId:string;name:string;email:string;type:string;status:string};
  summary:{totalContribution:number;pendingContribution:number;monthsSupporting:number;studentsHelped:number;streak:number};
  recurring:null|{recurringId:string;amount:number;reminderDay:number;status:string;lastPayment:string};
  monthlyPayments:MonthlyPayment[];
  sponsorships:Sponsorship[];
  donations:Donation[];
  impactUpdates:{title:string;body:string;date:string;recipientName?:string}[];
};
const rupiah=(v:number)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(v||0);

type Tab='overview'|'activity'|'foster'|'impact';

export default function DonorDashboardClient(){
  const router=useRouter();
  const [data,setData]=useState<DashboardData|null>(null);
  const [error,setError]=useState('');
  const [tab,setTab]=useState<Tab>('overview');

  useEffect(()=>{fetch('/api/donor/dashboard',{cache:'no-store'}).then(async r=>{const d=await r.json();if(r.status===401){router.replace('/donatur/masuk');return;}if(!r.ok)throw new Error(d.message);setData(d.dashboard)}).catch(e=>setError(e.message));},[router]);
  async function logout(){await fetch('/api/donor/logout',{method:'POST'});router.push('/');router.refresh();}
  if(error)return <main className="dashmain"><div className="empty-state"><div className="empty-icon">!</div><h2>Dashboard belum dapat dimuat</h2><p>{error}</p><Link className="btn btn-light" href="/">Kembali ke website</Link></div></main>;
  if(!data)return <main className="donor25-loading"><div className="skeleton hero-skeleton"/></main>;

  const firstName=data.donor.name.split(' ')[0];
  return <div className="donor25-dashboard donor27-dashboard">
    <aside className="donor25-side donor27-side">
      <Link href="/sahabat" className="donor25-side-brand donor27-side-brand"><img src="/logo-yahn.png" alt="YAHN"/><div><b>Sahabat YAHN</b><span>Portal pribadi</span></div></Link>
      <nav>
        <button className={tab==='overview'?'active':''} onClick={()=>setTab('overview')}>⌂ Ringkasan</button>
        <button className={tab==='activity'?'active':''} onClick={()=>setTab('activity')}>↗ Riwayat</button>
        <button className={tab==='foster'?'active':''} onClick={()=>setTab('foster')}>♡ Kakak Asuh</button>
        <button className={tab==='impact'?'active':''} onClick={()=>setTab('impact')}>✦ Dampak</button>
      </nav>
      <div className="donor25-side-actions"><Link href="/donasi/sekarang">＋ Berbagi lagi</Link><Link href="/sahabat">Beranda Sahabat</Link><Link href="/">Ganti Portal</Link></div>
      <div className="donor25-side-profile"><div className="avatar avatar-small">{data.donor.name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase()}</div><div><b>{data.donor.name}</b><span>{data.donor.email}</span></div></div>
      <button className="donor25-logout" onClick={logout}>Keluar</button>
    </aside>

    <main className="donor25-main donor27-main">
      <header className="donor25-topbar donor27-topbar"><div><span className="eyebrow">Portal Sahabat YAHN</span><h1>Halo, {firstName} 👋</h1><p>Semua dukungan dan dampak Anda dirangkum dalam satu ruang pribadi.</p></div><Link className="btn btn-primary" href="/donasi/sekarang">＋ Berbagi Lagi</Link></header>

      <section className="donor25-kpis donor27-kpis">
        <article><span>Total terverifikasi</span><strong>{rupiah(data.summary.totalContribution)}</strong><small>Dukungan yang sudah dicocokkan</small></article>
        <article><span>Bulan bersama YAHN</span><strong>{data.summary.monthsSupporting}</strong><small>Riwayat dukungan aktif</small></article>
        <article><span>Perjalanan didampingi</span><strong>{data.summary.studentsHelped}</strong><small>Program Kakak Asuh</small></article>
        <article><span>Konsistensi</span><strong>{data.summary.streak} bulan</strong><small>Streak dukungan</small></article>
      </section>

      {data.summary.pendingContribution>0&&<div className="notice notice-warn donor25-pending donor27-pending">Ada <strong>{rupiah(data.summary.pendingContribution)}</strong> dukungan yang masih menunggu verifikasi.</div>}

      <div className="donor25-mobile-tabs donor27-tabs">
        {([['overview','Ringkasan'],['activity','Riwayat'],['foster','Kakak Asuh'],['impact','Dampak']] as [Tab,string][]).map(([id,label])=><button key={id} className={tab===id?'active':''} onClick={()=>setTab(id)}>{label}</button>)}
      </div>

      {tab==='overview'&&<section className="donor25-grid-two donor27-grid-two">
        <article className="donor25-panel donor27-panel"><div className="donor25-panel-head"><div><span>Komitmen</span><h2>Dukungan bulanan</h2></div><b className={data.recurring?'on':''}>{data.recurring?'Aktif':'Belum aktif'}</b></div>{data.recurring?<><div className="donor25-big-number">{rupiah(data.recurring.amount)} <small>/ bulan</small></div><div className="donor25-meta"><span>Pengingat tanggal <b>{data.recurring.reminderDay}</b></span><span>Terakhir: <b>{data.recurring.lastPayment||'Belum terverifikasi'}</b></span></div><Link className="btn btn-primary monthly13-dashboard-pay" href="/donasi/bulanan/bayar">Bayar bulan ini →</Link><div className="monthly13-history">{(data.monthlyPayments||[]).slice(0,4).map(p=><div key={p.id}><span>{p.period||'Periode'}</span><b>{p.status}</b></div>)}</div></>:<div className="donor25-empty"><p>Belum ada dukungan rutin.</p><Link href="/donasi/bulanan">Aktifkan dukungan bulanan →</Link></div>}</article>
        <article className="donor25-panel donor27-panel"><div className="donor25-panel-head"><div><span>Aktivitas terbaru</span><h2>Riwayat dukungan</h2></div><button onClick={()=>setTab('activity')}>Lihat semua</button></div>{data.donations.length?<div className="donor25-mini-list">{data.donations.slice(0,3).map(d=><div key={d.id}><div><b>{rupiah(d.amount)}</b><span>{d.method} · {new Date(d.date).toLocaleDateString('id-ID',{day:'numeric',month:'short'})}</span></div><small>{d.status}</small></div>)}</div>:<div className="donor25-empty"><p>Belum ada riwayat dukungan.</p></div>}</article>
      </section>}

      {tab==='activity'&&<section className="donor25-panel donor27-panel"><div className="donor25-panel-head"><div><span>Riwayat</span><h2>Aktivitas dukungan</h2></div></div>{data.donations.length?<div className="donor25-table-list">{data.donations.map(d=><div key={d.id}><div><b>{rupiah(d.amount)}</b><span>{d.method}</span></div><span>{new Date(d.date).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})}</span><small>{d.status}</small></div>)}</div>:<div className="donor25-empty"><p>Belum ada riwayat dukungan.</p></div>}</section>}

      {tab==='foster'&&<section className="donor25-panel donor27-panel"><div className="donor25-panel-head"><div><span>Kakak Asuh</span><h2>Perjalanan yang Anda dampingi</h2></div><Link href="/kakak-asuh">Jelajahi penerima →</Link></div>{data.sponsorships.length?<div className="donor25-sponsor-grid">{data.sponsorships.map(s=><article key={s.id}><div className="avatar">{(s.recipientName||'Y').split(' ').map(x=>x[0]).join('').slice(0,2)}</div><div><b>{s.recipientName||s.recipientId}</b><span>{s.program}{s.semester?` · Semester ${s.semester}`:''}</span><small>{s.supportType} · {rupiah(s.amount)} · {s.period}</small></div><em>{s.status}</em></article>)}</div>:<div className="donor25-empty"><p>Belum ada program Kakak Asuh aktif.</p><Link className="btn btn-light" href="/kakak-asuh">Kenali calon Adik Asuh</Link></div>}</section>}

      {tab==='impact'&&<section className="donor25-panel donor27-panel"><div className="donor25-panel-head"><div><span>Jurnal Dampak</span><h2>Update terbaru</h2></div></div>{data.impactUpdates.length?<div className="donor25-impact-grid">{data.impactUpdates.slice(0,6).map((u,i)=><article key={i}><time>{new Date(u.date).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'})}</time><h3>{u.title}</h3><p>{u.body}</p>{u.recipientName&&<span>{u.recipientName}</span>}</article>)}</div>:<div className="donor25-empty"><p>Belum ada update dampak yang dipublikasikan.</p></div>}</section>}
    </main>
  </div>;
}
