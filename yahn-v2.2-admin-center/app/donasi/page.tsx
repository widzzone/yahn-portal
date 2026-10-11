import Link from 'next/link';
import { DonorTypeCards } from '@/components/DonorTypeCards';
import { DonationQuickStart } from '@/components/DonationQuickStart';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { callDonorBackend } from '@/lib/backend';

function rupiah(v:number){return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(v||0)}

export default async function DonasiPage() {
  let recipients:any[]=[];
  try{const d=await callDonorBackend('getPublicRecipients');recipients=(d.recipients||[]).slice(0,3)}catch{}
  return <><SiteHeader/><main className="donation23-page compact26-page">
    <section className="donation23-hero compact26-hero">
      <div className="donation23-orb donation23-orb-a"/><div className="donation23-orb donation23-orb-b"/>
      <div className="container donation23-hero-grid compact26-grid">
        <div className="donation23-hero-copy">
          <div className="eyebrow">Portal Dukungan YAHN</div>
          <h1>Satu kebaikan hari ini, <span>dampaknya panjang</span> untuk masa depan.</h1>
          <p>Pilih cara berbagi yang paling nyaman. Dukungan satu kali, komitmen bulanan, atau pendampingan langsung melalui Kakak Asuh dapat dimulai dari sini.</p>
          <div className="donation23-trust-row"><span>✓ Mudah dimulai</span><span>✓ Dicatat YAHN</span><span>✓ Update dampak</span></div>
        </div>
        <DonationQuickStart/>
      </div>
    </section>

    <section id="pilihan-donasi" className="section donation23-choice-section compact26-choice"><div className="container">
      <div className="split-heading"><div><div className="eyebrow">Cara Berbagi</div><h2>Tiga cara, satu tujuan yang sama.</h2></div><p>Tidak ada pilihan yang terlalu kecil. Pilih skema yang sesuai dengan kenyamanan dan ritme Anda.</p></div>
      <DonorTypeCards/>
    </div></section>

    {recipients.length>0&&<section className="section donation23-sponsor-section compact26-recipient"><div className="container">
      <div className="split-heading"><div><div className="eyebrow">Kakak Asuh</div><h2>Kenali beberapa penerima yang sedang membuka dukungan.</h2></div><p>Profil publik hanya menampilkan informasi yang telah disetujui untuk dibagikan secara aman.</p></div>
      <div className="donation23-recipient-grid">{recipients.map((s:any)=>{const pct=s.target?Math.min(100,Math.round((Number(s.funded||0)/Number(s.target||1))*100)):0;return <Link href={`/kakak-asuh/${encodeURIComponent(s.recipientId)}`} className="donation23-recipient-card" key={s.recipientId}><div className="donation23-recipient-top"><div className="avatar">{String(s.name||'Y').split(' ').map((x:string)=>x[0]).join('').slice(0,2).toUpperCase()}</div><span>{s.need||'Dukungan Pendidikan'}</span></div><h3>{s.name}</h3><p>{s.program} · Semester {s.semester}</p><div className="donation23-progress"><i style={{width:`${pct}%`}}/></div><div className="donation23-funded"><span>{rupiah(Number(s.funded||0))} terkumpul</span><b>{pct}%</b></div><small>Lihat perjalanan →</small></Link>})}</div>
      <div className="donation23-center-action"><Link href="/kakak-asuh" className="btn btn-light">Lihat semua calon adik asuh →</Link></div>
    </div></section>}
  </main><SiteFooter/></>;
}
