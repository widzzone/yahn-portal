/**
 * YAHN DONOR API v2.2 - Standalone Google Apps Script backend.
 * Backend untuk portal donor Vercel: transaksi, OTP login, dashboard live,
 * profil penerima publik, CRM, sponsorship, dan impact update.
 */
const YAHN_DONOR_DB_NAME = 'YAHN Donor Database';

function setupYahnDonorApi() {
  const props = PropertiesService.getScriptProperties();
  let spreadsheetId = props.getProperty('DONOR_SHEET_ID');
  let ss;
  if (!spreadsheetId) {
    ss = SpreadsheetApp.create(YAHN_DONOR_DB_NAME);
    spreadsheetId = ss.getId();
    props.setProperty('DONOR_SHEET_ID', spreadsheetId);
  } else {
    ss = SpreadsheetApp.openById(spreadsheetId);
  }
  initializeDonorSheets_(ss);

  let secret = props.getProperty('YAHN_API_SECRET');
  if (!secret) {
    secret = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
    props.setProperty('YAHN_API_SECRET', secret);
  }

  const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/edit';
  console.log('=== YAHN DONOR API v2.2 READY ===');
  console.log('DONOR_SHEET_ID: ' + spreadsheetId);
  console.log('SPREADSHEET URL: ' + spreadsheetUrl);
  console.log('YAHN_API_SECRET: ' + secret);
  return { status:'success', spreadsheetId:spreadsheetId, spreadsheetUrl:spreadsheetUrl, secret:secret };
}

function doGet() {
  return yahnJson_({ status:'success', service:'YAHN Donor API', version:'2.2', timestamp:new Date().toISOString() });
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const req = JSON.parse(raw);
    if (!isValidYahnSecret_(req.secret)) return yahnJson_({status:'error',message:'Unauthorized'});
    const p = req.payload || {};
    switch (String(req.action || '')) {
      case 'submitDonation': return yahnJson_(submitDonation_(p));
      case 'registerRecurringDonor': return yahnJson_(registerRecurringDonor_(p));
      case 'createSponsorship': return yahnJson_(createSponsorship_(p));
      case 'requestDonorOtp': return yahnJson_(requestDonorOtp_(p));
      case 'verifyDonorOtp': return yahnJson_(verifyDonorOtp_(p));
      case 'getDonorDashboard': return yahnJson_(getDonorDashboard_(p));
      case 'getPublicRecipients': return yahnJson_(getPublicRecipients_());
      case 'getPublicRecipient': return yahnJson_(getPublicRecipient_(p));
      case 'getDonorAdminData': return yahnJson_(getDonorAdminData_());
      case 'adminUpdateDonationStatus': return yahnJson_(adminUpdateDonationStatus_(p));
      case 'adminUpdateSponsorshipStatus': return yahnJson_(adminUpdateSponsorshipStatus_(p));
      case 'adminUpsertRecipient': return yahnJson_(adminUpsertRecipient_(p));
      case 'adminUpsertImpact': return yahnJson_(adminUpsertImpact_(p));
      case 'adminSendRecurringReminder': return yahnJson_(adminSendRecurringReminder_(p));
      default: return yahnJson_({status:'error',message:'Unknown action'});
    }
  } catch (err) {
    return yahnJson_({status:'error',message:String(err && err.message ? err.message : err)});
  }
}

function submitDonation_(d) {
  const name=clean_(d.name), email=clean_(d.email).toLowerCase(), whatsapp=clean_(d.whatsapp);
  const method=clean_(d.method||'QRIS').toUpperCase(), amount=Number(d.amount||0), anonymous=d.anonymous===true;
  if (!name || !isValidEmail_(email) || !Number.isFinite(amount) || amount<10000) return {status:'error',message:'Nama, email valid, dan nominal minimal Rp10.000 wajib diisi.'};
  const ss=getDonorSpreadsheet_(), donors=ss.getSheetByName('Donors'), donations=ss.getSheetByName('Donations');
  const donorId=upsertDonor_(donors,{name,email,whatsapp,donorType:'DONASI SEKALI'});
  const donationId=createId_('DON');
  donations.appendRow([donationId,new Date(),donorId,name,email,whatsapp,amount,method,anonymous?'YA':'TIDAK','MENUNGGU VERIFIKASI','VERCEL','']);
  return {status:'success',donationId,donorId,message:'Konfirmasi donasi berhasil dicatat dan menunggu verifikasi YAHN.'};
}

