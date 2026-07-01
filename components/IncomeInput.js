import { formatRupiah, parseAngka } from "@/lib/finance";

export default function IncomeInput({ penghasilan, setPenghasilan }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white/60 p-6 sm:p-8 shadow-[0_1px_0_rgba(34,32,27,0.06)]">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-forest/70">
        01 — Penghasilan Bulanan
      </p>
      <label htmlFor="penghasilan" className="mt-3 block">
        <span className="sr-only">Penghasilan bulanan</span>
        <div className="flex items-baseline gap-2 border-b-2 border-ink/15 pb-2 focus-within:border-forest transition-colors">
          <span className="font-display text-2xl text-ink/50 sm:text-3xl">Rp</span>
          <input
            id="penghasilan"
            inputMode="numeric"
            value={penghasilan ? penghasilan.toLocaleString("id-ID") : ""}
            onChange={(e) => setPenghasilan(parseAngka(e.target.value))}
            placeholder="8.000.000"
            className="w-full bg-transparent font-display text-3xl text-ink placeholder:text-ink/25 outline-none sm:text-4xl"
          />
        </div>
      </label>
      <p className="mt-3 text-sm text-ink/60">
        Masukkan total penghasilan bersih per bulan sebagai dasar simulasi tabungan dan pinjaman.
        {penghasilan > 0 && (
          <span className="ml-1 font-medium text-forest">{formatRupiah(penghasilan)} / bulan.</span>
        )}
      </p>
    </div>
  );
}
