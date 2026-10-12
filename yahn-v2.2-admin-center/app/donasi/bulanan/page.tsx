import { PortalFooter } from '@/components/PortalFooter';
import { PortalHeader } from '@/components/PortalHeader';
import RecurringDonationForm from './RecurringDonationForm';

const MIN_MONTHLY = 1_000_000;

export default async function MonthlyDonationPage({ searchParams }: { searchParams: Promise<{ amount?: string; day?: string }> }) {
  const q = await searchParams;
  const amount = Math.max(MIN_MONTHLY, Number(q.amount || MIN_MONTHLY) || MIN_MONTHLY);
  const day = Math.max(1, Math.min(28, Number(q.day || 5) || 5));

  return (
    <>
      <PortalHeader mode="supporter" />
      <main className="donation24-page recurring26-page recurring121-page">
        <section className="donation24-subhero recurring26-subhero recurring121-subhero">
          <div className="container donation24-subhero-row">
            <div>
              <div className="eyebrow">Dukungan Bulanan YAHN</div>
              <h1>Hadir secara konsisten untuk perjalanan pendidikan.</h1>
              <p>
                Komitmen bulanan dimulai dari Rp1.000.000. Pilih nominal dan tanggal pengingat yang
                paling nyaman untuk Anda.
              </p>
            </div>
            <div className="donation24-mini-trust">
              <span>✓ Mulai Rp1 juta</span>
              <span>✓ Pengingat terjadwal</span>
              <span>✓ Riwayat tersimpan</span>
            </div>
          </div>
        </section>

        <section className="donation24-section">
          <div className="container">
            <RecurringDonationForm initialAmount={amount} initialDay={day} />
          </div>
        </section>
      </main>
      <PortalFooter mode="supporter" />
    </>
  );
}