function registerRecurringDonor_(d) {
  const name=clean_(d.name),email=clean_(d.email).toLowerCase(),whatsapp=clean_(d.whatsapp),amount=Number(d.amount||0),reminderDay=Math.max(1,Math.min(28,Number(d.reminderDay||1)));
  if(!name||!isValidEmail_(email)||amount<10000)return{status:'error',message:'Data donatur bulanan belum lengkap.'};
  const ss=getDonorSpreadsheet_(), donorId=upsertDonor_(ss.getSheetByName('Donors'),{name,email,whatsapp,donorType:'DONATUR BULANAN'}), recurring=ss.getSheetByName('Recurring_Donors');
  const existing=findRowByValue_(recurring,5,email);
  if(existing>1){recurring.getRange(existing,7,1,4).setValues([[amount,reminderDay,'AKTIF','']]);return{status:'success',donorId,recurringId:String(recurring.getRange(existing,1).getValue()),message:'Komitmen bulanan berhasil diperbarui.'};}
  const recurringId=createId_('REC'); recurring.appendRow([recurringId,new Date(),donorId,name,email,whatsapp,amount,reminderDay,'AKTIF','','']);
  return{status:'success',donorId,recurringId,message:'Komitmen donasi bulanan berhasil disimpan.'};
}

function createSponsorship_(d) {
  const donorName=clean_(d.donorName), donorEmail=clean_(d.donorEmail).toLowerCase(), recipientId=clean_(d.recipientId), supportType=clean_(d.supportType||'LIVING COST').toUpperCase(), amount=Number(d.amount||0);
  if(!donorName||!isValidEmail_(donorEmail)||!recipientId||amount<10000)return{status:'error',message:'Data program Kakak Asuh belum lengkap.'};
  const ss=getDonorSpreadsheet_(), donorId=upsertDonor_(ss.getSheetByName('Donors'),{name:donorName,email:donorEmail,whatsapp:clean_(d.whatsapp),donorType:'KAKAK ASUH'}), sponsorships=ss.getSheetByName('Sponsorships');
  const sponsorshipId=createId_('SPN'); sponsorships.appendRow([sponsorshipId,new Date(),donorId,donorName,donorEmail,recipientId,supportType,amount,clean_(d.period||'6 BULAN'),'PENDING','']);
  return{status:'success',sponsorshipId,donorId,message:'Pengajuan Kakak Asuh berhasil dicatat dan menunggu konfirmasi YAHN.'};
}

function requestDonorOtp_(d){
  const email=clean_(d.email).toLowerCase(); if(!isValidEmail_(email))return{status:'error',message:'Email tidak valid.'};
  const sheet=getDonorSpreadsheet_().getSheetByName('Donors'), row=findRowByValue_(sheet,4,email);
  if(row<2)return{status:'error',message:'Email belum tercatat sebagai donatur YAHN. Silakan lakukan donasi terlebih dahulu atau hubungi admin.'};
  const code=String(Math.floor(100000+Math.random()*900000));
  CacheService.getScriptCache().put('DONOR_OTP_'+hash_(email),hash_(code),600);
  GmailApp.sendEmail(email,'Kode Akses Portal Donatur YAHN','Kode akses Anda: '+code+'\n\nKode berlaku 10 menit. Jangan berikan kode ini kepada siapa pun.',{
    name:'YAHN Donor Circle',htmlBody:'<div style="font-family:Arial,sans-serif;padding:28px;background:#f4f8f7"><div style="max-width:520px;margin:auto;background:#fff;border-radius:18px;padding:28px"><p style="color:#0f766e;font-weight:800;letter-spacing:2px;font-size:12px">YAHN DONOR CIRCLE</p><h2 style="margin:8px 0">Kode akses portal Anda</h2><p>Gunakan kode berikut untuk masuk ke dashboard donatur.</p><div style="font-size:34px;font-weight:900;letter-spacing:8px;background:#eaf8f5;color:#0f766e;padding:18px;text-align:center;border-radius:14px">'+code+'</div><p style="color:#64748b;font-size:12px;margin-top:18px">Kode berlaku 10 menit. Abaikan email ini bila Anda tidak meminta kode akses.</p></div></div>'
  });
  return{status:'success',message:'Kode akses telah dikirim.'};
}

