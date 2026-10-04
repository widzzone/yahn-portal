/**
 * YAHN DONOR API - Standalone Google Apps Script Backend
 * Untuk frontend YAHN V2 yang di-host di Vercel.
 *
 * CARA PAKAI SINGKAT:
 * 1. Buat project BARU di https://script.google.com
 * 2. Paste seluruh file ini ke Code.gs
 * 3. Jalankan setupYahnDonorApi() satu kali dan berikan izin.
 * 4. Buka Execution log, salin API Secret dan Spreadsheet ID.
 * 5. Deploy > New deployment > Web app.
 * 6. Execute as: Me. Who has access: Anyone.
 * 7. Salin URL /exec ke APPS_SCRIPT_WEB_APP_URL di Vercel.
 * 8. Salin secret ke YAHN_API_SECRET di Vercel.
 */

const YAHN_DONOR_DB_NAME = 'YAHN Donor Database';

/**
 * Jalankan SATU KALI setelah membuat project Apps Script baru.
 * Fungsi ini membuat database spreadsheet serta secret API otomatis.
 */
function setupYahnDonorApi() {
  const props = PropertiesService.getScriptProperties();

  let spreadsheetId = props.getProperty('DONOR_SHEET_ID');
  if (!spreadsheetId) {
    const ss = SpreadsheetApp.create(YAHN_DONOR_DB_NAME);
    spreadsheetId = ss.getId();
    props.setProperty('DONOR_SHEET_ID', spreadsheetId);
    initializeDonorSheets_(ss);
  } else {
    initializeDonorSheets_(SpreadsheetApp.openById(spreadsheetId));
  }

  let secret = props.getProperty('YAHN_API_SECRET');
  if (!secret) {
    secret = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
    props.setProperty('YAHN_API_SECRET', secret);
  }

  const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/edit';
  console.log('=== YAHN DONOR API SETUP SELESAI ===');
  console.log('DONOR_SHEET_ID: ' + spreadsheetId);
  console.log('SPREADSHEET URL: ' + spreadsheetUrl);
  console.log('YAHN_API_SECRET: ' + secret);
  console.log('Simpan API secret ini. Jangan ditaruh di frontend/public source code.');

  return {
    status: 'success',
    spreadsheetId: spreadsheetId,
    spreadsheetUrl: spreadsheetUrl,
    secret: secret
  };
}

/** Health check sederhana. */
function doGet() {
  return yahnJson_({
    status: 'success',
    service: 'YAHN Donor API',
    version: '2.0',
    timestamp: new Date().toISOString()
  });
}

/** Endpoint utama yang dipanggil server Vercel. */
function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const req = JSON.parse(raw);

    if (!isValidYahnSecret_(req.secret)) {
      return yahnJson_({ status: 'error', message: 'Unauthorized' });
    }

    switch (String(req.action || '')) {
      case 'submitDonation':
        return yahnJson_(submitDonation_(req.payload || {}));

      case 'registerRecurringDonor':
        return yahnJson_(registerRecurringDonor_(req.payload || {}));

      case 'createSponsorship':
        return yahnJson_(createSponsorship_(req.payload || {}));

      default:
        return yahnJson_({ status: 'error', message: 'Unknown action' });
    }
  } catch (err) {
    return yahnJson_({
      status: 'error',
      message: String(err && err.message ? err.message : err)
    });
  }
}

function submitDonation_(d) {
  const name = clean_(d.name);
  const email = clean_(d.email).toLowerCase();
  const whatsapp = clean_(d.whatsapp);
  const method = clean_(d.method || 'QRIS').toUpperCase();
  const amount = Number(d.amount || 0);
  const anonymous = d.anonymous === true;

  if (!name || !isValidEmail_(email) || !Number.isFinite(amount) || amount < 10000) {
    return {
      status: 'error',
      message: 'Nama, email valid, dan nominal minimal Rp10.000 wajib diisi.'
    };
  }

  const ss = getDonorSpreadsheet_();
  const donors = ss.getSheetByName('Donors');
  const donations = ss.getSheetByName('Donations');

  const donorId = upsertDonor_(donors, {
    name: name,
    email: email,
    whatsapp: whatsapp,
    donorType: 'DONASI SEKALI'
  });

  const donationId = createId_('DON');
  donations.appendRow([
    donationId,
    new Date(),
    donorId,
    name,
    email,
    whatsapp,
    amount,
    method,
    anonymous ? 'YA' : 'TIDAK',
    'MENUNGGU VERIFIKASI',
    'VERCEL',
    ''
  ]);

  return {
    status: 'success',
    donationId: donationId,
    donorId: donorId,
    message: 'Konfirmasi donasi berhasil dicatat dan menunggu verifikasi YAHN.'
  };
}

