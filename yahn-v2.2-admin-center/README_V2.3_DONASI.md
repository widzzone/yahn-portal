# YAHN V2.3 — Portal Donasi Friendly

V2.3 menyempurnakan pengalaman donatur tanpa mengubah database atau secret yang sudah berjalan.

## Yang baru
- Hero donasi dua kolom dengan Quick Start.
- Pilih Donasi Sekali / Bulanan / Kakak Asuh dari area paling atas.
- Donasi sekali: nominal cepat, tab QRIS/Transfer, tombol salin rekening, konfirmasi lebih ringkas.
- Halaman baru `/donasi/bulanan` yang menyimpan komitmen ke `Recurring_Donors` melalui backend existing.
- Kakak Asuh yang tampil pada landing page memakai data `Recipient_Public` berstatus `PUBLISHED`.
- FAQ dan alur donasi yang lebih mudah dipahami.

## Backend
Tidak ada perubahan Apps Script wajib untuk V2.3 ini. Action `registerRecurringDonor` dan `getPublicRecipients` sudah tersedia di Donor API V2.2.

## Environment Variables
Tetap menggunakan variable yang sudah ada:
- `APPS_SCRIPT_WEB_APP_URL`
- `YAHN_API_SECRET`
- `NEXT_PUBLIC_DONATION_BANK`
- `NEXT_PUBLIC_DONATION_ACCOUNT`
- `NEXT_PUBLIC_DONATION_ACCOUNT_NAME`
- `NEXT_PUBLIC_QRIS_IMAGE_URL`

## Route utama
- `/donasi`
- `/donasi/sekarang`
- `/donasi/bulanan`
- `/kakak-asuh`
- `/donatur/masuk`
