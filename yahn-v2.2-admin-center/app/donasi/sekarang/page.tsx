import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import DonationForm from './DonationForm';

export default async function DirectDonationPage({searchParams}:{searchParams:Promise<{amount?:string;method?:string}>}){
  const q=await searchParams;const amount=Math.max(10000,Number(q.amount||100000)||100000);const method=q.method==='Transfer Bank'?'Transfer Bank':'QRIS';
  return <><SiteHeader/><main className="donation23-page"><section className="page-hero compact donation23-subhero"><div className="container"><div className="eyebrow">Donasi Sekarang</div><h1>Berbagi dalam beberapa langkah sederhana.</h1><p>Pilih nominal, gunakan QRIS atau transfer bank resmi YAHN, lalu kirim konfirmasi untuk diverifikasi. Tidak perlu membuat akun.</p></div></section><div className="container"><DonationForm initialAmount={amount} initialMethod={method}/></div></main><SiteFooter/></>;
}
