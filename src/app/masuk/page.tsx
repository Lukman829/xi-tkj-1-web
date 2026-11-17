"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, KeyRound, ShieldCheck, AlertCircle } from "lucide-react";
import { getBrowserSupabase } from "@/lib/supabase";

export default function MasukPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("tkj1_admin_passcode");
    if (saved) {
      router.replace("/dashboard");
    }
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!passcode.trim()) {
      setError("Masukkan kata sandi pengelola terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError("");

    const supabase = getBrowserSupabase();
    if (!supabase) {
      setError("Koneksi Supabase belum terkonfigurasi.");
      setLoading(false);
      return;
    }

    const { data, error: rpcError } = await supabase.rpc("verify_admin_passcode", {
      passcode_input: passcode,
    });

    if (rpcError) {
      setError(`Gagal memverifikasi akses: ${rpcError.message}`);
      setLoading(false);
      return;
    }

    if (data !== true) {
      setError("Kata sandi pengelola tidak valid. Silakan periksa kembali.");
      setLoading(false);
      return;
    }

    sessionStorage.setItem("tkj1_admin_passcode", passcode);
    router.push("/dashboard");
  }

  return (
    <section className="min-h-[82vh] bg-[#0A0E17] bg-arch-grid-dark text-[#F8FAFC] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md border border-[#1E293B] bg-[#111827] p-6 sm:p-8 rounded-[2px] space-y-6">
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
          <span className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.08em] text-[#3B82F6]">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            STUDIO PENGELOLAAN
          </span>
          <Link
            href="/"
            className="inline-flex items-center gap-1 font-mono-tech text-[11px] uppercase tracking-[0.06em] text-[#94A3B8] hover:text-[#F8FAFC]"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden="true" />
            Beranda
          </Link>
        </div>

        <div className="space-y-2">
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em]">
            Masuk Pengelola XI TKJ 1
          </h1>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            Akses khusus Wali Kelas dan Pengurus yang ditunjuk untuk memperbarui Logo TKJ, profil Wali Kelas, proyek, kegiatan, galeri, prestasi, serta pengumuman.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="border border-red-500/40 bg-red-950/50 text-red-200 p-3.5 rounded-[2px] flex items-start gap-2.5 text-sm"
          >
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="passcode"
              className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#94A3B8]"
            >
              Kata Sandi Pengelola
            </label>
            <div className="relative">
              <KeyRound
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]"
                aria-hidden="true"
              />
              <input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Masukkan kata sandi..."
                autoComplete="current-password"
                className="w-full pl-10 pr-4 py-3 bg-[#0A0E17] border border-[#1E293B] rounded-[2px] text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:border-[#3B82F6] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#2563EB] hover:bg-[#3B82F6] disabled:opacity-60 text-white text-sm font-medium rounded-[2px] transition-colors"
          >
            {loading ? "Memverifikasi Akses..." : "Masuk ke Studio Pengelolaan"}
          </button>
        </form>

        <div className="border-t border-[#1E293B] pt-4 text-xs text-[#94A3B8] space-y-1">
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.08em] text-[#3B82F6]">
            INFO AKSES AWAL
          </p>
          <p>
            Kata sandi bawaan awal sistem adalah{" "}
            <code className="bg-[#0A0E17] border border-[#1E293B] px-1.5 py-0.5 text-[#F8FAFC] rounded-[2px]">
              tkj1admin
            </code>
            . Segera ubah kata sandi melalui menu <strong>Pesan & Keamanan</strong> setelah login pertama.
          </p>
        </div>
      </div>
    </section>
  );
}
