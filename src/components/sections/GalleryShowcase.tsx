"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { GalleryItem } from "@/types";
import { BlueprintSchematic } from "@/components/ui/BlueprintSchematic";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { cn } from "@/lib/utils";

interface GalleryShowcaseProps {
  items: GalleryItem[];
}

const CATEGORIES = [
  "Semua",
  "Praktikum",
  "Kebersamaan",
  "Infrastruktur",
  "Acara",
] as const;

export function GalleryShowcase({ items }: GalleryShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (selectedCategory === "Semua") return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filtered.length
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + filtered.length) % filtered.length
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, filtered.length]);

  const activeItem =
    lightboxIndex !== null && filtered[lightboxIndex]
      ? filtered[lightboxIndex]
      : null;

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-10">
      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#DCE2EC]">
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter kategori galeri"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category}
              onClick={() => {
                setSelectedCategory(category);
                setLightboxIndex(null);
              }}
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
          {filtered.length} DOKUMENTASI VISUAL
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-[#DCE2EC] bg-[#FFFFFF] p-12 text-center rounded-[2px]">
          <p className="font-display text-lg font-bold text-[#0F172A]">
            Belum ada foto pada kategori ini
          </p>
          <p className="text-sm text-[#475569] mt-1">
            Unggah foto dokumentasi baru melalui Studio Pengelolaan (/dashboard).
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filtered.map((item, idx) => {
            const isWide = idx % 3 === 0;
            return (
              <figure
                key={item.id}
                className={cn(
                  "group border border-[#DCE2EC] bg-[#FFFFFF] rounded-[2px] overflow-hidden flex flex-col justify-between hover:border-[#2563EB] transition-colors",
                  isWide ? "md:col-span-7" : "md:col-span-5"
                )}
              >
                <div className="relative h-64 sm:h-72 w-full border-b border-[#DCE2EC] overflow-hidden bg-[#0A0E17]">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : (
                    <BlueprintSchematic
                      category={item.category}
                      codeLabel={`GAL-0${idx + 1} // ${item.taken_date}`}
                      surface="dark"
                      className="border-0"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={`Perbesar dokumentasi ${item.title}`}
                    className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0A0E17]/85 hover:bg-[#2563EB] text-white border border-[#1E293B] font-mono-tech text-[10px] uppercase tracking-[0.08em] rounded-[2px] transition-colors"
                  >
                    <Maximize2 className="h-3 w-3" aria-hidden="true" />
                    <span>Layar Penuh</span>
                  </button>
                </div>

                <figcaption className="p-5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#2563EB]">
                      {item.category} · {item.taken_date}
                    </span>
                    {item.is_placeholder && <PlaceholderBadge variant="light" />}
                  </div>
                  <h2 className="font-display text-lg font-bold text-[#0F172A]">
                    {item.title}
                  </h2>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {item.caption}
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {activeItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Tampilan layar penuh: ${activeItem.title}`}
          className="fixed inset-0 z-[80] bg-[#0A0E17]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 text-[#F8FAFC]"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="flex items-center justify-between border-b border-[#1E293B] pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-0.5">
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#3B82F6]">
                GALERI {lightboxIndex + 1} / {filtered.length} · {activeItem.category}
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold">
                {activeItem.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Tutup lightbox"
              className="p-2 border border-[#1E293B] bg-[#111827] hover:border-[#3B82F6] rounded-[2px] text-[#F8FAFC]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="flex-1 flex items-center justify-center py-6 relative max-h-[70vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {filtered.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + filtered.length) % filtered.length
                  )
                }
                aria-label="Foto sebelumnya"
                className="absolute left-0 sm:left-4 z-10 p-3 border border-[#1E293B] bg-[#111827]/90 hover:border-[#3B82F6] rounded-[2px]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            <div className="w-full max-w-4xl h-full max-h-[65vh] border border-[#1E293B] bg-[#111827] rounded-[2px] overflow-hidden flex items-center justify-center">
              {activeItem.image_url ? (
                <img
                  src={activeItem.image_url}
                  alt={activeItem.title}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="w-full h-72 sm:h-96">
                  <BlueprintSchematic
                    category={activeItem.category}
                    codeLabel={`LIGHTBOX // ${activeItem.taken_date}`}
                    surface="dark"
                    className="border-0"
                  />
                </div>
              )}
            </div>

            {filtered.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % filtered.length)
                }
                aria-label="Foto berikutnya"
                className="absolute right-0 sm:right-4 z-10 p-3 border border-[#1E293B] bg-[#111827]/90 hover:border-[#3B82F6] rounded-[2px]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>

          <div
            className="border-t border-[#1E293B] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-[#94A3B8]"
            onClick={(e) => e.stopPropagation()}
          >
            <p>{activeItem.caption}</p>
            <span className="font-mono-tech text-xs text-[#64748B] shrink-0">
              ESC · PANAH KIRI/KANAN
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
