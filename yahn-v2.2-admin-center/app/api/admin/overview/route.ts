import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { callDonorBackend, callScholarshipBackend } from '@/lib/backend';
import { readSessionToken } from '@/lib/session';

export async function GET(){
  try{
    const store=await cookies();
    const session=readSessionToken(store.get('yahn_admin_session')?.value);
    if(!session||session.kind!=='admin'||String(session.role).toLowerCase()!=='admin')return NextResponse.json({status:'error',message:'Sesi admin tidak tersedia.'},{status:401});
    const warnings:string[]=[];
    let scholarship:any=null,donor:any=null;
    try{const d=await callScholarshipBackend('getScholarshipAdminData',{});scholarship=d.admin;}catch(e){warnings.push(`Beasiswa: ${e instanceof Error?e.message:'gagal dimuat'}`)}
    try{const d=await callDonorBackend('getDonorAdminData',{});donor=d.admin;}catch(e){warnings.push(`Donatur: ${e instanceof Error?e.message:'gagal dimuat'}`)}
    return NextResponse.json({status:'success',admin:{name:session.name,email:session.email},scholarship,donor,warnings});
  }catch(error){return NextResponse.json({status:'error',message:error instanceof Error?error.message:'Gagal memuat Admin Center.'},{status:400});}
}
