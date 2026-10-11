import { NextResponse } from 'next/server';
import { callScholarshipBackend } from '@/lib/backend';

export async function POST(request: Request){
  try{
    const {email}=await request.json();
    if(!email)return NextResponse.json({status:'error',message:'Email admin wajib diisi.'},{status:400});
    const data=await callScholarshipBackend('requestAdminOtp',{email});
    return NextResponse.json(data);
  }catch(error){return NextResponse.json({status:'error',message:error instanceof Error?error.message:'Gagal mengirim OTP admin.'},{status:400});}
}
