import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { publicStudents, rupiah } from '@/lib/students';

export default function KakakAsuhPage(){return <><SiteHeader/><main>
  <section className="page-hero"><div className="container"><div className="eyebrow">Program Kakak Asuh YAHN</div><h1>Satu donatur. Satu mahasiswa. Satu perjalanan.</h1><p>Profil di bawah adalah data demo publik untuk rancangan V2.0. Pada implementasi produksi, hanya mahasiswa yang memberikan persetujuan dan telah dipublikasikan admin yang muncul di sini.</p></div></section>
  <section className="section"><div className="container"><div className="student-grid">{publicStudents.map(s=>{
    const pct=Math.min(100,Math.round(s.funded/s.target*100)); return <article className="student-card" key={s.slug}>
      <div className="student-top"><div className="avatar">{s.initials}</div><span className="pill" style={{background:'rgba(255,255,255,.12)',color:'#fff'}}>{s.need}</span></div>
      <div className="student-body"><h3>{s.name}</h3><p style={{marginTop:0}}>{s.program} · Semester {s.semester}</p><div className="metrics"><div className="metric"><span>IPK</span><strong>{s.gpa}</strong></div><div className="metric" style={{gridColumn:'span 2'}}><span>Target</span><strong>{rupiah(s.target)}</strong></div></div><div className="progress"><span style={{width:`${pct}%`}}/></div><p>{pct}% kebutuhan telah didukung · {rupiah(s.funded)}</p><Link className="btn btn-primary" style={{width:'100%'}} href={`/kakak-asuh/${s.slug}`}>Lihat profil & kebutuhan</Link></div>
    </article>})}</div></div></section>
</main><SiteFooter/></>}
