import Link from 'next/link';
import { AboutCompactTabs } from '@/components/AboutCompactTabs';
import { FoundationInfoFooter } from '@/components/FoundationInfoFooter';
import { FoundationInfoHeader } from '@/components/FoundationInfoHeader';

export default function TentangYayasanPage() {
  return (
    <>
      <FoundationInfoHeader />
      <main className="about16-page">
        <section className="about16-hero">
          <div className="about16-orb about16-orb-a" />
          <div className="about16-orb about16-orb-b" />
          <div className="container about16-hero-grid">
            <div className="about16-hero-copy">
              <span className="about16-eyebrow">Tentang Yayasan Andi Hakim Nasoetion</span>
              <h1>Membuka akses pendidikan, menumbuhkan talenta, dan menguatkan kepedulian.</h1>
              <p>
                YAHN berkontribusi membangun manusia berbudaya dan bermartabat melalui akses
                pendidikan tinggi serta kegiatan sosial kemanusiaan yang berkelanjutan.
              </p>
              <div className="about16-hero-actions">
                <a href="#profil-yahn" className="btn btn-primary btn-lg">Jelajahi Profil ↓</a>
                <Link href="/mahasiswa" className="btn btn-light btn-lg">Program Beasiswa</Link>
              </div>
              <div className="about16-hero-stats">
                <div><strong>3</strong><span>Nilai utama AHN</span></div>
                <div><strong>3</strong><span>Bagian komunitas</span></div>
                <div><strong>5</strong><span>Kegiatan yayasan</span></div>
              </div>
            </div>

            <div className="about16-hero-visual refined">
              <div className="about16-logo-halo" />
              <div className="about16-logo-card">
                <img src="/logo-yahn.png" alt="Logo Yayasan Andi Hakim Nasoetion" />
                <div className="about16-logo-caption">
                  <span>Yayasan Andi Hakim Nasoetion</span>
                  <strong>Dedikasi untuk Pendidikan Masa Depan</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AboutCompactTabs />

        <section className="about21-connect-section">
          <div className="container">
            <div className="about21-connect-head">
              <div>
                <span className="about16-eyebrow">Terhubung dengan YAHN</span>
                <h2>Setiap orang dapat mengambil peran.</h2>
              </div>
              <p>Kenali program, ikut mendukung keberlanjutan pendidikan, dan lihat dampak yang tercatat secara transparan.</p>
            </div>
            <div className="about21-connect-grid">
              <Link href="/mahasiswa" className="about21-connect-card student">
                <span className="about21-connect-icon" aria-hidden="true">🎓</span>
                <small>Untuk calon penerima</small>
                <h3>Program Beasiswa</h3>
                <p>Kenali program, persyaratan, dan perjalanan seleksi Beasiswa YAHN.</p>
                <b>Lihat program <i>→</i></b>
              </Link>
              <Link href="/sahabat" className="about21-connect-card supporter">
                <span className="about21-connect-icon" aria-hidden="true">♡</span>
                <small>Untuk sahabat pendidikan</small>
                <h3>Menjadi Sahabat YAHN</h3>
                <p>Pilih cara berbagi yang sesuai dan ikut menjaga keberlanjutan pendidikan.</p>
                <b>Mulai berbagi <i>→</i></b>
              </Link>
              <Link href="/dampak" className="about21-connect-card report">
                <span className="about21-connect-icon" aria-hidden="true">▤</span>
                <small>Untuk publik</small>
                <h3>Dampak & Laporan</h3>
                <p>Ikuti penyaluran, perkembangan program, dan transparansi YAHN.</p>
                <b>Lihat laporan <i>→</i></b>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FoundationInfoFooter />
    </>
  );
}
