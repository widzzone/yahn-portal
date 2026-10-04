import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="topbar">
      <div className="container nav">
        <Link href="/" className="brand">
          <span className="brand-mark">YAHN</span>
          <span>Yayasan Andi Hakim Nasoetion<small>Dedikasi untuk pendidikan</small></span>
        </Link>
        <nav className="navlinks mobile-hide">
          <Link href="/beasiswa">Beasiswa</Link>
          <Link href="/donasi">Donasi</Link>
          <Link href="/kakak-asuh">Kakak Asuh</Link>
          <Link className="btn btn-primary" href="/donatur/dashboard">Portal Donatur</Link>
        </nav>
      </div>
    </header>
  );
}
