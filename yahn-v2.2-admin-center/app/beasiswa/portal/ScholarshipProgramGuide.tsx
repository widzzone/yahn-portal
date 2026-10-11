'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ScholarshipProgramGuide() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className="scholarship-info-card scholarship-guide-trigger" onClick={() => setOpen(true)}>
        <span className="scholarship-info-icon" aria-hidden="true">i</span>
        <span>
          <strong>Belum kenal Program YAHN?</strong>
          <small>Pelajari persyaratan & panduan →</small>
        </span>
      </button>

      {open && (
        <div className="scholarship-guide-modal" role="dialog" aria-modal="true" aria-labelledby="guide-title">
          <div className="scholarship-guide-backdrop" onClick={() => setOpen(false)} />
          <div className="scholarship-guide-card">
            <button type="button" className="scholarship-guide-close" onClick={() => setOpen(false)} aria-label="Tutup panduan">×</button>
            <h2 id="guide-title">Informasi Pendaftaran YAHN</h2>
            <div className="scholarship-guide-divider" />

            <section className="scholarship-guide-block">
              <h3>Syarat Utama</h3>
              <ul>
                <li>Mahasiswa S1 IPB semester 4 & 6 (SSMI & FMIPA).</li>
                <li>IPK terakhir minimal 3.00.</li>
                <li>Tidak sedang menerima beasiswa lain (Juli – Des 2026).</li>
                <li className="urgent">Deadline berkas: 03 Juni 2026.</li>
              </ul>
            </section>

            <section className="scholarship-guide-highlight">
              <strong>Benefit Beasiswa</strong>
              <p>
                Bantuan <b>UKT atau Living Cost</b> hingga <span>Rp 9.000.000</span> per tahun.
              </p>
            </section>

            <section className="scholarship-guide-block">
              <h3>Timeline Seleksi</h3>
              <div className="scholarship-guide-timeline">
                <article><small>25 Mei s.d 3 Juni</small><strong>Pengisian Berkas</strong></article>
                <article><small>3 – 10 Juni</small><strong>Seleksi Berkas</strong></article>
                <article><small>11 – 15 Juni</small><strong>Tahap Wawancara</strong></article>
                <article className="active"><small>20 Juni</small><strong>Pengumuman</strong></article>
              </div>
            </section>

            <section className="scholarship-guide-help">
              <span>Butuh bantuan?</span>
              <a href="mailto:yayasan.andihakim@gmail.com?subject=Pertanyaan%20Beasiswa%20YAHN">yayasan.andihakim@gmail.com</a>
            </section>

            <div className="scholarship-guide-actions">
              <button type="button" className="btn btn-primary btn-lg" onClick={() => setOpen(false)}>
                Saya mengerti & siap daftar
              </button>
              <Link href="/beasiswa" className="scholarship-secondary-button">Lihat halaman program</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
