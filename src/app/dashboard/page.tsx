"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Award,
  Calendar,
  Cpu,
  ExternalLink,
  Image as ImageIcon,
  LogOut,
  Mail,
  Megaphone,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { getBrowserSupabase } from "@/lib/supabase";
import { FALLBACK_SETTINGS } from "@/lib/fallback-data";
import type {
  AchievementItem,
  ActivityItem,
  AnnouncementItem,
  ClassSettings,
  ContactMessage,
  GalleryItem,
  ProjectItem,
} from "@/types";
import { SettingsPanel } from "@/components/dashboard/SettingsPanel";
import {
  AchievementsManager,
  ActivitiesManager,
  AnnouncementsManager,
  GalleryManager,
  ProjectsManager,
} from "@/components/dashboard/ContentManagers";
import { MessagesAndSecurityPanel } from "@/components/dashboard/MessagesAndSecurityPanel";
import { cn } from "@/lib/utils";

type DashboardTab =
  | "settings"
  | "projects"
  | "activities"
  | "gallery"
  | "achievements"
  | "announcements"
  | "messages";

export default function DashboardPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>("settings");
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState<ClassSettings>(FALLBACK_SETTINGS);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const loadAllData = useCallback(async (activePasscode: string) => {
    const supabase = getBrowserSupabase();
    if (!supabase) return;

    const [
      settingsRes,
      projectsRes,
      activitiesRes,
      galleryRes,
      achievementsRes,
      announcementsRes,
      messagesRes,
    ] = await Promise.all([
      supabase.from("class_settings").select("*").eq("id", 1).single(),
      supabase
        .from("projects")
        .select("*")
        .eq("is_archived", false)
        .order("created_at", { ascending: false }),
      supabase
        .from("activities")
        .select("*")
        .eq("is_archived", false)
        .order("activity_date", { ascending: false }),
      supabase
        .from("gallery_items")
        .select("*")
        .eq("is_archived", false)
        .order("created_at", { ascending: false }),
      supabase
        .from("achievements")
        .select("*")
        .eq("is_archived", false)
        .order("year", { ascending: false }),
      supabase
        .from("announcements")
        .select("*")
        .eq("is_archived", false)
        .order("is_pinned", { ascending: false })
        .order("published_date", { ascending: false }),
      supabase.rpc("admin_get_messages", { passcode_input: activePasscode }),
    ]);

    if (settingsRes.data) setSettings(settingsRes.data as ClassSettings);
    if (projectsRes.data) setProjects(projectsRes.data as ProjectItem[]);
    if (activitiesRes.data) setActivities(activitiesRes.data as ActivityItem[]);
    if (galleryRes.data) setGallery(galleryRes.data as GalleryItem[]);
    if (achievementsRes.data)
      setAchievements(achievementsRes.data as AchievementItem[]);
    if (announcementsRes.data)
      setAnnouncements(announcementsRes.data as AnnouncementItem[]);
    if (messagesRes.data) setMessages(messagesRes.data as ContactMessage[]);
  }, []);

  useEffect(() => {
    async function init() {
      const saved = sessionStorage.getItem("tkj1_admin_passcode");
      if (!saved) {
        router.replace("/masuk");
        return;
      }

      const supabase = getBrowserSupabase();
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data: valid } = await supabase.rpc("verify_admin_passcode", {
        passcode_input: saved,
      });

      if (valid !== true) {
        sessionStorage.removeItem("tkj1_admin_passcode");
        router.replace("/masuk");
        return;
      }

      setPasscode(saved);
      await loadAllData(saved);
      setLoading(false);
    }

    init();
  }, [router, loadAllData]);

  function handleLogout() {
    sessionStorage.removeItem("tkj1_admin_passcode");
    router.push("/masuk");
  }

  if (loading || !passcode) {
    return (
      <div className="min-h-[75vh] bg-[#F6F7FA] flex items-center justify-center px-4">
        <div className="border border-[#DCE2EC] bg-[#FFFFFF] px-8 py-6 rounded-[2px] text-center space-y-2">
          <p className="font-mono-tech text-xs uppercase tracking-[0.08em] text-[#2563EB]">
            MEMUAT STUDIO PENGELOLAAN
          </p>
          <p className="text-sm text-[#475569]">
            Menghubungkan sesi ke Supabase PostgreSQL & Storage...
          </p>
        </div>
      </div>
    );
  }

  const TABS: { id: DashboardTab; label: string; icon: typeof Settings }[] = [
    { id: "settings", label: "Identitas, Logo TKJ & Walas", icon: Settings },
    { id: "projects", label: "Proyek TKJ", icon: Cpu },
    { id: "activities", label: "Kegiatan", icon: Calendar },
    { id: "gallery", label: "Galeri Foto", icon: ImageIcon },
    { id: "achievements", label: "Prestasi", icon: Award },
    { id: "announcements", label: "Informasi", icon: Megaphone },
    { id: "messages", label: "Pesan & Keamanan", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7FA] text-[#0F172A]">
      {/* Studio Top Bar */}
      <div className="bg-[#0A0E17] text-[#F8FAFC] border-b border-[#1E293B]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#3B82F6]">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              TKJ-ARCH // STUDIO CMS TERHUBUNG SUPABASE
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.02em]">
              Studio Pengelolaan {settings.class_name}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#1E293B] bg-[#111827] hover:border-[#3B82F6] text-xs font-mono-tech uppercase rounded-[2px]"
            >
              <span>Lihat Situs Publik</span>
              <ExternalLink className="h-3.5 w-3.5 text-[#3B82F6]" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-red-500/40 bg-red-950/30 hover:bg-red-950/60 text-red-200 text-xs font-mono-tech uppercase rounded-[2px]"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 border border-[#DCE2EC] bg-[#FFFFFF] p-2 rounded-[2px] flex lg:flex-col gap-1 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium rounded-[2px] whitespace-nowrap transition-colors",
                    active
                      ? "bg-[#0A0E17] text-[#F8FAFC]"
                      : "text-[#475569] hover:bg-[#F6F7FA] hover:text-[#0F172A]"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      active ? "text-[#3B82F6]" : "text-[#64748B]"
                    )}
                    aria-hidden="true"
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Active Tab Workspace */}
          <div className="lg:col-span-9">
            {activeTab === "settings" && (
              <SettingsPanel
                passcode={passcode}
                initialSettings={settings}
                onUpdated={(updated) => setSettings(updated)}
              />
            )}
            {activeTab === "projects" && (
              <ProjectsManager
                passcode={passcode}
                items={projects}
                onReload={() => loadAllData(passcode)}
              />
            )}
            {activeTab === "activities" && (
              <ActivitiesManager
                passcode={passcode}
                items={activities}
                onReload={() => loadAllData(passcode)}
              />
            )}
            {activeTab === "gallery" && (
              <GalleryManager
                passcode={passcode}
                items={gallery}
                onReload={() => loadAllData(passcode)}
              />
            )}
            {activeTab === "achievements" && (
              <AchievementsManager
                passcode={passcode}
                items={achievements}
                onReload={() => loadAllData(passcode)}
              />
            )}
            {activeTab === "announcements" && (
              <AnnouncementsManager
                passcode={passcode}
                items={announcements}
                onReload={() => loadAllData(passcode)}
              />
            )}
            {activeTab === "messages" && (
              <MessagesAndSecurityPanel
                passcode={passcode}
                messages={messages}
                onReloadMessages={() => loadAllData(passcode)}
                onPasscodeChanged={(newPass) => {
                  sessionStorage.setItem("tkj1_admin_passcode", newPass);
                  setPasscode(newPass);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
