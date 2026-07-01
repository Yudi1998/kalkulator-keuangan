"use client";

import { useMemo, useState } from "react";
import IncomeInput from "@/components/IncomeInput";
import SavingsCalculator from "@/components/SavingsCalculator";
import LoanCalculator from "@/components/LoanCalculator";
import AllocationReceipt from "@/components/AllocationReceipt";
import {
  hitungHasilTabungan,
  hitungSetoranUntukTarget,
  hitungAngsuranPinjaman,
} from "@/lib/finance";

export default function Home() {
  const [penghasilan, setPenghasilan] = useState(8000000);

  const [tabunganState, setTabunganState] = useState({
    mode: "setoran",
    setoran: 1000000,
    target: 50000000,
    bunga: 4,
    tenor: 24,
  });

  const [pinjamanState, setPinjamanState] = useState({
    pokok: 30000000,
    bunga: 10,
    tenor: 12,
  });

  const hasilTabungan = useMemo(() => {
    const { mode, setoran, target, bunga, tenor } = tabunganState;
    if (!tenor) return null;
    if (mode === "setoran") {
      if (!setoran) return null;
      return hitungHasilTabungan(setoran, bunga || 0, tenor);
    }
    if (!target) return null;
    return hitungSetoranUntukTarget(target, bunga || 0, tenor);
  }, [tabunganState]);

  const hasilPinjaman = useMemo(() => {
    const { pokok, bunga, tenor } = pinjamanState;
    if (!pokok || !tenor) return null;
    return hitungAngsuranPinjaman(pokok, bunga || 0, tenor);
  }, [pinjamanState]);

  const setoranUntukStruk =
    tabunganState.mode === "setoran" ? tabunganState.setoran : hasilTabungan?.setoran || 0;

  return (
    <main className="min-h-screen px-4 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 sm:mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-forest/70">
            Kalkulator Keuangan Pribadi
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
            Rencanakan tabungan &amp; pinjaman Anda,{" "}
            <span className="italic text-forest">berdasarkan penghasilan sendiri.</span>
          </h1>
          <p className="mt-4 max-w-xl text-ink/60">
            Masukkan penghasilan bulanan, lalu simulasikan target tabungan dan angsuran
            pinjaman. Hasilnya dirangkum dalam struk keuangan di bagian bawah.
          </p>
        </header>

        <div className="grid gap-6">
          <IncomeInput penghasilan={penghasilan} setPenghasilan={setPenghasilan} />

          <div className="grid gap-6 lg:grid-cols-2">
            <SavingsCalculator
              state={tabunganState}
              setState={setTabunganState}
              hasil={hasilTabungan}
              penghasilan={penghasilan}
            />
            <LoanCalculator
              state={pinjamanState}
              setState={setPinjamanState}
              hasil={hasilPinjaman}
              penghasilan={penghasilan}
            />
          </div>
        </div>

        <div className="mt-14 sm:mt-20">
          <AllocationReceipt
            penghasilan={penghasilan}
            setoranTabungan={setoranUntukStruk}
            angsuranPinjaman={hasilPinjaman?.angsuran || 0}
          />
        </div>

        <footer className="mt-16 text-center">
          <p className="font-mono text-[11px] text-ink/35">
            Dibangun dengan Next.js — angka bersifat estimasi, bukan pengganti konsultasi finansial profesional.
          </p>
        </footer>
      </div>
    </main>
  );
}
