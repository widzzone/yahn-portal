/**
 * YAHN SCHOLARSHIP VERCEL ADAPTER v2.8
 *
 * Dipasang sebagai file .gs tambahan di project Apps Script BEASISWA existing.
 * Jangan hapus Code.gs lama. Adapter ini tetap memakai SHEET_ID, FOLDER_ID,
 * submitApplication(), dan utilitas email/Drive dari project lama.
 *
 * V2.8 menambahkan:
 * - Scholarship_Programs (master batch/periode beasiswa)
 * - Student_Accounts (identitas mahasiswa permanen berbasis NIM)
 * - Application_Cycles (mapping aplikasi ke batch tanpa mengubah kolom legacy)
 * - Account_Recovery (pemulihan akun/email dengan approval admin)
 * - riwayat aplikasi lintas batch
 * - duplicate guard NIM/email
 *
 * SETUP:
 * 1. Replace adapter lama dengan file ini.
 * 2. Jalankan setupYahnScholarshipV28() sekali.
 * 3. Deploy Web App sebagai New Version.
 * 4. Secret lama tetap dapat dipakai.
 */

function setupVercelScholarshipApi(){
  const props=PropertiesService.getScriptProperties();
  let secret=props.getProperty('YAHN_SCHOLARSHIP_API_SECRET');
  if(!secret){
    secret=Utilities.getUuid().replace(/-/g,'')+Utilities.getUuid().replace(/-/g,'');
    props.setProperty('YAHN_SCHOLARSHIP_API_SECRET',secret);
  }
  return {status:'success',secret:secret};
}

function setupYahnScholarshipV28(){
  const base=setupVercelScholarshipApi();
  const ss=SpreadsheetApp.openById(SHEET_ID);
  ensureScholarSheet_(ss,'Scholarship_Programs',['Program ID','Nama Program','Tahun','Batch','Open Date','Close Date','Status','Semester Eligible','Min IPK','Max Benefit','Created At','Updated At']);
  ensureScholarSheet_(ss,'Student_Accounts',['Student ID','NIM','Email','Nama','WhatsApp','Status','Created At','Updated At']);
  ensureScholarSheet_(ss,'Application_Cycles',['Application ID','Program ID','Email','NIM','Legacy Row','Submitted At','Status Snapshot']);
  ensureScholarSheet_(ss,'Account_Recovery',['Recovery ID','Requested At','NIM','Nama','WhatsApp','Old Email Masked','New Email','Status','Admin Note','Resolved At']);

  seedLegacyProgram_(ss);
  migrateStudentAccounts_(ss);
  migrateLegacyApplications_(ss);

  console.log('=== YAHN SCHOLARSHIP V2.8 READY ===');
  console.log('YAHN_SCHOLARSHIP_API_SECRET: '+base.secret);
  console.log('Sheets: Scholarship_Programs, Student_Accounts, Application_Cycles, Account_Recovery');
  return {status:'success',message:'YAHN Scholarship v2.8 siap digunakan.',secret:base.secret};
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
      case 'lookupScholarshipAccount': return yahnScholarshipJson_(lookupScholarshipAccount_(p));
      case 'requestScholarshipAccountRecovery': return yahnScholarshipJson_(requestScholarshipAccountRecovery_(p));
      case 'getScholarshipPrograms': return yahnScholarshipJson_(getScholarshipPrograms_());
      case 'getScholarshipStatus': return yahnScholarshipJson_(getScholarshipStatus_(p));
      case 'uploadScholarshipFile': return yahnScholarshipJson_(uploadScholarshipFile_(p));
      case 'submitScholarshipApplication': return yahnScholarshipJson_(submitScholarshipApplication_(p));
      case 'confirmScholarshipAttendance': return yahnScholarshipJson_(confirmScholarshipAttendance_(p));
      case 'requestAdminOtp': return yahnScholarshipJson_(requestAdminOtp_(p));
      case 'verifyAdminOtp': return yahnScholarshipJson_(verifyAdminOtp_(p));
      case 'getScholarshipAdminData': return yahnScholarshipJson_(getScholarshipAdminData_());
      case 'adminUpdateCandidateStatus': return yahnScholarshipJson_(adminUpdateCandidateStatus_(p));
      case 'adminSaveInterviewSchedule': return yahnScholarshipJson_(adminSaveInterviewSchedule_(p));
      case 'adminFinalDecision': return yahnScholarshipJson_(adminFinalDecision_(p));
      case 'adminUpsertScholarshipProgram': return yahnScholarshipJson_(adminUpsertScholarshipProgram_(p));
      case 'adminResolveAccountRecovery': return yahnScholarshipJson_(adminResolveAccountRecovery_(p));
      default:return yahnScholarshipJson_({status:'error',message:'Unknown scholarship action'});
    }
  }catch(err){
    return yahnScholarshipJson_({status:'error',message:String(err&&err.message?err.message:err)});
  }
}

