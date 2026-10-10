import { NextResponse } from 'next/server';
import { callScholarshipBackend } from '@/lib/backend';
import { createSessionToken } from '@/lib/session';

export async function POST(request: Request){
  try{
    const {email,code}=await request.json();
    const data=await callScholarshipBackend('verifyScholarshipOtp',{email,code});
    const token=createSessionToken({kind:'scholarship',email:data.user.email,name:data.user.name,role:data.user.role});
    const res=NextResponse.json({status:'success',user:data.user});
    res.cookies.set('yahn_scholarship_session',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*24*7});
    return res;
  }catch(error){return NextResponse.json({status:'error',message:error instanceof Error?error.message:'Kode tidak valid.'},{status:400});}
}
