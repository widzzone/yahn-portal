'use client';

import { useRouter } from 'next/navigation';

type Destination = 'about' | 'student' | 'supporter' | 'report';

const menu = [
  {
    key: 'about' as const,
    label: 'Tentang Yayasan',
    desc: 'Kenali YAHN dan program pendidikan yang dijalankan.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3Zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z" />
      </svg>
    ),
  },
  {
    key: 'student' as const,
    label: 'Mendaftar Beasiswa',
    desc: 'Lihat program, persyaratan, dan mulai pendaftaran.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 1 9l4 2.18v6L12 21l7-3.82v-6L21 10v7h2V9L12 3Zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9ZM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72Z" />
      </svg>
    ),
  },
  {
    key: 'supporter' as const,
    label: 'Menjadi Donatur',
    desc: 'Berbagi sekali, bulanan, atau melalui Kakak Asuh.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.51L12 21.35Z" />
      </svg>
    ),
  },
  {
    key: 'report' as const,
    label: 'Laporan',
    desc: 'Lihat dampak, transparansi, dan penyaluran dukungan.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6Zm1 15H8v-2h7v2Zm1-4H8v-2h8v2Zm-3-4V3.5L18.5 9H13Z" />
      </svg>
    ),
  },
];

export function FoundationLanding() {
  const router = useRouter();

  function navigate(destination: Destination) {
    if (destination === 'student') {
      window.localStorage.setItem('yahn_portal_mode', 'student');
      router.push('/mahasiswa');
      return;
    }
    if (destination === 'supporter') {
      window.localStorage.setItem('yahn_portal_mode', 'supporter');
      router.push('/sahabat');
      return;
    }
    if (destination === 'report') {
      router.push('/dampak');
      return;
    }
    router.push('/tentang');
  }

  return (
    <main className="foundation14-page">
      <div className="foundation14-decor leaf-one" />
      <div className="foundation14-decor leaf-two" />
      <div className="foundation14-wave" />

      <section className="foundation14-shell" aria-label="Menu utama Yayasan Andi Hakim Nasoetion">
        <div className="foundation14-identity">
          <div className="foundation14-logo-wrap">
            <img src="/logo-yahn.png" alt="Yayasan Andi Hakim Nasoetion" className="foundation14-logo" />
          </div>
          <p>Dedikasi untuk Pendidikan Masa Depan</p>
        </div>

        <div className="foundation14-menu">
          <div className="foundation14-menu-head">
            <span className="foundation14-kicker">Portal Yayasan Andi Hakim Nasoetion</span>
            <h1>Apa yang ingin Anda lakukan?</h1>
            <p>Pilih menu untuk melanjutkan ke layanan yang Anda butuhkan.</p>
          </div>

          <div className="foundation14-actions">
            {menu.map((item) => (
              <button key={item.key} type="button" className="foundation14-action" onClick={() => navigate(item.key)}>
                <span className="foundation14-action-icon">{item.icon}</span>
                <span className="foundation14-action-copy">
                  <strong>{item.label}</strong>
                  <small>{item.desc}</small>
                </span>
                <span className="foundation14-arrow" aria-hidden="true">›</span>
              </button>
            ))}
          </div>

          <div className="foundation14-admin-link">
            <span>Pengelola YAHN?</span>
            <button type="button" onClick={() => router.push('/admin')}>Masuk Admin Center →</button>
          </div>
        </div>
      </section>
    </main>
  );
}
