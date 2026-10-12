# YAHN Unified Portal V2.8 — Scholarship Cycle & Account Recovery

V2.8 mengubah Portal Beasiswa dari model satu email = satu pendaftaran menjadi model:

- satu mahasiswa / NIM = satu akun permanen
- satu akun dapat memiliki banyak aplikasi pada program/batch yang berbeda
- pendaftar yang belum berhasil dapat mendaftar kembali pada pembukaan berikutnya
- riwayat aplikasi lama tidak dihapus
- email login dapat dipulihkan melalui alur verifikasi + approval admin

## Sheet baru
Menjalankan `setupYahnScholarshipV28()` membuat / melengkapi:

1. `Scholarship_Programs`
2. `Student_Accounts`
3. `Application_Cycles`
4. `Account_Recovery`

Sheet `Applications`, `Users`, dan `Existing` lama tidak dihapus dan struktur kolom legacy tidak digeser.

## Migrasi data lama
- akun pada `Users` dimigrasikan ke `Student_Accounts`
- NIM / WhatsApp dari `Applications` dipakai melengkapi identitas mahasiswa
- aplikasi lama dipetakan ke `YAHN-2026-01` melalui `Application_Cycles`
- default legacy program dibuat `CLOSED` agar pembukaan lama tidak otomatis menerima pendaftaran baru

## Membuka batch baru
Masuk Admin Center → `Program & Akun` atau buka `/admin/programs`.

Contoh:
- Nama: Beasiswa YAHN 2027
- Tahun: 2027
- Batch: 1
- Status: OPEN
- Semester: 4,6
- IPK minimum: 3.00
- Maksimum: 9000000

Saat satu program dibuat `OPEN`, program OPEN sebelumnya otomatis menjadi `CLOSED`.

## Duplicate guard
Pada pendaftaran akun:
- email lama → portal memberi tahu akun sudah ada
- NIM lama dengan email berbeda → portal menampilkan email tersamarkan dan menawarkan Cari Akun Saya

Pada submit aplikasi:
- NIM/email boleh muncul kembali pada batch berbeda
- NIM/email yang sama tidak dapat submit dua kali pada Program ID yang sama

## Pemulihan akun
Mahasiswa memilih `Cari Akun Saya`, lalu mengisi NIM + nama + WhatsApp lama (jika tersedia).
Portal hanya menampilkan email tersamarkan.

Jika email lama tidak lagi dapat diakses, mahasiswa mengajukan email baru. Permintaan masuk ke `Account_Recovery` dan diproses admin di `/admin/programs`.
