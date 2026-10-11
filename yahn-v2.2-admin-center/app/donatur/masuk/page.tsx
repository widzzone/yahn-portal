import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import DonorLogin from './DonorLogin';

export default function DonorLoginPage(){return <><SiteHeader/><main className="auth-page"><div className="auth-shell"><div className="auth-copy"><span className="pill pill-dark">YAHN Donor Circle</span><h1>Kontribusi yang tercatat. Dampak yang dapat diikuti.</h1><p>Dashboard pribadi untuk melihat riwayat donasi terverifikasi, komitmen bulanan, program Kakak Asuh, dan update dampak dari YAHN.</p><div className="trust-list"><span>✓ Kode akses melalui email</span><span>✓ Data donatur tidak tampil publik</span><span>✓ Riwayat berasal dari database YAHN</span></div></div><DonorLogin/></div></main><SiteFooter/></>}
