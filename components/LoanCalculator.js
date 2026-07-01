import { formatRupiah, parseAngka, hitungDSR } from "@/lib/finance";

export default function LoanCalculator({ state, setState, hasil, penghasilan }) {
  const { pokok, bunga, tenor } = state;
  const update = (key) => (e) => {
    setState((s) => ({ ...s, [key]: parseAngka(e.target.value) }));
  };

  const dsr = hasil && penghasilan ? hitungDSR(hasil.angsuran, penghasilan) : 0;
  const statusDSR =
    dsr === 0 ? null : dsr <= 30 ? "aman" : dsr <= 35 ? "waspada" : "berisiko";

  return (
    <div className="rounded-2xl border border-rust/15 bg-white/60 p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-rust/70">
        03 — Pinjaman
      </p>
      <h3 className="mt-3 font-display text-xl text-ink sm:text-2xl">
        Berapa angsuran bulanan saya?
      </h3>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <Field label="Jumlah pinjaman" prefix="Rp" value={pokok} onChange={update("pokok")} placeholder="30.000.000" />
        <Field label="Bunga per tahun" suffix="%" value={bunga} onChange={update("bunga")} placeholder="10" />
        <Field label="Tenor" suffix="bulan" value={tenor} onChange={update("tenor")} placeholder="12" />
      </div>

      {hasil && (
        <div className="mt-6 space-y-2 border-t border-dashed border-rust/25 pt-5">
          <Baris label="Angsuran per bulan" nilai={hasil.angsuran} tebal />
          <Baris label="Total bunga" nilai={hasil.totalBunga} />
          <Baris label="Total pembayaran" nilai={hasil.totalBayar} />

          {statusDSR && (
            <div
              className={`mt-3 rounded-lg px-3 py-2 text-xs font-medium ${
                statusDSR === "aman"
                  ? "bg-forest/10 text-forestdark"
                  : statusDSR === "waspada"
                  ? "bg-gold/20 text-[#7A5A16]"
                  : "bg-rust/10 text-rust"
              }`}
            >
              Angsuran = {dsr.toFixed(1)}% dari penghasilan —{" "}
              {statusDSR === "aman"
                ? "masih dalam batas sehat (di bawah 30%)."
                : statusDSR === "waspada"
                ? "mendekati batas wajar (30–35%), pertimbangkan tenor lebih panjang."
                : "melebihi batas aman (>35%), berisiko memberatkan arus kas bulanan."}
            </div>
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
      <div className="mt-1 flex items-center gap-1 rounded-lg border border-rust/20 bg-white/80 px-3 py-2 focus-within:border-rust">
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
      <span className={`font-mono text-sm tabular-nums ${tebal ? "font-semibold text-rust" : "text-ink/80"}`}>
        {formatRupiah(nilai)}
      </span>
    </div>
  );
}
