import { DonorTypeCards } from '@/components/DonorTypeCards';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

export default function DonasiPage() {
  return <><SiteHeader/><main>
    <section className="page-hero"><div className="container"><div className="eyebrow">Portal Donatur YAHN</div><h1>Satu niat baik, banyak pilihan cara.</h1><p>Anda dapat langsung berdonasi tanpa akun, membuat komitmen rutin bulanan, atau menjadi Kakak Asuh bagi salah satu penerima beasiswa.</p></div></section>
    <section className="section"><div className="container"><DonorTypeCards/></div></section>
  </main><SiteFooter/></>;
}
