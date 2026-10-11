# Deploy YAHN V2.5 Patch

1. Extract `yahn-v2.5-experience-patch.zip`.
2. Di GitHub, buka root project yang saat ini dibaca Vercel (misalnya `yahn-v2.2-admin-center`).
3. Upload seluruh isi patch ke root tersebut dan timpa file yang sama.
4. Commit changes.
5. Vercel akan auto deploy. Jika tidak, lakukan Redeploy.

Tidak perlu:
- mengubah Apps Script,
- mengubah environment variables,
- mengubah Root Directory,
- menjalankan npm lokal.

URL utama setelah deploy:
- `/donasi/sekarang`
- `/donasi/terima-kasih` (otomatis setelah submit)
- `/donatur/masuk`
- `/donatur/dashboard`
- `/kakak-asuh`
- `/admin`
