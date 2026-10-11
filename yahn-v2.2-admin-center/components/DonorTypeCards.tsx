import Link from 'next/link';
const items=[
  {icon:'♡',title:'Donasi Sekarang',tag:'Paling cepat',href:'/donasi/sekarang',text:'Bantu hari ini melalui QRIS atau transfer bank. Tidak perlu membuat akun untuk memulai.',accent:'Cocok untuk kontribusi satu kali',cta:'Donasi sekarang'},
  {icon:'↻',title:'Donatur Bulanan',tag:'Lebih konsisten',href:'/donasi/bulanan',text:'Tentukan nominal dan tanggal pengingat. Riwayat dukungan dapat dipantau dari Portal Donatur.',accent:'Reminder & histori kontribusi',cta:'Mulai bulanan'},
  {icon:'✦',title:'Kakak Asuh',tag:'Lebih personal',href:'/kakak-asuh',text:'Pilih penerima yang dipublikasikan YAHN dan fokus mendampingi kebutuhan UKT atau living cost.',accent:'Satu donor · satu perjalanan',cta:'Lihat penerima'}
];
export function DonorTypeCards(){return <div className="card-grid donor-card-grid donation23-type-grid">{items.map((x,i)=><Link href={x.href} className="card donor-card donation23-type-card" key={x.title}><div className="card-topline"><div className="card-icon">{x.icon}</div><span className="card-index">0{i+1}</span></div><span className="pill">{x.tag}</span><h3>{x.title}</h3><p>{x.text}</p><div className="card-accent">{x.accent}</div><div className="card-footer"><span>{x.cta}</span><span className="arrow-circle">→</span></div></Link>)}</div>}
