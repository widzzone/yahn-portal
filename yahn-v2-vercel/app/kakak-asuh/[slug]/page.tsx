import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { publicStudents, rupiah } from '@/lib/students';

export function generateStaticParams(){return publicStudents.map(s=>({slug:s.slug}));}

export default async function StudentPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const s=publicStudents.find(x=>x.slug===slug); if(!s) notFound();
  const pct=Math.min(100,Math.round(s.funded/s.target*100));
  return <><SiteHeader/><main><section className="page-hero"><div className="container"><div className="eyebrow">Calon Adik Asuh</div><h1>{s.name}</h1><p>{s.program} · Semester {s.semester}</p></div></section>
  <section className="section"><div className="container" style={{maxWidth:900}}><div className="card" style={{padding:32}}>
    <div style={{display:'flex',justifyContent:'space-between',gap:18,flexWrap:'wrap'}}><div><span className="pill">Kebutuhan utama: {s.need}</span><h2 style={{fontSize:32,margin:'14px 0 5px'}}>Perjalanan pendidikan {s.name}</h2></div><div className="avatar" style={{background:'#eaf8f5',color:'#0f766e',width:72,height:72}}>{s.initials}</div></div>
    <p style={{fontSize:16,lineHeight:1.75,color:'#536a72'}}>{s.story}</p>
    <div className="metrics"><div className="metric"><span>IPK</span><strong>{s.gpa}</strong></div><div className="metric"><span>Target</span><strong>{rupiah(s.target)}</strong></div><div className="metric"><span>Terkumpul</span><strong>{rupiah(s.funded)}</strong></div></div>
    <div className="progress"><span style={{width:`${pct}%`}}/></div><p style={{color:'#60727a'}}>{pct}% terpenuhi. Funding gap saat ini: <strong>{rupiah(s.target-s.funded)}</strong></p>
    <div className="notice notice-info">Profil publik tidak menampilkan NIM, alamat rumah, data keluarga, slip gaji, KK, atau dokumen seleksi lainnya.</div>
    <Link href="/donatur/dashboard" className="btn btn-accent">Jadikan Adik Asuh Saya</Link>
  </div></div></section></main><SiteFooter/></>;
}
