type DonationBody = { name?:unknown; email?:unknown; whatsapp?:unknown; amount?:unknown; method?:unknown; anonymous?:unknown };

export async function POST(request: Request){
  const body = await request.json() as DonationBody;
  const amount = Number(body.amount);
  if(!body.name || !body.email || !Number.isFinite(amount) || amount < 10000){
    return Response.json({status:'error',message:'Nama, email, dan nominal minimal Rp10.000 wajib diisi.'},{status:400});
  }

  const backend = process.env.APPS_SCRIPT_WEB_APP_URL;
  const secret = process.env.YAHN_API_SECRET;
  if(!backend){
    return Response.json({status:'success',mode:'demo',message:'Preview mode: Apps Script backend belum dikonfigurasi.'});
  }

  const upstream = await fetch(backend,{
    method:'POST',
    headers:{'Content-Type':'text/plain;charset=utf-8'},
    body:JSON.stringify({action:'submitDonation',secret,payload:{...body,amount}}),
    cache:'no-store'
  });
  const text = await upstream.text();
  try {
    const data = JSON.parse(text);
    if(data.status !== 'success') return Response.json(data,{status:400});
    return Response.json({...data,mode:'live'});
  } catch {
    return Response.json({status:'error',message:'Respons backend Apps Script tidak valid.'},{status:502});
  }
}
