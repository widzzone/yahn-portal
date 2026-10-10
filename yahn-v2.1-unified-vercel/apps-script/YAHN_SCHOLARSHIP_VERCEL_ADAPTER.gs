/**
 * YAHN SCHOLARSHIP VERCEL ADAPTER v1.0
 * PASTE FILE INI sebagai file .gs BARU di project Apps Script BEASISWA EXISTING.
 * Jangan hapus Code.gs lama karena adapter ini memakai SHEET_ID, FOLDER_ID,
 * submitApplication(), dan struktur sheet yang sudah ada.
 *
 * Setelah paste:
 * 1. Jalankan setupVercelScholarshipApi() sekali.
 * 2. Copy YAHN_SCHOLARSHIP_API_SECRET dari Execution log ke Vercel.
 * 3. Deploy ulang Web App existing (New version).
 * 4. Isi SCHOLARSHIP_APPS_SCRIPT_WEB_APP_URL dengan URL /exec project ini.
 */
function setupVercelScholarshipApi(){
  const props=PropertiesService.getScriptProperties();
  let secret=props.getProperty('YAHN_SCHOLARSHIP_API_SECRET');
  if(!secret){secret=Utilities.getUuid().replace(/-/g,'')+Utilities.getUuid().replace(/-/g,'');props.setProperty('YAHN_SCHOLARSHIP_API_SECRET',secret);}
  console.log('=== YAHN SCHOLARSHIP VERCEL API READY ===');
  console.log('YAHN_SCHOLARSHIP_API_SECRET: '+secret);
  console.log('Gunakan URL deployment /exec Apps Script beasiswa existing sebagai SCHOLARSHIP_APPS_SCRIPT_WEB_APP_URL.');
  return {status:'success',secret:secret};
}

function doPost(e){
  try{
    const raw=e&&e.postData&&e.postData.contents?e.postData.contents:'{}';
    const req=JSON.parse(raw);
    if(!validScholarshipSecret_(req.secret))return yahnScholarshipJson_({status:'error',message:'Unauthorized'});
    const p=req.payload||{};
    switch(String(req.action||'')){
      case 'requestScholarshipOtp': return yahnScholarshipJson_(requestScholarshipOtp_(p));
      case 'verifyScholarshipOtp': return yahnScholarshipJson_(verifyScholarshipOtp_(p));
      case 'getScholarshipStatus': return yahnScholarshipJson_(getScholarshipStatus_(p));
      case 'uploadScholarshipFile': return yahnScholarshipJson_(uploadScholarshipFile_(p));
      case 'submitScholarshipApplication': return yahnScholarshipJson_(submitScholarshipApplication_(p));
      case 'confirmScholarshipAttendance': return yahnScholarshipJson_(confirmScholarshipAttendance_(p));
      default:return yahnScholarshipJson_({status:'error',message:'Unknown scholarship action'});
    }
  }catch(err){return yahnScholarshipJson_({status:'error',message:String(err&&err.message?err.message:err)});}
}

