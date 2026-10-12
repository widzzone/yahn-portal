import Link from 'next/link';
import { PortalHeader } from '@/components/PortalHeader';
import { PortalFooter } from '@/components/PortalFooter';
import { DonationQuickStart } from '@/components/DonationQuickStart';

export default function SupporterHome() {
  return <>
    <PortalHeader mode="supporter" />
    <main className="role29-page supporter29-page">
      <section className="role29-hero supporter29-hero">
        <div className="container role29-grid supporter29-grid">
          <div>
            <div className="eyebrow">Portal Sahabat YAHN</div>
            <h1>Berbagi dengan cara yang nyaman, mengikuti dampak dengan lebih dekat.</h1>
            <p>Pilih dukungan satu kali, komitmen bulanan, atau dampingi langsung satu perjalanan pendidikan melalui Kakak Asuh.</p>
            <div className="role29-trust"><span>✓ Mudah dimulai</span><span>✓ Transparan</span><span>✓ Dampak dapat diikuti</span></div>
          </div>
          <DonationQuickStart />
        </div>
      </section>
      <section className="role29-cards-section supporter29-cards-section">
        <div className="container role29-cards">
          <Link href="/donasi/sekarang" className="role29-card"><span>Sekali</span><h3>Berbagi Sekarang</h3><p>Gunakan QRIS atau transfer resmi YAHN tanpa perlu membuat akun terlebih dahulu.</p><b>Mulai berbagi →</b></Link>
          <Link href="/donasi/bulanan" className="role29-card"><span>Rutin</span><h3>Dukungan Bulanan</h3><p>Tentukan nominal dan tanggal pengingat untuk membangun kebiasaan berbagi.</p><b>Atur dukungan →</b></Link>
          <Link href="/kakak-asuh" className="role29-card"><span>Personal</span><h3>Kakak Asuh</h3><p>Kenali penerima yang membuka dukungan dan dampingi kebutuhan pendidikannya.</p><b>Lihat penerima →</b></Link>
        </div>
      </section>
    </main>
    <PortalFooter mode="supporter" />
  </>;
}
