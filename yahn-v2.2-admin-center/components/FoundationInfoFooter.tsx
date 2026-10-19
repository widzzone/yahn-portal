import Link from 'next/link';

export function FoundationInfoFooter() {
  return (
    <footer className="foundation15-footer">
      <div className="container foundation15-footer-grid">
        <div className="foundation15-footer-brand">
          <img src="/logo-yahn.png" alt="Logo Yayasan Andi Hakim Nasoetion" />
          <div>
            <strong>Yayasan Andi Hakim Nasoetion</strong>
            <span>Dedikasi untuk pendidikan masa depan.</span>
          </div>
        </div>

        <div className="foundation15-footer-links">
          <Link href="/mahasiswa">Mendaftar Beasiswa</Link>
          <Link href="/sahabat">Menjadi Sahabat</Link>
          <Link href="/dampak">Dampak & Laporan</Link>
        </div>

        <div className="foundation15-footer-contact">
          <strong>Alamat Yayasan</strong>
          <span>
            Jl. Achmad Adnawijaya No.191, RT.04/RW.15, Tegal Gundil, Kec. Bogor Utara,
            Kota Bogor, Jawa Barat 16154
          </span>
          <a href="mailto:yayasan.andihakim@gmail.com">yayasan.andihakim@gmail.com</a>
        </div>
      </div>
      <div className="container foundation15-footer-bottom">
        <span>© 2026 Yayasan Andi Hakim Nasoetion</span>
        <Link href="/">Kembali ke Beranda →</Link>
      </div>
    </footer>
  );
}
