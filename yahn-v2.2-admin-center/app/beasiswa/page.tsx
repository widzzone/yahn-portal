import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { callScholarshipBackend } from '@/lib/backend';

export const dynamic='force-dynamic';

function rupiah(v:number){return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Number(v||0))}
function dateLabel(v:any){if(!v)return'-';const d=new Date(v);return Number.isNaN(d.getTime())?String(v):d.toLocaleDateString('id-ID',{day:'2-digit',month:'long',year:'numeric'})}

export default async function BeasiswaPage() {
  let programs:any[]=[];let current:any=null;
  try{const d=await callScholarshipBackend('getScholarshipPrograms',{});programs=d.programs||[];current=d.currentProgram||programs[0]||null}catch{}
  const isOpen=String(current?.status||'').toUpperCase()==='OPEN';
  const semesterText=current?.semesters?String(current.semesters).split(',').map((x:string)=>x.trim()).filter(Boolean).join(' & '):'4 & 6';
  return (
    <>
      <SiteHeader />
      <main className="beasiswa271-page">
        <section className="page-hero scholarship-hero beasiswa271-hero">
          <div className="container beasiswa271-hero-grid">
            <div className="beasiswa271-hero-copy">
              <div className="eyebrow">Beasiswa Yayasan Andi Hakim Nasoetion</div>
              <h1>Kesempatan pendidikan, dikelola dalam satu perjalanan.</h1>
              <p>Pendaftaran, unggah dokumen, pemantauan hasil seleksi, hingga riwayat aplikasi lintas periode tersedia dalam satu akun YAHN.</p>
              <div className="hero-actions">
                <Link className="btn btn-primary btn-lg" href="/beasiswa/portal">Masuk / Daftar Akun →</Link>
                <Link className="btn btn-light btn-lg" href="#informasi-pendaftaran">Lihat informasi</Link>
              </div>
              <div className="beasiswa271-chip-row">
                <span>S1 IPB · Semester {semesterText}</span>
                <span>IPK minimum {current?.minIpk||'3.00'}</span>
                <span>UKT / Living Cost</span>
              </div>
            </div>

            <aside className="beasiswa271-program-card">
              <div className="beasiswa271-program-head">
                <span className="pill">{current?`Program ${current.year}`:'Program Beasiswa'}</span>
                <span className={`beasiswa271-deadline ${isOpen?'open':''}`}>{current?isOpen?`Buka sampai ${dateLabel(current.closeDate)}`:`Status ${current.status}`:'Belum ada program aktif'}</span>
              </div>
              <h3>{current?.name||'Beasiswa YAHN'}</h3>
              <div className="beasiswa271-program-stats">
                <div><span>Target</span><strong>S1 IPB Semester {semesterText}</strong></div>
                <div><span>Status</span><strong>{current?.status||'Menunggu pembukaan'}</strong></div>
                <div className="wide"><span>Maksimum dukungan</span><strong>{rupiah(current?.maxBenefit||9000000)} / tahun</strong></div>
              </div>
            </aside>
          </div>
        </section>

        <section id="informasi-pendaftaran" className="beasiswa271-info-section">
          <div className="container beasiswa271-info-grid">
            <article className="beasiswa271-info-card requirements-card">
              <div className="beasiswa271-card-head"><div><span className="eyebrow">Syarat Utama</span><h2>Ringkas, jelas, dan mudah dicek.</h2></div><span className="beasiswa271-card-icon">✓</span></div>
              <ul className="beasiswa271-checklist">
                <li>Mahasiswa S1 IPB pada semester yang ditentukan program aktif.</li>
                <li>IPK terakhir minimal {current?.minIpk||'3.00'}.</li>
                <li>Tidak sedang menerima beasiswa lain sesuai kebijakan periode berjalan.</li>
              </ul>
              <div className="beasiswa271-benefit-box"><div><small>Benefit maksimum</small><strong>{rupiah(current?.maxBenefit||9000000)}</strong></div><p>Untuk dukungan UKT atau Living Cost per tahun.</p></div>
            </article>

            <article className="beasiswa271-info-card timeline-card">
              <div className="beasiswa271-card-head"><div><span className="eyebrow">Perjalanan Seleksi</span><h2>Empat tahap, satu dashboard.</h2></div><span className="beasiswa271-card-icon">4</span></div>
              <div className="beasiswa271-timeline-list">
                <div><span>01</span><p><small>{current?`${dateLabel(current.openDate)} – ${dateLabel(current.closeDate)}`:'Jadwal akan diumumkan'}</small><strong>Pengisian Berkas</strong></p></div>
                <div><span>02</span><p><small>Setelah pendaftaran ditutup</small><strong>Seleksi Berkas</strong></p></div>
                <div><span>03</span><p><small>Jadwal tampil di dashboard</small><strong>Tahap Wawancara</strong></p></div>
                <div className="active"><span>04</span><p><small>Setelah evaluasi final</small><strong>Pengumuman</strong></p></div>
              </div>
              <div className="beasiswa271-actions-row">
                <div className="beasiswa271-help"><small>Butuh bantuan?</small><a href="mailto:yayasan.andihakim@gmail.com?subject=Pertanyaan%20Beasiswa%20YAHN">yayasan.andihakim@gmail.com</a></div>
                <Link className="btn btn-primary" href="/beasiswa/portal">{isOpen?'Siap daftar →':'Masuk portal →'}</Link>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
