import Link from 'next/link';
import { PortalHeader } from '@/components/PortalHeader';
import { PortalFooter } from '@/components/PortalFooter';
import { SupportJourney } from '@/components/SupportJourney';
import { callDonorBackend } from '@/lib/backend';

export const dynamic='force-dynamic';
const money=(v:any)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Number(v||0));

export default async function SupporterHome() {
  let summary:any=null;
  try{const d=await callDonorBackend('getPublicTransparency',{});summary=d.transparency?.summary||null}catch{}
  return <>
    <PortalHeader mode="supporter" />
    <main className="support10-page">
      <section className="support10-hero">
        <div className="container support10-hero-inner">
          <div>
            <div className="eyebrow">Portal Sahabat YAHN</div>
            <h1>Pilih cara berbagi yang paling sesuai dengan Anda.</h1>
          </div>
          <div className="support10-hero-copy">
            <p>
              Tidak ada satu cara yang paling benar untuk membantu. Pilih dukungan sekali, hadir setiap bulan,
              atau temani satu perjalanan pendidikan melalui Kakak Asuh.
            </p>
            <div className="support10-trust">
              <span>✓ Mudah dimulai</span>
              <span>✓ Transparan</span>
              <span>✓ Dampak dapat diikuti</span>
            </div>
          </div>
        </div>
      </section>

      <section className="support10-section" id="cara-berbagi">
        <div className="container">
          <div className="support10-heading">
            <div>
              <span className="eyebrow">Tiga Cara Berbagi</span>
              <h2>Pilih ritme yang terasa paling nyaman.</h2>
            </div>
            <p>Pilih salah satu jalur. Anda akan langsung diarahkan ke langkah berikutnya yang paling relevan.</p>
          </div>
          <SupportJourney />
        </div>
      </section>

      <section className="support12-impact-teaser">
        <div className="container support12-impact-card">
          <div><span className="eyebrow eyebrow-light">Dampak Bersama</span><h2>Lihat bagaimana dukungan YAHN dicatat dan disalurkan.</h2><p>Transaksi terverifikasi, penyaluran publik, jurnal dampak, dan laporan dapat dipantau tanpa login.</p></div>
          <div className="support12-impact-stats">
            <article><span>Dukungan terverifikasi</span><b>{summary?money(summary.totalSupport):'—'}</b></article>
            <article><span>Sudah tersalurkan</span><b>{summary?money(summary.totalDisbursed):'—'}</b></article>
            <article><span>Penerima terbantu</span><b>{summary?summary.recipientsHelped:'—'}</b></article>
          </div>
          <Link href="/dampak" className="btn btn-white btn-lg">Lihat Dampak & Transparansi →</Link>
        </div>
      </section>
    </main>
    <PortalFooter mode="supporter" />
  </>;
}
