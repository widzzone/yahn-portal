import { PortalHeader } from '@/components/PortalHeader';
import ScholarshipAccess from './ScholarshipAccess';
import ScholarshipProgramGuide from './ScholarshipProgramGuide';

export default function ScholarshipPortalPage() {
  return (
    <>
      <PortalHeader mode="student" />
      <main className="scholarship-portal-page scholarship271-page">
        <div className="scholarship-portal-shell scholarship271-shell">
          <section className="scholarship-brand-panel scholarship271-brand-panel">
            <span className="scholarship-brand-ring scholarship-brand-ring-a" />
            <span className="scholarship-brand-ring scholarship-brand-ring-b" />

            <div className="scholarship-brand-lockup">
              <span className="scholarship-brand-logo-wrap">
                <img src="/logo-yahn.png" alt="Logo YAHN" className="scholarship-brand-logo" />
              </span>
              <div>
                <strong>YAYASAN ANDI HAKIM NASOETION</strong>
                <span>DEDIKASI UNTUK PENDIDIKAN MASA DEPAN</span>
              </div>
            </div>

            <div className="scholarship-brand-copy scholarship271-brand-copy">
              <span className="scholarship-kicker">Portal Peserta YAHN</span>
              <h1>Membangun masa depan.</h1>
              <p>
                Daftar, kirim berkas, pantau hasil seleksi, lihat jadwal wawancara, dan konfirmasi
                seluruh perjalanan beasiswa dari satu portal yang sama.
              </p>
            </div>

            <div className="scholarship-benefits scholarship271-benefits">
              <div className="scholarship-benefit-row">
                <span className="scholarship-benefit-icon">▣</span>
                <div>
                  <strong>Biaya Pendidikan (UKT)</strong>
                  <span>Dukungan biaya semester untuk mahasiswa terpilih.</span>
                </div>
              </div>
              <div className="scholarship-benefit-row">
                <span className="scholarship-benefit-icon">⌂</span>
                <div>
                  <strong>Biaya Hidup (Living Cost)</strong>
                  <span>Bantuan kebutuhan harian untuk menjaga keberlanjutan studi.</span>
                </div>
              </div>
            </div>

            <a
              className="scholarship-video-link scholarship271-video-link"
              href="https://drive.google.com/file/d/1OVvHzYFlbPDmcTuhNYK6rPlt3ivkpB0W/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              <span className="scholarship-video-play">▶</span>
              <span>
                <small>Tonton Video</small>
                <strong>Sejarah Beasiswa YAHN</strong>
              </span>
            </a>
          </section>

          <section className="scholarship-access-column scholarship271-access-column">
            <ScholarshipProgramGuide />
            <ScholarshipAccess />
            <div className="scholarship-help-row scholarship271-help-row">
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
