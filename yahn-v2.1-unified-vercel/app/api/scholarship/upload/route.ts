import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { callScholarshipBackend } from '@/lib/backend';
import { readSessionToken } from '@/lib/session';

export const runtime='nodejs';
export async function POST(request: Request){
  try{
    const store=await cookies();const session=readSessionToken(store.get('yahn_scholarship_session')?.value);
    if(!session||session.kind!=='scholarship')return NextResponse.json({status:'error',message:'Silakan masuk kembali.'},{status:401});
    const form=await request.formData(),file=form.get('file'),kind=String(form.get('kind')||'');
    if(!(file instanceof File)||!kind)return NextResponse.json({status:'error',message:'File tidak ditemukan.'},{status:400});
    if(file.size>3*1024*1024)return NextResponse.json({status:'error',message:'Ukuran maksimal setiap PDF adalah 3MB.'},{status:400});
    if(file.type!=='application/pdf'&&!file.name.toLowerCase().endsWith('.pdf'))return NextResponse.json({status:'error',message:'Berkas harus PDF.'},{status:400});
    const bytes=Buffer.from(await file.arrayBuffer());
    const data=await callScholarshipBackend('uploadScholarshipFile',{email:session.email,kind,name:file.name,mimeType:file.type||'application/pdf',base64:bytes.toString('base64')});
    return NextResponse.json(data);
  }catch(error){return NextResponse.json({status:'error',message:error instanceof Error?error.message:'Upload gagal.'},{status:400});}
}
