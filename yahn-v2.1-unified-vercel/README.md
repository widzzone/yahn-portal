# YAHN Unified Portal V2.1 — Vercel + Google Apps Script

Versi ini menyatukan Portal Beasiswa dan Portal Donatur dalam satu frontend Next.js/Vercel.

## Apa yang berubah dari V2.0

- Dashboard Donatur **tidak lagi memakai angka demo**.
- Login donor memakai OTP email dan membaca data langsung dari `YAHN Donor Database`.
- Total kontribusi, pending donation, bulan mendukung, sponsorship, dan impact update dihitung dari Google Sheets.
- Program Kakak Asuh membaca profil live dari sheet `Recipient_Public`.
- Portal Beasiswa peserta sudah pindah ke Vercel: login/daftar OTP, formulir pendaftaran, upload 6 PDF, status seleksi, jadwal wawancara, dan konfirmasi hadir.
- Database/Drive/Gemini/email workflow beasiswa existing tetap menjadi backend agar data lama tidak hilang.
- Dashboard admin beasiswa masih memakai portal Apps Script existing selama masa transisi.

## Struktur backend

### 1. Donor API standalone
File: `apps-script/YAHN_DONOR_API_STANDALONE.gs`

Gunakan pada Apps Script donor yang sudah dibuat. Replace `Code.gs` dengan file ini, jalankan `setupYahnDonorApi()` lagi, kemudian deploy **New version** dari Web App yang sama.

`setupYahnDonorApi()` tidak membuat database baru bila `DONOR_SHEET_ID` sudah ada di Script Properties. Ia hanya memastikan sheet yang diperlukan tersedia, termasuk `Impact_Update`.

### 2. Scholarship Vercel Adapter
File: `apps-script/YAHN_SCHOLARSHIP_VERCEL_ADAPTER.gs`

**Jangan membuat project beasiswa baru.** Tambahkan file `.gs` baru di project Apps Script Beasiswa YAHN existing yang sekarang berisi `Code.gs` lama.

Lalu jalankan:

`setupVercelScholarshipApi()`

Copy `YAHN_SCHOLARSHIP_API_SECRET` dari Execution log dan deploy **New version** Web App existing.

Adapter ini menggunakan `SHEET_ID`, `FOLDER_ID`, `submitApplication()`, dan `confirmAttendanceByStudent()` dari backend lama.

## Environment Variables Vercel

```text
APPS_SCRIPT_WEB_APP_URL=<URL /exec Apps Script Donor>
YAHN_API_SECRET=<secret Donor API>

SCHOLARSHIP_APPS_SCRIPT_WEB_APP_URL=<URL /exec Apps Script Beasiswa existing>
YAHN_SCHOLARSHIP_API_SECRET=<secret dari setupVercelScholarshipApi>
NEXT_PUBLIC_SCHOLARSHIP_PORTAL_URL=<URL /exec Apps Script Beasiswa existing>

NEXT_PUBLIC_DONATION_BANK=<nama bank>
NEXT_PUBLIC_DONATION_ACCOUNT=<nomor rekening>
NEXT_PUBLIC_DONATION_ACCOUNT_NAME=Yayasan Andi Hakim Nasoetion
NEXT_PUBLIC_QRIS_IMAGE_URL=<URL publik gambar QRIS>
```

Setelah mengubah Environment Variables lakukan Redeploy di Vercel.

## Membuat dashboard donor berisi data nyata

Sheet `Donations` memakai kolom `Status`. Dashboard hanya menghitung kontribusi terverifikasi sebagai total kontribusi.

Gunakan salah satu status berikut untuk transaksi yang sudah valid:

- `TERVERIFIKASI`
- `BERHASIL`
- `LUNAS`
- `SELESAI`

Transaksi `MENUNGGU VERIFIKASI` tetap muncul sebagai pending contribution tetapi tidak masuk total terverifikasi.

## Mengaktifkan Kakak Asuh live

Isi sheet `Recipient_Public` pada database donor. Contoh:

```text
Recipient ID: REC-001
Nama Publik: Alya P.
Program Studi: Statistika dan Sains Data
Semester: 5
IPK: 3.76
Jenis Kebutuhan: Living Cost
Target Dana: 9000000
Dana Terkumpul: 6750000
Cerita Singkat: ...
Foto URL: (opsional)
Status Publikasi: PUBLISHED
```

Hanya row `PUBLISHED` yang tampil di website.

Untuk sponsorship yang sudah aktif, ubah kolom `Status` di sheet `Sponsorships` menjadi `AKTIF`.

## Impact Update

V2.1 menambahkan sheet `Impact_Update`:

```text
Impact ID | Tanggal | Recipient ID | Judul | Isi | Status
```

Isi `Status` dengan `PUBLISHED` agar update muncul pada dashboard Kakak Asuh terkait. Recipient ID boleh kosong untuk update umum YAHN.

## Portal Beasiswa Vercel

URL utama:

- `/beasiswa` — landing program
- `/beasiswa/portal` — masuk / daftar dengan OTP email
- `/beasiswa/daftar` — form pendaftaran Vercel
- `/beasiswa/dashboard` — status peserta

Enam dokumen PDF di-upload satu per satu, maksimal 3 MB per file. Cara ini sengaja dipakai agar request ke Vercel tidak membawa seluruh 6 file sekaligus.

Backend lama tetap melakukan screening dan evaluasi Gemini melalui `submitApplication()` existing.

## GitHub → Vercel tanpa npm lokal

Anda tidak perlu menjalankan npm di laptop.

1. Replace isi repository GitHub dengan project V2.1 ini.
2. Commit changes dari browser GitHub.
3. Vercel yang terhubung ke repository akan build otomatis.
4. Periksa Deployment terbaru sampai status `Ready`.

## Catatan keamanan penting

API key Gemini pada backend lama pernah disimpan langsung di source code. Sebelum portal dipakai publik, rotate key tersebut dan pindahkan ke Apps Script `Script Properties`.

V2.1 sengaja tidak mengekspos `YAHN_API_SECRET` maupun `YAHN_SCHOLARSHIP_API_SECRET` ke browser. Keduanya hanya digunakan oleh Vercel server routes.
