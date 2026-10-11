import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import DonationForm from './DonationForm';

export default function DirectDonationPage(){return <><SiteHeader/><main><section className="page-hero"><div className="container"><div className="eyebrow">Sahabat YAHN</div><h1>Donasi sekarang.</h1><p>Kontribusi satu kali tanpa perlu membuat akun. Pilih nominal, lakukan pembayaran, lalu kirim konfirmasi agar tim YAHN dapat memverifikasi.</p></div></section><div className="container"><DonationForm/></div></main><SiteFooter/></>}
