import Link from 'next/link';

const options = [
  {
    id: 'once',
    icon: '♡',
    kicker: 'Fleksibel',
    title: 'Berbagi Hari Ini',
    subtitle: 'Berikan dukungan kapan pun Anda ingin, tanpa komitmen rutin.',
    bestFor: 'Cocok untuk Anda yang ingin membantu secara spontan.',
    points: ['Mulai Rp10.000', 'Tanpa membuat akun', 'QRIS atau transfer'],
    href: '/donasi/sekarang',
    cta: 'Mulai berbagi',
  },
  {
    id: 'monthly',
    icon: '↻',
    kicker: 'Konsisten',
    title: 'Hadir Setiap Bulan',
    subtitle: 'Jadikan kepedulian sebagai kebiasaan kecil yang terus memberi dampak.',
    bestFor: 'Cocok untuk Anda yang ingin hadir secara konsisten.',
    points: ['Nominal fleksibel', 'Pilih tanggal pengingat', 'Riwayat dukungan tersimpan'],
    href: '/donasi/bulanan',
    cta: 'Mulai dukungan bulanan',
  },
  {
    id: 'sponsor',
    icon: '✦',
    kicker: 'Paling personal',
    title: 'Temani Satu Perjalanan',
    subtitle: 'Kenali satu penerima dan dampingi kebutuhan pendidikannya lebih dekat.',
    bestFor: 'Cocok untuk Anda yang ingin mengikuti satu perjalanan secara personal.',
    points: ['Pilih penerima', 'Fokus UKT / living cost', 'Ikuti perkembangan'],
    href: '/kakak-asuh',
    cta: 'Temui calon adik asuh',
  },
];

export function SupportJourney() {
  return (
    <div className="support11-wrap" id="cara-berbagi">
      <div className="support11-cards">
        {options.map((option) => (
          <Link
            href={option.href}
            key={option.id}
            className={`support11-card support11-card-${option.id}`}
          >
            <div className="support11-card-top">
              <span className="support11-icon">{option.icon}</span>
              <span className="support11-kicker">{option.kicker}</span>
            </div>
            <h3>{option.title}</h3>
            <p>{option.subtitle}</p>
            <ul>
              {option.points.map((point) => <li key={point}>✓ {point}</li>)}
            </ul>
            <div className="support11-bestfor">{option.bestFor}</div>
            <div className="support11-card-cta">
              <span>{option.cta}</span>
              <b>→</b>
            </div>
          </Link>
        ))}
      </div>
      <div className="support11-note">
        <span>Belum yakin memilih yang mana?</span>
        <p>Mulai dari dukungan sekali. Anda tetap bisa berpindah ke dukungan bulanan atau Kakak Asuh kapan saja.</p>
      </div>
    </div>
  );
}
