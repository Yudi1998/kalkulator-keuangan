import { formatRupiah, parseAngka } from "@/lib/finance";

export default function SavingsCalculator({ state, setState, hasil, penghasilan }) {
  const { mode, setoran, target, bunga, tenor } = state;
  const update = (key) => (e) => {
    const val = ["mode"].includes(key) ? e : parseAngka(e.target.value);
    setState((s) => ({ ...s, [key]: val }));
  };

  const persenDariPenghasilan =
    penghasilan > 0
      ? ((mode === "setoran" ? setoran : hasil?.setoran || 0) / penghasilan) * 100
      : 0;

  return (
    <div className="rounded-2xl border border-forest/15 bg-sage/40 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-forest/70">
          02 — Tabungan
        </p>
        <div className="flex rounded-full border border-forest/20 bg-white/70 p-0.5 text-xs font-medium">
          <button
            onClick={() => setState((s) => ({ ...s, mode: "setoran" }))}
            className={`rounded-full px-3 py-1 transition-colors ${
              mode === "setoran" ? "bg-forest text-white" : "text-forest/70 hover:text-forest"
            }`}
          >
            Dari setoran
          </button>
          <button
            onClick={() => setState((s) => ({ ...s, mode: "target" }))}
            className={`rounded-full px-3 py-1 transition-colors ${
              mode === "target" ? "bg-forest text-white" : "text-forest/70 hover:text-forest"
            }`}
          >
            Dari target
          </button>
        </div>
      </div>

      <h3 className="mt-3 font-display text-xl text-ink sm:text-2xl">
        {mode === "setoran"
          ? "Berapa hasil tabungan saya nanti?"
          : "Berapa saya harus menabung per bulan?"}
      </h3>

      <div className="mt-5 grid grid-cols-2 gap-4">
        {mode === "setoran" ? (
          <Field label="Setoran per bulan" prefix="Rp" value={setoran} onChange={update("setoran")} placeholder="1.000.000" />
        ) : (
          <Field label="Target dana" prefix="Rp" value={target} onChange={update("target")} placeholder="50.000.000" />
        )}
        <Field label="Bunga / imbal hasil per tahun" suffix="%" value={bunga} onChange={update("bunga")} placeholder="4" />
        <Field label="Jangka waktu" suffix="bulan" value={tenor} onChange={update("tenor")} placeholder="24" />
      </div>

      {hasil && (
        <div className="mt-6 space-y-2 border-t border-dashed border-forest/25 pt-5">
          {mode === "setoran" ? (
            <>
              <Baris label="Total setoran" nilai={hasil.totalSetoran} />
              <Baris label="Estimasi bunga" nilai={hasil.totalBunga} />
              <Baris label="Hasil akhir" nilai={hasil.hasilAkhir} tebal />
            </>
          ) : (
            <>
              <Baris label="Setoran per bulan dibutuhkan" nilai={hasil.setoran} tebal />
              <Baris label="Total setoran" nilai={hasil.totalSetoran} />
              <Baris label="Estimasi bunga" nilai={hasil.totalBunga} />
            </>
          )}
          {penghasilan > 0 && (
            <p className="pt-1 text-xs text-ink/60">
              Setara {persenDariPenghasilan.toFixed(1)}% dari penghasilan bulanan Anda.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function Field({ label, prefix, suffix, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-ink/60">{label}</span>
      <div className="mt-1 flex items-center gap-1 rounded-lg border border-forest/20 bg-white/80 px-3 py-2 focus-within:border-forest">
        {prefix && <span className="font-mono text-sm text-ink/40">{prefix}</span>}
        <input
          inputMode="numeric"
          value={value ? value.toLocaleString("id-ID") : ""}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent font-mono text-sm text-ink outline-none placeholder:text-ink/25"
        />
        {suffix && <span className="font-mono text-sm text-ink/40">{suffix}</span>}
      </div>
    </label>
  );
}

function Baris({ label, nilai, tebal }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className={`text-sm ${tebal ? "font-medium text-ink" : "text-ink/60"}`}>{label}</span>
      <span className={`font-mono text-sm tabular-nums ${tebal ? "font-semibold text-forest" : "text-ink/80"}`}>
        {formatRupiah(nilai)}
      </span>
    </div>
  );
}
