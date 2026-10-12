import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { readSessionToken } from '@/lib/session';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import ScholarshipApplicationForm from './ScholarshipApplicationForm';
export const dynamic='force-dynamic';
export default async function ScholarshipApplicationPage(){const store=await cookies();const session=readSessionToken(store.get('yahn_scholarship_session')?.value);if(!session||session.kind!=='scholarship')redirect('/beasiswa/portal');return <><SiteHeader/><main><section className="page-hero compact"><div className="container"><div className="eyebrow">Pendaftaran Beasiswa YAHN</div><h1>Bangun aplikasi Anda dengan tenang.</h1><p>Satu akun dapat digunakan kembali pada setiap periode beasiswa. Riwayat lama tetap tersimpan, sementara aplikasi baru dicatat sebagai batch yang berbeda.</p></div></section><div className="container form-page-wrap"><ScholarshipApplicationForm/></div></main><SiteFooter/></>}