function verifyDonorOtp_(d){
  const email=clean_(d.email).toLowerCase(),code=clean_(d.code); if(!email||!code)return{status:'error',message:'Email dan kode wajib diisi.'};
  const cache=CacheService.getScriptCache(),key='DONOR_OTP_'+hash_(email),saved=cache.get(key);
  if(!saved||saved!==hash_(code))return{status:'error',message:'Kode akses salah atau sudah kedaluwarsa.'};
  const sheet=getDonorSpreadsheet_().getSheetByName('Donors'),row=findRowByValue_(sheet,4,email); if(row<2)return{status:'error',message:'Donatur tidak ditemukan.'};
  cache.remove(key); const r=sheet.getRange(row,1,1,8).getValues()[0]; sheet.getRange(row,8).setValue(new Date());
  return{status:'success',donor:{donorId:String(r[0]),name:String(r[2]),email:String(r[3]),type:String(r[5]),status:String(r[6])}};
}

function getDonorDashboard_(d){
  const email=clean_(d.email).toLowerCase(); if(!isValidEmail_(email))return{status:'error',message:'Email donor tidak valid.'};
  const ss=getDonorSpreadsheet_(), donorSheet=ss.getSheetByName('Donors'), donorRow=findRowByValue_(donorSheet,4,email); if(donorRow<2)return{status:'error',message:'Donatur tidak ditemukan.'};
  const dr=donorSheet.getRange(donorRow,1,1,8).getValues()[0], donorId=String(dr[0]);
  const donations=sheetObjects_(ss.getSheetByName('Donations')).filter(x=>String(x['Donor ID'])===donorId).sort((a,b)=>new Date(b.Timestamp).getTime()-new Date(a.Timestamp).getTime());
  const verified=donations.filter(x=>isVerified_(x.Status)), pending=donations.filter(x=>!isVerified_(x.Status));
  const totalContribution=verified.reduce((s,x)=>s+Number(x.Nominal||0),0), pendingContribution=pending.reduce((s,x)=>s+Number(x.Nominal||0),0);
  const months=[...new Set(verified.map(x=>monthKey_(x.Timestamp)).filter(Boolean))];
  const recurringRows=sheetObjects_(ss.getSheetByName('Recurring_Donors')).filter(x=>String(x['Donor ID'])===donorId && String(x.Status).toUpperCase()==='AKTIF');
  const rr=recurringRows.length?recurringRows[recurringRows.length-1]:null;
  const sponsorshipRows=sheetObjects_(ss.getSheetByName('Sponsorships')).filter(x=>String(x['Donor ID'])===donorId && ['AKTIF','ACTIVE','TERVERIFIKASI'].indexOf(String(x.Status).toUpperCase())>=0);
  const recipients=sheetObjects_(ss.getSheetByName('Recipient_Public')), recipientMap={}; recipients.forEach(x=>recipientMap[String(x['Recipient ID'])]=x);
  const sponsorships=sponsorshipRows.map(x=>{const r=recipientMap[String(x['Recipient ID'])]||{};return{id:String(x['Sponsorship ID']),recipientId:String(x['Recipient ID']),recipientName:String(r['Nama Publik']||x['Recipient ID']),program:String(r['Program Studi']||''),semester:String(r.Semester||''),supportType:String(x['Jenis Dukungan']||''),amount:Number(x.Nominal||0),period:String(x.Periode||''),status:String(x.Status||'')};});
  const sponsoredIds=[...new Set(sponsorships.map(x=>x.recipientId))];
  const impacts=sheetObjects_(ss.getSheetByName('Impact_Update')).filter(x=>String(x.Status).toUpperCase()==='PUBLISHED' && (!x['Recipient ID']||sponsoredIds.indexOf(String(x['Recipient ID']))>=0)).sort((a,b)=>new Date(b.Tanggal).getTime()-new Date(a.Tanggal).getTime()).slice(0,6).map(x=>({title:String(x.Judul||'Update YAHN'),body:String(x.Isi||''),date:dateIso_(x.Tanggal),recipientName:String((recipientMap[String(x['Recipient ID'])]||{})['Nama Publik']||'')}));
  return{status:'success',dashboard:{donor:{donorId,name:String(dr[2]),email:String(dr[3]),type:String(dr[5]),status:String(dr[6])},summary:{totalContribution,pendingContribution,monthsSupporting:months.length,studentsHelped:sponsoredIds.length,streak:calculateStreak_(months)},recurring:rr?{amount:Number(rr['Nominal Bulanan']||0),reminderDay:Number(rr['Tanggal Reminder']||1),status:String(rr.Status||''),lastPayment:rr['Last Payment']?dateIso_(rr['Last Payment']):''}:null,sponsorships,donations:donations.slice(0,12).map(x=>({id:String(x['Donation ID']),date:dateIso_(x.Timestamp),amount:Number(x.Nominal||0),method:String(x.Metode||''),status:String(x.Status||'')})),impactUpdates:impacts}};
}

