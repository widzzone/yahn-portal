import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import RecurringDonationForm from './RecurringDonationForm';

export default async function MonthlyDonationPage({ searchParams }: { searchParams: Promise<{ amount?: string; day?: string }> }) {
  const q = await searchParams;
  const amount = Math.max(10000, Number(q.amount || 100000) || 100000);
  const day = Math.max(1, Math.min(28, Number(q.day || 5) || 5));

  return (
    <>
      <SiteHeader />
      <main className="donation24-page recurring26-page">
        <section className="donation24-subhero recurring26-subhero">
          <div className="container donation24-subhero-row">
            <div>
              <div className="eyebrow">Dukungan Bulanan YAHN</div>
              <h1>Dukungan kecil yang hadir secara konsisten.</h1>
              <p>
                Bangun kebiasaan berbagi yang ringan. Pilih nominal, tanggal pengingat, dan kelola
                perjalanan dukungan Anda dengan lebih sederhana.
              </p>
            </div>
            <div className="donation24-mini-trust">
              <span>✓ Pengingat terjadwal</span>
              <span>✓ Riwayat tersimpan</span>
              <span>✓ Mudah diperbarui</span>
            </div>
          </div>
        </section>

        <section className="donation24-section">
          <div className="container">
            <RecurringDonationForm initialAmount={amount} initialDay={day} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
