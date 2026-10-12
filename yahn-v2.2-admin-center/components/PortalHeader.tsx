'use client';

import Link from 'next/link';
import { useState } from 'react';

type PortalMode = 'student' | 'supporter';

const studentLinks = [
  { href: '/mahasiswa', label: 'Beranda' },
  { href: '/beasiswa', label: 'Program Beasiswa' },
  { href: '/beasiswa/portal', label: 'Masuk / Daftar' },
  { href: '/beasiswa/dashboard', label: 'Riwayat & Status' },
];

const supporterLinks = [
  { href: '/sahabat', label: 'Beranda' },
  { href: '/sahabat#cara-berbagi', label: 'Cara Berbagi' },
  { href: '/donasi/bulanan', label: 'Dukungan Bulanan' },
  { href: '/kakak-asuh', label: 'Kakak Asuh' },
  { href: '/dampak', label: 'Dampak & Transparansi' },
];

export function PortalHeader({ mode }: { mode: PortalMode }) {
  const [open, setOpen] = useState(false);
  const links = mode === 'student' ? studentLinks : supporterLinks;
  const homeHref = mode === 'student' ? '/mahasiswa' : '/sahabat';
  const badge = mode === 'student' ? 'Portal Mahasiswa' : 'Portal Sahabat';
  const action = mode === 'student'
    ? { href: '/beasiswa/portal', label: 'Masuk Mahasiswa' }
    : { href: '/donatur/masuk', label: 'Portal Sahabat' };

  return (
    <header className={`topbar topbar27 persona-header persona-${mode}`}>
      <div className="container nav nav27">
        <Link href={homeHref} className="brand brand-with-logo" onClick={() => setOpen(false)}>
          <span className="brand-logo-shell">
            <img src="/logo-yahn.png" alt="Logo Yayasan Andi Hakim Nasoetion" className="brand-logo" />
          </span>
          <span>
            Yayasan Andi Hakim Nasoetion
            <small>{badge}</small>
          </span>
        </Link>

        <nav className="navlinks navlinks27 mobile-hide">
          {links.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          <Link href="/" className="persona-switch">Ganti Portal</Link>
          <Link href={action.href} className="btn btn-primary">{action.label}</Link>
        </nav>

        <button
          type="button"
          className={`nav27-toggle ${open ? 'active' : ''}`}
          aria-label="Buka menu navigasi"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className="nav27-mobile-panel">
          <div className="container nav27-mobile-inner">
            <div className="nav27-mobile-links">
              {links.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <span>{item.label}</span><b>→</b>
                </Link>
              ))}
              <Link href="/" onClick={() => setOpen(false)}><span>Ganti Portal</span><b>↔</b></Link>
            </div>
            <Link href={action.href} className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
              {action.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
