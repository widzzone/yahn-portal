YAHN Scholarship Portal UI Patch v2.2.1

Upload ISI folder ini ke root project yahn-v2.2-admin-center di GitHub dan overwrite file dengan path yang sama.
Tidak perlu mengubah Apps Script, Environment Variables, atau backend.

Perubahan utama:
- Halaman login/registrasi beasiswa dibuat lebih ringkas, seimbang, dan responsif.
- Logo YAHN disimpan sebagai asset lokal di public/logo-yahn.png.
- Header memakai logo resmi dan tagline Yayasan.
- Semua kata "Vercel" di area portal beasiswa dihilangkan dari tampilan pengguna.
- Dashboard akun admin diarahkan ke /admin (YAHN Admin Center).
- Copywriting form unggah dokumen dirapikan.

File yang dioverwrite:
- app/beasiswa/portal/page.tsx
- app/beasiswa/portal/ScholarshipAccess.tsx
- app/beasiswa/page.tsx
- app/beasiswa/daftar/page.tsx
- app/beasiswa/daftar/ScholarshipApplicationForm.tsx
- app/beasiswa/dashboard/ScholarshipDashboardClient.tsx
- app/api/health/route.ts
- app/globals.css
- components/SiteHeader.tsx
- public/logo-yahn.png
