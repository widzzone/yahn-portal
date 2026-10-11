import { SiteHeader } from '@/components/SiteHeader';
import DonorLogin from './DonorLogin';

export default function DonorLoginPage(){
  return <>
    <SiteHeader/>
    <main className="donor25-login-page">
      <div className="container donor25-login-shell">
        <section className="donor25-login-copy">
          <div className="donor25-brand-row"><img src="/logo-yahn.png" alt="Logo YAHN"/><div><b>YAHN Donor Circle</b><span>Portal pribadi donatur</span></div></div>
          <div><span className="eyebrow eyebrow-light">Dampak yang dapat diikuti</span><h1>Satu akun untuk melihat perjalanan kontribusi Anda.</h1><p>Riwayat donasi, komitmen bulanan, Kakak Asuh, dan update dampak dirangkum dalam satu dashboard yang sederhana.</p></div>
          <div className="donor25-benefits"><span>✓ Masuk dengan kode email</span><span>✓ Riwayat transaksi terverifikasi</span><span>✓ Data donatur tetap privat</span></div>
        </section>
        <DonorLogin/>
      </div>
    </main>
  </>;
}
