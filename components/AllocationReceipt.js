import { formatRupiah, hitungAlokasiPenghasilan } from "@/lib/finance";

export default function AllocationReceipt({ penghasilan, setoranTabungan, angsuranPinjaman }) {
  const alokasi = hitungAlokasiPenghasilan(penghasilan || 0);
  const totalKomitmen = (setoranTabungan || 0) + (angsuranPinjaman || 0);
  const sisa = (penghasilan || 0) - totalKomitmen;
  const now = new Date();
  const tanggal = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-sm">
      <div className="perforated-top h-3 w-full" />
      <div className="bg-white px-6 py-8 shadow-[0_20px_40px_-15px_rgba(34,32,27,0.25)]">
        <div className="text-center">
          <p className="font-display text-lg italic text-ink/70">Struk Keuangan</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
            Ringkasan Alokasi Bulanan
          </p>
          <p className="mt-1 font-mono text-[10px] text-ink/40">{tanggal}</p>
        </div>

        <div className="my-5 border-t border-dashed border-ink/25" />

        <Line label="Penghasilan bulanan" nilai={penghasilan} />

        <div className="my-4 space-y-1.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">
            Anjuran 50 / 30 / 20
          </p>
          <Line label="Kebutuhan (50%)" nilai={alokasi.kebutuhan} kecil />
          <Line label="Keinginan (30%)" nilai={alokasi.keinginan} kecil />
          <Line label="Tabungan/Investasi (20%)" nilai={alokasi.tabungan} kecil />
        </div>

        <div className="my-5 border-t border-dashed border-ink/25" />

        <div className="space-y-1.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">
            Komitmen Anda saat ini
          </p>
          <Line label="Setoran tabungan" nilai={setoranTabungan} kecil />
          <Line label="Angsuran pinjaman" nilai={angsuranPinjaman} kecil />
        </div>

        <div className="my-5 border-t border-dashed border-ink/25" />

        <Line label="Total komitmen" nilai={totalKomitmen} tebal />
        <Line label="Sisa penghasilan" nilai={sisa} tebal negatifMerah />

        <div className="mt-6 text-center">
          <p className="font-mono text-[10px] text-ink/30">
            *** simulasi, bukan nasihat keuangan resmi ***
          </p>
        </div>
      </div>
      <div className="perforated-top h-3 w-full rotate-180" />
    </div>
  );
}

function Line({ label, nilai, kecil, tebal, negatifMerah }) {
  const negatif = negatifMerah && nilai < 0;
  return (
    <div className={`flex items-baseline justify-between ${kecil ? "text-xs" : "text-sm"}`}>
      <span className={`${tebal ? "font-semibold text-ink" : "text-ink/60"}`}>{label}</span>
      <span
        className={`font-mono tabular-nums ${tebal ? "font-semibold" : "text-ink/80"} ${
          negatif ? "text-rust" : ""
        }`}
      >
        {formatRupiah(nilai || 0)}
      </span>
    </div>
  );
}
