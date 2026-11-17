"use client";

import { useMemo, useState } from "react";
import { Calendar, Pin } from "lucide-react";
import type { AnnouncementItem } from "@/types";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { cn, formatIndonesianDate } from "@/lib/utils";

interface AnnouncementsBoardProps {
  announcements: AnnouncementItem[];
}

const CATEGORIES = [
  "Semua",
  "Penting",
  "Jadwal Praktikum",
  "Informasi Kelas",
] as const;

export function AnnouncementsBoard({ announcements }: AnnouncementsBoardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const filtered = useMemo(() => {
    if (selectedCategory === "Semua") return announcements;
    return announcements.filter((item) => item.category === selectedCategory);
  }, [announcements, selectedCategory]);

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#DCE2EC]">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter kategori informasi">
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
          {filtered.length} INFORMASI AKTIF
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-[#DCE2EC] bg-[#FFFFFF] p-12 text-center rounded-[2px]">
          <p className="font-display text-lg font-bold text-[#0F172A]">
            Belum ada informasi pada kategori ini
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <article
              key={item.id}
              className={cn(
                "border p-6 sm:p-8 rounded-[2px] transition-colors",
                item.is_pinned
                  ? "border-[#2563EB] bg-[#FFFFFF]"
                  : "border-[#DCE2EC] bg-[#FFFFFF]"
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE2EC] pb-4 mb-4">
                <div className="flex flex-wrap items-center gap-3">
                  {item.is_pinned && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#2563EB] text-white font-mono-tech text-[10px] uppercase tracking-[0.08em] rounded-[2px]">
                      <Pin className="h-3 w-3" aria-hidden="true" />
                      TERSEMAT
                    </span>
                  )}
                  <span className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
                    {item.category}
                  </span>
                  {item.is_placeholder && <PlaceholderBadge variant="light" />}
                </div>
                <div className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#64748B]">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{formatIndonesianDate(item.published_date)}</span>
                </div>
              </div>

              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F172A] mb-3">
                {item.title}
              </h2>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed whitespace-pre-line">
                {item.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
