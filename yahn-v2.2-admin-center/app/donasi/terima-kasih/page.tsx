import Link from 'next/link';
import { PortalHeader } from '@/components/PortalHeader';
import { PortalFooter } from '@/components/PortalFooter';

const rupiah = (v:number) => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(v||0);

export default async function ThankYouPage({searchParams}:{searchParams:Promise<{donationId?:string;amount?:string;method?:string;proof?:string;monthly?:string;period?:string}>}){
  const q = await searchParams;
  const donationId = q.donationId || '-';
  const amount = Math.max(0, Number(q.amount || 0) || 0);
  const method = q.method || '-';
  const proofUploaded = q.proof === 'uploaded';
  const monthly = q.monthly === '1';
  const period = q.period || '';
  return <>
    <PortalHeader mode="supporter"/>
    <main className="thank25-page">
      <div className="thank25-orb thank25-a"/><div className="thank25-orb thank25-b"/>
      <section className="container thank25-shell">
        <div className="thank25-visual">
          <div className="thank25-check">✓</div>
          <span className="eyebrow eyebrow-light">Konfirmasi diterima</span>
          <h1>{monthly ? 'Pembayaran bulanan Anda sudah tercatat.' : 'Terima kasih sudah ikut membuka jalan pendidikan.'}</h1>
          <p>{monthly ? 'Pembayaran periode berjalan menunggu pencocokan transaksi oleh tim YAHN.' : 'Kontribusi Anda sudah tercatat dan menunggu pencocokan transaksi oleh tim YAHN.'}</p>
          <div className="thank25-trust"><span>✓ Data tercatat</span><span>✓ Verifikasi manual</span><span>✓ Status dapat dipantau</span></div>
        </div>
        <div className="thank25-card">
          <span className="pill">Ringkasan dukungan</span>
          <div className="thank25-amount">{rupiah(amount)}</div>
          <div className="thank25-rows">
            <div><span>Donation ID</span><strong>{donationId}</strong></div>
            <div><span>Metode</span><strong>{method}</strong></div>{monthly&&period&&<div><span>Periode</span><strong>{period}</strong></div>}
            <div><span>Bukti Pembayaran</span><strong>{proofUploaded ? 'Terlampir ✓' : 'Tidak dilampirkan'}</strong></div>
            <div><span>Status</span><strong className="thank25-status">Menunggu verifikasi</strong></div>
          </div>
          <div className="thank25-note">Tim YAHN akan memeriksa transaksi dan bukti yang Anda lampirkan. Setelah terverifikasi, kontribusi akan masuk ke riwayat kontribusi Anda.</div>
          <div className="thank25-actions">
            <Link className="btn btn-primary" href="/donatur/masuk">Pantau di Portal Sahabat →</Link>
            <Link className="btn btn-light" href="/sahabat">Kembali ke Portal Sahabat</Link>
          </div>
          <Link className="thank25-again" href={monthly?'/donatur/dashboard':'/donasi/sekarang'}>{monthly?'Lihat riwayat dukungan bulanan':'Saya ingin berbagi lagi'}</Link>
        </div>
      </section>
    </main>
    <PortalFooter mode="supporter"/>
  </>;
}
