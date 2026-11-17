import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckSquare, Compass, Layers, UserCheck } from "lucide-react";
import { PageBanner } from "@/components/layout/PageBanner";
import { TkjLogoSlot } from "@/components/ui/TkjLogoSlot";
import { fetchClassSettings } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Profil resmi kelas XI TKJ 1: filosofi pembelajaran, visi dan misi, emblem Logo TKJ, serta profil pembinaan Wali Kelas.",
};

export default async function TentangPage() {
  const settings = await fetchClassSettings();

  return (
    <div>
      <PageBanner
        sectionCode="SEC // 02"
        categoryLabel="PROFIL & IDENTITAS"
        title={`Tentang ${settings.class_name}`}
        description="Cerita terbentuknya karakter kelas, landasan filosofi kejuruan Teknik Komputer dan Jaringan, serta pembinaan Wali Kelas."
      />

      {/* Section 1: Cerita & Filosofi Kelas */}
      <section className="bg-[#F6F7FA] text-[#0F172A] border-b border-[#DCE2EC]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-4 space-y-2">
              <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
                01 // NARASI KELAS
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em]">
                Membangun Budaya Rekayasa & Kebersamaan
              </h2>
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.06em] text-[#64748B] pt-2">
                {settings.school_name}
              </p>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <p className="text-lg sm:text-xl leading-relaxed text-[#0F172A] font-medium">
                {settings.about_story}
              </p>
              <div className="border border-[#DCE2EC] bg-[#FFFFFF] p-6 rounded-[2px] space-y-2">
                <div className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
                  <Compass className="h-4 w-4" aria-hidden="true" />
                  <span>FILOSOFI PEMBELAJARAN</span>
                </div>
                <p className="text-base leading-relaxed text-[#475569]">
                  {settings.philosophy_text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Dedicated Slot Logo TKJ + Visi & Misi */}
      <section className="bg-[#FFFFFF] text-[#0F172A] border-b border-[#DCE2EC]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Logo TKJ Showcase */}
            <div className="lg:col-span-5 border border-[#DCE2EC] bg-[#F6F7FA] p-6 sm:p-8 rounded-[2px] space-y-6">
              <div className="flex items-center justify-between border-b border-[#DCE2EC] pb-3">
                <span className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
                  IDENTITAS VISUAL // LOGO TKJ
                </span>
                <span className="font-mono-tech text-[10px] text-[#64748B]">
                  SLOT EMBLEM
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <TkjLogoSlot
                  logoUrl={settings.logo_tkj_url}
                  size="hero"
                  surface="light"
                />
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-[#0F172A]">
                    Lambang Jurusan {settings.department_name}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    Menampilkan emblem resmi TKJ yang terhubung langsung dengan pengaturan media di Studio Pengelolaan.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#DCE2EC] flex items-center justify-between text-xs text-[#64748B]">
                <span>Ingin memperbarui logo resmi?</span>
                <Link
                  href="/masuk"
                  className="font-mono-tech uppercase tracking-[0.06em] text-[#2563EB] hover:underline"
                >
                  Unggah di Studio →
                </Link>
              </div>
            </div>

            {/* Visi & Misi */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
                  02 // ARAH & TUJUAN
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em]">
                  Visi & Misi Kelas
                </h2>
              </div>

              <div className="border-l-2 border-[#2563EB] pl-5 py-1 space-y-1.5">
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#64748B]">
                  VISI KELAS
                </span>
                <p className="text-base sm:text-lg font-medium leading-relaxed text-[#0F172A]">
                  {settings.vision_text}
                </p>
              </div>

              <div className="space-y-3">
                <span className="block font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#64748B]">
                  MISI & KOMITMEN BERSAMA
                </span>
                <ul className="space-y-3">
                  {settings.mission_items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 border border-[#DCE2EC] bg-[#F6F7FA] p-4 rounded-[2px]"
                    >
                      <CheckSquare
                        className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-sm sm:text-base text-[#0F172A] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Profil Lengkap Wali Kelas (Walas) — STRICTLY NO STUDENT NAMES */}
      <section className="bg-[#0A0E17] text-[#F8FAFC] border-b border-[#1E293B]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-4">
              <div className="border border-[#1E293B] bg-[#111827] p-4 rounded-[2px]">
                <div className="aspect-[4/5] w-full bg-[#0A0E17] border border-[#1E293B] overflow-hidden flex items-center justify-center rounded-[2px]">
                  {settings.homeroom_teacher_photo_url ? (
                    <img
                      src={settings.homeroom_teacher_photo_url}
                      alt={`Foto ${settings.homeroom_teacher_name}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6 space-y-2">
                      <UserCheck className="h-10 w-10 text-[#3B82F6] mx-auto" aria-hidden="true" />
                      <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#F8FAFC]">
                        FOTO WALI KELAS
                      </p>
                      <p className="text-xs text-[#94A3B8]">
                        Dapat diunggah melalui Studio Pengelolaan (/dashboard)
                      </p>
                    </div>
                  )}
                </div>
                <div className="pt-4 flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-[0.08em] text-[#94A3B8]">
                  <span>PEMBINA RESMI</span>
                  <span className="text-[#3B82F6]">{settings.class_name}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#3B82F6]">
                  03 // PEMBINAAN & BIMBINGAN
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[#F8FAFC]">
                  {settings.homeroom_teacher_name}
                </h2>
                <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#94A3B8]">
                  {settings.homeroom_teacher_role}
                </p>
              </div>

              <blockquote className="border-l-2 border-[#3B82F6] pl-5 py-2 text-lg sm:text-xl leading-relaxed text-[#F8FAFC]">
                &ldquo;{settings.homeroom_teacher_quote}&rdquo;
              </blockquote>

              <div className="border-t border-[#1E293B] pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.06em] text-[#3B82F6]">
                    <Layers className="h-4 w-4" aria-hidden="true" />
                    <span>MODEL KOLABORASI TIM</span>
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Seluruh karya dan praktikum di XI TKJ 1 disusun dalam unit tim berbasis peran teknis (Tim Jaringan, Tim Server, Tim Hardware, dan Tim Web) demi menjaga privasi identitas pribadi siswa di ruang publik.
                  </p>
                </div>
                <div className="flex items-end sm:justify-end">
                  <Link
                    href="/proyek"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#2563EB] hover:bg-[#3B82F6] text-white text-sm font-medium rounded-[2px] transition-colors"
                  >
                    <span>Lihat Karya Tim XI TKJ 1</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
