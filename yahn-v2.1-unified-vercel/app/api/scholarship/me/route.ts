import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { callScholarshipBackend } from '@/lib/backend';
import { readSessionToken } from '@/lib/session';

export async function GET(){
  try{
    const store=await cookies();const session=readSessionToken(store.get('yahn_scholarship_session')?.value);
    if(!session||session.kind!=='scholarship')return NextResponse.json({status:'error',message:'Sesi beasiswa tidak tersedia.'},{status:401});
    const data=await callScholarshipBackend('getScholarshipStatus',{email:session.email});
    return NextResponse.json(data);
  }catch(error){return NextResponse.json({status:'error',message:error instanceof Error?error.message:'Gagal memuat status.'},{status:400});}
}

export async function DELETE(){const res=NextResponse.json({status:'success'});res.cookies.set('yahn_scholarship_session','',{httpOnly:true,path:'/',maxAge:0});return res;}