function getPublicRecipients_(){
  const rows=sheetObjects_(getDonorSpreadsheet_().getSheetByName('Recipient_Public')).filter(x=>String(x['Status Publikasi']).toUpperCase()==='PUBLISHED');
  return{status:'success',recipients:rows.map(publicRecipient_)};
}
function getPublicRecipient_(d){const id=clean_(d.recipientId),rows=sheetObjects_(getDonorSpreadsheet_().getSheetByName('Recipient_Public')),r=rows.find(x=>String(x['Recipient ID'])===id&&String(x['Status Publikasi']).toUpperCase()==='PUBLISHED');return r?{status:'success',recipient:publicRecipient_(r)}:{status:'error',message:'Profil penerima tidak ditemukan atau belum dipublikasikan.'};}
function publicRecipient_(r){return{recipientId:String(r['Recipient ID']),name:String(r['Nama Publik']),program:String(r['Program Studi']),semester:String(r.Semester),gpa:String(r.IPK),need:String(r['Jenis Kebutuhan']),target:Number(r['Target Dana']||0),funded:Number(r['Dana Terkumpul']||0),story:String(r['Cerita Singkat']||''),photoUrl:String(r['Foto URL']||'')};}

function initializeDonorSheets_(ss){
  createSheetIfMissing_(ss,'Donors',['Donor ID','Created At','Nama','Email','WhatsApp','Tipe Donatur','Status','Last Activity']);
  createSheetIfMissing_(ss,'Donations',['Donation ID','Timestamp','Donor ID','Nama','Email','WhatsApp','Nominal','Metode','Anonim','Status','Sumber','Catatan Admin']);
  createSheetIfMissing_(ss,'Recurring_Donors',['Recurring ID','Created At','Donor ID','Nama','Email','WhatsApp','Nominal Bulanan','Tanggal Reminder','Status','Last Reminder','Last Payment']);
  createSheetIfMissing_(ss,'Sponsorships',['Sponsorship ID','Created At','Donor ID','Nama Donatur','Email','Recipient ID','Jenis Dukungan','Nominal','Periode','Status','Catatan Admin']);
  createSheetIfMissing_(ss,'Recipient_Public',['Recipient ID','Nama Publik','Program Studi','Semester','IPK','Jenis Kebutuhan','Target Dana','Dana Terkumpul','Cerita Singkat','Foto URL','Status Publikasi']);
  createSheetIfMissing_(ss,'CRM_Log',['CRM ID','Timestamp','Donor ID','Channel','Jenis Pesan','Status','Keterangan']);
  createSheetIfMissing_(ss,'Impact_Update',['Impact ID','Tanggal','Recipient ID','Judul','Isi','Status']);
}
function createSheetIfMissing_(ss,name,headers){let sh=ss.getSheetByName(name);if(!sh){sh=ss.insertSheet(name);sh.getRange(1,1,1,headers.length).setValues([headers]);sh.setFrozenRows(1);sh.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#0f766e').setFontColor('#ffffff');sh.autoResizeColumns(1,headers.length);}return sh;}
function getDonorSpreadsheet_(){const id=PropertiesService.getScriptProperties().getProperty('DONOR_SHEET_ID');if(!id)throw new Error('DONOR_SHEET_ID belum tersedia. Jalankan setupYahnDonorApi() terlebih dahulu.');return SpreadsheetApp.openById(id);}
function upsertDonor_(sheet,d){const values=sheet.getDataRange().getValues();for(let i=1;i<values.length;i++){if(String(values[i][3]||'').trim().toLowerCase()===d.email){sheet.getRange(i+1,3).setValue(d.name);sheet.getRange(i+1,5).setValue(d.whatsapp||values[i][4]);const existingType=String(values[i][5]||'');if(existingType.indexOf(d.donorType)<0)sheet.getRange(i+1,6).setValue(existingType?existingType+' + '+d.donorType:d.donorType);sheet.getRange(i+1,8).setValue(new Date());return String(values[i][0]);}}const donorId=createId_('DNR');sheet.appendRow([donorId,new Date(),d.name,d.email,d.whatsapp,d.donorType,'AKTIF',new Date()]);return donorId;}
function findRowByValue_(sheet,column,value){const last=sheet.getLastRow();if(last<2)return-1;const vals=sheet.getRange(2,column,last-1,1).getValues();const needle=String(value).trim().toLowerCase();for(let i=0;i<vals.length;i++)if(String(vals[i][0]||'').trim().toLowerCase()===needle)return i+2;return-1;}
function sheetObjects_(sheet){if(!sheet||sheet.getLastRow()<2)return[];const values=sheet.getDataRange().getValues(),headers=values.shift().map(String);return values.filter(r=>r.some(v=>v!==''&&v!=null)).map(r=>{const o={};headers.forEach((h,i)=>o[h]=r[i]);return o;});}
function isVerified_(status){const s=String(status||'').toUpperCase();return ['TERVERIFIKASI','VERIFIED','BERHASIL','LUNAS','SELESAI'].indexOf(s)>=0;}
function monthKey_(d){const dt=new Date(d);return isNaN(dt.getTime())?'':dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0');}
function calculateStreak_(keys){if(!keys.length)return 0;const set={};keys.forEach(k=>set[k]=true);let cursor=new Date(),streak=0;for(let i=0;i<120;i++){const key=cursor.getFullYear()+'-'+String(cursor.getMonth()+1).padStart(2,'0');if(set[key]){streak++;cursor=new Date(cursor.getFullYear(),cursor.getMonth()-1,1);}else if(i===0){cursor=new Date(cursor.getFullYear(),cursor.getMonth()-1,1);}else break;}return streak;}
function dateIso_(v){const d=new Date(v);return isNaN(d.getTime())?'':d.toISOString();}
function hash_(v){return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,String(v)));}
function isValidYahnSecret_(incoming){const expected=PropertiesService.getScriptProperties().getProperty('YAHN_API_SECRET');return!!expected&&String(incoming||'')===String(expected);}
function isValidEmail_(email){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email||''));}
function clean_(v){return String(v==null?'':v).trim();}
function createId_(prefix){const stamp=Utilities.formatDate(new Date(),Session.getScriptTimeZone()||'Asia/Jakarta','yyyyMMddHHmmss');return prefix+'-'+stamp+'-'+Math.floor(1000+Math.random()*9000);}
function yahnJson_(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);}


