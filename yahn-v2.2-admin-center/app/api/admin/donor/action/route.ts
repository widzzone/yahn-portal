import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { callDonorBackend } from '@/lib/backend';
import { readSessionToken } from '@/lib/session';

const allowed=new Set(['adminUpdateDonationStatus','adminUpdateSponsorshipStatus','adminUpsertRecipient','adminUpsertImpact','adminSendRecurringReminder','adminUpsertDisbursement','adminUpsertPublicDocument']);
export async function POST(request:Request){
  try{
    const store=await cookies();const session=readSessionToken(store.get('yahn_admin_session')?.value);
    if(!session||session.kind!=='admin')return NextResponse.json({status:'error',message:'Unauthorized'},{status:401});
    const {action,payload}=await request.json();if(!allowed.has(String(action)))return NextResponse.json({status:'error',message:'Aksi tidak diizinkan.'},{status:400});
    const data=await callDonorBackend(action,payload||{});return NextResponse.json(data);
  }catch(error){return NextResponse.json({status:'error',message:error instanceof Error?error.message:'Aksi admin donor gagal.'},{status:400});}
}