// =========================
// AUTH + STUDENT IDENTITY
// =========================
function requestScholarshipOtp_(d){
  const email=cleanScholar_(d.email).toLowerCase();
  const mode=cleanScholar_(d.mode||'login').toLowerCase();
  const name=cleanScholar_(d.name);
  const nim=cleanScholar_(d.nim).toUpperCase();
  if(!isScholarEmail_(email))return{status:'error',message:'Email tidak valid.'};

  const ss=SpreadsheetApp.openById(SHEET_ID);
  const users=ss.getSheetByName('Users');
  const userRow=findUserRowByEmail_(users,email);
  const accounts=ss.getSheetByName('Student_Accounts');
  const accountByNim=nim?findStudentAccountByNim_(accounts,nim):null;
  const accountByEmail=findStudentAccountByEmail_(accounts,email);

  if(mode==='register'){
    if(!name||!nim)return{status:'error',message:'Nama lengkap dan NIM wajib diisi untuk membuat akun.'};
    if(userRow>1||accountByEmail){
      return{status:'error',reason:'EMAIL_EXISTS',maskedEmail:maskScholarEmail_(email),message:'Email ini sudah terdaftar di YAHN. Silakan masuk menggunakan akun yang sudah ada.'};
    }
    if(accountByNim&&String(accountByNim.email||'').toLowerCase()!==email){
      return{status:'error',reason:'NIM_EXISTS',maskedEmail:maskScholarEmail_(accountByNim.email),message:'NIM ini sudah terhubung dengan akun YAHN sebelumnya. Gunakan akun lama agar riwayat pendaftaran tetap tersimpan.'};
    }
    users.appendRow([email,'VERCEL_OTP_ONLY_'+Utilities.getUuid(),name,'user']);
    upsertStudentAccount_(accounts,{nim:nim,email:email,name:name,whatsapp:'',status:'ACTIVE'});
  }else{
    if(userRow<2){
      return{status:'error',reason:'EMAIL_NOT_FOUND',message:'Email belum terdaftar. Jika Anda pernah mendaftar tetapi lupa emailnya, gunakan fitur Cari Akun Saya.'};
    }
  }

  sendScholarOtp_(email);
  return{status:'success',message:'Kode akses telah dikirim ke email Anda.'};
}

function sendScholarOtp_(email){
  const code=String(Math.floor(100000+Math.random()*900000));
  CacheService.getScriptCache().put('SCHOLAR_OTP_'+hashScholar_(email),hashScholar_(code),600);
  GmailApp.sendEmail(email,'Kode Akses Portal Beasiswa YAHN','Kode akses Anda: '+code+'\n\nKode berlaku 10 menit. Jangan bagikan kode ini.',{
    name:'Portal Beasiswa YAHN',
    htmlBody:'<div style="font-family:Arial,sans-serif;padding:28px;background:#f4f8f7"><div style="max-width:520px;margin:auto;background:#fff;border-radius:18px;padding:28px"><p style="color:#0f766e;font-weight:800;letter-spacing:2px;font-size:12px">PORTAL BEASISWA YAHN</p><h2 style="margin:8px 0">Kode akses Anda</h2><p>Gunakan kode berikut untuk masuk ke Portal Beasiswa YAHN.</p><div style="font-size:34px;font-weight:900;letter-spacing:8px;background:#eaf8f5;color:#0f766e;padding:18px;text-align:center;border-radius:14px">'+code+'</div><p style="color:#64748b;font-size:12px;margin-top:18px">Kode berlaku 10 menit. Jangan berikan kepada siapa pun.</p></div></div>'
  });
}

function verifyScholarshipOtp_(d){
  const email=cleanScholar_(d.email).toLowerCase(),code=cleanScholar_(d.code);
  const cache=CacheService.getScriptCache(),key='SCHOLAR_OTP_'+hashScholar_(email),saved=cache.get(key);
  if(!saved||saved!==hashScholar_(code))return{status:'error',message:'Kode akses salah atau sudah kedaluwarsa.'};
  const sheet=SpreadsheetApp.openById(SHEET_ID).getSheetByName('Users');
  const data=sheet.getDataRange().getValues();let user=null;
  for(let i=1;i<data.length;i++){
    if(String(data[i][0]||'').trim().toLowerCase()===email){
      user={email:String(data[i][0]),name:String(data[i][2]||'Peserta YAHN'),role:String(data[i][3]||'user').toLowerCase()};break;
    }
  }
  if(!user)return{status:'error',message:'Akun tidak ditemukan.'};
  cache.remove(key);
  return{status:'success',user:user};
}

function lookupScholarshipAccount_(d){
  const nim=cleanScholar_(d.nim).toUpperCase(),name=normalizeScholarText_(d.name),wa=normalizeScholarPhone_(d.whatsapp);
  if(!nim||!name)return{status:'error',message:'NIM dan nama lengkap wajib diisi.'};
  const ss=SpreadsheetApp.openById(SHEET_ID),accounts=ss.getSheetByName('Student_Accounts');
  const acc=findStudentAccountByNim_(accounts,nim);
  if(!acc)return{status:'error',message:'Data akun belum ditemukan. Pastikan NIM dan nama yang dimasukkan sesuai data pendaftaran.'};
  if(normalizeScholarText_(acc.name)!==name)return{status:'error',message:'Data akun belum dapat diverifikasi. Pastikan NIM dan nama sesuai data pendaftaran.'};
  const storedWa=normalizeScholarPhone_(acc.whatsapp);
  if(storedWa&&(!wa||storedWa.slice(-5)!==wa.slice(-5)))return{status:'error',message:'Untuk keamanan, masukkan nomor WhatsApp yang pernah digunakan pada pendaftaran sebelumnya.'};
  return{status:'success',maskedEmail:maskScholarEmail_(acc.email),hasEmail:!!acc.email,message:'Akun ditemukan.'};
}

