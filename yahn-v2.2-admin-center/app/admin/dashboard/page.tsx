import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { readSessionToken } from '@/lib/session';
import AdminDashboardClient from './AdminDashboardClient';

export const dynamic='force-dynamic';
export default async function AdminDashboardPage(){
  const store=await cookies();const session=readSessionToken(store.get('yahn_admin_session')?.value);
  if(!session||session.kind!=='admin')redirect('/admin/masuk');
  return <AdminDashboardClient initialAdmin={{name:session.name,email:session.email}}/>;
}
