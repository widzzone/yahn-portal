import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="topbar">
      <div className="container nav">
        <Link href="/" className="brand brand-logo-wrap">
          <img
            src="https://www.image2url.com/r2/default/images/1778748465991-f03167b3-5445-46b9-98a8-f3059ee73afd.png"
            alt="Logo Yayasan Andi Hakim Nasoetion"
            className="brand-logo-image"
          />
          <span>
            Yayasan Andi Hakim Nasoetion
            <small>Dedikasi untuk Pendidikan Masa Depan</small>
          </span>
        </Link>

        <nav className="navlinks mobile-hide">
          <Link href="/beasiswa">Beasiswa</Link>
          <Link href="/donasi">Donasi</Link>
          <Link href="/kakak-asuh">Kakak Asuh</Link>
          <Link href="/admin" className="nav-login">Admin</Link>
          <Link className="nav-login" href="/beasiswa/portal">Portal Mahasiswa</Link>
          <Link className="btn btn-primary" href="/donatur/masuk">Portal Donatur</Link>
        </nav>
      </div>
    </header>
  );
}
