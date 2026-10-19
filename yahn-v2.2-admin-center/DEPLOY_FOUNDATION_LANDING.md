# YAHN Foundation Landing

Patch ini mengganti halaman awal `/` menjadi landing page bergaya menu utama Yayasan Andi Hakim Nasoetion.

## Menu utama
- Tentang Yayasan → `/tentang`
- Mendaftar Beasiswa → `/mahasiswa`
- Menjadi Donatur → `/sahabat`
- Laporan → `/dampak`

Tautan Admin Center tetap tersedia secara lebih kecil di bawah menu utama → `/admin`.

## Perubahan file
- `app/page.tsx`
- `app/tentang/page.tsx` (baru)
- `components/FoundationLanding.tsx` (baru)
- `app/globals.css`

## Deploy
Upload isi patch ke root project GitHub yang digunakan Vercel dan timpa file yang sama.
Tidak ada perubahan Apps Script, Google Sheets, secret, QRIS, atau environment variable.
