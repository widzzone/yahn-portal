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
  return <><SiteHeader/><main className="donation23-page">
    <section className="donation23-hero">
      <div className="donation23-orb donation23-orb-a"/><div className="donation23-orb donation23-orb-b"/>
      <div className="container donation23-hero-grid">
        <div className="donation23-hero-copy">
          <div className="eyebrow">Portal Donatur YAHN</div>
          <h1>Satu kebaikan hari ini, <span>dampaknya panjang</span> untuk masa depan.</h1>
          <p>Pilih cara berbagi yang paling nyaman. Donasi sekali tanpa akun, jadikan kebaikan sebagai kebiasaan bulanan, atau dampingi langsung satu penerima melalui Kakak Asuh.</p>
          <div className="donation23-trust-row"><span>✓ Mudah dimulai</span><span>✓ Dicatat YAHN</span><span>✓ Update dampak</span></div>
          <div className="donation23-mini-help">Butuh bantuan menentukan pilihan? <Link href="#pilihan-donasi">Lihat perbedaannya ↓</Link></div>
        </div>
        <DonationQuickStart/>
      </div>
    </section>

    <section className="donation23-confidence">
      <div className="container donation23-confidence-grid">
        <div><span>01</span><strong>Mulai tanpa ribet</strong><p>Donasi satu kali bisa dilakukan tanpa akun.</p></div>
        <div><span>02</span><strong>Pilih cara sendiri</strong><p>QRIS, transfer, bulanan, atau Kakak Asuh.</p></div>
        <div><span>03</span><strong>Ikuti dampaknya</strong><p>Donatur terdaftar dapat melihat histori dan update.</p></div>
      </div>
    </section>

    <section id="pilihan-donasi" className="section donation23-choice-section"><div className="container">
      <div className="split-heading"><div><div className="eyebrow">Cara Berbagi</div><h2>Tiga cara, satu tujuan yang sama.</h2></div><p>Tidak ada pilihan yang terlalu kecil. Pilih skema yang sesuai dengan kenyamanan dan ritme Anda.</p></div>
      <DonorTypeCards/>
    </div></section>

    <section className="section donation23-how"><div className="container donation23-how-grid">
      <div className="donation23-how-copy"><div className="eyebrow">Alur Sederhana</div><h2>Dari niat baik menjadi dukungan nyata.</h2><p>Untuk donasi satu kali, prosesnya hanya beberapa langkah dan tidak membutuhkan akun.</p><Link className="btn btn-primary" href="/donasi/sekarang">Mulai donasi →</Link></div>
      <div className="donation23-steps">
        <article><b>1</b><div><strong>Pilih nominal</strong><p>Mulai dari nominal yang paling nyaman untuk Anda.</p></div></article>
        <article><b>2</b><div><strong>Bayar via QRIS / transfer</strong><p>Gunakan kanal pembayaran resmi YAHN yang tampil di portal.</p></div></article>
        <article><b>3</b><div><strong>Kirim konfirmasi</strong><p>Data transaksi dicatat agar tim YAHN dapat melakukan verifikasi.</p></div></article>
      </div>
    </div></section>

    {recipients.length>0&&<section className="section donation23-sponsor-section"><div className="container">
      <div className="split-heading"><div><div className="eyebrow">Kakak Asuh</div><h2>Temui beberapa penerima yang sedang membuka dukungan.</h2></div><p>Profil publik hanya menampilkan informasi yang telah disetujui untuk dibagikan kepada donatur.</p></div>
      <div className="donation23-recipient-grid">{recipients.map((s:any)=>{const pct=s.target?Math.min(100,Math.round((Number(s.funded||0)/Number(s.target||1))*100)):0;return <Link href={`/kakak-asuh/${encodeURIComponent(s.recipientId)}`} className="donation23-recipient-card" key={s.recipientId}><div className="donation23-recipient-top"><div className="avatar">{String(s.name||'Y').split(' ').map((x:string)=>x[0]).join('').slice(0,2).toUpperCase()}</div><span>{s.need||'Dukungan Pendidikan'}</span></div><h3>{s.name}</h3><p>{s.program} · Semester {s.semester}</p><div className="donation23-progress"><i style={{width:`${pct}%`}}/></div><div className="donation23-funded"><span>{rupiah(Number(s.funded||0))} terkumpul</span><b>{pct}%</b></div><small>Lihat perjalanan →</small></Link>})}</div>
      <div className="donation23-center-action"><Link href="/kakak-asuh" className="btn btn-light">Lihat semua calon adik asuh →</Link></div>
    </div></section>}

    <section className="section donation23-faq"><div className="container donation23-faq-grid">
      <div><div className="eyebrow">Pertanyaan Umum</div><h2>Sebelum Anda mulai.</h2><p>Beberapa hal yang paling sering ditanyakan calon donatur.</p></div>
      <div className="donation23-faq-list">
        <details open><summary>Apakah donasi satu kali harus membuat akun?</summary><p>Tidak. Anda bisa langsung memilih nominal, membayar melalui QRIS atau transfer, lalu mengirim konfirmasi transaksi.</p></details>
        <details><summary>Bagaimana donasi saya diverifikasi?</summary><p>Konfirmasi yang Anda kirim masuk ke database YAHN dan diverifikasi oleh admin berdasarkan transaksi pada kanal pembayaran resmi.</p></details>
        <details><summary>Apa bedanya donatur bulanan dan Kakak Asuh?</summary><p>Donatur bulanan membuat komitmen rutin untuk program YAHN. Kakak Asuh memilih satu penerima dan fokus pada kebutuhan pendidikan penerima tersebut.</p></details>
        <details><summary>Apakah nama saya harus tampil publik?</summary><p>Tidak. Pada konfirmasi donasi Anda dapat memilih opsi anonim untuk laporan publik.</p></details>
      </div>
    </div></section>
  </main><SiteFooter/></>;
}
