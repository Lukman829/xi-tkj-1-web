import type { Metadata } from "next";
import { Mail, MapPin, AtSign, UserCheck } from "lucide-react";
import { PageBanner } from "@/components/layout/PageBanner";
import { ContactForm } from "@/components/sections/ContactForm";
import { fetchClassSettings } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Saluran komunikasi resmi dan formulir pesan langsung untuk kelas XI TKJ 1.",
};

export default async function KontakPage() {
  const settings = await fetchClassSettings();

  return (
    <div className="bg-[#F6F7FA] min-h-screen">
      <PageBanner
        sectionCode="SEC // 08"
        categoryLabel="KOMUNIKASI RESMI"
        title="Hubungi XI TKJ 1"
        description="Saluran informasi resmi untuk komunikasi guru, mitra industri/PKL, serta kolaborasi lintas kelas."
      />

      <section className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-[#DCE2EC] bg-[#FFFFFF] p-6 rounded-[2px] space-y-5">
              <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
                SALURAN & LOKASI
              </p>

              <div className="space-y-4 text-sm text-[#475569]">
                <div className="flex items-start gap-3">
                  <UserCheck className="h-4 w-4 text-[#2563EB] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#0F172A]">Wali Kelas Pembina</p>
                    <p>{settings.homeroom_teacher_name}</p>
                    <p className="text-xs text-[#64748B]">{settings.homeroom_teacher_role}</p>
                  </div>
                </div>

                {settings.contact_location && (
                  <div className="flex items-start gap-3 pt-3 border-t border-[#DCE2EC]">
                    <MapPin className="h-4 w-4 text-[#2563EB] shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[#0F172A]">Lokasi Laboratorium / Kelas</p>
                      <p>{settings.contact_location}</p>
                    </div>
                  </div>
                )}

                {settings.contact_email && (
                  <div className="flex items-start gap-3 pt-3 border-t border-[#DCE2EC]">
                    <Mail className="h-4 w-4 text-[#2563EB] shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[#0F172A]">Email Resmi Kelas</p>
                      <p>{settings.contact_email}</p>
                    </div>
                  </div>
                )}

                {settings.contact_instagram && (
                  <div className="flex items-start gap-3 pt-3 border-t border-[#DCE2EC]">
                    <AtSign className="h-4 w-4 text-[#2563EB] shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[#0F172A]">Media Sosial Resmi</p>
                      <p>{settings.contact_instagram}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border border-[#1E293B] bg-[#0A0E17] text-[#F8FAFC] p-6 rounded-[2px] space-y-2">
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#3B82F6]">
                CATATAN PRIVASI
              </p>
              <p className="text-xs leading-relaxed text-[#94A3B8]">
                Demi menjaga privasi siswa, portal ini tidak mencantumkan nomor telepon pribadi siswa di halaman publik. Seluruh pesan melalui formulir akan ditinjau oleh Wali Kelas atau Pengurus resmi.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
