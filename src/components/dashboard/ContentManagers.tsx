"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Plus, Trash2, Edit3, Upload, CheckCircle2, AlertCircle, X } from "lucide-react";
import type {
  AchievementCategory,
  AchievementItem,
  ActivityCategory,
  ActivityItem,
  AnnouncementCategory,
  AnnouncementItem,
  GalleryCategory,
  GalleryItem,
  ProjectCategory,
  ProjectItem,
} from "@/types";
import { getBrowserSupabase, uploadClassMedia } from "@/lib/supabase";
import { slugify } from "@/lib/utils";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";

/* ============================================================
   1. PROJECT MANAGER (PROYEK TKJ)
   ============================================================ */
export function ProjectsManager({
  passcode,
  items,
  onReload,
}: {
  passcode: string;
  items: ProjectItem[];
  onReload: () => Promise<void>;
}) {
  const [editing, setEditing] = useState<Partial<ProjectItem> | null>(null);
  const [techInput, setTechInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function startNew() {
    setEditing({
      title: "",
      category: "Networking",
      team_unit: "Tim Praktikum XI TKJ 1",
      summary: "",
      architecture_details: "",
      technologies: [],
      result_output: "",
      image_url: null,
      is_featured: true,
      is_placeholder: false,
    });
    setTechInput("MikroTik, VLAN");
    setNotice(null);
  }

  function startEdit(item: ProjectItem) {
    setEditing(item);
    setTechInput((item.technologies || []).join(", "));
    setNotice(null);
  }

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    const { publicUrl, error } = await uploadClassMedia(file, "projects");
    setUploading(false);
    if (error || !publicUrl) {
      setNotice(`Gagal unggah gambar: ${error}`);
      return;
    }
    setEditing({ ...editing, image_url: publicUrl });
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    setNotice(null);
    const supabase = getBrowserSupabase();
    if (!supabase) return;

    const technologies = techInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const { error } = await supabase.rpc("admin_save_project", {
      passcode_input: passcode,
      payload: {
        id: editing.id || null,
        title: editing.title,
        slug: editing.slug || slugify(editing.title || "proyek"),
        category: editing.category,
        team_unit: editing.team_unit || "Tim Praktikum XI TKJ 1",
        summary: editing.summary,
        architecture_details: editing.architecture_details,
        technologies,
        result_output: editing.result_output,
        image_url: editing.image_url || "",
        is_featured: Boolean(editing.is_featured),
        is_placeholder: false,
      },
    });
    setSaving(false);
    if (error) {
      setNotice(`Gagal menyimpan: ${error.message}`);
      return;
    }
    setEditing(null);
    await onReload();
  }

  async function handleDelete(id: string) {
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    await supabase.rpc("admin_delete_project", {
      passcode_input: passcode,
      target_id: id,
    });
    await onReload();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-[#0F172A]">
            Manajemen Proyek TKJ ({items.length})
          </h2>
          <p className="text-xs text-[#64748B]">
            Atur portofolio teknis kelas (Networking, Server, Hardware, Web, Cybersecurity, IoT).
          </p>
        </div>
        <button
          type="button"
          onClick={startNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono-tech uppercase tracking-[0.06em] rounded-[2px]"
        >
          <Plus className="h-4 w-4" />
          Tambah Proyek
        </button>
      </div>

      {notice && (
        <div className="border border-red-200 bg-red-50 text-red-800 p-3 text-sm rounded-[2px] flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {editing && (
        <form
          onSubmit={handleSave}
          className="border border-[#2563EB] bg-[#FFFFFF] p-6 rounded-[2px] space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#DCE2EC] pb-3">
            <span className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
              {editing.id ? "EDIT PROYEK" : "PROYEK BARU"}
            </span>
            <button type="button" onClick={() => setEditing(null)}>
              <X className="h-4 w-4 text-[#64748B]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-mono-tech text-xs uppercase text-[#475569]">
                Judul Proyek *
              </label>
              <input
                type="text"
                required
                value={editing.title || ""}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-mono-tech text-xs uppercase text-[#475569]">
                Kategori *
              </label>
              <select
                value={editing.category || "Networking"}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    category: e.target.value as ProjectCategory,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
              >
                {[
                  "Networking",
                  "Server Administration",
                  "Hardware",
                  "Web Development",
                  "Cybersecurity",
                  "IoT",
                ].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-mono-tech text-xs uppercase text-[#475569]">
                Unit / Tim Pelaksana (Tanpa Nama Siswa)
              </label>
              <input
                type="text"
                required
                value={editing.team_unit || ""}
                onChange={(e) =>
                  setEditing({ ...editing, team_unit: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-mono-tech text-xs uppercase text-[#475569]">
                Teknologi (Pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="MikroTik, VLAN 802.1Q, Debian"
                className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-mono-tech text-xs uppercase text-[#475569]">
              Ringkasan Proyek *
            </label>
            <textarea
              rows={2}
              required
              value={editing.summary || ""}
              onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-mono-tech text-xs uppercase text-[#475569]">
              Detail Arsitektur & Konfigurasi *
            </label>
            <textarea
              rows={3}
              required
              value={editing.architecture_details || ""}
              onChange={(e) =>
                setEditing({ ...editing, architecture_details: e.target.value })
              }
              className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-mono-tech text-xs uppercase text-[#475569]">
              Hasil Uji / Output *
            </label>
            <input
              type="text"
              required
              value={editing.result_output || ""}
              onChange={(e) =>
                setEditing({ ...editing, result_output: e.target.value })
              }
              className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 px-3 py-2 border border-[#DCE2EC] bg-[#F6F7FA] text-xs font-mono-tech rounded-[2px] cursor-pointer">
                <Upload className="h-3.5 w-3.5 text-[#2563EB]" />
                <span>{uploading ? "Mengunggah..." : "Unggah Foto Proyek"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                />
              </label>
              {editing.image_url && (
                <span className="text-xs text-emerald-700 inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Gambar siap
                </span>
              )}
            </div>

            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(editing.is_featured)}
                onChange={(e) =>
                  setEditing({ ...editing, is_featured: e.target.checked })
                }
              />
              <span>Tampilkan di Beranda</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-4 py-2 border border-[#DCE2EC] text-xs font-mono-tech uppercase rounded-[2px]"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-[#0A0E17] hover:bg-[#2563EB] text-white text-xs font-mono-tech uppercase rounded-[2px]"
            >
              {saving ? "Menyimpan..." : "Simpan Proyek"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-[#DCE2EC] bg-[#FFFFFF] p-4 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono-tech text-[11px] uppercase text-[#2563EB]">
                  {item.category}
                </span>
                {item.is_placeholder && <PlaceholderBadge variant="light" />}
              </div>
              <h3 className="font-display font-bold text-[#0F172A]">
                {item.title}
              </h3>
              <p className="text-xs text-[#64748B]">{item.team_unit}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => startEdit(item)}
                className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#DCE2EC] hover:border-[#2563EB] text-xs font-mono-tech rounded-[2px]"
              >
                <Edit3 className="h-3.5 w-3.5" /> Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="inline-flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-700 hover:bg-red-50 text-xs font-mono-tech rounded-[2px]"
              >
                <Trash2 className="h-3.5 w-3.5" /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   2. ACTIVITIES MANAGER (KEGIATAN)
   ============================================================ */
export function ActivitiesManager({
  passcode,
  items,
  onReload,
}: {
  passcode: string;
  items: ActivityItem[];
  onReload: () => Promise<void>;
}) {
  const [editing, setEditing] = useState<Partial<ActivityItem> | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    const { publicUrl } = await uploadClassMedia(file, "activities");
    setUploading(false);
    if (publicUrl) setEditing({ ...editing, image_url: publicUrl });
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    await supabase.rpc("admin_save_activity", {
      passcode_input: passcode,
      payload: {
        id: editing.id || null,
        title: editing.title,
        activity_date: editing.activity_date,
        category: editing.category,
        description: editing.description,
        location: editing.location,
        image_url: editing.image_url || "",
        is_placeholder: false,
      },
    });
    setSaving(false);
    setEditing(null);
    await onReload();
  }

  async function handleDelete(id: string) {
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    await supabase.rpc("admin_delete_activity", {
      passcode_input: passcode,
      target_id: id,
    });
    await onReload();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-[#0F172A]">
            Manajemen Kegiatan Kelas ({items.length})
          </h2>
          <p className="text-xs text-[#64748B]">
            Kelola catatan praktikum lab dan kegiatan kebersamaan XI TKJ 1.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setEditing({
              title: "",
              activity_date: new Date().toISOString().slice(0, 10),
              category: "Praktikum Lab",
              description: "",
              location: "Laboratorium TKJ",
              image_url: null,
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono-tech uppercase rounded-[2px]"
        >
          <Plus className="h-4 w-4" /> Tambah Kegiatan
        </button>
      </div>

      {editing && (
        <form
          onSubmit={handleSave}
          className="border border-[#2563EB] bg-[#FFFFFF] p-6 rounded-[2px] space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              required
              placeholder="Judul Kegiatan *"
              value={editing.title || ""}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="sm:col-span-2 px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
            <input
              type="date"
              required
              value={editing.activity_date || ""}
              onChange={(e) =>
                setEditing({ ...editing, activity_date: e.target.value })
              }
              className="px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={editing.category || "Praktikum Lab"}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  category: e.target.value as ActivityCategory,
                })
              }
              className="px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            >
              {["Praktikum Lab", "Kegiatan Kelas", "Acara Sekolah", "Kolaborasi"].map(
                (c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                )
              )}
            </select>
            <input
              type="text"
              required
              placeholder="Lokasi (Misal: Lab TKJ 01)"
              value={editing.location || ""}
              onChange={(e) => setEditing({ ...editing, location: e.target.value })}
              className="px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>
          <textarea
            rows={3}
            required
            placeholder="Deskripsi kegiatan..."
            value={editing.description || ""}
            onChange={(e) =>
              setEditing({ ...editing, description: e.target.value })
            }
            className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="inline-flex items-center gap-2 px-3 py-2 border border-[#DCE2EC] bg-[#F6F7FA] text-xs font-mono-tech rounded-[2px] cursor-pointer">
              <Upload className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>{uploading ? "Mengunggah..." : "Unggah Foto Kegiatan"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="sr-only"
              />
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-4 py-2 border border-[#DCE2EC] text-xs font-mono-tech uppercase rounded-[2px]"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 bg-[#0A0E17] text-white text-xs font-mono-tech uppercase rounded-[2px]"
              >
                {saving ? "Menyimpan..." : "Simpan Kegiatan"}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-[#DCE2EC] bg-[#FFFFFF] p-4 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono-tech text-[11px] uppercase text-[#2563EB]">
                  {item.category} · {item.activity_date}
                </span>
                {item.is_placeholder && <PlaceholderBadge variant="light" />}
              </div>
              <h3 className="font-display font-bold text-[#0F172A]">{item.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditing(item)}
                className="px-3 py-1.5 border border-[#DCE2EC] text-xs font-mono-tech rounded-[2px]"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1.5 border border-red-200 text-red-700 text-xs font-mono-tech rounded-[2px]"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   3. GALLERY MANAGER (GALERI FOTO)
   ============================================================ */
export function GalleryManager({
  passcode,
  items,
  onReload,
}: {
  passcode: string;
  items: GalleryItem[];
  onReload: () => Promise<void>;
}) {
  const [editing, setEditing] = useState<Partial<GalleryItem> | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    const { publicUrl } = await uploadClassMedia(file, "gallery");
    setUploading(false);
    if (publicUrl) setEditing({ ...editing, image_url: publicUrl });
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    await supabase.rpc("admin_save_gallery", {
      passcode_input: passcode,
      payload: {
        id: editing.id || null,
        title: editing.title,
        category: editing.category,
        caption: editing.caption,
        image_url: editing.image_url || "",
        taken_date: editing.taken_date || "2026-11",
        aspect_ratio: editing.aspect_ratio || "16:10",
        is_placeholder: false,
      },
    });
    setSaving(false);
    setEditing(null);
    await onReload();
  }

  async function handleDelete(id: string) {
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    await supabase.rpc("admin_delete_gallery", {
      passcode_input: passcode,
      target_id: id,
    });
    await onReload();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-[#0F172A]">
            Manajemen Galeri Foto ({items.length})
          </h2>
          <p className="text-xs text-[#64748B]">
            Unggah foto dokumentasi ke Supabase Storage untuk ditampilkan di halaman Galeri.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setEditing({
              title: "",
              category: "Praktikum",
              caption: "",
              taken_date: new Date().toISOString().slice(0, 7),
              image_url: null,
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono-tech uppercase rounded-[2px]"
        >
          <Plus className="h-4 w-4" /> Tambah Foto
        </button>
      </div>

      {editing && (
        <form
          onSubmit={handleSave}
          className="border border-[#2563EB] bg-[#FFFFFF] p-6 rounded-[2px] space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              required
              placeholder="Judul Foto *"
              value={editing.title || ""}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="sm:col-span-2 px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
            <input
              type="text"
              required
              placeholder="Bulan (YYYY-MM)"
              value={editing.taken_date || ""}
              onChange={(e) =>
                setEditing({ ...editing, taken_date: e.target.value })
              }
              className="px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={editing.category || "Praktikum"}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  category: e.target.value as GalleryCategory,
                })
              }
              className="px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            >
              {["Praktikum", "Kebersamaan", "Infrastruktur", "Acara"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <label className="inline-flex items-center justify-center gap-2 px-3 py-2 border border-[#DCE2EC] bg-[#F6F7FA] text-xs font-mono-tech rounded-[2px] cursor-pointer">
              <Upload className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>
                {uploading
                  ? "Mengunggah ke Cloud..."
                  : editing.image_url
                    ? "Ganti File Foto"
                    : "Pilih & Unggah Foto"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="sr-only"
              />
            </label>
          </div>
          <textarea
            rows={2}
            required
            placeholder="Keterangan singkat foto..."
            value={editing.caption || ""}
            onChange={(e) => setEditing({ ...editing, caption: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-4 py-2 border border-[#DCE2EC] text-xs font-mono-tech uppercase rounded-[2px]"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-[#0A0E17] text-white text-xs font-mono-tech uppercase rounded-[2px]"
            >
              {saving ? "Menyimpan..." : "Simpan ke Galeri"}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-[#DCE2EC] bg-[#FFFFFF] p-4 rounded-[2px] flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-14 w-14 object-cover border border-[#DCE2EC] rounded-[2px] shrink-0"
                />
              )}
              <div className="min-w-0">
                <span className="font-mono-tech text-[10px] uppercase text-[#2563EB]">
                  {item.category} · {item.taken_date}
                </span>
                <h3 className="font-display font-bold text-sm text-[#0F172A] truncate">
                  {item.title}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setEditing(item)}
                className="px-2.5 py-1.5 border border-[#DCE2EC] text-xs font-mono-tech rounded-[2px]"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="px-2.5 py-1.5 border border-red-200 text-red-700 text-xs font-mono-tech rounded-[2px]"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   4. ACHIEVEMENTS MANAGER (PRESTASI)
   ============================================================ */
export function AchievementsManager({
  passcode,
  items,
  onReload,
}: {
  passcode: string;
  items: AchievementItem[];
  onReload: () => Promise<void>;
}) {
  const [editing, setEditing] = useState<Partial<AchievementItem> | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    await supabase.rpc("admin_save_achievement", {
      passcode_input: passcode,
      payload: {
        id: editing.id || null,
        title: editing.title,
        category: editing.category,
        organizer: editing.organizer,
        year: editing.year,
        team_or_unit: editing.team_or_unit || "Delegasi Kelas XI TKJ 1",
        description: editing.description,
        is_placeholder: false,
      },
    });
    setSaving(false);
    setEditing(null);
    await onReload();
  }

  async function handleDelete(id: string) {
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    await supabase.rpc("admin_delete_achievement", {
      passcode_input: passcode,
      target_id: id,
    });
    await onReload();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-[#0F172A]">
            Manajemen Prestasi & Sertifikasi ({items.length})
          </h2>
          <p className="text-xs text-[#64748B]">
            Catat pencapaian resmi dan sertifikasi atas nama delegasi kelas XI TKJ 1.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setEditing({
              title: "",
              category: "Kompetisi Teknis",
              organizer: "",
              year: "2026",
              team_or_unit: "Delegasi Kelas XI TKJ 1",
              description: "",
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white text-xs font-mono-tech uppercase rounded-[2px]"
        >
          <Plus className="h-4 w-4" /> Tambah Prestasi
        </button>
      </div>

      {editing && (
        <form
          onSubmit={handleSave}
          className="border border-[#2563EB] bg-[#FFFFFF] p-6 rounded-[2px] space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              required
              placeholder="Judul Prestasi / Sertifikasi *"
              value={editing.title || ""}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="sm:col-span-2 px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
            <input
              type="text"
              required
              placeholder="Tahun"
              value={editing.year || ""}
              onChange={(e) => setEditing({ ...editing, year: e.target.value })}
              className="px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              value={editing.category || "Kompetisi Teknis"}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  category: e.target.value as AchievementCategory,
                })
              }
              className="px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            >
              {["Kompetisi Teknis", "Sertifikasi", "Akademik", "Non-Akademik"].map(
                (c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                )
              )}
            </select>
            <input
              type="text"
              required
              placeholder="Penyelenggara *"
              value={editing.organizer || ""}
              onChange={(e) =>
                setEditing({ ...editing, organizer: e.target.value })
              }
              className="px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
            <input
              type="text"
              required
              placeholder="Unit / Delegasi"
              value={editing.team_or_unit || ""}
              onChange={(e) =>
                setEditing({ ...editing, team_or_unit: e.target.value })
              }
              className="px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
          </div>
          <textarea
            rows={2}
            required
            placeholder="Keterangan pencapaian..."
            value={editing.description || ""}
            onChange={(e) =>
              setEditing({ ...editing, description: e.target.value })
            }
            className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-4 py-2 border border-[#DCE2EC] text-xs font-mono-tech uppercase rounded-[2px]"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-[#0A0E17] text-white text-xs font-mono-tech uppercase rounded-[2px]"
            >
              {saving ? "Menyimpan..." : "Simpan Prestasi"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-[#DCE2EC] bg-[#FFFFFF] p-4 rounded-[2px] flex items-center justify-between gap-4"
          >
            <div>
              <span className="font-mono-tech text-[11px] uppercase text-[#2563EB]">
                {item.category} · {item.year}
              </span>
              <h3 className="font-display font-bold text-[#0F172A]">{item.title}</h3>
              <p className="text-xs text-[#64748B]">{item.organizer}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(item)}
                className="px-3 py-1.5 border border-[#DCE2EC] text-xs font-mono-tech rounded-[2px]"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1.5 border border-red-200 text-red-700 text-xs font-mono-tech rounded-[2px]"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   5. ANNOUNCEMENTS MANAGER (INFORMASI)
   ============================================================ */
export function AnnouncementsManager({
  passcode,
  items,
  onReload,
}: {
  passcode: string;
  items: AnnouncementItem[];
  onReload: () => Promise<void>;
}) {
  const [editing, setEditing] = useState<Partial<AnnouncementItem> | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    await supabase.rpc("admin_save_announcement", {
      passcode_input: passcode,
      payload: {
        id: editing.id || null,
        title: editing.title,
        category: editing.category,
        content: editing.content,
        is_pinned: Boolean(editing.is_pinned),
        published_date:
          editing.published_date || new Date().toISOString().slice(0, 10),
        is_placeholder: false,
      },
    });
    setSaving(false);
    setEditing(null);
    await onReload();
  }

  async function handleDelete(id: string) {
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    await supabase.rpc("admin_delete_announcement", {
      passcode_input: passcode,
      target_id: id,
    });
    await onReload();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-[#0F172A]">
            Manajemen Informasi & Pengumuman ({items.length})
          </h2>
          <p className="text-xs text-[#64748B]">
            Publikasikan jadwal praktikum atau pengumuman kelas XI TKJ 1.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setEditing({
              title: "",
              category: "Informasi Kelas",
              content: "",
              is_pinned: false,
              published_date: new Date().toISOString().slice(0, 10),
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white text-xs font-mono-tech uppercase rounded-[2px]"
        >
          <Plus className="h-4 w-4" /> Buat Pengumuman
        </button>
      </div>

      {editing && (
        <form
          onSubmit={handleSave}
          className="border border-[#2563EB] bg-[#FFFFFF] p-6 rounded-[2px] space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              required
              placeholder="Judul Pengumuman *"
              value={editing.title || ""}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="sm:col-span-2 px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            />
            <select
              value={editing.category || "Informasi Kelas"}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  category: e.target.value as AnnouncementCategory,
                })
              }
              className="px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
            >
              {["Penting", "Jadwal Praktikum", "Informasi Kelas"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <textarea
            rows={3}
            required
            placeholder="Isi pengumuman..."
            value={editing.content || ""}
            onChange={(e) => setEditing({ ...editing, content: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px]"
          />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(editing.is_pinned)}
                onChange={(e) =>
                  setEditing({ ...editing, is_pinned: e.target.checked })
                }
              />
              <span>Sematkan di Paling Atas (Pinned)</span>
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-4 py-2 border border-[#DCE2EC] text-xs font-mono-tech uppercase rounded-[2px]"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 bg-[#0A0E17] text-white text-xs font-mono-tech uppercase rounded-[2px]"
              >
                {saving ? "Menyimpan..." : "Terbitkan"}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-[#DCE2EC] bg-[#FFFFFF] p-4 rounded-[2px] flex items-center justify-between gap-4"
          >
            <div>
              <span className="font-mono-tech text-[11px] uppercase text-[#2563EB]">
                {item.is_pinned ? "TERSEMAT · " : ""}
                {item.category} · {item.published_date}
              </span>
              <h3 className="font-display font-bold text-[#0F172A]">{item.title}</h3>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(item)}
                className="px-3 py-1.5 border border-[#DCE2EC] text-xs font-mono-tech rounded-[2px]"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1.5 border border-red-200 text-red-700 text-xs font-mono-tech rounded-[2px]"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
