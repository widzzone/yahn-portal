# YAHN V2.12.1 — Payment & Portal Refinement

V2.12.1 dibangun di atas V2.12 Impact & Transparency. Fitur transparansi publik tetap dipertahankan.

## Perubahan

1. Dukungan bulanan dimulai dari Rp1.000.000.
   - Preset: Rp1.000.000, Rp2.500.000, Rp5.000.000, Rp10.000.000.
   - Nominal custom minimal Rp1.000.000.
   - Validasi dilakukan di frontend dan API route.

2. QRIS lebih mudah dipakai di mobile.
   - Tombol **Download QRIS**.
   - Tombol **Buka QRIS**.
   - QRIS tetap memakai asset lokal `public/qris-yahn.jpeg`.

3. Konfirmasi pembayaran diperketat.
   - Nama wajib.
   - Email wajib.
   - WhatsApp wajib.
   - Bukti pembayaran wajib untuk QRIS maupun transfer.
   - JPG/PNG/WEBP/PDF, maksimal 3 MB.

4. Portal chooser `/` diringkas agar muat dalam satu layar desktop tanpa scroll.

5. Navigasi mahasiswa diperbaiki.
   - Menu publik: Beranda, Program Beasiswa, Panduan, Masuk/Daftar.
   - Setelah session mahasiswa terdeteksi, CTA berubah menjadi **Dashboard Saya**.
   - Jika session admin terdeteksi, CTA berubah menjadi **Admin Center**.
   - `Riwayat & Status` tidak lagi ditampilkan sebagai menu publik.

6. Admin yang membuka dashboard mahasiswa otomatis dialihkan ke `/admin/dashboard`.

## Deployment

Gunakan patch V2.12.1 dan timpa file pada root project GitHub/Vercel yang saat ini menggunakan V2.12.

Tidak perlu mengganti:
- Apps Script Donor API, selama V2.11/V2.12 sudah dipasang.
- Apps Script Beasiswa V2.8+.
- Environment Variables.
- API secret.
- Google Sheets.
- Root Directory Vercel.

Setelah commit, Vercel akan melakukan deployment otomatis.

## Test setelah deploy

- `/` -> harus muat satu layar desktop tanpa scroll.
- `/donasi/bulanan` -> minimum Rp1.000.000.
- `/donasi/sekarang` -> Download QRIS, email/WhatsApp/bukti wajib.
- `/mahasiswa` -> tidak ada menu publik "Riwayat & Status".
- login mahasiswa -> header menampilkan "Dashboard Saya".
- login admin melalui jalur mahasiswa -> `/beasiswa/dashboard` mengalihkan ke `/admin/dashboard`.
