import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, AtSign, ShieldCheck } from "lucide-react";
import { TkjLogoSlot } from "@/components/ui/TkjLogoSlot";
import type { ClassSettings } from "@/types";

interface FooterProps {
  settings: ClassSettings;
}

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-[#0A0E17] text-[#F8FAFC] border-t border-[#1E293B]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-14 lg:py-20">
        {/* Top Architectural Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1E293B]">
          {/* Column 1-5: Identity & Logo TKJ Slot */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-start gap-4">
              <TkjLogoSlot
                logoUrl={settings.logo_tkj_url}
                size="lg"
                surface="dark"
              />
              <div>
                <p className="font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#3B82F6]">
                  IDENTITAS DIGITAL RESMI
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[#F8FAFC] mt-1">
                  {settings.class_name}
                </h2>
                <p className="text-sm text-[#94A3B8] mt-1">
                  {settings.department_name} · {settings.school_name}
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[#94A3B8] max-w-md">
              {settings.philosophy_text}
            </p>

            {/* Wali Kelas Attribution (Tanpa Nama Siswa) */}
            <div className="inline-flex flex-col gap-1 border border-[#1E293B] bg-[#111827] px-4 py-3 rounded-[2px]">
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.08em] text-[#3B82F6]">
                PEMBINAAN WALI KELAS
              </span>
              <span className="text-sm font-semibold text-[#F8FAFC]">
                {settings.homeroom_teacher_name}
              </span>
              <span className="text-xs text-[#94A3B8]">
                {settings.homeroom_teacher_role}
              </span>
            </div>
          </div>

          {/* Column 6-8: Sitemap Index */}
          <div className="lg:col-span-3 space-y-4">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#94A3B8]">
              01 // INDEKS HALAMAN
            </p>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 text-sm">
              {[
                { href: "/", label: "Beranda" },
                { href: "/tentang", label: "Tentang Kami & Walas" },
                { href: "/proyek", label: "Proyek TKJ" },
                { href: "/kegiatan", label: "Kegiatan Kelas" },
                { href: "/galeri", label: "Galeri Dokumentasi" },
                { href: "/prestasi", label: "Prestasi" },
                { href: "/informasi", label: "Informasi & Agenda" },
                { href: "/kontak", label: "Kontak" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#3B82F6]" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 9-12: Kontak & Studio CMS */}
          <div className="lg:col-span-4 space-y-5">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#94A3B8]">
              02 // SALURAN & PENGELOLAAN
            </p>
            <div className="space-y-3 text-sm text-[#94A3B8]">
              {settings.contact_location && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#3B82F6] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{settings.contact_location}</span>
                </div>
              )}
              {settings.contact_email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-[#3B82F6] shrink-0" aria-hidden="true" />
                  <span>{settings.contact_email}</span>
                </div>
              )}
              {settings.contact_instagram && (
                <div className="flex items-center gap-2.5">
                  <AtSign className="h-4 w-4 text-[#3B82F6] shrink-0" aria-hidden="true" />
                  <span>{settings.contact_instagram}</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <Link
                href="/masuk"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#1E293B] bg-[#111827] hover:border-[#3B82F6] text-xs font-mono-tech uppercase tracking-[0.06em] text-[#F8FAFC] rounded-[2px] transition-colors"
              >
                <ShieldCheck className="h-4 w-4 text-[#3B82F6]" aria-hidden="true" />
                Masuk Studio Pengelolaan Kelas
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Technical Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#64748B] font-mono-tech uppercase tracking-[0.06em]">
          <p>
            © {new Date().getFullYear()} {settings.class_name} · TAHUN AJARAN {settings.academic_year}
          </p>
          <p>
            ARSITEKTUR MONOGRAF DIGITAL · SUPABASE & NEXT.JS
          </p>
        </div>
      </div>
    </footer>
  );
}
