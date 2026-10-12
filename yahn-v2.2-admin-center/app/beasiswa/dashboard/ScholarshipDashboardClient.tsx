'use client';

import Link from 'next/link';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';

type AppItem={applicationId:string;programId:string;programName:string;submittedAt:string;nim:string;prodi:string;semester:string;ukt:string;ipk:string;status:string;jadwalWawancara:string;konfirmasiHadir:string};
type Data={user:{name:string;email:string;role:string};account?:{nim?:string};currentProgram?:any;eligibleForCurrent?:boolean;eligibilityMessage?:string;appData?:AppItem|null;currentApplication?:AppItem|null;applications?:AppItem[]};

function statusLabel(v:string){const s=String(v||'').toUpperCase();if(s==='TOLAK'||s==='GAGAL FINAL')return'Belum berhasil';if(s==='PENERIMA')return'Penerima Beasiswa';if(s==='LOLOS')return'Lolos ke tahap berikutnya';if(s==='MENUNGGU')return'Sedang diseleksi';return v||'-'}
function fmtDate(v:string){if(!v)return'-';const d=new Date(v);return Number.isNaN(d.getTime())?v:d.toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'})}

export default function ScholarshipDashboardClient(){
  const router=useRouter();
  const[data,setData]=useState<Data|null>(null);const[error,setError]=useState('');const[confirming,setConfirming]=useState(false);
  async function load(){try{const r=await fetch('/api/scholarship/me',{cache:'no-store'});const d=await r.json();if(r.status===401){router.replace('/beasiswa/portal');return;}if(!r.ok)throw new Error(d.message);if(String(d?.user?.role||'').toLowerCase()==='admin'){router.replace('/admin');return;}setData(d)}catch(e){setError(e instanceof Error?e.message:'Gagal memuat dashboard.')}}
  useEffect(()=>{load()},[router]);
  async function logout(){await fetch('/api/scholarship/me',{method:'DELETE'});router.push('/beasiswa');router.refresh()}
  async function confirmAttendance(){setConfirming(true);setError('');try{const r=await fetch('/api/scholarship/attendance',{method:'POST'});const d=await r.json();if(!r.ok)throw new Error(d.message);await load()}catch(e){setError(e instanceof Error?e.message:'Konfirmasi gagal.')}finally{setConfirming(false)}}
  if(error)return <div className="container section"><div className="empty-state"><h2>Portal belum dapat dimuat</h2><p>{error}</p></div></div>;
  if(!data)return <div className="container section"><div className="skeleton hero-skeleton"/></div>;
  const current=data.currentApplication||null;const latest=data.appData||null;const history=data.applications||[];const a=current||latest;const status=String(a?.status||'').toUpperCase();
  return <div className="scholar-dashboard scholarship28-dashboard"><div className="container">
    <div className="scholar-dash-head"><div><div className="eyebrow">Portal Beasiswa</div><h1>Halo, {data.user.name.split(' ')[0]} 👋</h1><p>{data.user.email}{data.account?.nim?` · ${data.account.nim}`:''}</p></div><button className="btn btn-light" onClick={logout}>Keluar</button></div>

    <section className="scholar28-program-banner">
      <div><span className="pill">Program aktif</span><h2>{data.currentProgram?.name||'Belum ada pembukaan baru'}</h2><p>{data.currentProgram?`Batch ${data.currentProgram.batch} · ${data.currentProgram.year} · pendaftaran berstatus OPEN`:data.eligibilityMessage}</p></div>
      {data.currentProgram&&data.eligibleForCurrent&&<Link href="/beasiswa/daftar" className="btn btn-primary">Daftar program ini →</Link>}
    </section>

    {current?<>
      <div className="status-hero"><div><span className="status-label">Status aplikasi · {current.programName}</span><h2>{statusLabel(current.status)}</h2><p>{current.nim} · {current.prodi}</p></div><div className={`status-orb ${status.includes('TOLAK')||status.includes('GAGAL')?'danger':status.includes('LOLOS')||status.includes('PENERIMA')?'success':''}`}>{status.includes('LOLOS')||status.includes('PENERIMA')?'✓':status.includes('TOLAK')||status.includes('GAGAL')?'×':'…'}</div></div>
      <div className="scholar-metrics"><div><span>NIM</span><strong>{current.nim}</strong></div><div><span>Program Studi</span><strong>{current.prodi}</strong></div><div><span>Semester</span><strong>{current.semester}</strong></div><div><span>IPK</span><strong>{current.ipk}</strong></div><div><span>Periode</span><strong>{current.programName}</strong></div></div>
      {status==='LOLOS'&&current.jadwalWawancara&&current.jadwalWawancara!=='-'&&<section className="interview-card"><div><span className="panel-kicker">Tahap lanjutan</span><h2>Jadwal Wawancara</h2><p>{current.jadwalWawancara}</p></div>{current.konfirmasiHadir==='BERSEDIA HADIR'?<span className="mini-badge success">Kehadiran terkonfirmasi</span>:<button className="btn btn-accent" onClick={confirmAttendance} disabled={confirming}>{confirming?'Menyimpan...':'Konfirmasi Hadir'}</button>}</section>}
    </>:data.currentProgram&&data.eligibleForCurrent?<section className="application-callout scholarship28-reapply"><div className="callout-icon">✦</div><div><span className="pill">Pendaftaran dibuka</span><h2>{history.length?'Kesempatan baru sudah tersedia.':'Mulai aplikasi Beasiswa YAHN'}</h2><p>{history.length?'Riwayat pendaftaran sebelumnya tetap tersimpan. Anda dapat mendaftar kembali menggunakan akun yang sama selama memenuhi persyaratan program aktif.':'Lengkapi aplikasi pertama Anda untuk program yang sedang aktif.'}</p><Link href="/beasiswa/daftar" className="btn btn-accent">{history.length?'Daftar kembali →':'Mulai pendaftaran →'}</Link></div></section>:<section className="application-callout scholarship28-closed"><div className="callout-icon">◎</div><div><span className="pill">Belum tersedia</span><h2>Belum ada pendaftaran yang dapat dikirim saat ini.</h2><p>{data.eligibilityMessage||'Pantau portal ini untuk pembukaan program berikutnya.'}</p></div></section>}

    <section className="panel scholarship28-history"><div className="panel-head"><div><span className="panel-kicker">Riwayat Pendaftaran</span><h2>Satu akun, seluruh perjalanan beasiswa.</h2></div><span className="mini-badge">{history.length} aplikasi</span></div>
      {history.length===0?<div className="empty-state compact"><p>Belum ada riwayat pendaftaran pada akun ini.</p></div>:<div className="scholar28-history-list">{history.map((x,i)=><article key={x.applicationId||i}><div><span className="scholar28-year">{x.programName}</span><h3>{statusLabel(x.status)}</h3><p>{fmtDate(x.submittedAt)} · {x.nim} · {x.prodi}</p></div><span className={`mini-badge ${String(x.status).toUpperCase()==='PENERIMA'||String(x.status).toUpperCase()==='LOLOS'?'success':String(x.status).toUpperCase().includes('TOLAK')||String(x.status).toUpperCase().includes('GAGAL')?'danger':''}`}>{x.status}</span></article>)}</div>}
    </section>
  </div></div>
}
