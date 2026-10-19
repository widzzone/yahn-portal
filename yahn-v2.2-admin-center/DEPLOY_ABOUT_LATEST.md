# YAHN — About / Peluncuran refinement

Patch ini memperbarui halaman `/tentang` dengan:

- tab Peluncuran Yayasan sebagai historical highlight;
- foto hero dari gambar resmi IPB University (dengan fallback lokal);
- jejak singkat 2002 → 21 Desember 2025 → > Rp500 juta;
- press wall berisi tautan asli IPB University, Agronews, dan Radar Suara;
- CTA akhir: Program Beasiswa, Menjadi Sahabat YAHN, Dampak & Laporan;
- label navigasi publik diperbarui menjadi `Menjadi Sahabat` dan `Dampak & Laporan`.

## Upload

Upload isi ZIP ini ke root directory project yang dibangun Vercel.
Jika Vercel memakai Root Directory `yahn-v2.2-admin-center`, file harus berada di dalam folder tersebut pada repository.

File yang ditimpa:

- `app/globals.css`
- `app/tentang/page.tsx`
- `components/AboutCompactTabs.tsx`
- `components/FoundationInfoHeader.tsx`
- `components/FoundationInfoFooter.tsx`
- `public/launch-yahn/*`

Tidak ada perubahan Apps Script, database, secret, atau environment variable.
