'use client';

import { useState } from 'react';

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
        <div className="scholarship-guide-modal scholarship271-guide-modal" role="dialog" aria-modal="true" aria-labelledby="guide-title">
          <div className="scholarship-guide-backdrop" onClick={() => setOpen(false)} />
          <div className="scholarship-guide-card scholarship271-guide-card">
            <button type="button" className="scholarship-guide-close" onClick={() => setOpen(false)} aria-label="Tutup panduan">×</button>

            <div className="scholarship271-guide-head">
              <span className="eyebrow">Panduan Program</span>
              <h2 id="guide-title">Informasi Pendaftaran YAHN</h2>
              <p>Ringkasan persyaratan, benefit, dan timeline seleksi dalam satu tampilan.</p>
            </div>

            <div className="scholarship271-guide-grid">
              <section className="scholarship271-guide-panel">
                <div className="scholarship271-guide-label">Syarat Utama</div>
                <ul className="scholarship271-guide-list">
                  <li>Mahasiswa S1 IPB semester 4 & 6 (SSMI & FMIPA).</li>
                  <li>IPK terakhir minimal 3.00.</li>
                  <li>Tidak sedang menerima beasiswa lain (Juli – Des 2026).</li>
                  <li className="urgent">Deadline berkas: 03 Juni 2026.</li>
                </ul>

                <div className="scholarship271-benefit">
                  <span>Benefit Beasiswa</span>
                  <strong>Rp9.000.000</strong>
                  <small>UKT atau Living Cost · maksimum per tahun</small>
                </div>
              </section>

              <section className="scholarship271-guide-panel timeline-panel">
                <div className="scholarship271-guide-label">Timeline Seleksi</div>
                <div className="scholarship271-timeline">
                  <article><span>01</span><div><small>25 Mei – 3 Juni</small><strong>Pengisian Berkas</strong></div></article>
                  <article><span>02</span><div><small>3 – 10 Juni</small><strong>Seleksi Berkas</strong></div></article>
                  <article><span>03</span><div><small>11 – 15 Juni</small><strong>Tahap Wawancara</strong></div></article>
                  <article className="active"><span>04</span><div><small>20 Juni</small><strong>Pengumuman</strong></div></article>
                </div>
              </section>
            </div>

            <div className="scholarship271-guide-footer">
              <div className="scholarship271-guide-help">
                <span>Butuh bantuan?</span>
                <a href="mailto:yayasan.andihakim@gmail.com?subject=Pertanyaan%20Beasiswa%20YAHN">yayasan.andihakim@gmail.com</a>
              </div>
              <button type="button" className="btn btn-primary" onClick={() => setOpen(false)}>
                Saya mengerti & siap daftar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
