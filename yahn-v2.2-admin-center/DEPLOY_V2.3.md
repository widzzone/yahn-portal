# Deploy V2.3 tanpa npm lokal

1. Extract `yahn-v2.3-donation-patch.zip`.
2. Buka repository GitHub `yahn-portal`.
3. Masuk ke folder root Vercel aktif Anda (saat ini biasanya `yahn-v2.2-admin-center`).
4. Upload isi patch: `app/` dan `components/` lalu overwrite file yang sama.
5. Commit changes.
6. Vercel akan deploy otomatis. Jika tidak, pilih Redeploy.
7. Buka `/donasi` dan lakukan hard refresh.

Tidak perlu mengubah Root Directory, Environment Variable, atau Apps Script untuk patch ini.
