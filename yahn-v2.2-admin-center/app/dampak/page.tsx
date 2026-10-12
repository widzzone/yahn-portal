import Link from 'next/link';
import { PortalHeader } from '@/components/PortalHeader';
import { PortalFooter } from '@/components/PortalFooter';
import { callDonorBackend } from '@/lib/backend';

export const dynamic = 'force-dynamic';

const money=(v:any)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Number(v||0));
const date=(v:any)=>{if(!v)return'-';const d=new Date(v);return Number.isNaN(d.getTime())?String(v):d.toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'})};

export default async function ImpactTransparencyPage(){
  let t:any={summary:{totalSupport:0,totalDisbursed:0,availableBalance:0,supporters:0,recipientsHelped:0,publishedRecipients:0},categories:[],recentContributions:[],disbursements:[],impacts:[],documents:[],recipients:[]};
  let warning='';
  try{const d=await callDonorBackend('getPublicTransparency',{});t=d.transparency||t}catch(e){warning=e instanceof Error?e.message:'Data transparansi belum tersedia.'}
  const maxCategory=Math.max(1,...(t.categories||[]).map((x:any)=>Number(x.amount||0)));
  const disbursementPct=t.summary?.totalSupport?Math.min(100,Math.round(Number(t.summary.totalDisbursed||0)/Number(t.summary.totalSupport||1)*100)):0;

  return <>
    <PortalHeader mode="supporter"/>
    <main className="impact12-page">
      <section className="impact12-hero">
        <div className="container impact12-hero-grid">
          <div>
            <span className="eyebrow">Dampak & Transparansi YAHN</span>
            <h1>Dukungan yang tercatat, penyaluran yang dapat diikuti.</h1>
            <p>Halaman ini merangkum transaksi yang telah diverifikasi, penyaluran yang dipublikasikan, dan update dampak pendidikan YAHN.</p>
            <div className="impact12-trust"><span>✓ Hanya transaksi terverifikasi</span><span>✓ Identitas pribadi dimasking</span><span>✓ Penyaluran dipublikasikan admin</span></div>
          </div>
          <div className="impact12-hero-card">
            <span>Progress penyaluran</span>
            <strong>{disbursementPct}%</strong>
            <div className="impact12-progress"><i style={{width:`${disbursementPct}%`}}/></div>
            <small>{money(t.summary?.totalDisbursed)} dari {money(t.summary?.totalSupport)} dukungan terverifikasi telah dicatat sebagai penyaluran publik.</small>
          </div>
        </div>
      </section>

      <section className="impact12-kpi-section"><div className="container impact12-kpis">
        <article><span>Total Dukungan</span><b>{money(t.summary?.totalSupport)}</b><small>transaksi terverifikasi</small></article>
        <article><span>Sudah Tersalurkan</span><b>{money(t.summary?.totalDisbursed)}</b><small>penyaluran dipublikasikan</small></article>
        <article><span>Dana Tersedia</span><b>{money(t.summary?.availableBalance)}</b><small>selisih dukungan dan penyaluran</small></article>
        <article><span>Dampak</span><b>{t.summary?.recipientsHelped||0}</b><small>penerima tercatat dalam penyaluran</small></article>
      </div></section>

      {warning&&<div className="container"><div className="notice notice-warn">{warning}</div></div>}

      <section className="impact12-section"><div className="container impact12-two-col">
        <div className="impact12-panel">
          <div className="impact12-panel-head"><div><span className="eyebrow">Penggunaan Dana</span><h2>Ke mana dukungan disalurkan?</h2></div></div>
          {(t.categories||[]).length===0?<div className="impact12-empty">Belum ada kategori penyaluran yang dipublikasikan.</div>:<div className="impact12-category-list">{t.categories.map((x:any)=><div key={x.category}><div><span>{x.category}</span><b>{money(x.amount)}</b></div><i><em style={{width:`${Math.round(Number(x.amount||0)/maxCategory*100)}%`}}/></i></div>)}</div>}
        </div>
        <div className="impact12-panel">
          <div className="impact12-panel-head"><div><span className="eyebrow">Aktivitas Terbaru</span><h2>Sahabat yang baru berbagi.</h2></div><small>Nama otomatis dimasking</small></div>
          {(t.recentContributions||[]).length===0?<div className="impact12-empty">Belum ada dukungan terverifikasi untuk ditampilkan.</div>:<div className="impact12-feed">{t.recentContributions.slice(0,7).map((x:any,i:number)=><article key={`${x.date}-${i}`}><span className="impact12-avatar">{String(x.name||'S').slice(0,1)}</span><div><b>{x.name}</b><small>{date(x.date)} · {x.method}</small></div><strong>{money(x.amount)}</strong></article>)}</div>}
        </div>
      </div></section>

      <section className="impact12-section impact12-soft"><div className="container">
        <div className="impact12-title-row"><div><span className="eyebrow">Penyaluran</span><h2>Riwayat penyaluran dana.</h2></div><p>Hanya catatan yang telah ditinjau dan berstatus PUBLISHED yang tampil di halaman publik.</p></div>
        {(t.disbursements||[]).length===0?<div className="impact12-empty-card">Belum ada penyaluran yang dipublikasikan.</div>:<div className="impact12-disbursement-grid">{t.disbursements.slice(0,9).map((x:any)=><article key={x.id}><div><span className="pill">{x.category||'Penyaluran'}</span><small>{date(x.date)}</small></div><h3>{x.program||'Program YAHN'}</h3><b>{money(x.amount)}</b><p>{x.description||'Penyaluran dukungan pendidikan.'}</p>{x.proofUrl&&<a href={x.proofUrl} target="_blank" rel="noreferrer">Lihat dokumen pendukung →</a>}</article>)}</div>}
      </div></section>

      <section className="impact12-section"><div className="container impact12-two-col">
        <div className="impact12-panel">
          <div className="impact12-panel-head"><div><span className="eyebrow">Impact Journal</span><h2>Update terbaru YAHN.</h2></div></div>
          {(t.impacts||[]).length===0?<div className="impact12-empty">Belum ada impact update yang dipublikasikan.</div>:<div className="impact12-journal">{t.impacts.map((x:any)=><article key={x.id}><small>{date(x.date)}</small><h3>{x.title}</h3><p>{x.body}</p></article>)}</div>}
        </div>
        <div className="impact12-panel">
          <div className="impact12-panel-head"><div><span className="eyebrow">Dokumen Publik</span><h2>Laporan yang dapat dibaca.</h2></div></div>
          {(t.documents||[]).length===0?<div className="impact12-empty">Belum ada laporan publik yang ditautkan.</div>:<div className="impact12-docs">{t.documents.map((x:any)=><a href={x.url} target="_blank" rel="noreferrer" key={x.id}><div><span className="pill">{x.type||'Laporan'}</span><h3>{x.title}</h3><small>{x.period||date(x.date)}</small></div><b>↗</b></a>)}</div>}
        </div>
      </div></section>

      <section className="impact12-section impact12-last"><div className="container impact12-cta"><div><span className="eyebrow eyebrow-light">Ikut Menjaga Perjalanan Pendidikan</span><h2>Transparansi akan lebih berarti ketika dampak terus bertumbuh.</h2><p>Pilih cara berbagi yang paling nyaman untuk Anda.</p></div><Link href="/sahabat#cara-berbagi" className="btn btn-white btn-lg">Lihat cara berbagi →</Link></div></section>
    </main>
    <PortalFooter mode="supporter"/>
  </>
}
