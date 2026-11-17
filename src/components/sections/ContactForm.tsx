"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import { getBrowserSupabase } from "@/lib/supabase";

export function ContactForm() {
  const [senderName, setSenderName] = useState("");
  const [senderOrigin, setSenderOrigin] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!senderName.trim() || !subject.trim() || !message.trim()) {
      setStatus("error");
      setErrorMessage("Mohon lengkapi nama pengirim, subjek, dan isi pesan.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const supabase = getBrowserSupabase();
    if (!supabase) {
      setStatus("error");
      setErrorMessage("Koneksi database belum tersedia saat ini.");
      return;
    }

    const { error } = await supabase.from("contact_messages").insert({
      sender_name: senderName.trim(),
      sender_origin: senderOrigin.trim() || "Pengunjung Publik",
      subject: subject.trim(),
      message: message.trim(),
    });

    if (error) {
      setStatus("error");
      setErrorMessage(`Gagal mengirim pesan: ${error.message}`);
      return;
    }

    setStatus("success");
    setSenderName("");
    setSenderOrigin("");
    setSubject("");
    setMessage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#DCE2EC] bg-[#FFFFFF] p-6 sm:p-8 rounded-[2px] space-y-5"
    >
      <div className="border-b border-[#DCE2EC] pb-4">
        <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
          KIRIM PESAN LANGSUNG
        </p>
        <h2 className="font-display text-2xl font-bold text-[#0F172A] mt-1">
          Formulir Komunikasi Kelas
        </h2>
      </div>

      {status === "success" && (
        <div
          role="status"
          className="border border-emerald-200 bg-emerald-50 text-emerald-900 p-4 rounded-[2px] flex items-start gap-3 text-sm"
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Pesan berhasil dikirim dan tersimpan.</p>
            <p className="text-emerald-800 mt-0.5">
              Wali Kelas atau Pengurus XI TKJ 1 dapat membaca pesan Anda di Studio Pengelolaan.
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="border border-red-200 bg-red-50 text-red-900 p-4 rounded-[2px] flex items-start gap-3 text-sm"
        >
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="sender_name"
            className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]"
          >
            Nama Lengkap / Instansi *
          </label>
          <input
            id="sender_name"
            type="text"
            required
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Contoh: Bpk. Budi / PT Jaringan Nusantara"
            className="w-full px-3.5 py-2.5 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px] text-[#0F172A] focus:bg-[#FFFFFF] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="sender_origin"
            className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]"
          >
            Asal / Keterangan (Opsional)
          </label>
          <input
            id="sender_origin"
            type="text"
            value={senderOrigin}
            onChange={(e) => setSenderOrigin(e.target.value)}
            placeholder="Guru / Orang Tua / Mitra Industri / Tamu"
            className="w-full px-3.5 py-2.5 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px] text-[#0F172A] focus:bg-[#FFFFFF] focus:border-[#2563EB] focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="subject"
          className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]"
        >
          Subjek Pesan *
        </label>
        <input
          id="subject"
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Contoh: Kolaborasi Proyek / Informasi PKL / Masukan"
          className="w-full px-3.5 py-2.5 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px] text-[#0F172A] focus:bg-[#FFFFFF] focus:border-[#2563EB] focus:outline-none"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]"
        >
          Isi Pesan *
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tuliskan pesan Anda secara jelas..."
          className="w-full px-3.5 py-2.5 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px] text-[#0F172A] focus:bg-[#FFFFFF] focus:border-[#2563EB] focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0E17] hover:bg-[#2563EB] disabled:opacity-60 text-white text-sm font-medium rounded-[2px] transition-colors"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        <span>{status === "submitting" ? "Mengirim Pesan..." : "Kirim Pesan"}</span>
      </button>
    </form>
  );
}
