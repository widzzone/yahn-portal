# Deploy YAHN V2.1 Tanpa npm Lokal

## A. Update Apps Script Donor

1. Buka project Apps Script `YAHN Donor API` yang sekarang.
2. Replace isi `Code.gs` dengan `apps-script/YAHN_DONOR_API_STANDALONE.gs`.
3. Save.
4. Run `setupYahnDonorApi()`.
5. Izinkan Gmail jika diminta (OTP donor dikirim lewat email).
6. Deploy > Manage deployments > Edit > Version: New version > Deploy.
7. URL `/exec` tetap dapat dipakai di `APPS_SCRIPT_WEB_APP_URL`.

## B. Hubungkan Portal Beasiswa ke Vercel

1. Buka project Apps Script Beasiswa existing — project yang saat ini punya `Code.js/Code.gs` dan `Index.html` lama.
2. Klik `+` > Script.
3. Nama file: `VercelAdapter`.
4. Paste isi `apps-script/YAHN_SCHOLARSHIP_VERCEL_ADAPTER.gs`.
5. Save.
6. Run `setupVercelScholarshipApi()`.
7. Copy secret dari Execution log.
8. Deploy ulang Web App existing sebagai **New version**.

## C. Vercel Environment Variables

Tambahkan:

- `APPS_SCRIPT_WEB_APP_URL` = URL donor `/exec`
- `YAHN_API_SECRET` = secret donor
- `SCHOLARSHIP_APPS_SCRIPT_WEB_APP_URL` = URL beasiswa existing `/exec`
- `YAHN_SCHOLARSHIP_API_SECRET` = secret scholarship adapter
- `NEXT_PUBLIC_SCHOLARSHIP_PORTAL_URL` = URL beasiswa existing `/exec` (fallback admin)
- informasi rekening / QRIS

Setelah itu Redeploy.

## D. Update GitHub

Upload semua isi project V2.1 ke repository yang sama. Jangan upload file `.env` yang berisi secret. `.env.example` aman.

Setelah Commit, Vercel akan melakukan deployment otomatis.

## E. Test

1. `/api/health`
2. `/donasi/sekarang` > kirim transaksi test.
3. Ubah status transaksi di Google Sheet menjadi `TERVERIFIKASI`.
4. `/donatur/masuk` > masukkan email transaksi > OTP harus masuk email.
5. Dashboard harus menampilkan total dari sheet, bukan angka contoh.
6. `/beasiswa/portal` > register/login dengan OTP.
7. Jika belum punya aplikasi, tombol `Mulai pendaftaran` harus tampil.
8. Kirim form menggunakan PDF kecil untuk test.
9. Pastikan row baru masuk ke sheet `Applications` existing.
