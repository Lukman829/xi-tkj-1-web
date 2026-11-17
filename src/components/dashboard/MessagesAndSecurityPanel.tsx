"use client";

import { useState, type FormEvent } from "react";
import { KeyRound, Mail, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import type { ContactMessage } from "@/types";
import { getBrowserSupabase } from "@/lib/supabase";
import { formatIndonesianDate } from "@/lib/utils";

interface MessagesAndSecurityPanelProps {
  passcode: string;
  messages: ContactMessage[];
  onReloadMessages: () => Promise<void>;
  onPasscodeChanged: (newPasscode: string) => void;
}

export function MessagesAndSecurityPanel({
  passcode,
  messages,
  onReloadMessages,
  onPasscodeChanged,
}: MessagesAndSecurityPanelProps) {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [savingPass, setSavingPass] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleDeleteMessage(id: string) {
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    await supabase.rpc("admin_delete_message", {
      passcode_input: passcode,
      target_id: id,
    });
    await onReloadMessages();
  }

  async function handleChangePasscode(e: FormEvent) {
    e.preventDefault();
    setFeedback(null);
    if (newPass.trim().length < 6) {
      setFeedback({
        type: "error",
        text: "Kata sandi baru minimal harus terdiri dari 6 karakter.",
      });
      return;
    }
    if (newPass !== confirmPass) {
      setFeedback({
        type: "error",
        text: "Konfirmasi kata sandi tidak cocok.",
      });
      return;
    }

    setSavingPass(true);
    const supabase = getBrowserSupabase();
    if (!supabase) return;

    const { error } = await supabase.rpc("admin_change_passcode", {
      current_passcode: passcode,
      new_passcode: newPass.trim(),
    });
    setSavingPass(false);

    if (error) {
      setFeedback({ type: "error", text: error.message });
      return;
    }

    onPasscodeChanged(newPass.trim());
    setNewPass("");
    setConfirmPass("");
    setFeedback({
      type: "success",
      text: "Kata sandi Studio Pengelolaan berhasil diperbarui.",
    });
  }

  return (
    <div className="space-y-8">
      {/* Section 1: Incoming Messages */}
      <div className="border border-[#DCE2EC] bg-[#FFFFFF] p-6 rounded-[2px] space-y-4">
        <div className="border-b border-[#DCE2EC] pb-3 flex items-center justify-between">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
              KOTAK MASUK // KONTAK PUBLIK
            </p>
            <h2 className="font-display text-xl font-bold text-[#0F172A]">
              Pesan Pengunjung ({messages.length})
            </h2>
          </div>
          <Mail className="h-5 w-5 text-[#2563EB]" />
        </div>

        {messages.length === 0 ? (
          <p className="text-sm text-[#64748B] py-4">
            Belum ada pesan masuk dari halaman Kontak.
          </p>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="border border-[#DCE2EC] bg-[#F6F7FA] p-4 rounded-[2px] space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-display font-bold text-[#0F172A]">
                      {msg.subject}
                    </span>
                    <p className="text-xs text-[#475569]">
                      Dari: <strong>{msg.sender_name}</strong> ({msg.sender_origin}) ·{" "}
                      {formatIndonesianDate(msg.created_at)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 border border-red-200 bg-white text-red-700 text-xs font-mono-tech rounded-[2px]"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Arsipkan
                  </button>
                </div>
                <p className="text-sm text-[#0F172A] leading-relaxed whitespace-pre-line">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: Security Passcode */}
      <form
        onSubmit={handleChangePasscode}
        className="border border-[#DCE2EC] bg-[#FFFFFF] p-6 rounded-[2px] space-y-4 max-w-xl"
      >
        <div className="border-b border-[#DCE2EC] pb-3 flex items-center justify-between">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
              KEAMANAN AKSES
            </p>
            <h2 className="font-display text-xl font-bold text-[#0F172A]">
              Ubah Kata Sandi Pengelola
            </h2>
          </div>
          <KeyRound className="h-5 w-5 text-[#2563EB]" />
        </div>

        {feedback && (
          <div
            className={`p-3 border rounded-[2px] flex items-center gap-2 text-sm ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-red-50 border-red-200 text-red-900"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        <div className="space-y-3">
          <input
            type="password"
            required
            minLength={6}
            placeholder="Kata sandi baru (min. 6 karakter)"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Ulangi kata sandi baru"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
          />
        </div>

        <button
          type="submit"
          disabled={savingPass}
          className="px-5 py-2.5 bg-[#0A0E17] hover:bg-[#2563EB] text-white text-xs font-mono-tech uppercase tracking-[0.06em] rounded-[2px] transition-colors"
        >
          {savingPass ? "Memperbarui..." : "Simpan Kata Sandi Baru"}
        </button>
      </form>
    </div>
  );
}