function requestScholarshipOtp_(d){
  const email=cleanScholar_(d.email).toLowerCase(),mode=cleanScholar_(d.mode||'login').toLowerCase(),name=cleanScholar_(d.name);
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return{status:'error',message:'Email tidak valid.'};
  const sheet=SpreadsheetApp.openById(SHEET_ID).getSheetByName('Users');
  const data=sheet.getDataRange().getValues();let row=-1;
  for(let i=1;i<data.length;i++)if(String(data[i][0]||'').trim().toLowerCase()===email){row=i+1;break;}
  if(mode==='register'&&row<2){
    if(!name)return{status:'error',message:'Nama lengkap wajib diisi untuk membuat akun.'};
    sheet.appendRow([email,'VERCEL_OTP_ONLY_'+Utilities.getUuid(),name,'user']);
  }else if(row<2){return{status:'error',message:'Email belum terdaftar. Pilih Daftar Akun terlebih dahulu.'};}
  const code=String(Math.floor(100000+Math.random()*900000));
  CacheService.getScriptCache().put('SCHOLAR_OTP_'+hashScholar_(email),hashScholar_(code),600);
  GmailApp.sendEmail(email,'Kode Akses Portal Beasiswa YAHN','Kode akses Anda: '+code+'\n\nKode berlaku 10 menit. Jangan bagikan kode ini.',{
    name:'Portal Beasiswa YAHN',htmlBody:'<div style="font-family:Arial,sans-serif;padding:28px;background:#f4f8f7"><div style="max-width:520px;margin:auto;background:#fff;border-radius:18px;padding:28px"><p style="color:#0f766e;font-weight:800;letter-spacing:2px;font-size:12px">PORTAL BEASISWA YAHN</p><h2 style="margin:8px 0">Kode akses Anda</h2><p>Gunakan kode berikut untuk masuk ke Portal Beasiswa YAHN.</p><div style="font-size:34px;font-weight:900;letter-spacing:8px;background:#eaf8f5;color:#0f766e;padding:18px;text-align:center;border-radius:14px">'+code+'</div><p style="color:#64748b;font-size:12px;margin-top:18px">Kode berlaku 10 menit. Jangan berikan kepada siapa pun.</p></div></div>'
  });
  return{status:'success',message:'Kode akses telah dikirim ke email Anda.'};
}

function verifyScholarshipOtp_(d){
  const email=cleanScholar_(d.email).toLowerCase(),code=cleanScholar_(d.code),cache=CacheService.getScriptCache(),key='SCHOLAR_OTP_'+hashScholar_(email),saved=cache.get(key);
  if(!saved||saved!==hashScholar_(code))return{status:'error',message:'Kode akses salah atau sudah kedaluwarsa.'};
  const sheet=SpreadsheetApp.openById(SHEET_ID).getSheetByName('Users'),data=sheet.getDataRange().getValues();let user=null;
  for(let i=1;i<data.length;i++)if(String(data[i][0]||'').trim().toLowerCase()===email){user={email:String(data[i][0]),name:String(data[i][2]||'Peserta YAHN'),role:String(data[i][3]||'user').toLowerCase()};break;}
  if(!user)return{status:'error',message:'Akun tidak ditemukan.'};cache.remove(key);return{status:'success',user:user};
}

function getScholarshipStatus_(d){
  const email=cleanScholar_(d.email).toLowerCase();
  const ss=SpreadsheetApp.openById(SHEET_ID),users=ss.getSheetByName('Users').getDataRange().getValues();let user=null;
  for(let i=1;i<users.length;i++)if(String(users[i][0]||'').trim().toLowerCase()===email){user={email:String(users[i][0]),name:String(users[i][2]||'Peserta YAHN'),role:String(users[i][3]||'user').toLowerCase()};break;}
  if(!user)return{status:'error',message:'Akun tidak ditemukan.'};
  let appData=null;const app=ss.getSheetByName('Applications'),data=app.getDataRange().getValues();
  for(let i=1;i<data.length;i++)if(String(data[i][1]||'').trim().toLowerCase()===email){appData={nim:data[i][3]||'-',prodi:data[i][4]||'-',wa:data[i][5]||'-',semester:data[i][6]||'-',ukt:data[i][20]||'-',ipk:data[i][21]||'-',status:data[i][30]||'Menunggu',jadwalWawancara:data[i][33]||'-',konfirmasiHadir:data[i][34]||'-'};break;}
  return{status:'success',user:user,appData:appData};
}

function uploadScholarshipFile_(d){
  const email=cleanScholar_(d.email).toLowerCase(),kind=cleanScholar_(d.kind),name=cleanScholar_(d.name),mime=cleanScholar_(d.mimeType||'application/pdf'),base64=cleanScholar_(d.base64);
  if(!email||!kind||!name||!base64)return{status:'error',message:'Data file tidak lengkap.'};
  if(mime!=='application/pdf'&&!name.toLowerCase().endsWith('.pdf'))return{status:'error',message:'Berkas harus PDF.'};
  const bytes=Utilities.base64Decode(base64); if(bytes.length>3*1024*1024)return{status:'error',message:'Ukuran file maksimal 3MB.'};
  const main=FOLDER_ID?DriveApp.getFolderById(FOLDER_ID):DriveApp.getRootFolder(),tmp=getOrCreateFolder_(main,'_VERCEL_TEMP_UPLOADS');
  const safe=email.replace(/[^a-z0-9]/gi,'_')+'_'+Date.now()+'_'+kind+'_'+name.replace(/[^a-zA-Z0-9._-]/g,'_');
  const file=tmp.createFile(Utilities.newBlob(bytes,'application/pdf',safe));
  return{status:'success',fileId:file.getId(),name:name,kind:kind};
}

