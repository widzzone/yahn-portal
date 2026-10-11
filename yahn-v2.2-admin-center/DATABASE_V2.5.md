# Database YAHN V2.5

## Database Beasiswa
Spreadsheet ID dari backend beasiswa existing:

`12X7hYza38ezmFNzku_KFXmxQVP7wMNga-HdthJi2BxQ`

Buka langsung dengan pola:
`https://docs.google.com/spreadsheets/d/12X7hYza38ezmFNzku_KFXmxQVP7wMNga-HdthJi2BxQ/edit`

Dipakai untuk modul beasiswa seperti akun `Users`, pendaftaran `Applications`, dan penerima existing `Existing`.

## Database Donatur
ID spreadsheet donor tidak di-hard-code pada source frontend. ID tersebut disimpan di Apps Script Donor API pada:

Project Settings -> Script Properties -> `DONOR_SHEET_ID`

Atau buka Execution log setelah menjalankan `setupYahnDonorApi()`; script mencetak `DONOR_SHEET_ID` dan URL spreadsheet.

Dipakai untuk:
- `Donors`
- `Donations`
- `Recurring_Donors`
- `Sponsorships`
- `Recipient_Public`
- `CRM_Log`
- `Impact_Update`

Admin Center YAHN menggabungkan kedua backend tersebut dalam satu antarmuka. Spreadsheet fisiknya tetap terpisah agar modul beasiswa dan donor lebih aman dikelola.