function registerRecurringDonor_(d) {
  const name = clean_(d.name);
  const email = clean_(d.email).toLowerCase();
  const whatsapp = clean_(d.whatsapp);
  const amount = Number(d.amount || 0);
  const reminderDay = Math.max(1, Math.min(28, Number(d.reminderDay || 1)));

  if (!name || !isValidEmail_(email) || amount < 10000) {
    return { status: 'error', message: 'Data donatur bulanan belum lengkap.' };
  }

  const ss = getDonorSpreadsheet_();
  const donors = ss.getSheetByName('Donors');
  const recurring = ss.getSheetByName('Recurring_Donors');

  const donorId = upsertDonor_(donors, {
    name: name,
    email: email,
    whatsapp: whatsapp,
    donorType: 'DONATUR BULANAN'
  });

  const recurringId = createId_('REC');
  recurring.appendRow([
    recurringId,
    new Date(),
    donorId,
    name,
    email,
    whatsapp,
    amount,
    reminderDay,
    'AKTIF',
    '',
    ''
  ]);

  return {
    status: 'success',
    donorId: donorId,
    recurringId: recurringId,
    message: 'Komitmen donasi bulanan berhasil disimpan.'
  };
}

function createSponsorship_(d) {
  const donorName = clean_(d.donorName);
  const donorEmail = clean_(d.donorEmail).toLowerCase();
  const recipientId = clean_(d.recipientId);
  const supportType = clean_(d.supportType || 'LIVING COST').toUpperCase();
  const amount = Number(d.amount || 0);

  if (!donorName || !isValidEmail_(donorEmail) || !recipientId || amount < 10000) {
    return { status: 'error', message: 'Data program Kakak Asuh belum lengkap.' };
  }

  const ss = getDonorSpreadsheet_();
  const donors = ss.getSheetByName('Donors');
  const sponsorships = ss.getSheetByName('Sponsorships');

  const donorId = upsertDonor_(donors, {
    name: donorName,
    email: donorEmail,
    whatsapp: clean_(d.whatsapp),
    donorType: 'KAKAK ASUH'
  });

  const sponsorshipId = createId_('SPN');
  sponsorships.appendRow([
    sponsorshipId,
    new Date(),
    donorId,
    donorName,
    donorEmail,
    recipientId,
    supportType,
    amount,
    clean_(d.period || '6 BULAN'),
    'PENDING',
    ''
  ]);

  return {
    status: 'success',
    sponsorshipId: sponsorshipId,
    donorId: donorId,
    message: 'Pengajuan Kakak Asuh berhasil dicatat dan menunggu konfirmasi YAHN.'
  };
}

function initializeDonorSheets_(ss) {
  createSheetIfMissing_(ss, 'Donors', [
    'Donor ID','Created At','Nama','Email','WhatsApp','Tipe Donatur','Status','Last Activity'
  ]);

  createSheetIfMissing_(ss, 'Donations', [
    'Donation ID','Timestamp','Donor ID','Nama','Email','WhatsApp','Nominal','Metode','Anonim','Status','Sumber','Catatan Admin'
  ]);

  createSheetIfMissing_(ss, 'Recurring_Donors', [
    'Recurring ID','Created At','Donor ID','Nama','Email','WhatsApp','Nominal Bulanan','Tanggal Reminder','Status','Last Reminder','Last Payment'
  ]);

  createSheetIfMissing_(ss, 'Sponsorships', [
    'Sponsorship ID','Created At','Donor ID','Nama Donatur','Email','Recipient ID','Jenis Dukungan','Nominal','Periode','Status','Catatan Admin'
  ]);

  createSheetIfMissing_(ss, 'Recipient_Public', [
    'Recipient ID','Nama Publik','Program Studi','Semester','IPK','Jenis Kebutuhan','Target Dana','Dana Terkumpul','Cerita Singkat','Foto URL','Status Publikasi'
  ]);

  createSheetIfMissing_(ss, 'CRM_Log', [
    'CRM ID','Timestamp','Donor ID','Channel','Jenis Pesan','Status','Keterangan'
  ]);
}

function createSheetIfMissing_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.autoResizeColumns(1, headers.length);
  }
  return sheet;
}

function getDonorSpreadsheet_() {
  const id = PropertiesService.getScriptProperties().getProperty('DONOR_SHEET_ID');
  if (!id) {
    throw new Error('DONOR_SHEET_ID belum tersedia. Jalankan setupYahnDonorApi() terlebih dahulu.');
  }
  return SpreadsheetApp.openById(id);
}

function upsertDonor_(sheet, d) {
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][3] || '').trim().toLowerCase() === d.email) {
      sheet.getRange(i + 1, 3).setValue(d.name);
      sheet.getRange(i + 1, 5).setValue(d.whatsapp || values[i][4]);
      sheet.getRange(i + 1, 6).setValue(d.donorType);
      sheet.getRange(i + 1, 8).setValue(new Date());
      return String(values[i][0]);
    }
  }

  const donorId = createId_('DNR');
  sheet.appendRow([
    donorId,
    new Date(),
    d.name,
    d.email,
    d.whatsapp,
    d.donorType,
    'AKTIF',
    new Date()
  ]);
  return donorId;
}

function isValidYahnSecret_(incoming) {
  const expected = PropertiesService.getScriptProperties().getProperty('YAHN_API_SECRET');
  return !!expected && String(incoming || '') === String(expected);
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ''));
}

function clean_(value) {
  return String(value == null ? '' : value).trim();
}

function createId_(prefix) {
  const now = new Date();
  const stamp = Utilities.formatDate(now, Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyyMMddHHmmss');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return prefix + '-' + stamp + '-' + rand;
}

function yahnJson_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
