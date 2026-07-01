// Semua fungsi kalkulasi keuangan murni (tanpa efek samping)
// r = suku bunga per bulan (desimal), n = jumlah bulan, PMT = setoran/angsuran per bulan

export function formatRupiah(value) {
  if (!isFinite(value) || isNaN(value)) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function parseAngka(str) {
  if (typeof str === "number") return str;
  const cleaned = String(str).replace(/[^0-9]/g, "");
  return cleaned ? parseInt(cleaned, 10) : 0;
}

/**
 * Angsuran pinjaman sistem anuitas (flat per bulan, bunga menurun secara efektif)
 * P = pokok pinjaman, tahunanPersen = bunga per tahun (%), n = tenor dalam bulan
 */
export function hitungAngsuranPinjaman(P, tahunanPersen, n) {
  const r = tahunanPersen / 100 / 12;
  if (r === 0) {
    const angsuran = P / n;
    return { angsuran, totalBayar: P, totalBunga: 0 };
  }
  const factor = Math.pow(1 + r, n);
  const angsuran = (P * r * factor) / (factor - 1);
  const totalBayar = angsuran * n;
  const totalBunga = totalBayar - P;
  return { angsuran, totalBayar, totalBunga };
}

/**
 * Jadwal amortisasi sederhana, mengembalikan array per bulan (sisa pokok, bunga, pokok dibayar)
 */
export function jadwalAmortisasi(P, tahunanPersen, n) {
  const r = tahunanPersen / 100 / 12;
  const { angsuran } = hitungAngsuranPinjaman(P, tahunanPersen, n);
  let sisa = P;
  const rows = [];
  for (let bulan = 1; bulan <= n; bulan++) {
    const bunga = sisa * r;
    const pokok = angsuran - bunga;
    sisa = Math.max(0, sisa - pokok);
    rows.push({ bulan, angsuran, bunga, pokok, sisa });
  }
  return rows;
}

/**
 * Hasil akhir tabungan berkala (setoran tetap tiap bulan di awal bulan / annuity due)
 * PMT = setoran per bulan, tahunanPersen = bunga per tahun (%), n = jangka waktu bulan
 */
export function hitungHasilTabungan(PMT, tahunanPersen, n) {
  const r = tahunanPersen / 100 / 12;
  if (r === 0) {
    const totalSetoran = PMT * n;
    return { hasilAkhir: totalSetoran, totalSetoran, totalBunga: 0 };
  }
  const factor = (Math.pow(1 + r, n) - 1) / r;
  const hasilAkhir = PMT * factor * (1 + r);
  const totalSetoran = PMT * n;
  const totalBunga = hasilAkhir - totalSetoran;
  return { hasilAkhir, totalSetoran, totalBunga };
}

/**
 * Setoran bulanan yang dibutuhkan untuk mencapai target dana tertentu
 * target = dana yang ingin dicapai, tahunanPersen = bunga per tahun (%), n = jangka waktu bulan
 */
export function hitungSetoranUntukTarget(target, tahunanPersen, n) {
  const r = tahunanPersen / 100 / 12;
  if (r === 0) {
    const setoran = target / n;
    return { setoran, totalSetoran: target, totalBunga: 0 };
  }
  const factor = (Math.pow(1 + r, n) - 1) / r;
  const setoran = target / (factor * (1 + r));
  const totalSetoran = setoran * n;
  const totalBunga = target - totalSetoran;
  return { setoran, totalSetoran, totalBunga };
}

/**
 * Rekomendasi alokasi penghasilan bulanan gaya 50/30/20
 * kebutuhan 50%, keinginan 30%, tabungan/investasi 20%
 */
export function hitungAlokasiPenghasilan(penghasilan) {
  return {
    kebutuhan: penghasilan * 0.5,
    keinginan: penghasilan * 0.3,
    tabungan: penghasilan * 0.2,
  };
}

/**
 * Rasio DSR (Debt Service Ratio) - persentase angsuran terhadap penghasilan
 * Idealnya di bawah 30-35% agar keuangan tetap sehat
 */
export function hitungDSR(angsuran, penghasilan) {
  if (!penghasilan) return 0;
  return (angsuran / penghasilan) * 100;
}
