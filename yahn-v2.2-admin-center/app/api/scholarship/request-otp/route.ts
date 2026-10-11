import { NextResponse } from 'next/server';
import { callScholarshipBackend } from '@/lib/backend';

export async function POST(request: Request){
  try{
    const {email,name,mode}=await request.json();
    if(!email)return NextResponse.json({status:'error',message:'Email wajib diisi.'},{status:400});
    const data=await callScholarshipBackend('requestScholarshipOtp',{email,name,mode});
    return NextResponse.json(data);
  }catch(error){return NextResponse.json({status:'error',message:error instanceof Error?error.message:'Gagal mengirim kode.'},{status:400});}
}
