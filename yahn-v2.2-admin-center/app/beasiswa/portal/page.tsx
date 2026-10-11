import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import ScholarshipAccess from './ScholarshipAccess';

export default function ScholarshipPortal() {
  return (
    <>
      <SiteHeader />
      <main className="scholarship-portal-page">
        <div className="scholarship-portal-shell">
          <section className="scholarship-brand-panel">
            <span className="scholarship-brand-ring scholarship-brand-ring-a" aria-hidden="true" />
            <span className="scholarship-brand-ring scholarship-brand-ring-b" aria-hidden="true" />

            <div className="scholarship-brand-lockup">
              <span className="scholarship-brand-logo-wrap">
                <img src="/logo-yahn.png" alt="Logo Yayasan Andi Hakim Nasoetion" className="scholarship-brand-logo" />
              </span>
              <div>
                <strong>YAYASAN ANDI HAKIM NASOETION</strong>
                <span>DEDIKASI UNTUK PENDIDIKAN MASA DEPAN</span>
              </div>
            </div>

            <div className="scholarship-brand-copy">
              <span className="scholarship-kicker">Portal Peserta YAHN</span>
              <h1>Membangun Masa Depan.</h1>
              <p>
                Portal resmi pendaftaran program Beasiswa Andi Hakim Nasoetion untuk mendukung
                keberlanjutan pendidikan dan pengembangan kapasitas generasi muda Indonesia.
              </p>
            </div>

            <div className="scholarship-benefits">
              <div className="scholarship-benefit-row">
                <span className="scholarship-benefit-icon" aria-hidden="true">▣</span>
                <div>
                  <strong>Biaya Pendidikan (UKT)</strong>
                  <span>Dukungan biaya semester sesuai hasil evaluasi yayasan.</span>
                </div>
              </div>
              <div className="scholarship-benefit-row">
                <span className="scholarship-benefit-icon" aria-hidden="true">⌂</span>
                <div>
                  <strong>Biaya Hidup (Living Cost)</strong>
                  <span>Bantuan kebutuhan harian untuk menjaga keberlanjutan studi.</span>
                </div>
              </div>
            </div>

            <a
              className="scholarship-video-link"
              href="https://drive.google.com/file/d/1OVvHzYFlbPDmcTuhNYK6rPlt3ivkpB0W/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              <span className="scholarship-video-play" aria-hidden="true">▶</span>
              <span>
                <small>Tonton Video</small>
                <strong>Sejarah Beasiswa YAHN</strong>
              </span>
            </a>
          </section>

          <section className="scholarship-access-column">
            <Link href="/beasiswa#alur" className="scholarship-info-card">
              <span className="scholarship-info-icon" aria-hidden="true">i</span>
              <span>
                <strong>Belum kenal Program YAHN?</strong>
                <small>Pelajari program, persyaratan & alur seleksi →</small>
              </span>
            </Link>

            <ScholarshipAccess />

            <div className="scholarship-help-row">
              <span>Butuh bantuan?</span>
              <a href="mailto:yayasan.andihakim@gmail.com?subject=Pertanyaan%20Beasiswa%20YAHN">
                yayasan.andihakim@gmail.com
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
