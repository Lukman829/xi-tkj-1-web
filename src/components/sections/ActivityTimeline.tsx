"use client";

import { useMemo, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import type { ActivityItem } from "@/types";
import { BlueprintSchematic } from "@/components/ui/BlueprintSchematic";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { cn, formatIndonesianDate } from "@/lib/utils";

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

const CATEGORIES = [
  "Semua",
  "Praktikum Lab",
  "Kegiatan Kelas",
  "Acara Sekolah",
  "Kolaborasi",
] as const;

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const filtered = useMemo(() => {
    if (selectedCategory === "Semua") return activities;
    return activities.filter((a) => a.category === selectedCategory);
  }, [activities, selectedCategory]);

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#DCE2EC]">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter kegiatan">
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
          {filtered.length} KEGIATAN TERCATAT
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-[#DCE2EC] bg-[#FFFFFF] p-12 text-center rounded-[2px]">
          <p className="font-display text-lg font-bold text-[#0F172A]">
            Belum ada kegiatan pada kategori ini
          </p>
        </div>
      ) : (
        <div className="border-t border-[#DCE2EC]">
          {filtered.map((item, idx) => (
            <article
              key={item.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-8 border-b border-[#DCE2EC] items-start"
            >
              {/* Date & Location */}
              <div className="lg:col-span-3 space-y-2">
                <span className="font-mono-tech text-xs text-[#2563EB] block">
                  LOG // 0{idx + 1}
                </span>
                <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.06em] text-[#0F172A]">
                  <Calendar className="h-3.5 w-3.5 text-[#2563EB]" aria-hidden="true" />
                  <span>{formatIndonesianDate(item.activity_date)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{item.location}</span>
                </div>
                <span className="inline-block font-mono-tech text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 bg-[#FFFFFF] border border-[#DCE2EC] text-[#475569] rounded-[2px]">
                  {item.category}
                </span>
              </div>

              {/* Editorial Content */}
              <div className="lg:col-span-5 space-y-3">
                {item.is_placeholder && <PlaceholderBadge variant="light" />}
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[#0F172A]">
                  {item.title}
                </h2>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Visual Frame */}
              <div className="lg:col-span-4 h-48 border border-[#DCE2EC] rounded-[2px] overflow-hidden bg-[#FFFFFF]">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <BlueprintSchematic
                    category={item.category === "Praktikum Lab" ? "Networking" : "Kegiatan"}
                    codeLabel={`ACT // ${item.activity_date}`}
                    surface="light"
                    className="border-0"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
