# Deploy YAHN V2 tanpa npm / Node.js lokal

Panduan ini menggunakan dua layanan cloud:

1. Google Apps Script baru sebagai backend API donor.
2. Vercel Drop sebagai frontend Next.js.

Tidak perlu Terminal, npm, Node.js, Git CLI, atau build lokal.

## A. Buat Apps Script baru

1. Buka https://script.google.com
2. Klik **New project / Project Baru**.
3. Beri nama: `YAHN Donor API`.
4. Hapus isi `Code.gs`.
5. Copy seluruh isi file `apps-script/YAHN_DONOR_API_STANDALONE.gs` ke `Code.gs`.
6. Klik Save.
7. Pilih function `setupYahnDonorApi` dari dropdown function.
8. Klik **Run** dan berikan izin Google yang diminta.
9. Buka **Execution log**.
10. Simpan nilai:
   - `YAHN_API_SECRET`
   - `DONOR_SHEET_ID`
   - URL Spreadsheet

Fungsi setup otomatis membuat spreadsheet `YAHN Donor Database` dengan sheet:

- Donors
- Donations
- Recurring_Donors
- Sponsorships
- Recipient_Public
- CRM_Log

## B. Deploy Apps Script sebagai Web App

1. Klik **Deploy > New deployment**.
2. Klik ikon gear / Select type lalu pilih **Web app**.
3. Description: `YAHN Donor API v2.0`.
4. Execute as: **Me**.
5. Who has access: **Anyone**.
6. Klik **Deploy**.
7. Salin URL yang berakhir `/exec`.

Tes URL tersebut di browser. Jika sukses akan muncul JSON kurang lebih:

```json
{"status":"success","service":"YAHN Donor API","version":"2.0"}
```

## C. Deploy frontend langsung ke Vercel Drop

1. Extract folder `yahn-v2-vercel` dari ZIP.
2. Buka https://vercel.com/drop
3. Login ke Vercel.
4. Drag folder `yahn-v2-vercel` ke halaman Vercel Drop.
5. Pilih nama project, contoh `yahn-portal`.
6. Klik Deploy.

Vercel yang akan menjalankan instalasi dependency dan build Next.js di cloud. Tidak perlu menjalankan `npm install` pada komputer.

## D. Tambahkan Environment Variables di Vercel

Setelah project tercipta:

**Project > Settings > Environment Variables**

Tambahkan:

```text
APPS_SCRIPT_WEB_APP_URL=https://script.google.com/macros/s/XXXXXXXX/exec
YAHN_API_SECRET=SECRET_DARI_EXECUTION_LOG
NEXT_PUBLIC_SCHOLARSHIP_PORTAL_URL=URL_PORTAL_BEASISWA_LAMA
NEXT_PUBLIC_DONATION_BANK=Nama Bank
NEXT_PUBLIC_DONATION_ACCOUNT=Nomor Rekening
NEXT_PUBLIC_DONATION_ACCOUNT_NAME=Yayasan Andi Hakim Nasoetion
NEXT_PUBLIC_QRIS_IMAGE_URL=URL_GAMBAR_QRIS
```

`YAHN_API_SECRET` jangan diberi prefix `NEXT_PUBLIC_`.

Setelah menambah environment variable, buka **Deployments** dan lakukan **Redeploy** agar variabel baru dipakai aplikasi.

## E. Tes pertama

1. Buka URL Vercel.
2. Masuk `Donasi > Donasi Sekarang`.
3. Isi form minimal Rp10.000.
4. Submit.
5. Buka spreadsheet `YAHN Donor Database`.
6. Cek sheet `Donations`.
7. Transaksi baru seharusnya muncul dengan status `MENUNGGU VERIFIKASI`.

## Arsitektur

```text
Browser Donatur
      |
      v
Vercel / Next.js
      |
      | server-to-server + API secret
      v
Google Apps Script (BARU)
      |
      v
YAHN Donor Database (Google Sheets BARU)
```

Portal beasiswa lama tidak perlu disentuh untuk tahap ini.