// ===================== ADMIN CENTER v2.2 =====================
function getDonorAdminData_(){
  const ss=getDonorSpreadsheet_();
  const donors=sheetObjects_(ss.getSheetByName('Donors'));
  const donations=sheetObjects_(ss.getSheetByName('Donations'));
  const recurring=sheetObjects_(ss.getSheetByName('Recurring_Donors'));
  const sponsorships=sheetObjects_(ss.getSheetByName('Sponsorships'));
  const recipients=sheetObjects_(ss.getSheetByName('Recipient_Public'));
  const impacts=sheetObjects_(ss.getSheetByName('Impact_Update'));
  const verified=donations.filter(function(x){return isVerified_(x.Status);});
  const pending=donations.filter(function(x){return String(x.Status||'').toUpperCase()==='MENUNGGU VERIFIKASI';});
  const totalVerified=verified.reduce(function(s,x){return s+Number(x.Nominal||0);},0);
  const totalPending=pending.reduce(function(s,x){return s+Number(x.Nominal||0);},0);
  return{status:'success',admin:{
    summary:{donors:donors.length,activeDonors:donors.filter(function(x){return String(x.Status||'').toUpperCase()==='AKTIF';}).length,totalVerified:totalVerified,totalPending:totalPending,pendingDonations:pending.length,recurringActive:recurring.filter(function(x){return String(x.Status||'').toUpperCase()==='AKTIF';}).length,sponsorshipActive:sponsorships.filter(function(x){return ['AKTIF','ACTIVE','TERVERIFIKASI'].indexOf(String(x.Status||'').toUpperCase())>=0;}).length,publishedRecipients:recipients.filter(function(x){return String(x['Status Publikasi']||'').toUpperCase()==='PUBLISHED';}).length},
    donors:donors,donations:donations,recurring:recurring,sponsorships:sponsorships,recipients:recipients,impacts:impacts
  }};
}

