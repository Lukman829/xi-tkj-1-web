"use client";

import { useMemo, useState } from "react";
import { Award, Building2, ShieldCheck } from "lucide-react";
import type { AchievementItem } from "@/types";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { cn } from "@/lib/utils";

interface AchievementsRegisterProps {
  achievements: AchievementItem[];
}

const CATEGORIES = [
  "Semua",
  "Kompetisi Teknis",
  "Sertifikasi",
  "Akademik",
  "Non-Akademik",
] as const;

export function AchievementsRegister({
  achievements,
}: AchievementsRegisterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const filtered = useMemo(() => {
    if (selectedCategory === "Semua") return achievements;
    return achievements.filter((a) => a.category === selectedCategory);
  }, [achievements, selectedCategory]);

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-10">
      {/* Authenticity Notice */}
      <div className="border border-[#DCE2EC] bg-[#FFFFFF] p-5 rounded-[2px] flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-[#2563EB] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#0F172A]">
            PRINSIP KEASLIAN DATA PRESTASI
          </p>
          <p className="text-sm text-[#475569] leading-relaxed">
            Arsip ini hanya mendokumentasikan pencapaian nyata dan sertifikasi terverifikasi atas nama delegasi atau kelas XI TKJ 1 (tanpa mempublikasikan data pribadi siswa).
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#DCE2EC]">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter kategori prestasi">
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

        <span className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#64748B]">
          {filtered.length} CATATAN TERDAFTAR
        </span>
      </div>

      {/* Swiss Editorial Index List */}
      {filtered.length === 0 ? (
        <div className="border border-[#DCE2EC] bg-[#FFFFFF] p-12 text-center rounded-[2px]">
          <p className="font-display text-lg font-bold text-[#0F172A]">
            Belum ada catatan prestasi pada kategori ini
          </p>
        </div>
      ) : (
        <div className="border-t border-[#DCE2EC]">
          {filtered.map((ach, idx) => (
            <article
              key={ach.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-7 border-b border-[#DCE2EC] items-start"
            >
              <div className="lg:col-span-2 flex items-center gap-3">
                <span className="font-mono-tech text-xs text-[#2563EB]">
                  REG-0{idx + 1}
                </span>
                <span className="font-mono-tech text-xs px-2 py-0.5 bg-[#FFFFFF] border border-[#DCE2EC] rounded-[2px] text-[#0F172A]">
                  {ach.year}
                </span>
              </div>

              <div className="lg:col-span-5 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#2563EB]">
                    <Award className="h-3.5 w-3.5" aria-hidden="true" />
                    {ach.category}
                  </span>
                  {ach.is_placeholder && <PlaceholderBadge variant="light" />}
                </div>
                <h2 className="font-display text-xl font-bold text-[#0F172A]">
                  {ach.title}
                </h2>
                <p className="text-xs font-mono-tech uppercase tracking-[0.06em] text-[#64748B]">
                  UNIT: {ach.team_or_unit}
                </p>
              </div>

              <div className="lg:col-span-5 space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0F172A]">
                  <Building2 className="h-3.5 w-3.5 text-[#2563EB]" aria-hidden="true" />
                  <span>Penyelenggara: {ach.organizer}</span>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
