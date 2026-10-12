# YAHN V2.9 — Role Based Portal Experience

V2.9 memisahkan pengalaman publik menjadi tiga ruang dalam satu website:

- `/` — pemilih portal
- `/mahasiswa` — home khusus mahasiswa
- `/sahabat` — home khusus Sahabat YAHN
- `/admin` — Admin Center

## Perubahan penting

1. Halaman root sekarang menjadi portal chooser, bukan landing page campuran.
2. Header mahasiswa hanya menampilkan menu mahasiswa.
3. Header Sahabat YAHN hanya menampilkan menu dukungan/Kakak Asuh.
4. Semua role memiliki tautan **Ganti Portal**.
5. QRIS baru disimpan lokal sebagai `public/qris-yahn.jpeg` dan dipakai pada checkout.
6. Backend V2.8 Scholarship Cycle tetap dipertahankan tanpa perubahan.

## URL

### Mahasiswa
- `/mahasiswa`
- `/beasiswa`
- `/beasiswa/portal`
- `/beasiswa/dashboard`

### Sahabat YAHN
- `/sahabat`
- `/donasi`
- `/donasi/sekarang`
- `/donasi/bulanan`
- `/kakak-asuh`
- `/donatur/masuk`

### Admin
- `/admin`
- `/admin/dashboard`
- `/admin/programs`

QRIS lokal:
`/public/qris-yahn.jpeg`
