import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { callScholarshipBackend } from '@/lib/backend';
import { readSessionToken } from '@/lib/session';
export async function POST(){try{const store=await cookies();const session=readSessionToken(store.get('yahn_scholarship_session')?.value);if(!session||session.kind!=='scholarship')return NextResponse.json({status:'error',message:'Silakan masuk kembali.'},{status:401});const data=await callScholarshipBackend('confirmScholarshipAttendance',{email:session.email});return NextResponse.json(data)}catch(error){return NextResponse.json({status:'error',message:error instanceof Error?error.message:'Konfirmasi gagal.'},{status:400})}}
