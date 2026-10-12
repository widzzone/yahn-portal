import { PortalHeader } from '@/components/PortalHeader';
import DonorLogin from './DonorLogin';

export default function DonorLoginPage(){
  return <>
    <PortalHeader mode="supporter" />
    <main className="donor25-login-page compact-support-page">
      <div className="container donor25-login-shell compact-support-shell">
        <section className="donor25-login-copy compact-support-copy">
          <div className="donor25-brand-row"><img src="/logo-yahn.png" alt="Logo YAHN"/><div><b>Portal Sahabat YAHN</b><span>Ruang pribadi dukungan</span></div></div>
          <div><span className="eyebrow eyebrow-light">Dampak yang dapat diikuti</span><h1>Satu akun untuk melihat perjalanan kontribusi Anda.</h1><p>Riwayat dukungan, komitmen bulanan, Kakak Asuh, dan update dampak dirangkum dalam satu dashboard yang sederhana.</p></div>
          <div className="donor25-benefits"><span>✓ Masuk dengan kode email</span><span>✓ Riwayat transaksi terverifikasi</span><span>✓ Data sahabat tetap privat</span></div>
        </section>
        <DonorLogin/>
      </div>
    </main>
  </>;
}
