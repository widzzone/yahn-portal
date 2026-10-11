import { SiteHeader } from '@/components/SiteHeader';
import ScholarshipAccess from './ScholarshipAccess';
import ScholarshipProgramGuide from './ScholarshipProgramGuide';

export default function ScholarshipPortalPage() {
  return (
    <>
      <SiteHeader />
      <main className="scholarship-portal-page">
        <div className="container scholarship-portal-shell compact">
          <section className="scholarship-story-panel compact">
            <div className="scholarship-story-header">
              <img src="/logo-yahn.png" alt="Logo YAHN" className="scholarship-side-logo" />
              <div>
                <span>Yayasan Andi Hakim Nasoetion</span>
                <small>Dedikasi untuk Pendidikan Masa Depan</small>
              </div>
            </div>

            <div>
              <p className="scholarship-story-eyebrow">Portal Peserta YAHN</p>
              <h1>Membangun masa depan, dimulai dari satu langkah yang terarah.</h1>
              <p className="scholarship-story-text">
                Daftar, kirim berkas, pantau hasil seleksi, lihat jadwal wawancara, dan konfirmasi
                seluruh proses beasiswa dari portal yang sama.
              </p>
            </div>

            <div className="scholarship-benefit-stack compact">
              <div className="scholarship-benefit-card compact">
                <span className="scholarship-benefit-icon" aria-hidden="true">▣</span>
                <div>
                  <strong>Biaya Pendidikan (UKT)</strong>
                  <span>Dukungan biaya semester untuk mahasiswa terpilih.</span>
                </div>
              </div>
              <div className="scholarship-benefit-card compact">
                <span className="scholarship-benefit-icon" aria-hidden="true">⌂</span>
                <div>
                  <strong>Biaya Hidup (Living Cost)</strong>
                  <span>Bantuan kebutuhan harian untuk menjaga keberlanjutan studi.</span>
                </div>
              </div>
            </div>
          </section>

          <section className="scholarship-access-column compact">
            <ScholarshipProgramGuide />
            <ScholarshipAccess />
            <div className="scholarship-help-row compact">
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
