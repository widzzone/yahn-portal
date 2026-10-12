import { NextResponse } from 'next/server';
import { callScholarshipBackend } from '@/lib/backend';

export async function POST(request:Request){
  try{
    const body=await request.json();
    const data=await callScholarshipBackend('lookupScholarshipAccount',body||{});
    return NextResponse.json(data);
  }catch(error:any){
    return NextResponse.json({status:'error',message:error?.message||'Akun belum dapat ditemukan.'},{status:400});
  }
}
