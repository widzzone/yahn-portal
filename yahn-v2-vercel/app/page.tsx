import Link from 'next/link';
import { DonorTypeCards } from '@/components/DonorTypeCards';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

export default function Home() {
  return <>
    <SiteHeader />
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">YAHN Education Impact Platform</div>
            <h1>Pendidikan tumbuh saat <span>kita bergerak bersama.</span></h1>
            <p>Portal terpadu Yayasan Andi Hakim Nasoetion untuk mahasiswa, donatur, dan pengelola beasiswa. Satu ekosistem untuk memilih, mendukung, dan melihat dampak pendidikan secara berkelanjutan.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/donasi">❤ Saya ingin berdonasi</Link>
              <Link className="btn btn-light" href="/beasiswa">🎓 Saya mahasiswa</Link>
            </div>
          </div>
          <div className="hero-panel">
            <span className="pill" style={{background:'rgba(255,255,255,.12)', color:'#d8fffa'}}>Preview V2.0</span>
            <h3 style={{marginTop:16}}>Satu portal, tiga cara memberi dampak.</h3>
            <p>Mulai dari satu kali donasi hingga mendampingi satu mahasiswa sebagai Kakak Asuh.</p>
            <div className="impact-grid">
              <div className="impact-kpi"><strong>01</strong><span>Donasi Sekarang</span></div>
              <div className="impact-kpi"><strong>02</strong><span>Donatur Bulanan</span></div>
              <div className="impact-kpi"><strong>03</strong><span>Kakak Asuh</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-head"><div className="eyebrow">Portal Donatur</div><h2>Pilih cara Anda mendukung pendidikan.</h2><p>Tiga jalur donasi dibuat untuk kebutuhan yang berbeda, dari kontribusi spontan sampai komitmen jangka panjang.</p></div>
          <DonorTypeCards />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><div className="eyebrow">Alur yang transparan</div><h2>Dari donasi menjadi dampak yang dapat diikuti.</h2></div>
          <div className="steps">
            <div className="step"><div className="step-num">1</div><h4>Pilih bentuk dukungan</h4><p>Donasi satu kali, rutin bulanan, atau pilih program Kakak Asuh.</p></div>
            <div className="step"><div className="step-num">2</div><h4>Konfirmasi kontribusi</h4><p>Pembayaran dicatat dan diverifikasi untuk kebutuhan pelaporan yayasan.</p></div>
            <div className="step"><div className="step-num">3</div><h4>Dana dialokasikan</h4><p>YAHN menghubungkan dana dengan kebutuhan UKT dan living cost penerima.</p></div>
            <div className="step"><div className="step-num">4</div><h4>Lihat perkembangan</h4><p>Donatur mendapatkan ringkasan kontribusi dan impact update secara berkala.</p></div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container"><div className="cta"><div><h2>Ingin mengikuti perjalanan satu mahasiswa?</h2><p>Kenali profil publik penerima dan lihat kebutuhan pendanaan mereka.</p></div><Link href="/kakak-asuh" className="btn btn-accent">Jelajahi Kakak Asuh →</Link></div></div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
