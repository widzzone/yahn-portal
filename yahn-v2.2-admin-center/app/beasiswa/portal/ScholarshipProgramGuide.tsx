'use client';

import { useEffect,useState } from 'react';

const rupiah=(v:number)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Number(v||0));
const dateLabel=(v:any)=>{if(!v)return'-';const d=new Date(v);return Number.isNaN(d.getTime())?String(v):d.toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'})};

export default function ScholarshipProgramGuide() {
  const [open,setOpen]=useState(false);const[program,setProgram]=useState<any>(null);
  useEffect(()=>{fetch('/api/scholarship/programs',{cache:'no-store'}).then(r=>r.json()).then(d=>setProgram(d.currentProgram||(d.programs||[])[0]||null)).catch(()=>{})},[]);
  const semesterText=program?.semesters?String(program.semesters).split(',').map((x:string)=>x.trim()).join(' & '):'4 & 6';
  return <>
    <button type="button" className="scholarship-info-card scholarship-guide-trigger" onClick={()=>setOpen(true)}>
      <span className="scholarship-info-icon" aria-hidden="true">i</span><span><strong>Belum kenal Program YAHN?</strong><small>Pelajari persyaratan & panduan →</small></span>
    </button>
    {open&&<div className="scholarship-guide-modal scholarship271-guide-modal" role="dialog" aria-modal="true" aria-labelledby="guide-title">
      <div className="scholarship-guide-backdrop" onClick={()=>setOpen(false)}/>
      <div className="scholarship-guide-card scholarship271-guide-card">
        <button type="button" className="scholarship-guide-close" onClick={()=>setOpen(false)} aria-label="Tutup panduan">×</button>
        <div className="scholarship271-guide-head"><span className="eyebrow">Panduan Program</span><h2 id="guide-title">{program?.name||'Informasi Pendaftaran YAHN'}</h2><p>Ringkasan persyaratan, benefit, dan alur seleksi dalam satu tampilan.</p></div>
        <div className="scholarship271-guide-grid">
          <section className="scholarship271-guide-panel">
            <div className="scholarship271-guide-label">Syarat Utama</div>
            <ul className="scholarship271-guide-list"><li>Mahasiswa S1 IPB semester {semesterText}.</li><li>IPK terakhir minimal {program?.minIpk||'3.00'}.</li><li>Tidak sedang menerima beasiswa lain sesuai kebijakan periode berjalan.</li>{program?.closeDate&&<li className="urgent">Penutupan berkas: {dateLabel(program.closeDate)}.</li>}</ul>
            <div className="scholarship271-benefit"><span>Benefit Beasiswa</span><strong>{rupiah(program?.maxBenefit||9000000)}</strong><small>UKT atau Living Cost · maksimum per tahun</small></div>
          </section>
          <section className="scholarship271-guide-panel timeline-panel"><div className="scholarship271-guide-label">Alur Seleksi</div><div className="scholarship271-timeline"><article><span>01</span><div><small>{program?`${dateLabel(program.openDate)} – ${dateLabel(program.closeDate)}`:'Jadwal diumumkan'}</small><strong>Pengisian Berkas</strong></div></article><article><span>02</span><div><small>Setelah pendaftaran</small><strong>Seleksi Berkas</strong></div></article><article><span>03</span><div><small>Jadwal di dashboard</small><strong>Tahap Wawancara</strong></div></article><article className="active"><span>04</span><div><small>Setelah evaluasi final</small><strong>Pengumuman</strong></div></article></div></section>
        </div>
        <div className="scholarship271-guide-footer"><div className="scholarship271-guide-help"><span>Butuh bantuan?</span><a href="mailto:yayasan.andihakim@gmail.com?subject=Pertanyaan%20Beasiswa%20YAHN">yayasan.andihakim@gmail.com</a></div><button type="button" className="btn btn-primary" onClick={()=>setOpen(false)}>Saya mengerti</button></div>
      </div>
    </div>}
  </>;
}
