# YAHN V2 — Vercel + Apps Script

> **Cara termudah (tanpa npm/Node.js lokal):** ikuti [`DEPLOY_TANPA_NPM.md`](./DEPLOY_TANPA_NPM.md). Backend donor dibuat sebagai **Apps Script baru/standalone**, lalu frontend di-deploy lewat **Vercel Drop**.

Frontend baru untuk ekosistem Yayasan Andi Hakim Nasoetion. Project ini **tidak mengganti** portal beasiswa Apps Script existing pada tahap awal. Vercel dipakai sebagai layer publik baru untuk landing page dan Portal Donatur.

## Fitur V2.0 yang sudah ada

- Main Portal YAHN
- Portal Donatur dengan 3 jalur: Donasi Sekarang, Donatur Bulanan, Kakak Asuh
- Donasi satu kali (QRIS / transfer) + form konfirmasi
- Mode demo bila Apps Script backend belum terhubung
- Contoh dashboard Donatur Bulanan
- Preview admin Donor CRM di `/admin/donor-crm`
- Contoh katalog & detail Kakak Asuh
- Bridge menuju Portal Beasiswa Apps Script existing
- API route `/api/donations` sebagai server-side proxy
- Apps Script adapter `apps-script/YAHN_API_V2.gs`
- Health check `/api/health`

> Data mahasiswa di halaman Kakak Asuh adalah **dummy/demo** untuk rancangan UI. Jangan gunakan sebagai data penerima sebenarnya.

## Menjalankan lokal

Persyaratan Next.js 16: Node.js 20.9+.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka http://localhost:3000.

## Deploy ke Vercel

1. Upload folder ini ke GitHub.
2. Di Vercel pilih **Add New > Project**, lalu import repository.
3. Framework akan terdeteksi sebagai Next.js.
4. Tambahkan environment variables di **Settings > Environment Variables**.
5. Deploy / Redeploy.

Environment variables utama:

```env
NEXT_PUBLIC_SCHOLARSHIP_PORTAL_URL=https://script.google.com/macros/s/.../exec
APPS_SCRIPT_WEB_APP_URL=https://script.google.com/macros/s/.../exec
YAHN_API_SECRET=buat-secret-panjang-random
NEXT_PUBLIC_DONATION_BANK=Nama Bank
NEXT_PUBLIC_DONATION_ACCOUNT=Nomor Rekening
NEXT_PUBLIC_DONATION_ACCOUNT_NAME=Yayasan Andi Hakim Nasoetion
NEXT_PUBLIC_QRIS_IMAGE_URL=https://alamat-gambar-qris
```

`YAHN_API_SECRET` adalah server secret dan **jangan** diberi prefix `NEXT_PUBLIC_`.

## Hubungkan Apps Script

1. Buka project Apps Script YAHN yang sekarang.
2. Tambahkan file baru `YAHN_API_V2.gs` dan copy isi dari folder `apps-script/`.
3. Buka **Project Settings > Script Properties**.
4. Tambahkan `YAHN_API_SECRET` dengan nilai yang sama seperti di Vercel.
5. Deploy ulang Apps Script sebagai Web App.
6. Isi URL hasil deploy ke `APPS_SCRIPT_WEB_APP_URL` di Vercel.
7. Test form `/donasi/sekarang`.

Adapter akan membuat sheet `Donations` otomatis bila belum ada.

## Portal beasiswa existing

Isi `NEXT_PUBLIC_SCHOLARSHIP_PORTAL_URL` dengan URL Web App Google Apps Script yang sekarang. Tombol **Saya Mahasiswa** akan membuka portal existing sehingga alur pendaftaran/seleksi saat ini tetap aman.

## Catatan keamanan sebelum produksi

- Pindahkan Gemini API key dari source code Apps Script ke Script Properties.
- Jangan menyimpan password user plaintext untuk versi publik.
- Untuk akun donor produksi, gunakan authentication provider yang proper (mis. Supabase Auth / Firebase Auth / Auth.js dengan database yang sesuai).
- Jangan expose KK, slip gaji, alamat, atau dokumen seleksi ke halaman Kakak Asuh.
- Data donor dashboard pada V2.0 ini masih demo; jangan dianggap sebagai ledger transaksi.

## Struktur

```text
app/
  page.tsx
  beasiswa/
  donasi/
  donatur/dashboard/
  kakak-asuh/
  api/donations/
components/
lib/
apps-script/
```

## Roadmap berikutnya

- V2.1: login donor + database donor
- V2.2: recurring donor + CRM reminder
- V2.3: admin donor CRM + verifikasi pembayaran
- V2.4: publish Recipient_Public dari penerima final
- V2.5: sponsorship Kakak Asuh + funding gap
- V3.0: payment gateway / recurring payment