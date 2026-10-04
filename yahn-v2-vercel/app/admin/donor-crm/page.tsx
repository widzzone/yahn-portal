import Link from 'next/link';

const donors = [
  {name:'Budi Santoso',type:'Bulanan',commitment:'Rp500.000',next:'5 Nov 2026',status:'Aktif'},
  {name:'Sahabat YAHN 018',type:'Kakak Asuh',commitment:'UKT Alya P.',next:'Semester berikutnya',status:'Aktif'},
  {name:'Rina A.',type:'Bulanan',commitment:'Rp250.000',next:'10 Nov 2026',status:'Reminder H-3'},
  {name:'Anonim',type:'Sekali',commitment:'Rp1.000.000',next:'—',status:'Terverifikasi'},
];

export default function DonorCrmPreview(){return <div className="dashboard">
  <aside className="sidebar"><div className="brand"><span className="brand-mark">YAHN</span><span>Admin V2</span></div><nav><Link href="/">Website</Link><Link className="active" href="/admin/donor-crm">Donor CRM</Link><Link href="/kakak-asuh">Recipient Public</Link></nav></aside>
  <main className="dashmain"><div className="dash-head"><div><div className="eyebrow">Admin Preview · belum diproteksi auth</div><h1>Donor CRM</h1></div><Link className="btn btn-light" href="/">Keluar preview</Link></div>
  <div className="kpis"><div className="kpi"><span>Donatur aktif</span><strong>76</strong></div><div className="kpi"><span>Rutin bulanan</span><strong>31</strong></div><div className="kpi"><span>Kakak Asuh</span><strong>18</strong></div><div className="kpi"><span>Retention demo</span><strong>82%</strong></div></div>
  <section className="panel"><h2>Upcoming CRM action</h2><div className="notice notice-info">Contoh rule: H-3 reminder ringan → tanggal komitmen reminder utama → otomatis berhenti bila transaksi bulan berjalan telah terverifikasi.</div>
  <div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}><thead><tr style={{textAlign:'left',color:'#60727a'}}><th style={{padding:'12px 8px'}}>Donatur</th><th>Tipe</th><th>Komitmen</th><th>Next Action</th><th>Status</th></tr></thead><tbody>{donors.map(d=><tr key={d.name} style={{borderTop:'1px solid #e3ebe9'}}><td style={{padding:'14px 8px',fontWeight:800}}>{d.name}</td><td>{d.type}</td><td>{d.commitment}</td><td>{d.next}</td><td><span className="pill">{d.status}</span></td></tr>)}</tbody></table></div></section>
  <section className="panel"><h2>Catatan produksi</h2><p style={{color:'#536a72',lineHeight:1.7}}>Halaman ini hanya mockup admin untuk memvisualisasikan CRM. Sebelum production, route admin harus dilindungi autentikasi dan role-based access; angka di atas adalah data demo.</p></section>
  </main></div>}
