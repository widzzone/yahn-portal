import { callDonorBackend } from '@/lib/backend';
export async function POST(req:Request){
  try{const body=await req.json();const data=await callDonorBackend('registerRecurringDonor',body);return Response.json(data)}
  catch(e){return Response.json({status:'error',message:e instanceof Error?e.message:'Gagal menyimpan komitmen bulanan.'},{status:400})}
}
