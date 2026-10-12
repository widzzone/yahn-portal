# Deploy V2.12

V2.12 memerlukan update frontend dan Apps Script Donor API.

## 1. Update GitHub / Vercel

Upload isi patch V2.12 ke root project yang saat ini dipakai Vercel dan timpa file lama. Jangan membuat folder versi baru di dalam root project.

Tidak perlu mengubah Root Directory atau environment variable Vercel.

## 2. Update Apps Script Donor

Buka project **YAHN Donor API**, kemudian replace `Code.gs` dengan:

`apps-script/YAHN_DONOR_API_STANDALONE.gs`

Jalankan satu kali:

`setupYahnDonorApi()`

Fungsi setup mempertahankan spreadsheet donor yang sama dan hanya menambahkan sheet yang belum tersedia:

- `Disbursements`
- `Public_Documents`

Setelah setup selesai:

Deploy → Manage deployments → Edit → New version → Deploy

`YAHN_API_SECRET` lama tetap digunakan.

## 3. Test

Buka:

- `/dampak`
- `/sahabat`
- `/admin/transparency`

Di Admin Transparency, buat satu penyaluran `DRAFT`, kemudian ubah menjadi `PUBLISHED`. Setelah sinkronisasi, catatan tersebut harus muncul di `/dampak`.

## 4. Dokumen publik

Untuk laporan PDF/dokumen, gunakan URL yang memang dapat dibuka publik. Jangan gunakan bukti pembayaran pribadi Sahabat YAHN atau dokumen mahasiswa yang mengandung data sensitif.
