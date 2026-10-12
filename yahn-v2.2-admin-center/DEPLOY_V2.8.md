# Deploy V2.8 tanpa npm lokal

## A. Update Google Apps Script Beasiswa
1. Buka project Apps Script Beasiswa existing.
2. Replace isi file adapter Vercel lama dengan `apps-script/YAHN_SCHOLARSHIP_VERCEL_ADAPTER.gs` V2.8.
3. Save.
4. Jalankan `setupYahnScholarshipV28()` satu kali dan berikan permission bila diminta.
5. Pastikan empat sheet baru muncul pada spreadsheet Beasiswa.
6. Deploy → Manage deployments → Edit → New version → Deploy.

Secret lama `YAHN_SCHOLARSHIP_API_SECRET` tetap digunakan. Tidak perlu membuat secret baru.

## B. Update GitHub / Vercel
Upload isi patch ke root project yang saat ini dibaca Vercel, timpa file lama, lalu Commit.
Vercel akan build otomatis.

Tidak perlu mengubah Root Directory atau Environment Variable.

## C. Buat program baru
Setelah deploy:
1. `/admin`
2. Login admin
3. klik `Program & Akun`
4. buat batch baru
5. ubah Status menjadi `OPEN`

Program `OPEN` menjadi program pendaftaran aktif pada Portal Mahasiswa.

## D. Test yang direkomendasikan
1. Daftar akun baru dengan NIM baru.
2. Coba daftar akun lagi dengan email sama → harus muncul info akun sudah terdaftar.
3. Coba NIM sama + email berbeda → harus muncul email tersamarkan.
4. Gunakan `Cari Akun Saya`.
5. Login akun mahasiswa lama → dashboard harus menampilkan riwayat aplikasi.
6. Buat program baru OPEN → akun yang gagal pada batch lama harus mendapat tombol `Daftar kembali`.
7. Submit batch baru → aplikasi lama tetap tersimpan.
