import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { AnnouncementsBoard } from "@/components/sections/AnnouncementsBoard";
import { fetchAnnouncements } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Informasi & Pengumuman",
  description:
    "Papan informasi resmi kelas XI TKJ 1: jadwal praktikum laboratorium, agenda kelas, dan pengumuman penting.",
};

export default async function InformasiPage() {
  const announcements = await fetchAnnouncements();

  return (
    <div className="bg-[#F6F7FA] min-h-screen">
      <PageBanner
        sectionCode="SEC // 07"
        categoryLabel="PAPAN INFORMASI"
        title="Informasi & Agenda Kelas"
        description="Pengumuman tersemat, persiapan alat praktikum, dan pembaruan jadwal kegiatan kelas XI TKJ 1."
      />
      <AnnouncementsBoard announcements={announcements} />
    </div>
  );
}
