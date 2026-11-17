import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { ProjectExplorer } from "@/components/sections/ProjectExplorer";
import { fetchProjects } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Proyek TKJ",
  description:
    "Etalase dokumentasi proyek teknis XI TKJ 1: Networking, Server Administration, Hardware, Web Development, Cybersecurity, dan IoT.",
};

interface ProyekPageProps {
  searchParams: Promise<{ highlight?: string }>;
}

export default async function ProyekPage({ searchParams }: ProyekPageProps) {
  const [projects, params] = await Promise.all([fetchProjects(), searchParams]);

  return (
    <div className="bg-[#F6F7FA] min-h-screen">
      <PageBanner
        sectionCode="SEC // 03"
        categoryLabel="ETALASE TEKNIS"
        title="Proyek & Rekayasa TKJ"
        description="Kumpulan proyek praktikum jaringan, administrasi server, perangkat keras, dan pengembangan web yang dikerjakan secara kolaboratif oleh tim XI TKJ 1."
      />
      <ProjectExplorer
        projects={projects}
        initialHighlightSlug={params?.highlight}
      />
    </div>
  );
}
