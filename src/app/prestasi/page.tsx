import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { AchievementsRegister } from "@/components/sections/AchievementsRegister";
import { fetchAchievements } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prestasi & Sertifikasi",
  description:
    "Catatan pencapaian resmi, kompetisi teknis, dan sertifikasi kompetensi kelas XI TKJ 1.",
};

export default async function PrestasiPage() {
  const achievements = await fetchAchievements();

  return (
    <div className="bg-[#F6F7FA] min-h-screen">
      <PageBanner
        sectionCode="SEC // 06"
        categoryLabel="REKAM CAPAIAN"
        title="Prestasi & Sertifikasi"
        description="Dokumentasi terverifikasi atas keikutsertaan kompetisi kejuruan, sertifikasi kompetensi, dan pencapaian kelas XI TKJ 1."
      />
      <AchievementsRegister achievements={achievements} />
    </div>
  );
}