function requestScholarshipAccountRecovery_(d){
  const nim=cleanScholar_(d.nim).toUpperCase(),name=normalizeScholarText_(d.name),wa=cleanScholar_(d.whatsapp),newEmail=cleanScholar_(d.newEmail).toLowerCase();
  if(!nim||!name||!newEmail||!isScholarEmail_(newEmail))return{status:'error',message:'NIM, nama, dan email baru yang valid wajib diisi.'};
  const ss=SpreadsheetApp.openById(SHEET_ID),accounts=ss.getSheetByName('Student_Accounts');
  const acc=findStudentAccountByNim_(accounts,nim);
  if(!acc||normalizeScholarText_(acc.name)!==name)return{status:'error',message:'Data akun belum dapat diverifikasi.'};
  const storedWa=normalizeScholarPhone_(acc.whatsapp),inputWa=normalizeScholarPhone_(wa);
  if(storedWa&&(!inputWa||storedWa.slice(-5)!==inputWa.slice(-5)))return{status:'error',message:'Nomor WhatsApp tidak cocok dengan data sebelumnya.'};
  if(findUserRowByEmail_(ss.getSheetByName('Users'),newEmail)>1||findStudentAccountByEmail_(accounts,newEmail))return{status:'error',message:'Email baru tersebut sudah digunakan akun lain.'};
  const recovery=ss.getSheetByName('Account_Recovery');
  const recoveryId='RECOV-'+Utilities.getUuid().split('-')[0].toUpperCase();
  recovery.appendRow([recoveryId,new Date(),nim,acc.name,wa||acc.whatsapp||'',maskScholarEmail_(acc.email),newEmail,'PENDING','', '']);
  return{status:'success',recoveryId:recoveryId,message:'Permintaan pemulihan akun sudah dicatat. Tim YAHN akan memverifikasi sebelum email akun diubah.'};
}

// =========================
// PROGRAM / CYCLE MANAGEMENT
// =========================
function getScholarshipPrograms_(){
  const ss=SpreadsheetApp.openById(SHEET_ID);
  const programs=readScholarPrograms_(ss);
  return{status:'success',programs:programs,currentProgram:getOpenProgramFromList_(programs)};
}

function adminUpsertScholarshipProgram_(d){
  const ss=SpreadsheetApp.openById(SHEET_ID),sh=ss.getSheetByName('Scholarship_Programs');
  let programId=cleanScholar_(d.programId).toUpperCase();
  const name=cleanScholar_(d.name),year=Number(d.year||new Date().getFullYear()),batch=Number(d.batch||1),status=cleanScholar_(d.status||'DRAFT').toUpperCase();
  const openDate=cleanScholar_(d.openDate),closeDate=cleanScholar_(d.closeDate),semesters=cleanScholar_(d.semesters||'4,6'),minIpk=Number(d.minIpk||3),maxBenefit=Number(d.maxBenefit||9000000);
  if(!programId)programId='YAHN-'+year+'-'+String(batch).padStart(2,'0');
  if(!name)return{status:'error',message:'Nama program wajib diisi.'};
  if(['DRAFT','OPEN','CLOSED','ARCHIVED'].indexOf(status)<0)return{status:'error',message:'Status program tidak valid.'};

  const data=sh.getDataRange().getValues();let row=-1;
  for(let i=1;i<data.length;i++)if(String(data[i][0]||'').trim().toUpperCase()===programId){row=i+1;break;}
  if(status==='OPEN'){
    for(let i=2;i<=sh.getLastRow();i++){
      if(i!==row&&String(sh.getRange(i,7).getValue()||'').toUpperCase()==='OPEN')sh.getRange(i,7).setValue('CLOSED');
    }
  }
  if(row>1){
    const created=sh.getRange(row,11).getValue()||new Date();
    sh.getRange(row,1,1,12).setValues([[programId,name,year,batch,openDate,closeDate,status,semesters,minIpk,maxBenefit,created,new Date()]]);
  }else{
    sh.appendRow([programId,name,year,batch,openDate,closeDate,status,semesters,minIpk,maxBenefit,new Date(),new Date()]);
  }
  return{status:'success',programId:programId,message:'Program beasiswa berhasil disimpan.'};
}

function readScholarPrograms_(ss){
  const sh=ss.getSheetByName('Scholarship_Programs');if(!sh||sh.getLastRow()<2)return[];
  const rows=sh.getDataRange().getValues();rows.shift();
  return rows.filter(r=>r[0]).map(r=>({
    programId:String(r[0]||''),name:String(r[1]||''),year:Number(r[2]||0),batch:Number(r[3]||0),openDate:serializeScholarValue_(r[4]),closeDate:serializeScholarValue_(r[5]),status:String(r[6]||'DRAFT').toUpperCase(),semesters:String(r[7]||''),minIpk:Number(r[8]||0),maxBenefit:Number(r[9]||0)
  })).sort((a,b)=>(b.year-a.year)||(b.batch-a.batch));
}
function getOpenProgramFromList_(programs){return programs.find(p=>p.status==='OPEN')||null;}
function getOpenScholarProgram_(ss){return getOpenProgramFromList_(readScholarPrograms_(ss));}

