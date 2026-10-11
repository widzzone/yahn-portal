# Deploy YAHN V2.2 tanpa npm lokal

## 1. Upgrade Apps Script Beasiswa
1. Buka project Apps Script Beasiswa existing.
2. Buka file `YAHN_SCHOLARSHIP_VERCEL_ADAPTER.gs` yang sebelumnya dibuat.
3. Replace seluruh isinya dengan file versi V2.2 dari folder `apps-script/` paket ini.
4. Save.
5. Deploy → Manage deployments → Edit → **New version** → Deploy.
6. URL `/exec` tetap sama.

## 2. Upgrade Apps Script Donor
1. Buka project `YAHN Donor API`.
2. Replace `Code.gs` dengan `YAHN_DONOR_API_STANDALONE.gs` versi V2.2.
3. Save.
4. Jalankan `setupYahnDonorApi()` sekali dan izinkan akses bila diminta.
5. Deploy New version.

## 3. Upload V2.2 ke GitHub
Upload folder hasil extract `yahn-v2.2-admin-center` ke repository melalui browser GitHub.

Jika Anda ingin mempertahankan folder versi per versi, hasilnya boleh seperti:

```text
yahn-portal/
├── yahn-v2.1-unified-vercel/
└── yahn-v2.2-admin-center/
```

## 4. Ubah Root Directory di Vercel
Project → Settings → Build and Deployment → Root Directory:

```text
yahn-v2.2-admin-center
```

Save.

## 5. Environment Variables
Pastikan minimal tersedia:

```text
APPS_SCRIPT_WEB_APP_URL
YAHN_API_SECRET
SCHOLARSHIP_APPS_SCRIPT_WEB_APP_URL
YAHN_SCHOLARSHIP_API_SECRET
```

Variable QRIS/rekening tetap gunakan yang sudah ada.

Tidak wajib, tapi disarankan tambahkan Secret:

```text
YAHN_SESSION_SECRET
```

Isi string random panjang.

## 6. Redeploy
Deployments → deployment terbaru → Redeploy. Bila tersedia, jangan gunakan build cache untuk deployment pertama V2.2.

## 7. Test
Buka:

```text
/admin
```

Login dengan email yang kolom `Role` di sheet `Users` bernilai `admin`.

Lalu tes bertahap:
- Overview dapat memuat data.
- Pendaftar muncul.
- Donasi pending muncul.
- Uji satu perubahan yang tidak kritis, misalnya menyimpan jadwal wawancara dummy/test.
- Pastikan tab Kakak Asuh dan Impact membaca database donor.

Jika Overview hanya menampilkan salah satu database, pesan peringatan di bagian atas Admin Center akan menyebut backend yang belum tersambung.
