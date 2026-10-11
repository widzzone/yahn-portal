import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="topbar">
      <div className="container nav">
        <Link href="/" className="brand brand-with-logo">
          <span className="brand-logo-shell">
            <img src="/logo-yahn.png" alt="Logo Yayasan Andi Hakim Nasoetion" className="brand-logo" />
          </span>
          <span>
            Yayasan Andi Hakim Nasoetion
            <small>Dedikasi untuk Pendidikan Masa Depan</small>
          </span>
        </Link>

        <nav className="navlinks mobile-hide">
          <Link href="/beasiswa">Beasiswa</Link>
          <Link href="/donasi">Dukungan</Link>
          <Link href="/kakak-asuh">Kakak Asuh</Link>
          <Link href="/admin" className="nav-login">Admin</Link>
          <Link href="/beasiswa/portal" className="nav-login">Portal Mahasiswa</Link>
          <Link href="/donatur/masuk" className="btn btn-primary">Portal Sahabat</Link>
        </nav>
      </div>
    </header>
  );
}
