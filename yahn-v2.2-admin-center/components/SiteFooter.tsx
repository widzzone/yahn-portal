import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand footer-brand-real">
            <img
              src="/logo-yahn.png"
              alt="Logo Yayasan Andi Hakim Nasoetion"
              className="footer-logo-image"
            />
            <span>
              Yayasan Andi Hakim Nasoetion
              <small>Dedikasi untuk pendidikan masa depan</small>
            </span>
          </div>
          <p>
            Portal terpadu untuk seleksi beasiswa, dukungan pendidikan, dan program Kakak Asuh
            YAHN.
          </p>
          <div className="footer-address">
            <strong>Alamat Yayasan</strong>
            <span>
              Jl. Achmad Adnawijaya No.191, RT.04/RW.15, Tegal Gundil, Kec. Bogor Utara, Kota
              Bogor, Jawa Barat 16154
            </span>
          </div>
        </div>

        <div className="footer-links">
          <strong>Program</strong>
          <Link href="/beasiswa">Beasiswa</Link>
          <Link href="/donasi">Dukungan</Link>
          <Link href="/kakak-asuh">Kakak Asuh</Link>
        </div>

        <div className="footer-links">
          <strong>Portal</strong>
          <Link href="/beasiswa/portal">Mahasiswa</Link>
          <Link href="/donatur/masuk">Sahabat YAHN</Link>
          <a href="mailto:yayasan.andihakim@gmail.com">Hubungi YAHN</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 Yayasan Andi Hakim Nasoetion</span>
        <span>YAHN Unified Portal · V2.11</span>
      </div>
    </footer>
  );
}
