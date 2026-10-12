import Link from 'next/link';
import { PortalHeader } from '@/components/PortalHeader';
import { PortalFooter } from '@/components/PortalFooter';

export default function StudentHome() {
  return <>
    <PortalHeader mode="student" />
    <main className="role29-page student29-page">
      <section className="role29-hero">
        <div className="container role29-grid">
          <div>
            <div className="eyebrow">Portal Mahasiswa YAHN</div>
            <h1>Satu ruang untuk seluruh perjalanan beasiswa Anda.</h1>
            <p>Kenali program yang sedang dibuka, siapkan pendaftaran, dan pantau setiap tahap seleksi dari akun yang sama.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-lg" href="/beasiswa/portal">Masuk / Daftar →</Link>
              <Link className="btn btn-light btn-lg" href="/beasiswa">Lihat Program</Link>
            </div>
          </div>
          <aside className="role29-panel student">
            <span className="pill">Perjalanan Mahasiswa</span>
            <div className="role29-steps">
              <div><b>01</b><span><strong>Kenali Program</strong><small>Syarat, benefit, dan timeline.</small></span></div>
              <div><b>02</b><span><strong>Kirim Pendaftaran</strong><small>Data dan dokumen dalam satu portal.</small></span></div>
              <div><b>03</b><span><strong>Pantau Seleksi</strong><small>Status, wawancara, dan hasil akhir.</small></span></div>
            </div>
          </aside>
        </div>
      </section>
      <section className="role29-cards-section">
        <div className="container role29-cards">
          <Link href="/beasiswa" className="role29-card"><span>Program</span><h3>Beasiswa YAHN</h3><p>Lihat program aktif, persyaratan, benefit, dan timeline seleksi.</p><b>Pelajari program →</b></Link>
          <Link href="/beasiswa/portal" className="role29-card"><span>Akun</span><h3>Masuk atau Daftar</h3><p>Gunakan satu akun permanen untuk seluruh periode pendaftaran YAHN.</p><b>Buka portal →</b></Link>
          <Link href="/beasiswa/dashboard" className="role29-card"><span>Riwayat</span><h3>Status & Pendaftaran</h3><p>Pantau aplikasi aktif dan riwayat batch sebelumnya dalam satu dashboard.</p><b>Lihat dashboard →</b></Link>
        </div>
      </section>
    </main>
    <PortalFooter mode="student" />
  </>;
}
