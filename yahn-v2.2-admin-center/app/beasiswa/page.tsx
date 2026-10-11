import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export default function BeasiswaPage() {
  return (
    <>
      <SiteHeader />
      <main className="beasiswa271-page">
        <section className="page-hero scholarship-hero beasiswa271-hero">
          <div className="container beasiswa271-hero-grid">
            <div className="beasiswa271-hero-copy">
              <div className="eyebrow">Beasiswa Yayasan Andi Hakim Nasoetion</div>
              <h1>Kesempatan pendidikan, dikelola dalam satu perjalanan.</h1>
              <p>
                Pendaftaran, unggah dokumen, pemantauan hasil seleksi, hingga informasi tahap
                berikutnya tersedia dalam satu portal YAHN.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary btn-lg" href="/beasiswa/portal">Masuk / Daftar Akun →</Link>
                <Link className="btn btn-light btn-lg" href="#informasi-pendaftaran">Lihat informasi</Link>
              </div>
              <div className="beasiswa271-chip-row">
                <span>IPB S1 · Semester 4 & 6</span>
                <span>IPK minimum 3.00</span>
                <span>UKT / Living Cost</span>
              </div>
            </div>

            <aside className="beasiswa271-program-card">
              <div className="beasiswa271-program-head">
                <span className="pill">Program 2026</span>
                <span className="beasiswa271-deadline">Deadline 03 Juni 2026</span>
              </div>
              <h3>Beasiswa YAHN</h3>
              <div className="beasiswa271-program-stats">
                <div><span>Target</span><strong>S1 IPB Semester 4 & 6</strong></div>
                <div><span>Benefit</span><strong>UKT / Living Cost</strong></div>
                <div className="wide"><span>Maksimum dukungan</span><strong>Rp9.000.000 / tahun</strong></div>
              </div>
            </aside>
          </div>
        </section>

        <section id="informasi-pendaftaran" className="beasiswa271-info-section">
          <div className="container beasiswa271-info-grid">
            <article className="beasiswa271-info-card requirements-card">
              <div className="beasiswa271-card-head">
                <div><span className="eyebrow">Syarat Utama</span><h2>Ringkas, jelas, dan mudah dicek.</h2></div>
                <span className="beasiswa271-card-icon">✓</span>
              </div>
              <ul className="beasiswa271-checklist">
                <li>Mahasiswa S1 IPB semester 4 & 6 (SSMI & FMIPA).</li>
                <li>IPK terakhir minimal 3.00.</li>
                <li>Tidak sedang menerima beasiswa lain (Juli – Des 2026).</li>
              </ul>
              <div className="beasiswa271-benefit-box">
                <div><small>Benefit maksimum</small><strong>Rp9.000.000</strong></div>
                <p>Untuk dukungan UKT atau Living Cost per tahun.</p>
              </div>
            </article>

            <article className="beasiswa271-info-card timeline-card">
              <div className="beasiswa271-card-head">
                <div><span className="eyebrow">Timeline Seleksi</span><h2>Empat tahap, satu dashboard.</h2></div>
                <span className="beasiswa271-card-icon">4</span>
              </div>
              <div className="beasiswa271-timeline-list">
                <div><span>01</span><p><small>25 Mei – 3 Juni</small><strong>Pengisian Berkas</strong></p></div>
                <div><span>02</span><p><small>3 – 10 Juni</small><strong>Seleksi Berkas</strong></p></div>
                <div><span>03</span><p><small>11 – 15 Juni</small><strong>Tahap Wawancara</strong></p></div>
                <div className="active"><span>04</span><p><small>20 Juni</small><strong>Pengumuman</strong></p></div>
              </div>
              <div className="beasiswa271-actions-row">
                <div className="beasiswa271-help">
                  <small>Butuh bantuan?</small>
                  <a href="mailto:yayasan.andihakim@gmail.com?subject=Pertanyaan%20Beasiswa%20YAHN">yayasan.andihakim@gmail.com</a>
                </div>
                <Link className="btn btn-primary" href="/beasiswa/portal">Siap daftar →</Link>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
