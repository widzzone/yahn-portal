'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang', label: 'Tentang Yayasan' },
  { href: '/mahasiswa', label: 'Beasiswa' },
  { href: '/sahabat', label: 'Menjadi Sahabat' },
  { href: '/dampak', label: 'Dampak & Laporan' },
];

export function FoundationInfoHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="foundation15-header">
      <div className="container foundation15-nav">
        <Link href="/" className="foundation15-brand" onClick={() => setOpen(false)}>
          <img src="/logo-yahn.png" alt="Logo Yayasan Andi Hakim Nasoetion" />
          <span>
            Yayasan Andi Hakim Nasoetion
            <small>Dedikasi untuk Pendidikan Masa Depan</small>
          </span>
        </Link>

        <nav className="foundation15-links foundation15-desktop-nav" aria-label="Navigasi utama">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className={item.href === '/tentang' ? 'active' : ''}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={`foundation15-menu-toggle ${open ? 'active' : ''}`}
          aria-label="Buka menu navigasi"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="foundation15-mobile-nav">
          <div className="container">
            {links.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <span>{item.label}</span>
                <b>→</b>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
