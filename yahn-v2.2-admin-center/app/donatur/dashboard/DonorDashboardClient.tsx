'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Donation = { id:string; date:string; amount:number; method:string; status:string };
type Sponsorship = { id:string; recipientId:string; recipientName:string; program:string; semester:string; supportType:string; amount:number; period:string; status:string };
type DashboardData = {
  donor:{donorId:string;name:string;email:string;type:string;status:string};
  summary:{totalContribution:number;pendingContribution:number;monthsSupporting:number;studentsHelped:number;streak:number};
  recurring:null|{amount:number;reminderDay:number;status:string;lastPayment:string};
  sponsorships:Sponsorship[];
  donations:Donation[];
  impactUpdates:{title:string;body:string;date:string;recipientName?:string}[];
};
const rupiah=(v:number)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(v||0);

export default function DonorDashboardClient(){
  const router=useRouter(); const [data,setData]=useState<DashboardData|null>(null); const [error,setError]=useState('');
  useEffect(()=>{fetch('/api/donor/dashboard',{cache:'no-store'}).then(async r=>{const d=await r.json();if(r.status===401){router.replace('/donatur/masuk');return;}if(!r.ok)throw new Error(d.message);setData(d.dashboard)}).catch(e=>setError(e.message));},[router]);
  async function logout(){await fetch('/api/donor/logout',{method:'POST'});router.push('/');router.refresh();}
  if(error)return <main className="dashmain"><div className="empty-state"><div className="empty-icon">!</div><h2>Dashboard belum dapat dimuat</h2><p>{error}</p><Link className="btn btn-light" href="/">Kembali ke website</Link></div></main>;
  if(!data)return <div className="dashboard"><aside className="sidebar premium-sidebar"><div className="brand"><span className="brand-mark">YAHN</span><span>Donor Circle</span></div></aside><main className="dashmain"><div className="skeleton hero-skeleton"/><div className="kpis">{[1,2,3,4].map(i=><div key={i} className="skeleton kpi-skeleton"/>)}</div></main></div>;
  return <div className="dashboard">
    <aside className="sidebar premium-sidebar"><div className="brand"><span className="brand-mark">YAHN</span><span>Donor Circle<small>Private dashboard</small></span></div><nav><Link className="active" href="/donatur/dashboard">◫ Ringkasan</Link><Link href="/donasi/sekarang">♡ Donasi baru</Link><Link href="/kakak-asuh">🎓 Kakak Asuh</Link><Link href="/">⌂ Website YAHN</Link></nav><div className="sidebar-profile"><div className="avatar avatar-small">{data.donor.name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase()}</div><div><strong>{data.donor.name}</strong><span>{data.donor.email}</span></div></div><button className="sidebar-logout" onClick={logout}>Keluar</button></aside>
    <main className="dashmain donor-dash">
      <div className="dash-hero"><div><div className="eyebrow eyebrow-light">Donor Dashboard</div><h1>Halo, {data.donor.name.split(' ')[0]} 👋</h1><p>Terima kasih sudah menjadi bagian dari perjalanan pendidikan bersama YAHN.</p></div><Link href="/donasi/sekarang" className="btn btn-white">＋ Donasi baru</Link></div>
      <div className="kpis kpis-float"><div className="kpi"><span>Total terverifikasi</span><strong>{rupiah(data.summary.totalContribution)}</strong><small>Kontribusi yang sudah diverifikasi admin</small></div><div className="kpi"><span>Bulan mendukung</span><strong>{data.summary.monthsSupporting}</strong><small>Bulan unik dengan transaksi terverifikasi</small></div><div className="kpi"><span>Mahasiswa diasuh</span><strong>{data.summary.studentsHelped}</strong><small>Sponsorship aktif</small></div><div className="kpi"><span>Streak</span><strong>{data.summary.streak} bulan</strong><small>Konsistensi dukungan bulanan</small></div></div>
      {data.summary.pendingContribution>0&&<div className="notice notice-warn">Ada <strong>{rupiah(data.summary.pendingContribution)}</strong> kontribusi yang masih menunggu verifikasi YAHN.</div>}
      <div className="dashboard-grid">
        <section className="panel panel-feature"><div className="panel-head"><div><span className="panel-kicker">Komitmen</span><h2>Donasi bulanan</h2></div><span className={`status-dot ${data.recurring?'active':''}`}>{data.recurring?'Aktif':'Belum aktif'}</span></div>{data.recurring?<div className="commitment-card"><strong>{rupiah(data.recurring.amount)} <small>/ bulan</small></strong><div className="commitment-meta"><span>Reminder setiap tanggal <b>{data.recurring.reminderDay}</b></span><span>Last payment <b>{data.recurring.lastPayment||'Belum tercatat'}</b></span></div></div>:<div className="empty-inline"><p>Belum ada komitmen donasi rutin pada akun ini.</p><Link className="text-link" href="/donasi">Lihat pilihan dukungan →</Link></div>}</section>
        <section className="panel"><div className="panel-head"><div><span className="panel-kicker">Aktivitas</span><h2>Riwayat terbaru</h2></div></div>{data.donations.length?<div className="activity-list">{data.donations.slice(0,5).map(d=><div className="activity-item" key={d.id}><div className="activity-icon">↗</div><div><strong>{rupiah(d.amount)}</strong><span>{d.method} · {new Date(d.date).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'})}</span></div><span className={`mini-badge ${String(d.status).includes('VERIF')?'success':''}`}>{d.status}</span></div>)}</div>:<div className="empty-inline"><p>Belum ada riwayat transaksi.</p></div>}</section>
      </div>
      <section className="panel"><div className="panel-head"><div><span className="panel-kicker">Kakak Asuh</span><h2>Perjalanan yang Anda dampingi</h2></div><Link className="text-link" href="/kakak-asuh">Jelajahi penerima →</Link></div>{data.sponsorships.length?<div className="sponsor-list">{data.sponsorships.map(s=><div className="sponsor-card" key={s.id}><div className="avatar">{(s.recipientName||'Y').split(' ').map(x=>x[0]).join('').slice(0,2)}</div><div className="sponsor-main"><strong>{s.recipientName||s.recipientId}</strong><span>{s.program}{s.semester?` · Semester ${s.semester}`:''}</span><div className="sponsor-tags"><span>{s.supportType}</span><span>{rupiah(s.amount)}</span><span>{s.period}</span></div></div><span className="mini-badge success">{s.status}</span></div>)}</div>:<div className="empty-inline"><p>Belum ada program Kakak Asuh aktif pada akun ini.</p><Link href="/kakak-asuh" className="btn btn-light">Kenali calon Adik Asuh</Link></div>}</section>
      <section className="panel impact-panel"><div className="panel-head"><div><span className="panel-kicker">Impact Journal</span><h2>Update dampak terbaru</h2></div></div>{data.impactUpdates.length?<div className="impact-list">{data.impactUpdates.map((u,i)=><article key={i}><time>{new Date(u.date).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})}</time><h3>{u.title}</h3><p>{u.body}</p>{u.recipientName&&<span className="pill">{u.recipientName}</span>}</article>)}</div>:<div className="empty-inline"><p>Belum ada impact update yang dipublikasikan untuk akun Anda.</p></div>}</section>
    </main>
  </div>;
}