// =========================
// STUDENT DASHBOARD / HISTORY
// =========================
function getScholarshipStatus_(d){
  const email=cleanScholar_(d.email).toLowerCase();
  const ss=SpreadsheetApp.openById(SHEET_ID),users=ss.getSheetByName('Users').getDataRange().getValues();let user=null;
  for(let i=1;i<users.length;i++)if(String(users[i][0]||'').trim().toLowerCase()===email){user={email:String(users[i][0]),name:String(users[i][2]||'Peserta YAHN'),role:String(users[i][3]||'user').toLowerCase()};break;}
  if(!user)return{status:'error',message:'Akun tidak ditemukan.'};

  const accounts=ss.getSheetByName('Student_Accounts'),acc=findStudentAccountByEmail_(accounts,email);
  const nim=acc?String(acc.nim||''):'';
  const programs=readScholarPrograms_(ss),currentProgram=getOpenProgramFromList_(programs);
  const history=getApplicationsForStudent_(ss,email,nim,programs);
  const currentApplication=currentProgram?history.find(x=>x.programId===currentProgram.programId)||null:null;
  const latestApplication=currentApplication||(history.length?history[0]:null);

  let eligible=true,eligibilityMessage='Anda dapat mendaftar pada program aktif.';
  if(!currentProgram){eligible=false;eligibilityMessage='Belum ada program beasiswa yang sedang membuka pendaftaran.';}
  else if(currentApplication){eligible=false;eligibilityMessage='Anda sudah mengirim pendaftaran untuk program ini.';}
  else if(nim&&isActiveRecipient_(ss,nim)){eligible=false;eligibilityMessage='Anda masih tercatat sebagai penerima aktif YAHN sehingga belum dapat mendaftar pada program yang sama.';}

  return{
    status:'success',user:user,
    account:acc?{nim:acc.nim,email:acc.email,name:acc.name,whatsapp:acc.whatsapp}:null,
    currentProgram:currentProgram,
    eligibleForCurrent:eligible,
    eligibilityMessage:eligibilityMessage,
    appData:latestApplication,
    currentApplication:currentApplication,
    applications:history
  };
}

function getApplicationsForStudent_(ss,email,nim,programs){
  const cycle=ss.getSheetByName('Application_Cycles'),app=ss.getSheetByName('Applications');
  if(!cycle||cycle.getLastRow()<2||!app)return[];
  const cycles=cycle.getDataRange().getValues();cycles.shift();
  const appRows=app.getDataRange().getValues();
  const list=[];
  cycles.forEach(function(r){
    const rowEmail=String(r[2]||'').trim().toLowerCase(),rowNim=String(r[3]||'').trim().toUpperCase();
    if(rowEmail!==email&&(!nim||rowNim!==String(nim).toUpperCase()))return;
    const legacyRow=Number(r[4]||0);if(legacyRow<2||legacyRow>appRows.length)return;
    const a=appRows[legacyRow-1],programId=String(r[1]||'');
    const program=programs.find(p=>p.programId===programId)||{programId:programId,name:programId||'Beasiswa YAHN',year:0,batch:0,status:'CLOSED'};
    list.push(mapApplicationRow_(a,{applicationId:String(r[0]||''),programId:programId,programName:program.name,submittedAt:serializeScholarValue_(r[5]||a[0])}));
  });
  list.sort((x,y)=>String(y.submittedAt||'').localeCompare(String(x.submittedAt||'')));
  return list;
}

function mapApplicationRow_(r,meta){
  return{
    applicationId:meta.applicationId||'',programId:meta.programId||'',programName:meta.programName||'Beasiswa YAHN',submittedAt:meta.submittedAt||serializeScholarValue_(r[0]),
    email:String(r[1]||''),nama:String(r[2]||''),nim:String(r[3]||'-'),prodi:String(r[4]||'-'),wa:String(r[5]||'-'),semester:String(r[6]||'-'),ukt:String(r[20]||'-'),ipk:String(r[21]||'-'),status:String(r[30]||'Menunggu'),jadwalWawancara:String(r[33]||'-'),konfirmasiHadir:String(r[34]||'-')
  };
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
  const nim=cleanScholar_(d.nim).toUpperCase();if(!nim)return{status:'error',message:'NIM wajib diisi.'};
  const ss=SpreadsheetApp.openById(SHEET_ID),program=getOpenScholarProgram_(ss);
  if(!program)return{status:'error',message:'Saat ini belum ada program beasiswa yang membuka pendaftaran.'};

  const cycle=ss.getSheetByName('Application_Cycles'),cycleRows=cycle.getDataRange().getValues();
  for(let i=1;i<cycleRows.length;i++){
    if(String(cycleRows[i][1]||'')===program.programId&&(String(cycleRows[i][2]||'').toLowerCase()===email||String(cycleRows[i][3]||'').toUpperCase()===nim)){
      return{status:'error',message:'Anda sudah pernah mengirim aplikasi untuk program ini.'};
    }
  }

  const accounts=ss.getSheetByName('Student_Accounts'),accByNim=findStudentAccountByNim_(accounts,nim),accByEmail=findStudentAccountByEmail_(accounts,email);
  if(accByNim&&String(accByNim.email||'').toLowerCase()!==email)return{status:'error',message:'NIM ini terhubung ke akun email lain. Gunakan fitur pemulihan akun jika Anda lupa email sebelumnya.'};
  if(accByEmail&&accByEmail.nim&&String(accByEmail.nim).toUpperCase()!==nim)return{status:'error',message:'Email ini sudah terhubung dengan NIM yang berbeda. Hubungi admin YAHN jika data perlu diperbaiki.'};

  const users=ss.getSheetByName('Users').getDataRange().getValues();let nama='Peserta YAHN';
  for(let i=1;i<users.length;i++)if(String(users[i][0]||'').trim().toLowerCase()===email){nama=String(users[i][2]||nama);break;}
  upsertStudentAccount_(accounts,{nim:nim,email:email,name:nama,whatsapp:cleanScholar_(d.wa),status:'ACTIVE'});

  const ids=d.fileIds||{},filesToTrash=[];
  function tempFile_(id){if(!id)return null;const f=DriveApp.getFileById(String(id));filesToTrash.push(f);const b=f.getBlob();return{name:f.getName(),mimeType:b.getContentType()||'application/pdf',base64:Utilities.base64Encode(b.getBytes())};}
  try{
    const payload={
      email:email,nama:nama,nim:nim,prodi:d.prodi,wa:d.wa,semester:d.semester,golUkt:d.golUkt,ipk:d.ipk,gajiOrtu:d.gajiOrtu,tanggungan:d.tanggungan,statusKerja:d.statusKerja,jenisKerja:d.jenisKerja,kondisiOrtu:d.kondisiOrtu,kendalaUkt:d.kendalaUkt,sanggupUkt:d.sanggupUkt,isSampingan:d.isSampingan||'Tidak',detSampingan:d.detSampingan||'',sumberDana:d.sumberDana||'Tidak ada',biayaTinggal:d.biayaTinggal||'',transport:d.transport||'Tidak ada',elektronik:d.elektronik||'Tidak ada',
      fileEsai:tempFile_(ids.esai),fileTranskrip:tempFile_(ids.transkrip),fileUkt:tempFile_(ids.ukt),fileGaji:tempFile_(ids.gaji),fileKk:tempFile_(ids.kk),fileProf:tempFile_(ids.prof)
    };
    const before=ss.getSheetByName('Applications').getLastRow();
    const result=submitApplication(payload);
    if(!result||result.status!=='success')return result||{status:'error',message:'Pendaftaran gagal disimpan.'};
    const legacyRow=Math.max(before+1,ss.getSheetByName('Applications').getLastRow());
    const applicationId='APP-'+program.year+'-'+Utilities.getUuid().split('-')[0].toUpperCase();
    const statusSnapshot=String(ss.getSheetByName('Applications').getRange(legacyRow,31).getValue()||'Menunggu');
    cycle.appendRow([applicationId,program.programId,email,nim,legacyRow,new Date(),statusSnapshot]);
    return{status:'success',applicationId:applicationId,programId:program.programId,message:'Pendaftaran berhasil dikirim untuk '+program.name+'.'};
  }finally{filesToTrash.forEach(function(f){try{f.setTrashed(true);}catch(e){}});}
}

