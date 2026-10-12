# YAHN V2.12 — Impact & Transparency

V2.12 menambahkan halaman publik **Dampak & Transparansi** untuk Portal Sahabat YAHN dan pengelolaan penyaluran/dokumen publik dari Admin Center.

## Fitur baru

- `/dampak` — halaman publik tanpa login.
- Ringkasan total dukungan terverifikasi, dana tersalurkan, saldo program, dan penerima yang tercatat dalam penyaluran.
- Aktivitas dukungan terbaru dengan nama yang otomatis dimasking.
- Breakdown penggunaan dana per kategori.
- Riwayat penyaluran publik.
- Impact Journal dari `Impact_Update` berstatus `PUBLISHED`.
- Dokumen/laporan publik.
- Teaser dampak di `/sahabat`.
- Menu **Dampak & Transparansi** pada Portal Sahabat.
- `/admin/transparency` untuk mencatat penyaluran dan laporan publik.
- Tombol **Transparansi** di Admin Center.

## Sheet baru pada YAHN Donor Database

### Disbursements
- Disbursement ID
- Tanggal
- Program
- Recipient ID
- Kategori
- Nominal
- Keterangan
- Bukti URL
- Status Publikasi

### Public_Documents
- Document ID
- Tanggal
- Judul
- Jenis
- Periode
- URL
- Status Publikasi
- Keterangan

Hanya data dengan `Status Publikasi = PUBLISHED` yang masuk halaman publik.

## Privasi

- Bukti pembayaran Sahabat YAHN **tidak dipublikasikan**.
- Feed publik hanya membaca transaksi berstatus terverifikasi.
- Nama Sahabat otomatis dimasking; transaksi dengan `Anonim = YA` tampil sebagai **Sahabat YAHN**.
- Dokumen pendukung penyaluran hanya tampil apabila admin memasukkan URL yang memang aman dipublikasikan.
