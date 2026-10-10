import Link from 'next/link';
const items=[
  {icon:'♡',title:'Donasi Sekarang',tag:'Cepat',href:'/donasi/sekarang',text:'Kontribusi satu kali melalui QRIS atau transfer bank. Tidak perlu membuat akun sebelum berdonasi.',accent:'Tercatat & diverifikasi'},
  {icon:'↻',title:'Donatur Bulanan',tag:'Berkelanjutan',href:'/donatur/masuk',text:'Bangun kebiasaan berbagi dengan komitmen bulanan, reminder terkelola, dan histori kontribusi pribadi.',accent:'CRM & impact update'},
  {icon:'✦',title:'Kakak Asuh',tag:'Flagship',href:'/kakak-asuh',text:'Pilih penerima yang telah dipublikasikan YAHN dan dampingi kebutuhan UKT atau living cost-nya.',accent:'Satu donor · satu perjalanan'}
];
export function DonorTypeCards(){return <div className="card-grid donor-card-grid">{items.map((x,i)=><Link href={x.href} className="card donor-card" key={x.title}><div className="card-topline"><div className="card-icon">{x.icon}</div><span className="card-index">0{i+1}</span></div><span className="pill">{x.tag}</span><h3>{x.title}</h3><p>{x.text}</p><div className="card-accent">{x.accent}</div><div className="card-footer"><span>Mulai dari sini</span><span className="arrow-circle">→</span></div></Link>)}</div>}
