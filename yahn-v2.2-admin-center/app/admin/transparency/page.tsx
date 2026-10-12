import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { readSessionToken } from '@/lib/session';
import TransparencyManager from './TransparencyManager';

export const dynamic='force-dynamic';
export default async function TransparencyAdminPage(){
  const store=await cookies();
  const session=readSessionToken(store.get('yahn_admin_session')?.value);
  if(!session||session.kind!=='admin')redirect('/admin/masuk');
  return <TransparencyManager admin={{name:session.name,email:session.email}}/>;
}