function confirmScholarshipAttendance_(d){
  const email=cleanScholar_(d.email).toLowerCase();
  const status=getScholarshipStatus_({email:email});
  if(status.status!=='success'||!status.currentApplication)return{status:'error',message:'Data aplikasi aktif tidak ditemukan.'};
  if(String(status.currentApplication.status).toUpperCase()!=='LOLOS')return{status:'error',message:'Konfirmasi wawancara hanya tersedia bagi peserta yang lolos tahap administrasi.'};
  const row=resolveApplicationLegacyRow_(SpreadsheetApp.openById(SHEET_ID),status.currentApplication.applicationId,status.currentApplication.nim);
  if(row<2)return{status:'error',message:'Aplikasi tidak ditemukan.'};
  SpreadsheetApp.openById(SHEET_ID).getSheetByName('Applications').getRange(row,35).setValue('BERSEDIA HADIR');
  return{status:'success',message:'Kehadiran wawancara berhasil dikonfirmasi.'};
}

// =========================
// ADMIN
// =========================
function requestAdminOtp_(d){
  const email=cleanScholar_(d.email).toLowerCase();
  if(!email)return{status:'error',message:'Email admin wajib diisi.'};
  const ss=SpreadsheetApp.openById(SHEET_ID),sh=ss.getSheetByName('Users'),data=sh.getDataRange().getValues();
  let admin=null;
  for(let i=1;i<data.length;i++){
    if(String(data[i][0]||'').trim().toLowerCase()===email){admin={name:String(data[i][2]||'Admin YAHN'),role:String(data[i][3]||'').trim().toLowerCase()};break;}
  }
  if(!admin||admin.role!=='admin')return{status:'error',message:'Email ini tidak memiliki akses Administrator YAHN.'};
  return requestScholarshipOtp_({email:email,mode:'login',name:admin.name});
}
function verifyAdminOtp_(d){const result=verifyScholarshipOtp_(d);if(result.status!=='success')return result;if(!result.user||String(result.user.role||'').toLowerCase()!=='admin')return{status:'error',message:'Akun tidak memiliki hak akses administrator.'};return result;}

