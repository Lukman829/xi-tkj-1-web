import type {
  AchievementItem,
  ActivityItem,
  AnnouncementItem,
  ClassSettings,
  GalleryItem,
  ProjectItem,
  SiteBundle,
} from "@/types";

export const FALLBACK_SETTINGS: ClassSettings = {
  id: 1,
  class_name: "XI TKJ 1",
  department_name: "Teknik Komputer dan Jaringan",
  school_name: "[Nama Sekolah — Atur di Dashboard]",
  academic_year: "2026 / 2027",
  logo_tkj_url: null,
  hero_headline: "Merancang Infrastruktur. Membangun Kolaborasi.",
  hero_subheadline:
    "Rumah digital resmi kelas XI TKJ 1 — dokumentasi karya rekayasa jaringan, administrasi server, perangkat keras, dan perjalanan kebersamaan kami.",
  about_story:
    "XI TKJ 1 adalah ruang bertumbuh bagi pelajar Teknik Komputer dan Jaringan yang memandang teknologi bukan sekadar praktik di balik layar, melainkan seni merangkai konektivitas, ketelitian konfigurasi, dan solidaritas tim.",
  philosophy_text:
    "Learn · Configure · Connect — Kami percaya ketangguhan sebuah sistem berawal dari pemahaman dasar yang kuat, kedisiplinan dalam dokumentasi, serta kolaborasi yang saling menguatkan.",
  vision_text:
    "Menjadi kelas kejuruan Teknik Komputer dan Jaringan yang unggul dalam rekayasa infrastruktur digital, berintegritas tinggi, kolaboratif, dan siap menghadapi tantangan industri teknologi modern.",
  mission_items: [
    "Menguasai perancangan, konfigurasi, dan pemeliharaan infrastruktur jaringan komputer berstandar industri.",
    "Membangun budaya dokumentasi teknis yang rapi, jujur, dan dapat dipertanggungjawabkan pada setiap proyek praktikum.",
    "Menumbuhkan ekosistem belajar kolaboratif yang menjunjung etika digital, kreativitas, dan kepedulian sosial.",
  ],
  homeroom_teacher_name: "[Nama Wali Kelas — Atur di Dashboard]",
  homeroom_teacher_role: "Wali Kelas XI TKJ 1 · Guru Produktif TKJ",
  homeroom_teacher_photo_url: null,
  homeroom_teacher_quote:
    "Teknologi terus berkembang setiap hari, namun karakter disiplin, rasa ingin tahu, dan semangat saling membantu di dalam kelas adalah fondasi paling berharga yang akan selalu kalian bawa ke dunia kerja.",
  contact_email: "kontak@xitkj1.example.id",
  contact_instagram: "@xitkj1.official",
  contact_location:
    "Laboratorium Teknik Komputer dan Jaringan — [Nama Sekolah, Atur di Dashboard]",
};

export const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: "fallback-proj-1",
    title: "Segmentasi Jaringan Lab Menggunakan VLAN & Trunking Multi-Switch",
    slug: "segmentasi-jaringan-lab-vlan",
    category: "Networking",
    team_unit: "Tim Infrastruktur Jaringan XI TKJ 1",
    summary:
      "Perancangan ulang topologi jaringan lokal laboratorium untuk memisahkan lalu lintas praktikum siswa, perangkat guru, dan manajemen server.",
    architecture_details:
      "Implementasi IEEE 802.1Q VLAN Trunking antara router utama MikroTik dengan managed switch L2, disertai Inter-VLAN Routing dan DHCP Server per segmen.",
    technologies: ["MikroTik RouterOS", "VLAN 802.1Q", "Inter-VLAN Routing", "Subnetting IPv4"],
    result_output: "[DATA CONTOH] Latensi internal stabil < 1 ms dan isolasi traffic praktikum berjalan sesuai rancangan.",
    image_url: null,
    is_featured: true,
    is_placeholder: true,
  },
  {
    id: "fallback-proj-2",
    title: "Deployment Server Web & Monitoring Jaringan Berbasis Linux Debian",
    slug: "deployment-server-linux-debian",
    category: "Server Administration",
    team_unit: "Tim Administrasi Sistem XI TKJ 1",
    summary:
      "Pembangunan server lokal berbasis Linux Debian sebagai environment uji coba web internal kelas sekaligus pemantauan host di laboratorium.",
    architecture_details:
      "Instalasi Debian Server minimal tanpa GUI, pengerasan akses SSH dengan key-based authentication, serta konfigurasi Nginx reverse proxy.",
    technologies: ["Debian Linux", "Nginx", "SSH Hardening", "Docker"],
    result_output: "[DATA CONTOH] Server berjalan stabil pada jaringan lokal laboratorium dan terdokumentasi sebagai modul praktikum.",
    image_url: null,
    is_featured: true,
    is_placeholder: true,
  },
  {
    id: "fallback-proj-3",
    title: "Audit Perakitan PC Workstation & Manajemen Alur Kabel Lab",
    slug: "audit-perakitan-pc-manajemen-kabel",
    category: "Hardware",
    team_unit: "Tim Perangkat Keras XI TKJ 1",
    summary:
      "Standarisasi perakitan unit komputer praktikum, pengujian performa termal, serta penataan ulang jalur kabel UTP Cat6 pada rak jaringan utama.",
    architecture_details:
      "Pemeriksaan kompatibilitas komponen, tata kelola airflow, serta crimping & pelabelan patch panel sesuai standar warna T568B.",
    technologies: ["PC Assembly", "UTP Cat6", "T568B Standard", "BIOS Diagnostics"],
    result_output: "[DATA CONTOH] Seluruh workstation terlabeli rapi dan lulus uji konektivitas LAN tester.",
    image_url: null,
    is_featured: true,
    is_placeholder: true,
  },
  {
    id: "fallback-proj-4",
    title: "Portal Identitas Digital & Dokumentasi Kelas XI TKJ 1",
    slug: "portal-identitas-digital-xi-tkj-1",
    category: "Web Development",
    team_unit: "Tim Pengembangan Web XI TKJ 1",
    summary:
      "Perancangan platform publikasi digital dan arsip kegiatan kelas dengan pendekatan desain Swiss Editorial dan arsitektur basis data cloud.",
    architecture_details:
      "Dibangun menggunakan Next.js App Router, TypeScript, Tailwind CSS, serta terintegrasi langsung dengan PostgreSQL & Storage pada Supabase.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    result_output: "Platform aktif online sebagai pusat dokumentasi resmi dan identitas digital kelas XI TKJ 1.",
    image_url: null,
    is_featured: true,
    is_placeholder: false,
  },
];

