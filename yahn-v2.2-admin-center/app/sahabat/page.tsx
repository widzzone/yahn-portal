import { PortalHeader } from '@/components/PortalHeader';
import { PortalFooter } from '@/components/PortalFooter';
import { SupportJourney } from '@/components/SupportJourney';

export default function SupporterHome() {
  return <>
    <PortalHeader mode="supporter" />
    <main className="support10-page">
      <section className="support10-hero">
        <div className="container support10-hero-inner">
          <div>
            <div className="eyebrow">Portal Sahabat YAHN</div>
            <h1>Pilih cara berbagi yang paling sesuai dengan Anda.</h1>
          </div>
          <div className="support10-hero-copy">
            <p>
              Tidak ada satu cara yang paling benar untuk membantu. Pilih dukungan sekali, hadir setiap bulan,
              atau temani satu perjalanan pendidikan melalui Kakak Asuh.
            </p>
            <div className="support10-trust">
              <span>✓ Mudah dimulai</span>
              <span>✓ Transparan</span>
              <span>✓ Dampak dapat diikuti</span>
            </div>
          </div>
        </div>
      </section>

      <section className="support10-section">
        <div className="container">
          <div className="support10-heading">
            <div>
              <span className="eyebrow">Tiga Cara Berbagi</span>
              <h2>Pilih ritme yang terasa paling nyaman.</h2>
            </div>
            <p>Pilih salah satu jalur. Anda akan langsung diarahkan ke langkah berikutnya yang paling relevan.</p>
          </div>
          <SupportJourney />
        </div>
      </section>
    </main>
    <PortalFooter mode="supporter" />
  </>;
}
