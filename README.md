# Kalkulator Tabungan & Pinjaman

Aplikasi web untuk mensimulasikan rencana tabungan dan pinjaman berdasarkan penghasilan bulanan. Dibangun dengan **Next.js 14** (App Router) dan **Tailwind CSS**.

## Fitur

- **Input penghasilan bulanan** — dasar untuk semua kalkulasi.
- **Kalkulator tabungan** dengan dua mode:
  - Dari setoran bulanan → hitung hasil akhir tabungan (dengan bunga majemuk).
  - Dari target dana → hitung setoran bulanan yang dibutuhkan.
- **Kalkulator pinjaman** — hitung angsuran bulanan sistem anuitas, total bunga, total pembayaran, serta indikator **DSR (Debt Service Ratio)** yang menandai apakah angsuran masih sehat dibanding penghasilan.
- **Struk ringkasan alokasi** — menampilkan anjuran alokasi penghasilan gaya 50/30/20 (kebutuhan/keinginan/tabungan) serta sisa penghasilan setelah dikurangi komitmen tabungan dan pinjaman.

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000 di browser.

Untuk build produksi:

```bash
npm run build
npm start
```

## Struktur project

```
app/
  layout.js         # root layout + font
  page.js            # halaman utama, menyatukan semua state & kalkulator
  globals.css
components/
  IncomeInput.js
  SavingsCalculator.js
  LoanCalculator.js
  AllocationReceipt.js
lib/
  finance.js         # semua rumus keuangan (anuitas, bunga majemuk, alokasi, DSR)
```

## Catatan

Semua kalkulasi berjalan di sisi klien (client-side), tidak ada backend/database yang dibutuhkan. Rumus yang dipakai:

- **Angsuran pinjaman (anuitas)**: `A = P × r(1+r)^n / ((1+r)^n − 1)`
- **Hasil tabungan (annuity due)**: `FV = PMT × ((1+r)^n − 1)/r × (1+r)`
- **DSR**: `angsuran / penghasilan × 100%` — dianggap sehat di bawah 30%.

Angka bersifat estimasi/simulasi dan bukan pengganti nasihat keuangan profesional.
