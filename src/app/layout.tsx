import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { fetchClassSettings } from "@/lib/data-service";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "XI TKJ 1 — Identitas Digital & Monograf Teknik Komputer dan Jaringan",
    template: "%s | XI TKJ 1",
  },
  description:
    "Platform identitas digital resmi kelas XI TKJ 1 (Teknik Komputer dan Jaringan): dokumentasi proyek jaringan, administrasi server, kegiatan praktikum, galeri, dan prestasi kelas.",
  openGraph: {
    title: "XI TKJ 1 — Identitas Digital Kelas Teknik Komputer dan Jaringan",
    description:
      "Publikasi digital, arsip proyek teknis, kegiatan laboratorium, dan dokumentasi resmi XI TKJ 1.",
    locale: "id_ID",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchClassSettings();

  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#F6F7FA] text-[#0F172A] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[#2563EB] focus:text-white focus:px-4 focus:py-2 focus:text-xs focus:font-mono-tech focus:rounded-[2px]"
        >
          Lewati ke konten utama
        </a>

        <Navbar
          logoUrl={settings.logo_tkj_url}
          classNameTitle={settings.class_name}
          departmentName={settings.department_name}
        />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer settings={settings} />
      </body>
    </html>
  );
}
