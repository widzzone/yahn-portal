# YAHN V2.11 — Direct Support Flow + Payment Proof

V2.11 mengubah Portal Sahabat menjadi pemilih jalur yang lebih sederhana dan menambahkan upload bukti pembayaran pada Donasi Sekarang.

## Perubahan utama

1. `/sahabat`
   - Tiga kartu dukungan langsung membuka flow masing-masing.
   - Tidak ada lagi pemilihan nominal di bawah tiga kartu.
   - Berbagi Hari Ini → `/donasi/sekarang`
   - Hadir Setiap Bulan → `/donasi/bulanan`
   - Temani Satu Perjalanan → `/kakak-asuh`

2. `/donasi/sekarang`
   - Upload bukti pembayaran JPG/JPEG, PNG, WEBP, atau PDF.
   - Maksimal 3 MB.
   - Transfer Bank: bukti wajib.
   - QRIS: bukti opsional, tetapi direkomendasikan.
   - Bukti disimpan ke Google Drive oleh Apps Script.

3. Database donor
   - Sheet `Donations` otomatis mendapat kolom tambahan tanpa menghapus data lama:
     - Bukti URL
     - Bukti File ID
     - Bukti Nama File
     - Bukti MIME
     - Bukti Uploaded At

4. Admin Center
   - Tabel Verifikasi Donasi memiliki kolom `Bukti`.
   - Admin dapat membuka file bukti sebelum memilih Verifikasi/Tolak.

## Privasi file bukti

Folder Drive bukti pembayaran dibuat privat di Google Drive pemilik Apps Script. Jika Admin Center digunakan oleh akun Google lain yang juga perlu membuka bukti, share folder `YAHN - Bukti Pembayaran` ke akun admin tersebut melalui Google Drive. Jangan ubah folder menjadi publik.
