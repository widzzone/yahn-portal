import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export default function TentangYayasanPage() {
  return (
    <>
      <SiteHeader />
      <main className="about14-page">
        <section className="about14-hero">
          <div className="container about14-hero-grid">
            <div>
              <div className="eyebrow">Tentang Yayasan</div>
              <h1>Menjaga keberlanjutan pendidikan melalui dukungan yang terarah.</h1>
              <p>
                Yayasan Andi Hakim Nasoetion menghadirkan program beasiswa, dukungan pendidikan,
                dan pendampingan Kakak Asuh dalam satu ekosistem yang lebih mudah diakses dan diikuti.
              </p>
              <div className="hero-actions">
                <Link href="/mahasiswa" className="btn btn-primary btn-lg">Lihat Program Beasiswa →</Link>
                <Link href="/sahabat" className="btn btn-light btn-lg">Cara Berbagi</Link>
              </div>
            </div>
            <div className="about14-logo-card">
              <img src="/logo-yahn.png" alt="Logo Yayasan Andi Hakim Nasoetion" />
              <span>Dedikasi untuk Pendidikan Masa Depan</span>
            </div>
          </div>
        </section>

        <section className="section section-white about14-focus">
          <div className="container">
            <div className="split-heading">
              <div>
                <div className="eyebrow">Fokus Program</div>
                <h2>Tiga jalur untuk mendukung perjalanan pendidikan.</h2>
              </div>
              <p>Portal YAHN menghubungkan peserta, Sahabat YAHN, dan tim pengelola dalam alur yang transparan dan terintegrasi.</p>
            </div>
            <div className="about14-cards">
              <article><span>🎓</span><h3>Beasiswa</h3><p>Pendaftaran, seleksi, wawancara, hingga pemantauan status mahasiswa.</p></article>
              <article><span>♡</span><h3>Dukungan Pendidikan</h3><p>Dukungan sekali maupun bulanan melalui QRIS atau transfer resmi YAHN.</p></article>
              <article><span>✦</span><h3>Kakak Asuh</h3><p>Pendampingan yang lebih personal untuk kebutuhan UKT atau living cost penerima.</p></article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