function getScholarshipAdminData_(){
  const ss=SpreadsheetApp.openById(SHEET_ID),sh=ss.getSheetByName('Applications'),rows=sh.getDataRange().getValues();rows.shift();
  const programs=readScholarPrograms_(ss),cycles=readApplicationCycles_(ss),cycleByRow={};cycles.forEach(c=>cycleByRow[String(c.legacyRow)]=c);
  let sumIpk=0,countIpk=0;const statusCounts={Menunggu:0,Lolos:0,Tolak:0,Penerima:0,'Gagal Final':0};const candidates=[];
  rows.forEach(function(r,idx){
    if(!r[2])return;const status=String(r[30]||'Menunggu');if(statusCounts[status]===undefined)statusCounts[status]=0;statusCounts[status]++;
    const nums=(String(r[21]||'').match(/[0-9]+(?:\.[0-9]+)?/g)||[]);if(nums.length){const v=parseFloat(nums[nums.length-1]);if(isFinite(v)){sumIpk+=v;countIpk++;}}
    const legacyRow=idx+2,cycle=cycleByRow[String(legacyRow)]||null,program=cycle?programs.find(p=>p.programId===cycle.programId):null;
    candidates.push({
      applicationId:cycle?cycle.applicationId:'APP-LEGACY-'+legacyRow,programId:cycle?cycle.programId:'YAHN-2026-01',programName:program?program.name:'Beasiswa YAHN 2026',legacyRow:legacyRow,
      timestamp:r[0] instanceof Date?r[0].toISOString():String(r[0]||''),email:String(r[1]||''),nama:String(r[2]||''),nim:String(r[3]||''),prodi:String(r[4]||''),wa:String(r[5]||''),semester:String(r[6]||''),gajiOrtu:String(r[7]||''),tanggungan:String(r[8]||''),jenisKerja:String(r[19]||''),golUkt:String(r[20]||''),ipk:String(r[21]||''),fileUrl:String(r[24]||''),urlTranskrip:String(r[25]||''),urlUkt:String(r[26]||''),urlGaji:String(r[27]||''),urlKk:String(r[28]||''),urlProf:String(r[29]||''),status:status,uktPoints:String(r[31]||''),ringkasanAi:String(r[32]||''),jadwalWawancara:String(r[33]||'-'),konfirmasiHadir:String(r[34]||'-')
    });
  });
  let existing=[];const ex=ss.getSheetByName('Existing');
  if(ex&&ex.getLastRow()>1){const vals=ex.getDataRange().getValues();vals.shift();vals.forEach(function(r){if(r[1])existing.push({no:r[0],nama:r[1],nim:r[2],jurusan:r[3],semester:r[4],jenis:r[5],bank:r[6],norek:r[7],periode:r[8]||'-',nominal:Number(String(r[9]||0).replace(/[^0-9]/g,''))||0,status:r[10]||''});});}
  const recoveries=sheetObjectsScholar_(ss.getSheetByName('Account_Recovery')).map(function(x){return x;});
  return{status:'success',admin:{summary:{total:candidates.length,pending:statusCounts.Menunggu||0,passed:statusCounts.Lolos||0,recipients:statusCounts.Penerima||0,rejected:(statusCounts.Tolak||0)+(statusCounts['Gagal Final']||0),avgIpk:countIpk?(sumIpk/countIpk).toFixed(2):'0.00'},statusCounts:statusCounts,candidates:candidates,existing:existing,programs:programs,recoveries:recoveries,currentProgram:getOpenProgramFromList_(programs)}};
}

function adminUpdateCandidateStatus_(d){
  const status=cleanScholar_(d.status);if(['Menunggu','Lolos','Tolak'].indexOf(status)<0)return{status:'error',message:'Status tidak valid.'};
  const ss=SpreadsheetApp.openById(SHEET_ID),row=resolveApplicationLegacyRow_(ss,d.applicationId,d.nim);if(row<2)return{status:'error',message:'Aplikasi tidak ditemukan.'};
  const sh=ss.getSheetByName('Applications');sh.getRange(row,31).setValue(status);syncCycleStatusByLegacyRow_(ss,row,status);sendSimpleScholarStatusEmail_(sh,row,status);
  return{status:'success',message:'Status aplikasi berhasil diperbarui.'};
}
function adminSaveInterviewSchedule_(d){
  const schedule=cleanScholar_(d.schedule);if(!schedule)return{status:'error',message:'Jadwal wajib diisi.'};
  const ss=SpreadsheetApp.openById(SHEET_ID),row=resolveApplicationLegacyRow_(ss,d.applicationId,d.nim);if(row<2)return{status:'error',message:'Aplikasi tidak ditemukan.'};
  const sh=ss.getSheetByName('Applications');sh.getRange(row,34).setValue(schedule);sendSimpleInterviewEmail_(sh,row,schedule);return{status:'success',message:'Jadwal wawancara berhasil disimpan.'};
}
function adminFinalDecision_(d){
  const result=cleanScholar_(d.result);if(['Diterima','Ditolak'].indexOf(result)<0)return{status:'error',message:'Keputusan final tidak valid.'};
  const ss=SpreadsheetApp.openById(SHEET_ID),row=resolveApplicationLegacyRow_(ss,d.applicationId,d.nim);if(row<2)return{status:'error',message:'Aplikasi tidak ditemukan.'};
  const status=result==='Diterima'?'Penerima':'Gagal Final',sh=ss.getSheetByName('Applications');sh.getRange(row,31).setValue(status);syncCycleStatusByLegacyRow_(ss,row,status);sendSimpleScholarStatusEmail_(sh,row,status);return{status:'success',message:'Keputusan final berhasil disimpan.'};
}

