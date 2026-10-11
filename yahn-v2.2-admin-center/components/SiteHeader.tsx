'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/beasiswa', label: 'Beasiswa' },
  { href: '/donasi', label: 'Dukungan' },
  { href: '/kakak-asuh', label: 'Kakak Asuh' },
  { href: '/admin', label: 'Admin' },
  { href: '/beasiswa/portal', label: 'Portal Mahasiswa' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar topbar27">
      <div className="container nav nav27">
        <Link href="/" className="brand brand-with-logo" onClick={() => setOpen(false)}>
          <span className="brand-logo-shell">
            <img src="/logo-yahn.png" alt="Logo Yayasan Andi Hakim Nasoetion" className="brand-logo" />
          </span>
          <span>
            Yayasan Andi Hakim Nasoetion
            <small>Dedikasi untuk Pendidikan Masa Depan</small>
          </span>
        </Link>

        <nav className="navlinks navlinks27 mobile-hide">
          {links.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
          <Link href="/donatur/masuk" className="btn btn-primary">Portal Sahabat</Link>
        </nav>

        <button
          type="button"
          className={`nav27-toggle ${open ? 'active' : ''}`}
          aria-label="Buka menu navigasi"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
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
            </div>
            <Link href="/donatur/masuk" className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
              Masuk Portal Sahabat
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
