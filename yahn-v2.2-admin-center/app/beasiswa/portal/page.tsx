import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import ScholarshipAccess from './ScholarshipAccess';

export default function ScholarshipPortal() {
  return (
    <>
      <SiteHeader />
      <main className="auth-page scholarship-auth-page">
        <div className="auth-shell auth-shell-premium">
          <div className="auth-copy auth-copy-brand">
            <div className="auth-brand-top">
              <img
                src="https://www.image2url.com/r2/default/images/1778748465991-f03167b3-5445-46b9-98a8-f3059ee73afd.png"
                alt="Logo YAHN"
                className="auth-brand-logo"
              />
              <div className="auth-brand-text">
                <span className="auth-brand-name">YAYASAN ANDI HAKIM NASOETION</span>
                <small>DEDIKASI UNTUK PENDIDIKAN MASA DEPAN</small>
              </div>
            </div>

            <h1>Membangun Masa Depan.</h1>
            <p>
              Portal resmi pendaftaran program beasiswa Andi Hakim Nasoetion
              untuk pengembangan kapasitas generasi emas Indonesia.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon">📘</div>
                <div>
                  <strong>Biaya Pendidikan (UKT)</strong>
                  <span>Dukungan dana semester mahasiswa.</span>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🏠</div>
                <div>
                  <strong>Biaya Hidup (Living Cost)</strong>
                  <span>Bantuan dana kebutuhan harian.</span>
                </div>
              </div>
            </div>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              className="video-pill"
            >
              <span className="video-icon">▶</span>
              <div>
                <small>TONTON VIDEO</small>
                <strong>Sejarah Beasiswa YAHN</strong>
              </div>
            </a>
          </div>

          <div className="auth-side-stack">
            <div className="info-box">
              <div className="info-box-icon">i</div>
              <div>
                <strong>Belum kenal Program YAHN?</strong>
                <p>Pelajari persyaratan & panduan →</p>
              </div>
            </div>

            <ScholarshipAccess />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
