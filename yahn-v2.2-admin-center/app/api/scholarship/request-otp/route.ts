import { NextResponse } from 'next/server';
import { callScholarshipBackend } from '@/lib/backend';

export async function POST(request: Request){
  try{
    const {email,name,nim,mode}=await request.json();
    if(!email)return NextResponse.json({status:'error',message:'Email wajib diisi.'},{status:400});
    const data=await callScholarshipBackend('requestScholarshipOtp',{email,name,nim,mode});
    return NextResponse.json(data);
  }catch(error:any){
    return NextResponse.json({status:'error',message:error?.message||'Gagal mengirim kode.',reason:error?.reason,maskedEmail:error?.maskedEmail},{status:400});
  }
}
