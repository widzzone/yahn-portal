# Deploy YAHN V2.11

## A. Upload patch ke GitHub

Upload isi patch ke root project yang sedang dibaca Vercel. Jangan upload folder pembungkus patch sebagai subfolder baru.

Setelah commit, tunggu deployment Vercel berstatus Ready.

## B. Update Apps Script Donor — WAJIB

Karena V2.11 menambahkan penyimpanan bukti pembayaran, backend donor harus diperbarui.

1. Buka project Google Apps Script `YAHN Donor API`.
2. Replace `Code.gs` dengan isi `apps-script/YAHN_DONOR_API_STANDALONE.gs` dari V2.11.
3. Save.
4. Jalankan sekali function:

   `setupYahnDonorApi`

   Function ini TIDAK membuat database donor baru jika `DONOR_SHEET_ID` lama masih ada. Ia hanya memastikan kolom baru tersedia dan membuat folder Drive `YAHN - Bukti Pembayaran`.

5. Buka Execution log. Anda akan melihat URL spreadsheet dan URL folder bukti pembayaran.
6. Deploy → Manage deployments → Edit → New version → Deploy.

`YAHN_API_SECRET` lama tetap digunakan. Tidak perlu mengubah Environment Variables di Vercel.

## C. Test

1. Buka `/sahabat` dan pastikan tiga kartu langsung pindah ke halaman masing-masing.
2. Buka `/donasi/sekarang`.
3. Pilih Transfer Bank. Tombol submit harus meminta bukti pembayaran.
4. Upload JPG/PNG/WEBP/PDF maksimal 3 MB lalu submit.
5. Pastikan baris baru muncul di `Donations` dan kolom `Bukti URL` terisi.
6. Buka `/admin/dashboard` → Donasi → klik `Lihat Bukti`.

## Akses folder Drive

Folder bukti bersifat privat. Jika akun admin berbeda dengan akun pemilik Apps Script, share folder tersebut ke akun admin dari Google Drive agar tombol `Lihat Bukti` dapat dibuka.
