'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Choice = 'student' | 'supporter';

export function PortalChooser() {
  const router = useRouter();
  const [last, setLast] = useState<Choice | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem('yahn_portal_mode');
    if (saved === 'student' || saved === 'supporter') setLast(saved);
  }, []);

  function choose(mode: Choice) {
    window.localStorage.setItem('yahn_portal_mode', mode);
    router.push(mode === 'student' ? '/mahasiswa' : '/sahabat');
  }

  return (
    <main className="chooser29-page">
      <div className="chooser29-orb chooser29-a" />
      <div className="chooser29-orb chooser29-b" />
      <section className="chooser29-card">
        <div className="chooser29-brand">
          <img src="/logo-yahn.png" alt="Logo Yayasan Andi Hakim Nasoetion" />
          <div><strong>Yayasan Andi Hakim Nasoetion</strong><span>Dedikasi untuk Pendidikan Masa Depan</span></div>
        </div>
        <div className="chooser29-heading">
          <span className="eyebrow">Selamat datang di Portal YAHN</span>
          <h1>Pilih ruang yang sesuai dengan kebutuhan Anda.</h1>
          <p>Setiap portal menampilkan menu dan informasi yang relevan, sehingga pengalaman terasa lebih sederhana dan fokus.</p>
        </div>

        <div className="chooser29-grid">
          <button type="button" onClick={() => choose('student')} className="chooser29-option student">
            <span className="chooser29-icon">🎓</span>
            <small>Untuk peserta & calon pendaftar</small>
            <h2>Mahasiswa</h2>
            <p>Kenali program beasiswa, daftar, unggah berkas, dan pantau perjalanan seleksi Anda.</p>
            <b>Masuk Portal Mahasiswa →</b>
            {last === 'student' && <em>Portal terakhir Anda</em>}
          </button>
          <button type="button" onClick={() => choose('supporter')} className="chooser29-option supporter">
            <span className="chooser29-icon">♡</span>
            <small>Untuk sahabat pendidikan YAHN</small>
            <h2>Sahabat YAHN</h2>
            <p>Berbagi sekali, membuat dukungan bulanan, menjadi Kakak Asuh, dan mengikuti dampaknya.</p>
            <b>Masuk Portal Sahabat →</b>
            {last === 'supporter' && <em>Portal terakhir Anda</em>}
          </button>
        </div>

        <div className="chooser29-admin">
          <span>Pengelola YAHN?</span>
          <button type="button" onClick={() => router.push('/admin')}>Masuk ke Admin Center →</button>
        </div>
        <p className="chooser29-note">Pilihan portal dapat diganti kapan saja melalui menu <b>Ganti Portal</b>.</p>
      </section>
    </main>
  );
}
