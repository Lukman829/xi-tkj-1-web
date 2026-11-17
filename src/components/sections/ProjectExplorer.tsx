"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X, ArrowUpRight, Cpu, CheckCircle2, Users } from "lucide-react";
import type { ProjectItem } from "@/types";
import { BlueprintSchematic } from "@/components/ui/BlueprintSchematic";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { cn } from "@/lib/utils";

interface ProjectExplorerProps {
  projects: ProjectItem[];
  initialHighlightSlug?: string;
}

const CATEGORIES = [
  "Semua",
  "Networking",
  "Server Administration",
  "Hardware",
  "Web Development",
  "Cybersecurity",
  "IoT",
] as const;

export function ProjectExplorer({
  projects,
  initialHighlightSlug,
}: ProjectExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (initialHighlightSlug) {
      const found = projects.find((p) => p.slug === initialHighlightSlug);
      if (found) setActiveProject(found);
    }
  }, [initialHighlightSlug, projects]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCat =
        selectedCategory === "Semua" || project.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-10">
      {/* Filter & Search Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-[#DCE2EC]">
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter kategori proyek"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-3.5 py-2 text-xs font-mono-tech uppercase tracking-[0.06em] border rounded-[2px] transition-colors",
                selectedCategory === category
                  ? "bg-[#0A0E17] text-[#F8FAFC] border-[#0A0E17]"
                  : "bg-[#FFFFFF] text-[#475569] border-[#DCE2EC] hover:border-[#2563EB] hover:text-[#0F172A]"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul atau tech stack..."
            aria-label="Cari proyek TKJ"
            className="w-full pl-9 pr-3 py-2 text-sm bg-[#FFFFFF] border border-[#DCE2EC] rounded-[2px] text-[#0F172A] placeholder:text-[#64748B] focus:border-[#2563EB] focus:outline-none"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between font-mono-tech text-xs uppercase tracking-[0.08em] text-[#64748B]">
        <span>MENAMPILKAN {filteredProjects.length} PROYEK</span>
        <span>DOMAIN: {selectedCategory}</span>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="border border-[#DCE2EC] bg-[#FFFFFF] p-12 text-center rounded-[2px] space-y-3">
          <p className="font-display text-xl font-bold text-[#0F172A]">
            Belum ada proyek yang sesuai filter
          </p>
          <p className="text-sm text-[#475569]">
            Ubah kata kunci pencarian atau pilih kategori lain, atau tambahkan proyek baru melalui Studio Pengelolaan.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="group border border-[#DCE2EC] bg-[#FFFFFF] rounded-[2px] flex flex-col justify-between overflow-hidden hover:border-[#2563EB] transition-colors"
            >
              <div>
                <div className="h-56 w-full border-b border-[#DCE2EC] overflow-hidden bg-[#0A0E17]">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  ) : (
                    <BlueprintSchematic
                      category={project.category}
                      codeLabel={`PRJ-0${idx + 1} // ${project.category.toUpperCase()}`}
                      surface="dark"
                      className="border-0"
                    />
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#2563EB]">
                      {project.category}
                    </span>
                    {project.is_placeholder && <PlaceholderBadge variant="light" />}
                  </div>

                  <h2 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[#0F172A]">
                    {project.title}
                  </h2>

                  <p className="text-sm text-[#475569] leading-relaxed">
                    {project.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-[#DCE2EC] flex flex-wrap items-center justify-between gap-3 bg-[#F6F7FA]">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono-tech text-[10px] uppercase tracking-[0.06em] px-2 py-0.5 bg-[#FFFFFF] border border-[#DCE2EC] text-[#475569] rounded-[2px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0A0E17] hover:bg-[#2563EB] text-[#F8FAFC] font-mono-tech text-xs uppercase tracking-[0.06em] rounded-[2px] transition-colors"
                >
                  <span>Detail Teknis</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Technical Specification Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-[70] bg-[#0A0E17]/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FFFFFF] border border-[#DCE2EC] rounded-[2px] text-[#0F172A]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#0A0E17] text-[#F8FAFC] border-b border-[#1E293B]">
              <div className="flex items-center gap-3">
                <span className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#3B82F6]">
                  SPESIFIKASI PROYEK // {activeProject.category}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Tutup rincian proyek"
                className="p-1.5 border border-[#1E293B] hover:border-[#3B82F6] rounded-[2px] text-[#94A3B8] hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {activeProject.is_placeholder && <PlaceholderBadge variant="light" />}

              <h3
                id="project-modal-title"
                className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em]"
              >
                {activeProject.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech uppercase tracking-[0.06em] text-[#475569] border-y border-[#DCE2EC] py-3">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-[#2563EB]" aria-hidden="true" />
                  {activeProject.team_unit}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
                  01 // RINGKASAN KONTEKS
                </h4>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  {activeProject.summary}
                </p>
              </div>

              <div className="space-y-2 bg-[#F6F7FA] border border-[#DCE2EC] p-5 rounded-[2px]">
                <h4 className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.08em] text-[#0F172A]">
                  <Cpu className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                  <span>02 // ARSITEKTUR & PROSES PENGERJAAN</span>
                </h4>
                <p className="text-sm text-[#475569] leading-relaxed whitespace-pre-line">
                  {activeProject.architecture_details}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
                  03 // TECH STACK & PERANGKAT
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono-tech text-xs px-2.5 py-1 border border-[#DCE2EC] bg-[#F6F7FA] text-[#0F172A] rounded-[2px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t border-[#DCE2EC] pt-4">
                <h4 className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  <span>04 // HASIL PENGUJIAN & CAPAIAN</span>
                </h4>
                <p className="text-sm font-medium text-[#0F172A] leading-relaxed">
                  {activeProject.result_output}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
