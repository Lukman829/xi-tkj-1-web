"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Save, Upload, CheckCircle2, AlertCircle, RotateCcw } from "lucide-react";
import type { ClassSettings } from "@/types";
import { getBrowserSupabase, uploadClassMedia } from "@/lib/supabase";
import { TkjLogoSlot } from "@/components/ui/TkjLogoSlot";

interface SettingsPanelProps {
  passcode: string;
  initialSettings: ClassSettings;
  onUpdated: (updated: ClassSettings) => void;
}

export function SettingsPanel({
  passcode,
  initialSettings,
  onUpdated,
}: SettingsPanelProps) {
  const [form, setForm] = useState<ClassSettings>(initialSettings);
  const [missionText, setMissionText] = useState(
    (initialSettings.mission_items || []).join("\n")
  );
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingWalas, setUploadingWalas] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleLogoUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    setFeedback(null);

    const { publicUrl, error } = await uploadClassMedia(file, "branding");
    setUploadingLogo(false);

    if (error || !publicUrl) {
      setFeedback({
        type: "error",
        text: `Gagal mengunggah Logo TKJ: ${error || "kesalahan tidak diketahui"}`,
      });
      return;
    }

    setForm((prev) => ({ ...prev, logo_tkj_url: publicUrl }));
    setFeedback({
      type: "success",
      text: "Logo TKJ berhasil diunggah! Jangan lupa klik 'Simpan Pengaturan' di bawah untuk menerapkan.",
    });
  }

  async function handleWalasPhotoUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingWalas(true);
    setFeedback(null);

    const { publicUrl, error } = await uploadClassMedia(file, "walas");
    setUploadingWalas(false);

    if (error || !publicUrl) {
      setFeedback({
        type: "error",
        text: `Gagal mengunggah foto Wali Kelas: ${error || "kesalahan tidak diketahui"}`,
      });
      return;
    }

    setForm((prev) => ({ ...prev, homeroom_teacher_photo_url: publicUrl }));
    setFeedback({
      type: "success",
      text: "Foto Wali Kelas berhasil diunggah! Jangan lupa klik 'Simpan Pengaturan'.",
    });
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const supabase = getBrowserSupabase();
    if (!supabase) {
      setFeedback({ type: "error", text: "Koneksi Supabase tidak tersedia." });
      setSaving(false);
      return;
    }

    const missionItems = missionText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const payload = {
      ...form,
      mission_items: missionItems,
    };

    const { data, error } = await supabase.rpc("admin_update_settings", {
      passcode_input: passcode,
      payload,
    });

    setSaving(false);

    if (error) {
      setFeedback({
        type: "error",
        text: `Gagal menyimpan pengaturan: ${error.message}`,
      });
      return;
    }

    if (data) {
      onUpdated(data as ClassSettings);
      setForm(data as ClassSettings);
    }
    setFeedback({
      type: "success",
      text: "Seluruh identitas kelas, Logo TKJ, dan profil Wali Kelas berhasil diperbarui secara live.",
    });
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {feedback && (
        <div
          role="status"
          className={`p-4 border rounded-[2px] flex items-start gap-3 text-sm ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-red-50 border-red-200 text-red-900"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <p>{feedback.text}</p>
        </div>
      )}

      {/* Card 1: Slot Logo TKJ */}
      <div className="border border-[#DCE2EC] bg-[#FFFFFF] p-6 rounded-[2px] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE2EC] pb-3">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
              01 // BRANDING JURUSAN
            </p>
            <h2 className="font-display text-xl font-bold text-[#0F172A]">
              Pengaturan Logo TKJ
            </h2>
          </div>
          {form.logo_tkj_url && (
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, logo_tkj_url: null }))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#DCE2EC] text-xs font-mono-tech text-[#475569] hover:text-[#0F172A] rounded-[2px]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Gunakan Emblem Bawaan
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <TkjLogoSlot logoUrl={form.logo_tkj_url} size="hero" surface="light" />
          <div className="flex-1 space-y-3 w-full">
            <div>
              <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A0E17] hover:bg-[#2563EB] text-white text-xs font-mono-tech uppercase tracking-[0.06em] rounded-[2px] cursor-pointer transition-colors">
                <Upload className="h-3.5 w-3.5" />
                <span>{uploadingLogo ? "Mengunggah Logo..." : "Unggah File Logo TKJ (PNG/SVG/WebP)"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={uploadingLogo}
                  className="sr-only"
                />
              </label>
            </div>
            <div className="space-y-1">
              <label className="block font-mono-tech text-[10px] uppercase tracking-[0.06em] text-[#64748B]">
                Atau tempel URL gambar logo secara langsung
              </label>
              <input
                type="url"
                value={form.logo_tkj_url || ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, logo_tkj_url: e.target.value || null }))
                }
                placeholder="https://..."
                className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Profil Wali Kelas (Walas) — STRICTLY NO STUDENT NAMES */}
      <div className="border border-[#DCE2EC] bg-[#FFFFFF] p-6 rounded-[2px] space-y-5">
        <div className="border-b border-[#DCE2EC] pb-3">
          <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
            02 // PROFIL WALI KELAS (WALAS)
          </p>
          <h2 className="font-display text-xl font-bold text-[#0F172A]">
            Data & Sambutan Wali Kelas
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Sesuai ketentuan privasi kelas, bagian ini hanya memuat profil Wali Kelas (tanpa daftar nama siswa).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4 space-y-3">
            <div className="aspect-[4/5] w-44 border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px] overflow-hidden flex items-center justify-center">
              {form.homeroom_teacher_photo_url ? (
                <img
                  src={form.homeroom_teacher_photo_url}
                  alt="Preview Foto Wali Kelas"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-mono-tech text-xs text-[#64748B] text-center px-3">
                  BELUM ADA FOTO WALAS
                </span>
              )}
            </div>
            <label className="inline-flex items-center gap-2 px-3.5 py-2 border border-[#DCE2EC] bg-[#F6F7FA] hover:border-[#2563EB] text-xs font-mono-tech uppercase tracking-[0.06em] text-[#0F172A] rounded-[2px] cursor-pointer">
              <Upload className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>{uploadingWalas ? "Mengunggah..." : "Unggah Foto Walas"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleWalasPhotoUpload}
                disabled={uploadingWalas}
                className="sr-only"
              />
            </label>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]">
                  Nama Lengkap & Gelar Wali Kelas
                </label>
                <input
                  type="text"
                  required
                  value={form.homeroom_teacher_name}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      homeroom_teacher_name: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
                />
              </div>
              <div className="space-y-1">
                <label className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]">
                  Jabatan / Bidang Mengajar
                </label>
                <input
                  type="text"
                  required
                  value={form.homeroom_teacher_role}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      homeroom_teacher_role: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]">
                Pesan / Kutipan Sambutan Wali Kelas
              </label>
              <textarea
                rows={4}
                required
                value={form.homeroom_teacher_quote}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    homeroom_teacher_quote: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Identitas Umum, Narasi, Visi-Misi & Kontak */}
      <div className="border border-[#DCE2EC] bg-[#FFFFFF] p-6 rounded-[2px] space-y-5">
        <div className="border-b border-[#DCE2EC] pb-3">
          <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
            03 // IDENTITAS & NARASI WEBSITE
          </p>
          <h2 className="font-display text-xl font-bold text-[#0F172A]">
            Informasi Kelas, Visi-Misi & Saluran Kontak
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]">
              Nama Kelas
            </label>
            <input
              type="text"
              required
              value={form.class_name}
              onChange={(e) => setForm((p) => ({ ...p, class_name: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]">
              Nama Sekolah
            </label>
            <input
              type="text"
              required
              value={form.school_name}
              onChange={(e) => setForm((p) => ({ ...p, school_name: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]">
              Tahun Ajaran
            </label>
            <input
              type="text"
              required
              value={form.academic_year}
              onChange={(e) => setForm((p) => ({ ...p, academic_year: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]">
            Judul Utama Hero Beranda
          </label>
          <input
            type="text"
            required
            value={form.hero_headline}
            onChange={(e) => setForm((p) => ({ ...p, hero_headline: e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]">
            Subjudul Hero Beranda
          </label>
          <textarea
            rows={2}
            required
            value={form.hero_subheadline}
            onChange={(e) => setForm((p) => ({ ...p, hero_subheadline: e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]">
            Cerita & Pengantar Kelas (Tentang Kami)
          </label>
          <textarea
            rows={3}
            required
            value={form.about_story}
            onChange={(e) => setForm((p) => ({ ...p, about_story: e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]">
              Filosofi Pembelajaran
            </label>
            <textarea
              rows={3}
              required
              value={form.philosophy_text}
              onChange={(e) => setForm((p) => ({ ...p, philosophy_text: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]">
              Visi Kelas
            </label>
            <textarea
              rows={3}
              required
              value={form.vision_text}
              onChange={(e) => setForm((p) => ({ ...p, vision_text: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]">
            Poin-Poin Misi (Satu baris untuk satu poin misi)
          </label>
          <textarea
            rows={4}
            value={missionText}
            onChange={(e) => setMissionText(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#DCE2EC]">
          <div className="space-y-1">
            <label className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]">
              Email Resmi Kelas
            </label>
            <input
              type="text"
              value={form.contact_email || ""}
              onChange={(e) => setForm((p) => ({ ...p, contact_email: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]">
              Instagram / Media Sosial
            </label>
            <input
              type="text"
              value={form.contact_instagram || ""}
              onChange={(e) => setForm((p) => ({ ...p, contact_instagram: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-mono-tech text-xs uppercase tracking-[0.06em] text-[#475569]">
              Lokasi Lab / Kelas
            </label>
            <input
              type="text"
              value={form.contact_location || ""}
              onChange={(e) => setForm((p) => ({ ...p, contact_location: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white text-sm font-medium rounded-[2px] transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? "Menyimpan Perubahan..." : "Simpan Seluruh Pengaturan"}</span>
        </button>
      </div>
    </form>
  );
}
