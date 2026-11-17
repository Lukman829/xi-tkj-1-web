import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { GalleryShowcase } from "@/components/sections/GalleryShowcase";
import { fetchGallery } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galeri Dokumentasi",
  description:
    "Arsip visual dan dokumentasi fotografi kelas XI TKJ 1 dengan tampilan layar penuh interaktif.",
};

export default async function GaleriPage() {
  const items = await fetchGallery();

  return (
    <div className="bg-[#F6F7FA] min-h-screen">
      <PageBanner
        sectionCode="SEC // 05"
        categoryLabel="ARSIP VISUAL"
        title="Galeri Dokumentasi Kelas"
        description="Kumpulan potret kegiatan praktikum laboratorium, infrastruktur perangkat keras, dan kebersamaan kelas XI TKJ 1."
      />
      <GalleryShowcase items={items} />
    </div>
  );
}
