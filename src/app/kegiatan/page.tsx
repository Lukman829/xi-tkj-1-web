import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { ActivityTimeline } from "@/components/sections/ActivityTimeline";
import { fetchActivities } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kegiatan Kelas",
  description:
    "Kronologi kegiatan kelas XI TKJ 1: praktikum laboratorium, agenda kebersamaan, dan kegiatan sekolah.",
};

export default async function KegiatanPage() {
  const activities = await fetchActivities();

  return (
    <div className="bg-[#F6F7FA] min-h-screen">
      <PageBanner
        sectionCode="SEC // 04"
        categoryLabel="LINIMASA KEGIATAN"
        title="Kegiatan & Praktikum Kelas"
        description="Arsip kronologis momen kebersamaan, sesi praktikum laboratorium TKJ, serta aktivitas kolaboratif kelas."
      />
      <ActivityTimeline activities={activities} />
    </div>
  );
}
