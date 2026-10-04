import Link from 'next/link';

const items = [
  {
    icon: '❤', title: 'Donasi Sekarang', tag: 'Tanpa akun', href: '/donasi/sekarang',
    text: 'Kontribusi satu kali melalui QRIS atau transfer bank. Dibuat sesingkat mungkin agar siapa pun dapat langsung membantu.'
  },
  {
    icon: '↻', title: 'Donatur Bulanan', tag: 'CRM', href: '/donatur/dashboard',
    text: 'Tentukan nominal dan tanggal dukungan setiap bulan. YAHN mengelola reminder, histori, dan impact update secara berkala.'
  },
  {
    icon: '🎓', title: 'Kakak Asuh', tag: 'Flagship', href: '/kakak-asuh',
    text: 'Pilih satu penerima beasiswa dan ikuti perjalanan pendidikannya melalui dukungan UKT, living cost, atau paket pendidikan.'
  }
];

export function DonorTypeCards() {
  return <div className="card-grid">{items.map((item) => (
    <Link href={item.href} className="card" key={item.title}>
      <div className="card-icon">{item.icon}</div>
      <span className="pill">{item.tag}</span>
      <h3 style={{marginTop: 14}}>{item.title}</h3>
      <p>{item.text}</p>
      <div className="card-footer"><span>Mulai dari sini</span><span>→</span></div>
    </Link>
  ))}</div>;
}
