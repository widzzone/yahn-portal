# YAHN Unified Portal V2.5

V2.5 fokus pada pengalaman donatur, Kakak Asuh, dan penyempurnaan Admin Center.

## Perubahan utama
- `/donasi/sekarang` menjadi checkout yang lebih premium dan ringkas.
- Setelah konfirmasi donasi berhasil, user diarahkan ke `/donasi/terima-kasih`.
- Portal Donatur dibuat lebih compact agar tidak banyak scroll.
- Dashboard donor memakai tab Ringkasan / Aktivitas / Kakak Asuh / Impact.
- Halaman Kakak Asuh dibuat lebih compact dan friendly; teks internal seperti nama sheet tidak lagi ditampilkan ke publik.
- Login Admin Center diperbarui dengan logo YAHN dan tidak menggunakan kata Vercel.
- Admin beasiswa dan admin donor tetap menyatu pada satu Admin Center.
- Footer tetap memakai logo resmi dan alamat Yayasan.

## Sumber data / spreadsheet
### Beasiswa
Backend beasiswa existing menggunakan `SHEET_ID` pada Code.gs:
`12X7hYza38ezmFNzku_KFXmxQVP7wMNga-HdthJi2BxQ`

Sheet penting: `Users`, `Applications`, `Existing`.

### Donatur
Backend donor menggunakan spreadsheet yang ID-nya disimpan pada Apps Script Script Properties dengan key:
`DONOR_SHEET_ID`

Spreadsheet ini dibuat saat `setupYahnDonorApi()` pertama kali dijalankan. Sheet utama: `Donors`, `Donations`, `Recurring_Donors`, `Sponsorships`, `Recipient_Public`, `CRM_Log`, `Impact_Update`.

Tidak perlu mengubah Apps Script atau environment variables untuk patch UI V2.5 ini.
