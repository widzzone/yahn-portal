import { NextResponse } from 'next/server';
import { callDonorBackend } from '@/lib/backend';

type DonationBody={name?:unknown;email?:unknown;whatsapp?:unknown;amount?:unknown;method?:unknown;anonymous?:unknown};
export async function POST(request:Request){try{const body=await request.json() as DonationBody;const amount=Number(body.amount);if(!body.name||!body.email||!Number.isFinite(amount)||amount<10000)return NextResponse.json({status:'error',message:'Nama, email, dan nominal minimal Rp10.000 wajib diisi.'},{status:400});const data=await callDonorBackend('submitDonation',{...body,amount});return NextResponse.json(data);}catch(error){return NextResponse.json({status:'error',message:error instanceof Error?error.message:'Gagal mencatat donasi.'},{status:400});}}
