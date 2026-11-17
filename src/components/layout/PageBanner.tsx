import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageBannerProps {
  sectionCode: string;
  categoryLabel: string;
  title: string;
  description: string;
}

export function PageBanner({
  sectionCode,
  categoryLabel,
  title,
  description,
}: PageBannerProps) {
  return (
    <section className="relative bg-[#0A0E17] bg-arch-grid-dark text-[#F8FAFC] border-b border-[#1E293B]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.08em] text-[#94A3B8] hover:text-[#3B82F6] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.08em]">
            <span className="text-[#3B82F6]">{sectionCode}</span>
            <span className="text-[#334155]">/</span>
            <span className="text-[#94A3B8]">{categoryLabel}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.03] text-[#F8FAFC]">
              {title}
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
