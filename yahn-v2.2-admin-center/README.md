# YAHN Unified Portal V2.2 — Admin Center

V2.2 menjadikan Vercel sebagai **frontend terpadu YAHN** untuk peserta beasiswa, donatur, dan administrator. Google Apps Script tetap dipakai sebagai backend operasional agar Google Sheets, Drive, Gmail, workflow seleksi, dan data existing tetap dapat digunakan.

## Fitur V2.2

### Portal Peserta
- Login / daftar OTP email.
- Form beasiswa di Vercel.
- Upload 6 PDF.
- Status seleksi, jadwal wawancara, dan konfirmasi hadir.

### Portal Donatur
- Donasi langsung.
- OTP donor.
- Dashboard kontribusi live.
- Donatur bulanan.
- Kakak Asuh dan Impact Update.

### YAHN Admin Center — `/admin`
- Login OTP khusus role `admin` dari sheet `Users` beasiswa.
- Overview gabungan beasiswa + donor.
- Master pendaftar dan keputusan administrasi.
- Pengaturan jadwal wawancara dan keputusan final.
- Daftar penerima dan riwayat pencairan existing.
- Verifikasi / penolakan donasi.
- Donor CRM dan reminder manual recurring donor.
- Aktivasi sponsorship Kakak Asuh.
- Kelola profil publik `Recipient_Public`.
- Tulis dan publish `Impact_Update`.

## Upgrade Backend

### A. Apps Script Beasiswa Existing

Jangan hapus `Code.gs` lama. Replace file adapter Vercel yang sebelumnya dibuat dengan:

`apps-script/YAHN_SCHOLARSHIP_VERCEL_ADAPTER.gs`

Adapter v2.2 menambahkan API admin tetapi tetap memakai fungsi lama seperti:

- `submitApplication()`
- `updateCandidateStatus()`
- `saveInterviewSchedule()`
- `kirimPengumumanFinal()`
- `confirmAttendanceByStudent()`

Sesudah replace, deploy **New version** dari Web App Apps Script beasiswa.

Anda tidak perlu membuat secret baru jika `YAHN_SCHOLARSHIP_API_SECRET` sudah ada di Script Properties.

### B. Apps Script Donor

Replace `Code.gs` project Donor API dengan:

`apps-script/YAHN_DONOR_API_STANDALONE.gs`

Jalankan `setupYahnDonorApi()` sekali. Database existing tetap digunakan karena `DONOR_SHEET_ID` dipertahankan di Script Properties. Setelah itu deploy **New version** Web App donor.

## Environment Variables Vercel

Tetap gunakan variable yang sudah ada:

```text
APPS_SCRIPT_WEB_APP_URL=<URL /exec Donor API>
YAHN_API_SECRET=<secret donor>

SCHOLARSHIP_APPS_SCRIPT_WEB_APP_URL=<URL /exec Apps Script Beasiswa>
YAHN_SCHOLARSHIP_API_SECRET=<secret scholarship>

NEXT_PUBLIC_SCHOLARSHIP_PORTAL_URL=<URL legacy beasiswa>
NEXT_PUBLIC_DONATION_BANK=<bank>
NEXT_PUBLIC_DONATION_ACCOUNT=<rekening>
NEXT_PUBLIC_DONATION_ACCOUNT_NAME=Yayasan Andi Hakim Nasoetion
NEXT_PUBLIC_QRIS_IMAGE_URL=<URL QRIS>
```

Opsional tetapi direkomendasikan:

```text
YAHN_SESSION_SECRET=<random secret panjang>
```

Setelah perubahan environment, lakukan **Redeploy**.

## Login Admin

Pastikan sheet `Users` pada database beasiswa memiliki row administrator:

```text
Email | Password/Legacy | Nama | Role
admin@email.com | ... | Admin YAHN | admin
```

Buka:

`https://domain-yahn.vercel.app/admin`

Masukkan email admin. OTP dikirim melalui Gmail dari Apps Script beasiswa. Akun role selain `admin` akan ditolak.

## GitHub → Vercel tanpa npm lokal

Karena repository Anda saat ini menggunakan Root Directory `yahn-v2.1-unified-vercel`, ada dua pilihan.

**Paling rapi:** upload isi V2.2 sebagai folder `yahn-v2.2-admin-center`, lalu ubah Vercel **Root Directory** menjadi:

`yahn-v2.2-admin-center`

Kemudian redeploy tanpa build cache.

Atau replace isi root project GitHub lama dengan isi V2.2 dan gunakan Root Directory `./`.

Tidak perlu install npm/Node.js di laptop; Vercel melakukan build di cloud.

## Keamanan

- Secret backend tidak memakai prefix `NEXT_PUBLIC_`.
- Admin actions hanya dipanggil dari server route Vercel dan membutuhkan cookie admin yang ditandatangani.
- Profil Kakak Asuh tetap menggunakan data publik terpisah pada `Recipient_Public`; jangan menaruh KK, slip gaji, alamat rinci, atau dokumen sensitif ke profil publik.
- Rotate Gemini API key yang pernah tertulis langsung di source backend lama dan pindahkan ke Apps Script Script Properties.