function adminUpdateDonationStatus_(d){
  const id=clean_(d.donationId),status=clean_(d.status).toUpperCase(),note=clean_(d.note);
  if(!id||['MENUNGGU VERIFIKASI','TERVERIFIKASI','DITOLAK'].indexOf(status)<0)return{status:'error',message:'Status donasi tidak valid.'};
  const ss=getDonorSpreadsheet_(),sh=ss.getSheetByName('Donations'),row=findRowByValue_(sh,1,id);
  if(row<2)return{status:'error',message:'Donation ID tidak ditemukan.'};
  sh.getRange(row,10).setValue(status);sh.getRange(row,12).setValue(note);
  if(status==='TERVERIFIKASI'){
    const donorId=String(sh.getRange(row,3).getValue()||''),rec=ss.getSheetByName('Recurring_Donors');
    if(rec&&rec.getLastRow()>1){const vals=rec.getRange(2,1,rec.getLastRow()-1,11).getValues();for(let i=0;i<vals.length;i++){if(String(vals[i][2]||'')===donorId&&String(vals[i][8]||'').toUpperCase()==='AKTIF')rec.getRange(i+2,11).setValue(new Date());}}
  }
  return{status:'success',message:'Status donasi berhasil diperbarui.'};
}

function adminUpdateSponsorshipStatus_(d){
  const id=clean_(d.sponsorshipId),status=clean_(d.status).toUpperCase(),note=clean_(d.note);
  if(!id||['PENDING','AKTIF','DITOLAK','SELESAI'].indexOf(status)<0)return{status:'error',message:'Status sponsorship tidak valid.'};
  const sh=getDonorSpreadsheet_().getSheetByName('Sponsorships'),row=findRowByValue_(sh,1,id);if(row<2)return{status:'error',message:'Sponsorship tidak ditemukan.'};
  sh.getRange(row,10).setValue(status);sh.getRange(row,11).setValue(note);return{status:'success',message:'Status Kakak Asuh diperbarui.'};
}

