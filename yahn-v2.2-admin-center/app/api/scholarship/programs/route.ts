import { NextResponse } from 'next/server';
import { callScholarshipBackend } from '@/lib/backend';

export async function GET(){
  try{
    const data=await callScholarshipBackend('getScholarshipPrograms',{});
    return NextResponse.json(data);
  }catch(error){
    return NextResponse.json({status:'error',message:error instanceof Error?error.message:'Gagal memuat program beasiswa.'},{status:400});
  }
}
