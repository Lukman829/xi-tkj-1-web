import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MapPin,
  Pin,
  Terminal,
  Award,
  UserCheck,
} from "lucide-react";
import { fetchSiteBundle } from "@/lib/data-service";
import { TkjLogoSlot } from "@/components/ui/TkjLogoSlot";
import { BlueprintSchematic } from "@/components/ui/BlueprintSchematic";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { Reveal } from "@/components/ui/Reveal";
import { formatIndonesianDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const CORE_PILLARS = [
  {
    code: "01",
    title: "Networking & Infrastruktur",
    englishTerm: "Network Routing & Switching",
    summary:
      "Perancangan topologi jaringan lokal dan nirkabel, segmentasi VLAN 802.1Q, subnetting IPv4, serta konfigurasi routing dan manajemen bandwidth.",
    tags: ["MikroTik", "VLAN", "Routing", "T568B"],
  },
  {
    code: "02",
    title: "Administrasi Server",
    englishTerm: "Linux & Server Administration",
    summary:
      "Instalasi, konfigurasi layanan web, DNS, DHCP, reverse proxy, serta pemeliharaan server berbasis sistem operasi Linux.",
    tags: ["Debian Linux", "Nginx", "SSH", "Docker"],
  },
  {
    code: "03",
    title: "Perangkat Keras & Kabel",
    englishTerm: "Hardware & Diagnostics",
    summary:
      "Perakitan workstation, audit komponen komputer, troubleshooting BIOS/UEFI, serta terminasi kabel UTP dan fiber optik dasar.",
    tags: ["Hardware", "UTP Cat6", "Diagnostics"],
  },
  {
    code: "04",
    title: "Pengembangan Web & Cloud",
    englishTerm: "Web Development & Database",
    summary:
      "Pembangunan antarmuka web modern dan dokumentasi digital kelas yang terintegrasi dengan database relasional cloud.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    code: "05",
    title: "Keamanan Jaringan",
    englishTerm: "Cybersecurity Fundamentals",
    summary:
      "Penerapan aturan firewall, kontrol akses jaringan, enkripsi koneksi, serta kesadaran keamanan data di lingkungan sekolah.",
    tags: ["Firewall", "Hardening", "ACL"],
  },
  {
    code: "06",
    title: "Internet of Things",
    englishTerm: "IoT & Telemetry",
    summary:
      "Eksplorasi mikrokontroler dan sensor sederhana untuk menghubungkan perangkat fisik dengan jaringan monitoring berbasis web.",
    tags: ["IoT", "Sensors", "Telemetry"],
  },
];

export default async function HomePage() {
  const { settings, projects, activities, gallery, achievements, announcements } =
    await fetchSiteBundle();

  const featuredProjects =
    projects.filter((p) => p.is_featured).slice(0, 4).length > 0
      ? projects.filter((p) => p.is_featured).slice(0, 4)
      : projects.slice(0, 4);

  const latestActivities = activities.slice(0, 3);
  const previewGallery = gallery.slice(0, 2);
  const previewAchievements = achievements.slice(0, 3);
  const latestAnnouncement = announcements[0] ?? null;

  return (
    <div>
      {/* ============================================================
          ACT 01 // IDENTITY — HERO SECTION (DEEP OBSIDIAN NAVY)
         ============================================================ */}
      <section className="relative bg-[#0A0E17] bg-arch-grid-dark text-[#F8FAFC] border-b border-[#1E293B]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-8 pb-16 sm:pt-12 sm:pb-24">
          {/* Technical Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E293B] pb-4 mb-10 sm:mb-14 font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#94A3B8]">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-[#3B82F6]">
                <span className="h-2 w-2 rounded-full bg-[#3B82F6]" aria-hidden="true" />
                AKTIF · MONOGRAF DIGITAL
              </span>
              <span className="hidden sm:inline text-[#334155]">|</span>
              <span className="hidden sm:inline">{settings.school_name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>TAHUN AJARAN {settings.academic_year}</span>
              <span className="text-[#334155]">/</span>
              <span className="text-[#F8FAFC]">ACT 01–07</span>
            </div>
          </div>

          {/* Asymmetric 12-Column Hero Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left 8 Columns: Monumental Typography & Identity */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <p className="font-mono-tech text-xs uppercase tracking-[0.12em] text-[#3B82F6]">
                  {settings.department_name}
                </p>
                <h1 className="font-display text-[3.5rem] sm:text-[5.5rem] lg:text-[7rem] xl:text-[7.5rem] font-bold tracking-[-0.045em] leading-[0.9] text-[#F8FAFC]">
                  {settings.class_name}
                </h1>
              </div>

              <div className="border-t border-[#1E293B] pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-5">
                  <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-[-0.02em] leading-snug text-[#F8FAFC]">
                    {settings.hero_headline}
                  </h2>
                </div>
                <div className="md:col-span-7 space-y-6">
                  <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
                    {settings.hero_subheadline}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/proyek"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-[#2563EB] hover:bg-[#3B82F6] text-white text-sm font-medium rounded-[2px] transition-colors"
                    >
                      <span>Jelajahi Proyek TKJ</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link
                      href="/tentang"
                      className="inline-flex items-center gap-2 px-5 py-3 border border-[#1E293B] bg-[#111827] hover:border-[#3B82F6] text-[#F8FAFC] text-sm font-medium rounded-[2px] transition-colors"
                    >
                      <span>Tentang Kelas & Wali Kelas</span>
                      <ArrowUpRight className="h-4 w-4 text-[#3B82F6]" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Dedicated Logo TKJ Frame + Network Blueprint */}
            <div className="lg:col-span-4 space-y-4">
              {/* Dedicated Logo TKJ Showcase Card */}
              <div className="border border-[#1E293B] bg-[#111827] p-5 rounded-[2px]">
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-3 mb-4">
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.08em] text-[#94A3B8]">
                    EMBLEM RESMI JURUSAN
                  </span>
                  <span className="font-mono-tech text-[10px] text-[#3B82F6]">
                    SLOT LOGO TKJ
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <TkjLogoSlot
                    logoUrl={settings.logo_tkj_url}
                    size="hero"
                    surface="dark"
                  />
                  <div className="space-y-1.5">
                    <p className="font-display text-lg font-bold text-[#F8FAFC]">
                      TKJ · {settings.class_name}
                    </p>
                    <p className="text-xs leading-relaxed text-[#94A3B8]">
                      Identitas resmi kompetensi keahlian {settings.department_name}. Dapat diganti langsung melalui Studio Pengelola.
                    </p>
                  </div>
                </div>
              </div>

              {/* Architectural Schematic Preview */}
              <div className="h-44 sm:h-48">
                <BlueprintSchematic
                  category="Networking"
                  codeLabel="TOPOLOGI // XI-TKJ-1"
                  surface="dark"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ACT 02 // WHO WE ARE & PROFIL WALI KELAS (EDITORIAL ALABASTER)
         ============================================================ */}
      <section className="bg-[#F6F7FA] text-[#0F172A] border-b border-[#DCE2EC]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Index Column */}
              <div className="lg:col-span-3 space-y-2">
                <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
                  ACT 02 // JATI DIRI
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em]">
                  Siapa Kami
                </h2>
                <p className="text-xs text-[#64748B] font-mono-tech uppercase tracking-[0.06em] pt-2">
                  IDENTITAS · KOLABORASI · PEMBINAAN
                </p>
              </div>

              {/* Editorial Story Column */}
              <div className="lg:col-span-5 space-y-6">
                <p className="text-lg sm:text-xl leading-relaxed text-[#0F172A] font-medium">
                  {settings.about_story}
                </p>
                <div className="border-l-2 border-[#2563EB] pl-4 py-1">
                  <p className="text-sm sm:text-base leading-relaxed text-[#475569]">
                    {settings.philosophy_text}
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/tentang"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-[#0F172A] transition-colors"
                  >
                    <span>Baca Cerita, Visi & Misi Kelas</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Dedicated Wali Kelas (Walas) Card — STRICTLY NO STUDENT NAMES */}
              <div className="lg:col-span-4 border border-[#DCE2EC] bg-[#FFFFFF] p-6 rounded-[2px] space-y-5">
                <div className="flex items-center justify-between border-b border-[#DCE2EC] pb-3">
                  <span className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#2563EB]">
                    <UserCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    WALI KELAS XI TKJ 1
                  </span>
                  <span className="font-mono-tech text-[10px] text-[#64748B]">
                    PEMBINA
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 shrink-0 border border-[#DCE2EC] bg-[#F6F7FA] overflow-hidden rounded-[2px] flex items-center justify-center">
                    {settings.homeroom_teacher_photo_url ? (
                      <img
                        src={settings.homeroom_teacher_photo_url}
                        alt={`Foto ${settings.homeroom_teacher_name}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-center px-2">
                        <span className="block font-mono-tech text-xs font-bold text-[#2563EB]">
                          WALAS
                        </span>
                        <span className="block font-mono-tech text-[9px] text-[#64748B]">
                          XI TKJ 1
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#0F172A]">
                      {settings.homeroom_teacher_name}
                    </h3>
                    <p className="text-xs text-[#475569] mt-0.5">
                      {settings.homeroom_teacher_role}
                    </p>
                  </div>
                </div>

                <blockquote className="text-sm leading-relaxed text-[#475569] italic border-t border-[#DCE2EC] pt-4">
                  &ldquo;{settings.homeroom_teacher_quote}&rdquo;
                </blockquote>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          ACT 03 // BIDANG KEAHLIAN TKJ (PURE PAPER SWISS INDEX)
         ============================================================ */}
      <section className="bg-[#FFFFFF] text-[#0F172A] border-b border-[#DCE2EC]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-end">
              <div className="lg:col-span-7">
                <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB] mb-2">
                  ACT 03 // KOMPETENSI KEJURUAN
                </p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em]">
                  Fokus Rekayasa & Pembelajaran TKJ
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Enam pilar teknis yang dipelajari dan dipraktikkan bersama secara kolektif oleh kelas XI TKJ 1 di laboratorium maupun proyek mandiri.
                </p>
              </div>
            </div>

            <div className="border-t border-[#DCE2EC]">
              {CORE_PILLARS.map((pillar) => (
                <div
                  key={pillar.code}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-6 border-b border-[#DCE2EC] hover:bg-[#F6F7FA] px-2 -mx-2 transition-colors items-start"
                >
                  <div className="lg:col-span-1 font-mono-tech text-xs text-[#2563EB] pt-1">
                    {pillar.code}
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#0F172A]">
                      {pillar.title}
                    </h3>
                    <p className="font-mono-tech text-[11px] uppercase tracking-[0.06em] text-[#64748B] mt-0.5">
                      {pillar.englishTerm}
                    </p>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="text-sm text-[#475569] leading-relaxed">
                      {pillar.summary}
                    </p>
                  </div>
                  <div className="lg:col-span-2 flex flex-wrap lg:justify-end gap-1.5">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-tech text-[10px] uppercase tracking-[0.06em] px-2 py-0.5 border border-[#DCE2EC] bg-[#FFFFFF] text-[#475569] rounded-[2px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          ACT 04 // OUR WORK — PROYEK PILIHAN TKJ (DEEP OBSIDIAN NAVY)
         ============================================================ */}
      <section className="bg-[#0A0E17] text-[#F8FAFC] border-b border-[#1E293B]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#1E293B]">
              <div className="space-y-2 max-w-2xl">
                <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#3B82F6]">
                  ACT 04 // ETALASE KARYA TEKNIS
                </p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em]">
                  Proyek & Eksperimen XI TKJ 1
                </h2>
              </div>
              <Link
                href="/proyek"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#1E293B] bg-[#111827] hover:border-[#3B82F6] text-xs font-mono-tech uppercase tracking-[0.08em] text-[#F8FAFC] rounded-[2px] transition-colors self-start lg:self-auto"
              >
                <span>Semua Proyek TKJ</span>
                <ArrowUpRight className="h-4 w-4 text-[#3B82F6]" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
              {featuredProjects.map((project, index) => (
                <article
                  key={project.id}
                  className="group border border-[#1E293B] bg-[#111827] rounded-[2px] flex flex-col justify-between overflow-hidden hover:border-[#3B82F6] transition-colors"
                >
                  <div>
                    <div className="h-52 w-full border-b border-[#1E293B] overflow-hidden bg-[#0A0E17]">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      ) : (
                        <BlueprintSchematic
                          category={project.category}
                          codeLabel={`PRJ-0${index + 1} // ${project.category.toUpperCase()}`}
                          surface="dark"
                          className="border-0"
                        />
                      )}
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#3B82F6]">
                          {project.category}
                        </span>
                        {project.is_placeholder && <PlaceholderBadge variant="dark" />}
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[#F8FAFC]">
                        {project.title}
                      </h3>

                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono-tech text-[10px] uppercase tracking-[0.06em] px-2 py-0.5 bg-[#0A0E17] border border-[#1E293B] text-[#94A3B8] rounded-[2px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/proyek?highlight=${project.slug}`}
                      className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase tracking-[0.06em] text-[#F8FAFC] hover:text-[#3B82F6] transition-colors"
                    >
                      <span>Spesifikasi</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          ACT 05 // OUR ACTIVITIES — KEGIATAN KELAS (EDITORIAL ALABASTER)
         ============================================================ */}
      <section className="bg-[#F6F7FA] text-[#0F172A] border-b border-[#DCE2EC]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-4 space-y-5">
                <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
                  ACT 05 // KRONOLOGI AKTIVITAS
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em]">
                  Catatan Kegiatan Kelas & Praktikum
                </h2>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Rekam jejak momen belajar bersama, praktikum laboratorium, serta agenda kebersamaan kelas sepanjang tahun ajaran.
                </p>
                <Link
                  href="/kegiatan"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#DCE2EC] bg-[#FFFFFF] hover:border-[#2563EB] text-xs font-mono-tech uppercase tracking-[0.08em] text-[#0F172A] rounded-[2px] transition-colors"
                >
                  <span>Buka Linimasa Kegiatan</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#2563EB]" aria-hidden="true" />
                </Link>
              </div>

              <div className="lg:col-span-8 border-t border-[#DCE2EC]">
                {latestActivities.map((act) => (
                  <div
                    key={act.id}
                    className="py-6 border-b border-[#DCE2EC] grid grid-cols-1 sm:grid-cols-12 gap-4 items-start"
                  >
                    <div className="sm:col-span-4 space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#2563EB]">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{formatIndonesianDate(act.activity_date)}</span>
                      </div>
                      <p className="font-mono-tech text-[11px] uppercase tracking-[0.06em] text-[#64748B]">
                        {act.category}
                      </p>
                      <div className="inline-flex items-center gap-1 text-xs text-[#64748B]">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        <span>{act.location}</span>
                      </div>
                    </div>

                    <div className="sm:col-span-8 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#0F172A]">
                          {act.title}
                        </h3>
                        {act.is_placeholder && <PlaceholderBadge variant="light" />}
                      </div>
                      <p className="text-sm text-[#475569] leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          ACT 06 // GALERI & PRESTASI (PURE PAPER)
         ============================================================ */}
      <section className="bg-[#FFFFFF] text-[#0F172A] border-b border-[#DCE2EC]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              {/* Left 7 Cols: Galeri Preview */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-end justify-between border-b border-[#DCE2EC] pb-4">
                  <div>
                    <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
                      ACT 06 // ARSIP VISUAL
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] mt-1">
                      Galeri Dokumentasi
                    </h2>
                  </div>
                  <Link
                    href="/galeri"
                    className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase tracking-[0.06em] text-[#2563EB] hover:text-[#0F172A]"
                  >
                    <span>Lihat Galeri</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {previewGallery.map((item) => (
                    <Link
                      key={item.id}
                      href="/galeri"
                      className="group border border-[#DCE2EC] bg-[#F6F7FA] rounded-[2px] overflow-hidden hover:border-[#2563EB] transition-colors"
                    >
                      <div className="h-48 w-full overflow-hidden border-b border-[#DCE2EC]">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          />
                        ) : (
                          <BlueprintSchematic
                            category={item.category}
                            codeLabel={`GAL // ${item.taken_date}`}
                            surface="light"
                            className="border-0"
                          />
                        )}
                      </div>
                      <div className="p-4 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono-tech text-[10px] uppercase tracking-[0.08em] text-[#2563EB]">
                            {item.category} · {item.taken_date}
                          </span>
                          {item.is_placeholder && <PlaceholderBadge variant="light" />}
                        </div>
                        <h3 className="font-display text-base font-bold text-[#0F172A]">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right 5 Cols: Prestasi Register */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-end justify-between border-b border-[#DCE2EC] pb-4">
                  <div>
                    <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
                      REKAM CAPAIAN
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] mt-1">
                      Prestasi & Sertifikasi
                    </h2>
                  </div>
                  <Link
                    href="/prestasi"
                    className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase tracking-[0.06em] text-[#2563EB] hover:text-[#0F172A]"
                  >
                    <span>Arsip</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {previewAchievements.map((ach) => (
                    <div
                      key={ach.id}
                      className="border border-[#DCE2EC] bg-[#F6F7FA] p-4 rounded-[2px] space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] uppercase tracking-[0.06em] text-[#2563EB]">
                          <Award className="h-3.5 w-3.5" aria-hidden="true" />
                          {ach.category} · {ach.year}
                        </span>
                        {ach.is_placeholder && <PlaceholderBadge variant="light" />}
                      </div>
                      <h3 className="font-display text-base font-bold text-[#0F172A]">
                        {ach.title}
                      </h3>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          ACT 07 // INFORMASI TERKINI & CLOSING MANIFESTO (GRAPHITE)
         ============================================================ */}
      <section className="bg-[#111827] text-[#F8FAFC]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-16 sm:py-24 space-y-14">
          {latestAnnouncement && (
            <div className="border border-[#1E293B] bg-[#0A0E17] p-6 sm:p-8 rounded-[2px] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-3 space-y-1.5">
                <span className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase tracking-[0.08em] text-[#3B82F6]">
                  <Pin className="h-3.5 w-3.5" aria-hidden="true" />
                  INFORMASI KELAS
                </span>
                <p className="font-mono-tech text-xs text-[#94A3B8]">
                  {formatIndonesianDate(latestAnnouncement.published_date)}
                </p>
              </div>
              <div className="lg:col-span-6 space-y-1.5">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#F8FAFC]">
                  {latestAnnouncement.title}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {latestAnnouncement.content}
                </p>
              </div>
              <div className="lg:col-span-3 flex lg:justify-end">
                <Link
                  href="/informasi"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#1E293B] bg-[#111827] hover:border-[#3B82F6] text-xs font-mono-tech uppercase tracking-[0.08em] text-[#F8FAFC] rounded-[2px] transition-colors"
                >
                  <span>Papan Informasi</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#3B82F6]" aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-4 border-t border-[#1E293B]">
            <div className="lg:col-span-8 space-y-4">
              <p className="font-mono-tech text-xs uppercase tracking-[0.1em] text-[#3B82F6]">
                ACT 07 // MASA DEPAN & KOLABORASI
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.06] text-[#F8FAFC]">
                Terhubung oleh Jaringan. Disatukan oleh Kebersamaan.
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#2563EB] hover:bg-[#3B82F6] text-white text-sm font-medium rounded-[2px] transition-colors"
              >
                <span>Hubungi Kelas</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/masuk"
                className="inline-flex items-center gap-2 px-5 py-3 border border-[#1E293B] bg-[#0A0E17] hover:border-[#3B82F6] text-[#F8FAFC] text-sm font-medium rounded-[2px] transition-colors"
              >
                <Terminal className="h-4 w-4 text-[#3B82F6]" aria-hidden="true" />
                <span>Kelola Konten</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
