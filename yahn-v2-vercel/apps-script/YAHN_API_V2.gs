/**
 * YAHN V2 - API adapter untuk frontend Vercel.
 * Tambahkan file ini ke project Apps Script existing.
 * Jangan mengubah fungsi beasiswa lama pada tahap V2.0.
 *
 * Buat Script Property:
 * YAHN_API_SECRET = secret yang sama dengan environment variable Vercel.
 */

function doPost(e) {
  try {
    var req = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!isValidYahnSecret_(req.secret)) return yahnJson_({ status: 'error', message: 'Unauthorized' });

    switch (req.action) {
      case 'submitDonation': return yahnJson_(submitDonationV2_(req.payload || {}));
      default: return yahnJson_({ status: 'error', message: 'Unknown action' });
    }
  } catch (err) {
    return yahnJson_({ status: 'error', message: String(err && err.message ? err.message : err) });
  }
}

function isValidYahnSecret_(incoming) {
  var expected = PropertiesService.getScriptProperties().getProperty('YAHN_API_SECRET');
  return !!expected && String(incoming || '') === String(expected);
}

function submitDonationV2_(d) {
  if (!d.name || !d.email || Number(d.amount || 0) < 10000) {
    return { status: 'error', message: 'Data donasi belum lengkap.' };
  }

  var ss = SpreadsheetApp.openById(SHEET_ID); // memakai SHEET_ID existing di Code.js
  var sheet = ss.getSheetByName('Donations');
  if (!sheet) {
    sheet = ss.insertSheet('Donations');
    sheet.appendRow(['Donation ID','Timestamp','Nama','Email','WhatsApp','Nominal','Metode','Anonim','Status','Sumber']);
    sheet.setFrozenRows(1);
  }

  var donationId = 'YAHN-' + Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyyMMdd-HHmmss') + '-' + Math.floor(Math.random()*900+100);
  sheet.appendRow([
    donationId,
    new Date(),
    String(d.name).trim(),
    String(d.email).trim().toLowerCase(),
    String(d.whatsapp || '').trim(),
    Number(d.amount),
    String(d.method || 'QRIS'),
    d.anonymous === true ? 'YA' : 'TIDAK',
    'MENUNGGU VERIFIKASI',
    'VERCEL V2'
  ]);

  return { status: 'success', donationId: donationId, message: 'Konfirmasi donasi berhasil dicatat.' };
}

function yahnJson_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
