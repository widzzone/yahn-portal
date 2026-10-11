import { NextResponse } from 'next/server';
import { callScholarshipBackend } from '@/lib/backend';
import { createSessionToken } from '@/lib/session';

export async function POST(request: Request){
  try{
    const {email,code}=await request.json();
    if(!email||!code)return NextResponse.json({status:'error',message:'Email dan kode wajib diisi.'},{status:400});
    const data=await callScholarshipBackend('verifyAdminOtp',{email,code});
    if(!data.user||String(data.user.role).toLowerCase()!=='admin')throw new Error('Akun tidak memiliki hak akses administrator.');
    const token=createSessionToken({kind:'admin',email:data.user.email,name:data.user.name,role:'admin'},1);
    const res=NextResponse.json({status:'success',user:data.user});
    res.cookies.set('yahn_admin_session',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*24});
    return res;
  }catch(error){return NextResponse.json({status:'error',message:error instanceof Error?error.message:'Kode admin tidak valid.'},{status:400});}
}
