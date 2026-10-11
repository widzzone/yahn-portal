import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export default function BeasiswaPage() {
  return (
    <>
      <SiteHeader />
      <main className="beasiswa26-page">
        <section className="page-hero scholarship-hero compact26">
          <div className="container beasiswa26-hero-grid">
            <div>
              <div className="eyebrow">Beasiswa Yayasan Andi Hakim Nasoetion</div>
              <h1>Kesempatan pendidikan, dikelola dalam satu perjalanan.</h1>
              <p>
                Portal Beasiswa YAHN memadukan pendaftaran, unggah dokumen, pemantauan hasil
                seleksi, dan informasi tahapan berikutnya dalam satu pengalaman yang lebih sederhana.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary btn-lg" href="/beasiswa/portal">Masuk / Daftar Akun →</Link>
                <Link className="btn btn-light btn-lg" href="#informasi-pendaftaran">Lihat informasi</Link>
              </div>
              <div className="beasiswa26-inline-tags">
                <span>Mahasiswa S1 IPB semester 4 & 6</span>
                <span>IPK minimum 3.00</span>
                <span>Dukungan hingga Rp9.000.000 / tahun</span>
              </div>
            </div>

            <div className="beasiswa26-program-card">
              <span className="pill">Program 2026</span>
              <h3>Beasiswa YAHN</h3>
              <div className="program-row"><span>Target</span><strong>Mahasiswa S1 IPB Semester 4 & 6</strong></div>
              <div className="program-row"><span>Dukungan</span><strong>UKT / Living Cost</strong></div>
              <div className="program-row"><span>Maksimum</span><strong>hingga Rp9.000.000 / tahun</strong></div>
              <div className="program-row"><span>Deadline</span><strong>03 Juni 2026</strong></div>
            </div>
          </div>
        </section>

        <section id="informasi-pendaftaran" className="section section-white beasiswa26-info-section">
          <div className="container beasiswa26-info-grid">
            <article className="beasiswa26-card">
              <div className="eyebrow">Syarat Utama</div>
              <h2>Persyaratan ringkas yang mudah dipahami.</h2>
              <ul className="beasiswa26-checklist">
                <li>Mahasiswa S1 IPB semester 4 & 6 (SSMI & FMIPA).</li>
                <li>IPK terakhir minimal 3.00.</li>
                <li>Tidak sedang menerima beasiswa lain (Juli – Des 2026).</li>
                <li className="urgent">Deadline berkas: 03 Juni 2026.</li>
              </ul>
              <div className="beasiswa26-benefit-box">
                <strong>Benefit Beasiswa</strong>
                <p>Bantuan UKT atau Living Cost hingga <span>Rp 9.000.000</span> per tahun.</p>
              </div>
            </article>

            <article className="beasiswa26-card">
              <div className="eyebrow">Timeline Seleksi</div>
              <h2>Empat tahap, satu dashboard.</h2>
              <div className="beasiswa26-timeline">
                <div><small>25 Mei s.d 3 Juni</small><strong>Pengisian Berkas</strong></div>
                <div><small>3 – 10 Juni</small><strong>Seleksi Berkas</strong></div>
                <div><small>11 – 15 Juni</small><strong>Tahap Wawancara</strong></div>
                <div className="active"><small>20 Juni</small><strong>Pengumuman</strong></div>
              </div>
              <div className="beasiswa26-help-box">
                <span>Butuh bantuan?</span>
                <a href="mailto:yayasan.andihakim@gmail.com?subject=Pertanyaan%20Beasiswa%20YAHN">yayasan.andihakim@gmail.com</a>
              </div>
              <Link className="btn btn-primary btn-lg" href="/beasiswa/portal">Saya mengerti & siap daftar</Link>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
