# YAHN — Fix Build Struktur Organisasi + Peluncuran

## Penyebab error
Patch sebelumnya menulis escape sequence `\\n` sebagai teks literal di `app/globals.css` sebelum blok CSS Struktur Organisasi. PostCSS menganggap karakter tersebut sebagai syntax CSS yang tidak valid.

## Yang diperbaiki
- Menghapus literal `\\n` dari CSS.
- Menghapus blok CSS `.about18-*` lama yang tidak lagi dipakai.
- Mempertahankan Struktur Organisasi terbaru (`.about19-*`).
- Mempertahankan tab Peluncuran Yayasan (`.about20-*`).
- Mempertahankan asset foto/liputan di `public/launch-yahn/`.

## Upload
Timpa file/folder berikut di ROOT DIRECTORY yang dipakai Vercel:
- `app/globals.css`
- `components/AboutCompactTabs.tsx`
- `public/launch-yahn/`

Jika Vercel Root Directory Anda adalah `yahn-v2.2-admin-center`, upload ketiga path tersebut DI DALAM folder `yahn-v2.2-admin-center`, bukan di root repository di atasnya.

Setelah commit, lakukan Redeploy tanpa perlu mengubah Environment Variables atau Apps Script.
