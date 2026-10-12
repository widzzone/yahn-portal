# Deploy YAHN V2.13 — Monthly Payment Journey

V2.13 dibangun di atas V2.12.1 dan mempertahankan fitur Impact & Transparency, payment proof, role-based portal, serta Scholarship Cycle.

## Perubahan utama
- Aktivasi dukungan bulanan sekarang mencakup pembayaran bulan pertama.
- QRIS / Transfer tampil langsung pada flow bulanan.
- Bukti pembayaran bulan pertama wajib.
- Pembayaran bulan berikutnya tersedia di `/donasi/bulanan/bayar` dari Portal Sahabat.
- Setiap pembayaran bulanan dicatat sebagai baris baru di `Donations` dengan `Recurring ID` dan `Periode`.
- Admin dapat melihat jenis transaksi dan periode di tabel Verifikasi Donasi.
- Portal Sahabat menampilkan riwayat pembayaran bulanan dan tombol `Bayar bulan ini`.

## Update backend donor WAJIB
1. Buka Apps Script **YAHN Donor API**.
2. Replace `Code.gs` dengan `apps-script/YAHN_DONOR_API_STANDALONE.gs` dari V2.13.
3. Jalankan `setupYahnDonorApi()` sekali.
   - Spreadsheet lama tetap digunakan.
   - Sheet `Donations` akan ditambah kolom `Recurring ID` dan `Periode` bila belum ada.
4. Deploy > Manage deployments > Edit > New version > Deploy.

Secret dan URL Apps Script lama tetap digunakan.

## Frontend
Upload isi patch ke root project GitHub yang saat ini dibaca Vercel, lalu commit. Vercel akan redeploy otomatis.

## Alur baru
Aktivasi pertama:
Dukungan Bulanan → nominal → tanggal reminder → kontak → QRIS/Transfer → upload bukti → aktif.

Bulan berikutnya:
Portal Sahabat → Dukungan Bulanan → Bayar bulan ini → QRIS/Transfer → upload bukti → menunggu verifikasi.
