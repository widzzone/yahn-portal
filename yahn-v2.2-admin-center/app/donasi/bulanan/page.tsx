import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import RecurringDonationForm from './RecurringDonationForm';

export default async function MonthlyDonationPage({searchParams}:{searchParams:Promise<{amount?:string;day?:string}>}){
  const q=await searchParams;const amount=Math.max(10000,Number(q.amount||100000)||100000);const day=Math.max(1,Math.min(28,Number(q.day||5)||5));
  return <><SiteHeader/><main className="donation23-page"><section className="page-hero compact donation23-subhero"><div className="container"><div className="eyebrow">Donatur Bulanan YAHN</div><h1>Dukungan kecil yang hadir secara konsisten.</h1><p>Buat komitmen bulanan sesuai kemampuan. Sistem membantu mengingatkan, mencatat riwayat, dan menghentikan reminder setelah pembayaran terverifikasi.</p></div></section><div className="container"><RecurringDonationForm initialAmount={amount} initialDay={day}/></div></main><SiteFooter/></>;
}