function adminResolveAccountRecovery_(d){
  const recoveryId=cleanScholar_(d.recoveryId),decision=cleanScholar_(d.decision).toUpperCase(),note=cleanScholar_(d.note);
  if(!recoveryId||['APPROVED','REJECTED'].indexOf(decision)<0)return{status:'error',message:'Data keputusan pemulihan tidak valid.'};
  const ss=SpreadsheetApp.openById(SHEET_ID),sh=ss.getSheetByName('Account_Recovery'),rows=sh.getDataRange().getValues();let row=-1,data=null;
  for(let i=1;i<rows.length;i++)if(String(rows[i][0]||'')===recoveryId){row=i+1;data=rows[i];break;}
  if(row<2||!data)return{status:'error',message:'Permintaan pemulihan tidak ditemukan.'};
  if(String(data[7]||'').toUpperCase()!=='PENDING')return{status:'error',message:'Permintaan ini sudah diproses.'};
  if(decision==='APPROVED'){
    const nim=String(data[2]||'').toUpperCase(),newEmail=String(data[6]||'').toLowerCase(),accounts=ss.getSheetByName('Student_Accounts'),acc=findStudentAccountByNim_(accounts,nim);
    if(!acc)return{status:'error',message:'Akun mahasiswa tidak ditemukan.'};
    const oldEmail=String(acc.email||'').toLowerCase(),users=ss.getSheetByName('Users');
    if(findUserRowByEmail_(users,newEmail)>1)return{status:'error',message:'Email baru sudah digunakan akun lain.'};
    const urow=findUserRowByEmail_(users,oldEmail);
    if(urow>1)users.getRange(urow,1).setValue(newEmail);else users.appendRow([newEmail,'VERCEL_OTP_ONLY_'+Utilities.getUuid(),acc.name||'Peserta YAHN','user']);
    accounts.getRange(acc.row,3).setValue(newEmail);accounts.getRange(acc.row,8).setValue(new Date());
    try{GmailApp.sendEmail(newEmail,'Pemulihan Akun YAHN Disetujui','Email akun Portal Beasiswa YAHN Anda telah diperbarui. Anda sekarang dapat masuk menggunakan email ini.',{name:'YAHN'});}catch(e){}
  }
  sh.getRange(row,8,1,3).setValues([[decision,note,new Date()]]);
  return{status:'success',message:decision==='APPROVED'?'Pemulihan akun disetujui dan email akun diperbarui.':'Permintaan pemulihan ditolak.'};
}