export const FALLBACK_ACTIVITIES: ActivityItem[] = [
  {
    id: "fallback-act-1",
    title: "Praktikum Konfigurasi Router Dasar & Manajemen Bandwidth",
    activity_date: "2026-09-14",
    category: "Praktikum Lab",
    description:
      "[DATA CONTOH — EDIT DI DASHBOARD] Sesi praktikum kelompok membahas pembagian alokasi bandwidth menggunakan Simple Queue dan pengujian konektivitas antar-client.",
    location: "Laboratorium TKJ 01",
    image_url: null,
    is_placeholder: true,
  },
  {
    id: "fallback-act-2",
    title: "Kerja Bakti Penataan Ruang Kelas & Rak Perangkat Praktikum",
    activity_date: "2026-10-02",
    category: "Kegiatan Kelas",
    description:
      "[DATA CONTOH — EDIT DI DASHBOARD] Kegiatan kebersamaan kelas membersihkan ruang belajar, merapikan kabel cadangan, dan menginventarisasi alat praktikum.",
    location: "Ruang Kelas XI TKJ 1",
    image_url: null,
    is_placeholder: true,
  },
];

export const FALLBACK_GALLERY: GalleryItem[] = [
  {
    id: "fallback-gal-1",
    title: "Dokumentasi Sesi Konfigurasi Jaringan Lab",
    category: "Praktikum",
    caption: "[FOTO CONTOH] Ganti dengan foto asli kegiatan praktikum jaringan kelas XI TKJ 1 melalui Dashboard.",
    image_url: null,
    taken_date: "2026-09",
    aspect_ratio: "16:10",
    is_placeholder: true,
  },
  {
    id: "fallback-gal-2",
    title: "Arsitektur Rak Server & Patch Panel Utama",
    category: "Infrastruktur",
    caption: "[FOTO CONTOH] Unggah foto perangkat keras, switch, atau rak jaringan laboratorium yang dikelola kelas.",
    image_url: null,
    taken_date: "2026-10",
    aspect_ratio: "4:5",
    is_placeholder: true,
  },
];

export const FALLBACK_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "fallback-ach-1",
    title: "[Contoh] Keikutsertaan Seleksi LKS Bidang IT Network System Administration",
    category: "Kompetisi Teknis",
    organizer: "[Nama Penyelenggara — Isi Data Asli]",
    year: "2026",
    team_or_unit: "Delegasi Kelas XI TKJ 1",
    description:
      "Entri placeholder terstruktur. Hanya masukkan prestasi, sertifikasi, atau partisipasi lomba yang benar-benar diverifikasi melalui Dashboard.",
    is_placeholder: true,
  },
];

export const FALLBACK_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "fallback-ann-1",
    title: "Selamat Datang di Platform Digital XI TKJ 1",
    category: "Penting",
    content:
      "Platform ini sudah terhubung dengan Supabase Database dan Studio Pengelolaan (/dashboard). Wali Kelas atau Pengurus yang ditunjuk dapat masuk melalui menu Masuk untuk mengganti Logo TKJ, profil Wali Kelas, proyek, galeri, serta pengumuman secara langsung.",
    is_pinned: true,
    published_date: "2026-11-17",
    is_placeholder: false,
  },
];

export const FALLBACK_BUNDLE: SiteBundle = {
  settings: FALLBACK_SETTINGS,
  projects: FALLBACK_PROJECTS,
  activities: FALLBACK_ACTIVITIES,
  gallery: FALLBACK_GALLERY,
  achievements: FALLBACK_ACHIEVEMENTS,
  announcements: FALLBACK_ANNOUNCEMENTS,
};
