import { PortalFooter } from '@/components/PortalFooter';
import { PortalHeader } from '@/components/PortalHeader';
import MonthlyPaymentClient from './MonthlyPaymentClient';

export default function MonthlyPaymentPage(){
  return <><PortalHeader mode="supporter"/><main className="donation24-page monthly13-page"><section className="donation24-subhero"><div className="container donation24-subhero-row"><div><div className="eyebrow">Pembayaran Dukungan Bulanan</div><h1>Bayar periode berjalan tanpa mengulang pendaftaran.</h1><p>Nominal mengikuti komitmen aktif Anda. Pilih kanal pembayaran, unggah bukti, lalu tunggu verifikasi tim YAHN.</p></div></div></section><section className="donation24-section"><div className="container"><MonthlyPaymentClient/></div></section></main><PortalFooter mode="supporter"/></>;
}
