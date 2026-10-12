import { PortalHeader } from '@/components/PortalHeader';
import { PortalFooter } from '@/components/PortalFooter';
import DonationForm from './DonationForm';

export default async function DirectDonationPage({
  searchParams,
}: {
  searchParams: Promise<{ amount?: string; method?: string }>;
}) {
  const q = await searchParams;
  const amount = Math.max(10000, Number(q.amount || 100000) || 100000);
  const method = q.method === 'Transfer Bank' ? 'Transfer Bank' : 'QRIS';

  return (
    <>
      <PortalHeader mode="supporter" />
      <main className="donation23-page donation24-page">
        <section className="donation24-subhero">
          <div className="container donation24-subhero-row">
            <div>
              <div className="eyebrow">Donasi Sekarang</div>
              <h1>Donasi dibuat lebih singkat dan mudah.</h1>
              <p>
                Pilih nominal, bayar melalui QRIS atau transfer resmi YAHN, lalu kirim konfirmasi.
                Semuanya bisa dilakukan dalam satu halaman.
              </p>
            </div>
            <div className="donation24-mini-trust">
              <span>✓ Tanpa akun</span>
              <span>✓ QRIS / Transfer</span>
              <span>✓ Verifikasi oleh tim YAHN</span>
            </div>
          </div>
        </section>

        <section className="donation24-section">
          <div className="container">
            <DonationForm initialAmount={amount} initialMethod={method} />
          </div>
        </section>
      </main>
      <PortalFooter mode="supporter" />
    </>
  );
}