function adminUpsertRecipient_(d){
  const id=clean_(d.recipientId),name=clean_(d.name),program=clean_(d.program),semester=clean_(d.semester),gpa=clean_(d.gpa),need=clean_(d.need),target=Number(d.target||0),funded=Number(d.funded||0),story=clean_(d.story),photoUrl=clean_(d.photoUrl),status=clean_(d.status||'DRAFT').toUpperCase();
  if(!id||!name)return{status:'error',message:'Recipient ID dan nama publik wajib diisi.'};
  if(['DRAFT','PUBLISHED','ARCHIVED'].indexOf(status)<0)return{status:'error',message:'Status publikasi tidak valid.'};
  const sh=getDonorSpreadsheet_().getSheetByName('Recipient_Public'),row=findRowByValue_(sh,1,id),values=[[id,name,program,semester,gpa,need,target,funded,story,photoUrl,status]];
  if(row>1)sh.getRange(row,1,1,11).setValues(values);else sh.appendRow(values[0]);
  return{status:'success',message:status==='PUBLISHED'?'Profil penerima dipublikasikan ke Kakak Asuh.':'Profil penerima berhasil disimpan.'};
}

function adminUpsertImpact_(d){
  const id=clean_(d.impactId)||createId_('IMP'),recipientId=clean_(d.recipientId),title=clean_(d.title),body=clean_(d.body),status=clean_(d.status||'DRAFT').toUpperCase();
  if(!title||!body)return{status:'error',message:'Judul dan isi impact update wajib diisi.'};
  if(['DRAFT','PUBLISHED','ARCHIVED'].indexOf(status)<0)return{status:'error',message:'Status impact tidak valid.'};
  const sh=getDonorSpreadsheet_().getSheetByName('Impact_Update'),row=findRowByValue_(sh,1,id),values=[[id,new Date(),recipientId,title,body,status]];
  if(row>1)sh.getRange(row,1,1,6).setValues(values);else sh.appendRow(values[0]);
  return{status:'success',impactId:id,message:'Impact update berhasil disimpan.'};
}

function adminSendRecurringReminder_(d){
  const id=clean_(d.recurringId),sh=getDonorSpreadsheet_().getSheetByName('Recurring_Donors'),row=findRowByValue_(sh,1,id);
  if(row<2)return{status:'error',message:'Komitmen bulanan tidak ditemukan.'};
  const r=sh.getRange(row,1,1,11).getValues()[0],donorId=String(r[2]||''),name=String(r[3]||'Sahabat YAHN'),email=String(r[4]||''),amount=Number(r[6]||0),day=Number(r[7]||1);
  if(!isValidEmail_(email))return{status:'error',message:'Email donor tidak valid.'};
  const rp=new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(amount);
  GmailApp.sendEmail(email,'Pengingat Dukungan Bulanan YAHN','Halo '+name+', pengingat dukungan bulanan YAHN Anda sebesar '+rp+'. Terima kasih telah membersamai pendidikan penerima YAHN.',{name:'YAHN Donor Circle',htmlBody:'<div style="font-family:Arial,sans-serif;background:#f4f8f7;padding:30px"><div style="max-width:560px;margin:auto;background:#fff;padding:30px;border-radius:20px"><p style="font-size:11px;letter-spacing:2px;font-weight:800;color:#0f766e">YAHN DONOR CIRCLE</p><h2>Halo, '+name+' 👋</h2><p>Ini adalah pengingat dukungan rutin YAHN Anda untuk periode berjalan.</p><div style="background:#eaf8f5;padding:18px;border-radius:14px"><b>'+rp+' / bulan</b><br><span style="font-size:12px;color:#567">Reminder setiap tanggal '+day+'</span></div><p style="font-size:13px;color:#567;line-height:1.6">Terima kasih karena terus membersamai perjalanan pendidikan generasi penerima Beasiswa YAHN.</p></div></div>'});
  sh.getRange(row,10).setValue(new Date());
  const log=getDonorSpreadsheet_().getSheetByName('CRM_Log');log.appendRow([createId_('CRM'),new Date(),donorId,'EMAIL','REMINDER BULANAN','TERKIRIM','Reminder manual dari Admin Center']);
  return{status:'success',message:'Reminder berhasil dikirim ke '+email+'.'};
}
