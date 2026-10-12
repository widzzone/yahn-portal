import { NextResponse } from 'next/server';
import { callScholarshipBackend } from '@/lib/backend';

export async function POST(request:Request){
  try{
    const body=await request.json();
    const data=await callScholarshipBackend('requestScholarshipAccountRecovery',body||{});
    return NextResponse.json(data);
  }catch(error:any){
    return NextResponse.json({status:'error',message:error?.message||'Permintaan pemulihan akun gagal.'},{status:400});
  }
}