function submitScholarshipApplication_(d){
  const email=cleanScholar_(d.email).toLowerCase();if(!email)return{status:'error',message:'Sesi peserta tidak valid.'};
  const ss=SpreadsheetApp.openById(SHEET_ID),app=ss.getSheetByName('Applications'),existing=app.getDataRange().getValues();
  for(let i=1;i<existing.length;i++)if(String(existing[i][1]||'').trim().toLowerCase()===email)return{status:'error',message:'Pendaftaran untuk email ini sudah pernah dikirim.'};
  const users=ss.getSheetByName('Users').getDataRange().getValues();let nama='Peserta YAHN';for(let i=1;i<users.length;i++)if(String(users[i][0]||'').trim().toLowerCase()===email){nama=String(users[i][2]||nama);break;}
  const ids=d.fileIds||{},filesToTrash=[];
  function tempFile_(id){if(!id)return null;const f=DriveApp.getFileById(String(id));filesToTrash.push(f);const b=f.getBlob();return{name:f.getName(),mimeType:b.getContentType()||'application/pdf',base64:Utilities.base64Encode(b.getBytes())};}
  try{
    const payload={
      email:email,nama:nama,nim:d.nim,prodi:d.prodi,wa:d.wa,semester:d.semester,golUkt:d.golUkt,ipk:d.ipk,gajiOrtu:d.gajiOrtu,tanggungan:d.tanggungan,statusKerja:d.statusKerja,jenisKerja:d.jenisKerja,kondisiOrtu:d.kondisiOrtu,kendalaUkt:d.kendalaUkt,sanggupUkt:d.sanggupUkt,isSampingan:d.isSampingan||'Tidak',detSampingan:d.detSampingan||'',sumberDana:d.sumberDana||'Tidak ada',biayaTinggal:d.biayaTinggal||'',transport:d.transport||'Tidak ada',elektronik:d.elektronik||'Tidak ada',
      fileEsai:tempFile_(ids.esai),fileTranskrip:tempFile_(ids.transkrip),fileUkt:tempFile_(ids.ukt),fileGaji:tempFile_(ids.gaji),fileKk:tempFile_(ids.kk),fileProf:tempFile_(ids.prof)
    };
    const result=submitApplication(payload);
    return result;
  }finally{filesToTrash.forEach(function(f){try{f.setTrashed(true);}catch(e){}});}
}


function confirmScholarshipAttendance_(d){
  const email=cleanScholar_(d.email).toLowerCase();
  const status=getScholarshipStatus_({email:email});
  if(status.status!=='success'||!status.appData)return{status:'error',message:'Data aplikasi tidak ditemukan.'};
  if(String(status.appData.status).toUpperCase()!=='LOLOS')return{status:'error',message:'Konfirmasi wawancara hanya tersedia bagi peserta yang lolos tahap administrasi.'};
  return confirmAttendanceByStudent(status.appData.nim);
}

function getOrCreateFolder_(parent,name){const it=parent.getFoldersByName(name);return it.hasNext()?it.next():parent.createFolder(name);}
function validScholarshipSecret_(incoming){const expected=PropertiesService.getScriptProperties().getProperty('YAHN_SCHOLARSHIP_API_SECRET');return!!expected&&String(incoming||'')===String(expected);}
function hashScholar_(v){return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,String(v)));}
function cleanScholar_(v){return String(v==null?'':v).trim();}
function yahnScholarshipJson_(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);}
