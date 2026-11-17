"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Menu, X, ArrowUpRight } from "lucide-react";
import { TkjLogoSlot } from "@/components/ui/TkjLogoSlot";
import { cn } from "@/lib/utils";

interface NavbarProps {
  logoUrl?: string | null;
  classNameTitle?: string;
  departmentName?: string;
}

const NAV_ITEMS = [
  { href: "/", label: "Beranda", code: "01" },
  { href: "/tentang", label: "Tentang Kami", code: "02" },
  { href: "/proyek", label: "Proyek", code: "03" },
  { href: "/kegiatan", label: "Kegiatan", code: "04" },
  { href: "/galeri", label: "Galeri", code: "05" },
  { href: "/prestasi", label: "Prestasi", code: "06" },
  { href: "/informasi", label: "Informasi", code: "07" },
  { href: "/kontak", label: "Kontak", code: "08" },
];

export function Navbar({
  logoUrl,
  classNameTitle = "XI TKJ 1",
  departmentName = "Teknik Komputer dan Jaringan",
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isAdminRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/masuk");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-200 border-b",
        scrolled
          ? "bg-[#0A0E17]/95 backdrop-blur-md border-[#1E293B]"
          : "bg-[#0A0E17] border-[#1E293B]"
      )}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="flex h-16 sm:h-[72px] items-center justify-between gap-4">
          {/* Brand + Logo TKJ Slot */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none"
            aria-label={`Beranda ${classNameTitle}`}
          >
            <TkjLogoSlot logoUrl={logoUrl} size="sm" surface="dark" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display text-base sm:text-lg font-bold tracking-[-0.03em] text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
                  {classNameTitle}
                </span>
                <span className="hidden sm:inline-block font-mono-tech text-[10px] tracking-[0.08em] text-[#3B82F6] border border-[#1E293B] bg-[#111827] px-1.5 py-0.5 rounded-[2px]">
                  SYS·01
                </span>
              </div>
              <span className="hidden md:block font-mono-tech text-[10px] tracking-[0.06em] uppercase text-[#94A3B8]">
                {departmentName}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden xl:flex items-center gap-1"
          >
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-[13px] font-medium transition-colors rounded-[2px]",
                    active
                      ? "text-[#F8FAFC] bg-[#111827]"
                      : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#111827]/60"
                  )}
                >
                  <span className="font-mono-tech text-[10px] text-[#3B82F6] mr-1.5">
                    {item.code}
                  </span>
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#2563EB]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Studio Pengelolaan + Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <Link
              href={isAdminRoute ? "/dashboard" : "/masuk"}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech uppercase tracking-[0.06em] border rounded-[2px] transition-colors",
                isAdminRoute
                  ? "bg-[#2563EB] border-[#2563EB] text-white"
                  : "bg-[#111827] border-[#1E293B] text-[#F8FAFC] hover:border-[#3B82F6] hover:text-[#3B82F6]"
              )}
            >
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Studio Pengelola</span>
              <span className="sm:hidden">Kelola</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              className="xl:hidden inline-flex items-center justify-center h-9 w-9 border border-[#1E293B] bg-[#111827] text-[#F8FAFC] rounded-[2px] hover:border-[#3B82F6] transition-colors"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="xl:hidden border-t border-[#1E293B] bg-[#0A0E17] px-4 sm:px-8 py-6"
        >
          <div className="mb-4 flex items-center justify-between border-b border-[#1E293B] pb-3">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#94A3B8]">
              INDEKS NAVIGASI // {classNameTitle}
            </span>
            <span className="font-mono-tech text-[11px] text-[#3B82F6]">
              08 RUTE AKTIF
            </span>
          </div>
          <nav aria-label="Navigasi Mobile" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-3 border rounded-[2px] transition-colors",
                    active
                      ? "border-[#2563EB] bg-[#111827] text-[#F8FAFC]"
                      : "border-[#1E293B] bg-[#0A0E17] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#334155]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono-tech text-xs text-[#3B82F6]">
                      {item.code}
                    </span>
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 opacity-60" aria-hidden="true" />
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
