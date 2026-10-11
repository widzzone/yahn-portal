import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { callDonorBackend } from '@/lib/backend';
export const dynamic='force-dynamic';
const rupiah=(v:number)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(v||0);

export default async function KakakAsuhPage(){
  let recipients:any[]=[];let error='';
  try{const d=await callDonorBackend('getPublicRecipients');recipients=d.recipients||[]}catch(e){error=e instanceof Error?e.message:'Gagal memuat data.'}
  return <>
    <SiteHeader/>
    <main className="foster25-page">
      <section className="foster25-hero">
        <div className="container foster25-hero-grid">
          <div><div className="eyebrow">Program Kakak Asuh YAHN</div><h1>Temani satu perjalanan pendidikan.</h1><p>Pilih penerima yang ingin Anda dukung, lihat kebutuhan pendidikannya, lalu ajukan skema dukungan yang paling sesuai.</p></div>
          <div className="foster25-how"><span><b>1</b>Pilih penerima</span><span><b>2</b>Lihat kebutuhan</span><span><b>3</b>Ajukan dukungan</span></div>
        </div>
      </section>
      <section className="foster25-content"><div className="container">
        {error&&<div className="notice notice-warn">{error}</div>}
        {!error&&!recipients.length?<div className="foster25-empty"><div className="foster25-empty-icon">✦</div><div><span className="eyebrow">Segera hadir</span><h2>Profil penerima sedang disiapkan.</h2><p>Tim YAHN sedang menyiapkan profil penerima yang aman untuk dibagikan kepada calon Kakak Asuh.</p><div className="foster25-empty-actions"><Link className="btn btn-primary" href="/donasi">Lihat pilihan dukungan lain →</Link><Link className="btn btn-light" href="/donatur/masuk">Masuk Portal Sahabat</Link></div></div></div>:
        <div className="foster25-grid">{recipients.map(s=>{const pct=s.target?Math.min(100,Math.round(Number(s.funded||0)/Number(s.target||1)*100)):0;return <article className="foster25-card" key={s.recipientId}>
          <div className="foster25-card-top"><div className="avatar">{String(s.name||'Y').split(' ').map((x:string)=>x[0]).join('').slice(0,2).toUpperCase()}</div><span className="pill">{s.need||'Dukungan Pendidikan'}</span></div>
          <div className="foster25-meta">{s.program} · Semester {s.semester}</div><h3>{s.name}</h3><p>{s.story}</p>
          <div className="foster25-progress-label"><span>Terkumpul <b>{rupiah(Number(s.funded||0))}</b></span><strong>{pct}%</strong></div><div className="progress"><span style={{width:`${pct}%`}}/></div>
          <div className="foster25-target"><span>Target kebutuhan</span><b>{rupiah(Number(s.target||0))}</b></div>
          <Link className="btn btn-primary btn-block" href={`/kakak-asuh/${encodeURIComponent(s.recipientId)}`}>Lihat perjalanan →</Link>
        </article>})}</div>}
      </div></section>
    </main>
    <SiteFooter/>
  </>;
}
