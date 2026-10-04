import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export default function ScholarshipBridge(){
  const url=process.env.NEXT_PUBLIC_SCHOLARSHIP_PORTAL_URL;
  return <><SiteHeader/><main><section className="page-hero"><div className="container"><div className="eyebrow">Portal Beasiswa</div><h1>Portal peserta tetap berjalan.</h1><p>Dalam fase V2.0, modul beasiswa existing tetap berada di Google Apps Script agar proses pendaftaran, seleksi, dokumen, wawancara, dan email otomatis tidak terganggu.</p></div></section><section className="section"><div className="container" style={{maxWidth:760}}><div className="card"><h2>Masuk ke Portal Beasiswa YAHN</h2><p>{url ? 'Link portal existing sudah terbaca dari environment variable Vercel.' : 'Environment variable NEXT_PUBLIC_SCHOLARSHIP_PORTAL_URL belum diisi. Tambahkan URL deployment Apps Script Anda di Vercel.'}</p>{url ? <a className="btn btn-primary" href={url} target="_blank" rel="noreferrer">Buka Portal Beasiswa →</a> : <Link className="btn btn-light" href="/">Kembali</Link>}<div className="notice notice-info">Tahap selanjutnya: fungsi google.script.run akan dikonversi satu per satu menjadi endpoint API tanpa mengubah proses bisnis existing.</div></div></div></section></main><SiteFooter/></>;
}
