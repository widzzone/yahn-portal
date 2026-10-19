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

            <div className="about16-hero-visual">
              <div className="about16-logo-halo" />
              <img src="/logo-yahn.png" alt="Logo Yayasan Andi Hakim Nasoetion" />
              <div className="about16-hero-note"><span>Dedikasi</span><strong>untuk Pendidikan Masa Depan</strong></div>
            </div>
          </div>
        </section>

        <AboutCompactTabs />

        <section className="about16-cta-section">
          <div className="container">
            <div className="about16-cta">
              <div>
                <span className="about16-eyebrow light">Bersama YAHN</span>
                <h2>Ambil bagian dalam membuka peluang pendidikan.</h2>
                <p>Daftar sebagai calon penerima manfaat atau bergabung sebagai Sahabat YAHN.</p>
              </div>
              <div className="about16-cta-actions">
                <Link href="/mahasiswa" className="btn btn-white btn-lg">Mendaftar Beasiswa →</Link>
                <Link href="/sahabat" className="btn btn-accent btn-lg">Menjadi Donatur →</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FoundationInfoFooter />
    </>
  );
}