// =========================
// MIGRATION / HELPERS
// =========================
function seedLegacyProgram_(ss){
  const sh=ss.getSheetByName('Scholarship_Programs');if(sh.getLastRow()>1)return;
  sh.appendRow(['YAHN-2026-01','Beasiswa YAHN 2026',2026,1,'2026-05-25','2026-06-03','CLOSED','4,6',3.00,9000000,new Date(),new Date()]);
}
function migrateStudentAccounts_(ss){
  const accounts=ss.getSheetByName('Student_Accounts'),users=ss.getSheetByName('Users');
  if(users&&users.getLastRow()>1){const rows=users.getDataRange().getValues();for(let i=1;i<rows.length;i++){const email=String(rows[i][0]||'').trim().toLowerCase();if(email)upsertStudentAccount_(accounts,{nim:'',email:email,name:String(rows[i][2]||'Peserta YAHN'),whatsapp:'',status:'ACTIVE'});}}
  const apps=ss.getSheetByName('Applications');if(apps&&apps.getLastRow()>1){const rows=apps.getDataRange().getValues();for(let i=1;i<rows.length;i++){if(!rows[i][1])continue;upsertStudentAccount_(accounts,{nim:String(rows[i][3]||'').toUpperCase(),email:String(rows[i][1]||'').toLowerCase(),name:String(rows[i][2]||'Peserta YAHN'),whatsapp:String(rows[i][5]||''),status:'ACTIVE'});}}
}
function migrateLegacyApplications_(ss){
  const app=ss.getSheetByName('Applications'),cycle=ss.getSheetByName('Application_Cycles');if(!app||app.getLastRow()<2)return;
  const existing=cycle.getLastRow()>1?cycle.getDataRange().getValues():[];const mapped={};for(let i=1;i<existing.length;i++)mapped[String(existing[i][4]||'')]=true;
  const rows=app.getDataRange().getValues();
  for(let i=1;i<rows.length;i++){
    const legacyRow=i+1;if(mapped[String(legacyRow)]||!rows[i][1])continue;
    cycle.appendRow(['APP-LEGACY-'+legacyRow,'YAHN-2026-01',String(rows[i][1]||'').toLowerCase(),String(rows[i][3]||'').toUpperCase(),legacyRow,rows[i][0]||new Date(),String(rows[i][30]||'Menunggu')]);
  }
}
function ensureScholarSheet_(ss,name,headers){let sh=ss.getSheetByName(name);if(!sh){sh=ss.insertSheet(name);sh.getRange(1,1,1,headers.length).setValues([headers]);sh.setFrozenRows(1);}return sh;}
function upsertStudentAccount_(sh,d){
  const nim=String(d.nim||'').trim().toUpperCase(),email=String(d.email||'').trim().toLowerCase();let found=null;
  const rows=sh.getDataRange().getValues();for(let i=1;i<rows.length;i++){const rn=String(rows[i][1]||'').trim().toUpperCase(),re=String(rows[i][2]||'').trim().toLowerCase();if((nim&&rn===nim)||(email&&re===email)){found={row:i+1,data:rows[i]};break;}}
  if(found){const current=found.data;sh.getRange(found.row,1,1,8).setValues([[current[0]||('STU-'+Utilities.getUuid().split('-')[0].toUpperCase()),nim||current[1]||'',email||current[2]||'',d.name||current[3]||'',d.whatsapp||current[4]||'',d.status||current[5]||'ACTIVE',current[6]||new Date(),new Date()]]);return;}
  sh.appendRow(['STU-'+Utilities.getUuid().split('-')[0].toUpperCase(),nim,email,d.name||'',d.whatsapp||'',d.status||'ACTIVE',new Date(),new Date()]);
}
function findStudentAccountByNim_(sh,nim){if(!sh||!nim)return null;const rows=sh.getDataRange().getValues();for(let i=1;i<rows.length;i++)if(String(rows[i][1]||'').trim().toUpperCase()===String(nim).trim().toUpperCase())return{row:i+1,studentId:String(rows[i][0]||''),nim:String(rows[i][1]||''),email:String(rows[i][2]||''),name:String(rows[i][3]||''),whatsapp:String(rows[i][4]||''),status:String(rows[i][5]||'ACTIVE')};return null;}
function findStudentAccountByEmail_(sh,email){if(!sh||!email)return null;const rows=sh.getDataRange().getValues();for(let i=1;i<rows.length;i++)if(String(rows[i][2]||'').trim().toLowerCase()===String(email).trim().toLowerCase())return{row:i+1,studentId:String(rows[i][0]||''),nim:String(rows[i][1]||''),email:String(rows[i][2]||''),name:String(rows[i][3]||''),whatsapp:String(rows[i][4]||''),status:String(rows[i][5]||'ACTIVE')};return null;}
function findUserRowByEmail_(sh,email){if(!sh)return-1;const rows=sh.getDataRange().getValues();for(let i=1;i<rows.length;i++)if(String(rows[i][0]||'').trim().toLowerCase()===String(email).trim().toLowerCase())return i+1;return-1;}
function readApplicationCycles_(ss){const sh=ss.getSheetByName('Application_Cycles');if(!sh||sh.getLastRow()<2)return[];const rows=sh.getDataRange().getValues();rows.shift();return rows.filter(r=>r[0]).map(r=>({applicationId:String(r[0]||''),programId:String(r[1]||''),email:String(r[2]||''),nim:String(r[3]||''),legacyRow:Number(r[4]||0),submittedAt:serializeScholarValue_(r[5]),status:String(r[6]||'')}));}
function resolveApplicationLegacyRow_(ss,applicationId,nim){
  const id=cleanScholar_(applicationId);if(id){const sh=ss.getSheetByName('Application_Cycles'),rows=sh.getDataRange().getValues();for(let i=1;i<rows.length;i++)if(String(rows[i][0]||'')===id)return Number(rows[i][4]||0);}
  if(nim){const app=ss.getSheetByName('Applications'),rows=app.getDataRange().getValues();for(let i=rows.length-1;i>=1;i--)if(String(rows[i][3]||'').trim()===String(nim).trim())return i+1;}
  return-1;
}
function syncCycleStatusByLegacyRow_(ss,row,status){const sh=ss.getSheetByName('Application_Cycles'),rows=sh.getDataRange().getValues();for(let i=1;i<rows.length;i++)if(Number(rows[i][4]||0)===Number(row)){sh.getRange(i+1,7).setValue(status);break;}}
function isActiveRecipient_(ss,nim){const ex=ss.getSheetByName('Existing');if(!ex||ex.getLastRow()<2)return false;const rows=ex.getDataRange().getValues();for(let i=1;i<rows.length;i++){if(String(rows[i][2]||'').trim()===String(nim).trim()){const s=String(rows[i][10]||'').toUpperCase();return s.includes('AKTIF')||s.includes('ACTIVE');}}return false;}
function sheetObjectsScholar_(sh){if(!sh||sh.getLastRow()<2)return[];const rows=sh.getDataRange().getValues(),headers=rows.shift().map(String);return rows.filter(r=>r.some(v=>v!==''&&v!==null)).map(r=>{const o={};headers.forEach((h,i)=>o[h]=serializeScholarValue_(r[i]));return o;});}
function sendSimpleScholarStatusEmail_(sh,row,status){try{const email=String(sh.getRange(row,2).getValue()||''),name=String(sh.getRange(row,3).getValue()||'Peserta YAHN');if(!isScholarEmail_(email))return;let subject='Pembaruan Status Beasiswa YAHN',body='Halo '+name+',\n\nStatus aplikasi Beasiswa YAHN Anda telah diperbarui menjadi: '+status+'.\n\nSilakan masuk ke Portal Beasiswa YAHN untuk melihat detail terbaru.';GmailApp.sendEmail(email,subject,body,{name:'YAHN'});}catch(e){}}
function sendSimpleInterviewEmail_(sh,row,schedule){try{const email=String(sh.getRange(row,2).getValue()||''),name=String(sh.getRange(row,3).getValue()||'Peserta YAHN');if(!isScholarEmail_(email))return;GmailApp.sendEmail(email,'Jadwal Wawancara Beasiswa YAHN','Halo '+name+',\n\nJadwal wawancara Anda: '+schedule+'\n\nSilakan cek Portal Beasiswa YAHN dan konfirmasi kehadiran.',{name:'YAHN'});}catch(e){}}
function maskScholarEmail_(email){const parts=String(email||'').split('@');if(parts.length!==2)return'***';const l=parts[0];return(l.length<=2?l[0]+'*':l[0]+'*'.repeat(Math.max(3,l.length-2))+l[l.length-1])+'@'+parts[1];}
function normalizeScholarText_(v){return String(v||'').trim().toLowerCase().replace(/\s+/g,' ');}
function normalizeScholarPhone_(v){return String(v||'').replace(/\D/g,'');}
function isScholarEmail_(v){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v||''));}
function serializeScholarValue_(v){return v instanceof Date?v.toISOString():String(v===undefined||v===null?'':v);}
function getOrCreateFolder_(parent,name){const it=parent.getFoldersByName(name);return it.hasNext()?it.next():parent.createFolder(name);}
function validScholarshipSecret_(incoming){const expected=PropertiesService.getScriptProperties().getProperty('YAHN_SCHOLARSHIP_API_SECRET');return !!expected&&String(incoming||'')===expected;}
function cleanScholar_(v){return String(v===undefined||v===null?'':v).trim();}
function hashScholar_(v){const bytes=Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,String(v));return bytes.map(function(b){return('0'+((b<0?b+256:b).toString(16))).slice(-2);}).join('');}
function yahnScholarshipJson_(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);}
