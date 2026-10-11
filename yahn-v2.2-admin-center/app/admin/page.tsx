import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { readSessionToken } from '@/lib/session';

export const dynamic='force-dynamic';
export default async function AdminIndex(){
  const store=await cookies();const session=readSessionToken(store.get('yahn_admin_session')?.value);
  redirect(session&&session.kind==='admin'?'/admin/dashboard':'/admin/masuk');
}
