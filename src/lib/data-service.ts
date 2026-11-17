import { getServerSupabase } from "./supabase";
import { FALLBACK_BUNDLE, FALLBACK_SETTINGS } from "./fallback-data";
import type {
  AchievementItem,
  ActivityItem,
  AnnouncementItem,
  ClassSettings,
  GalleryItem,
  ProjectItem,
  SiteBundle,
} from "@/types";

export async function fetchClassSettings(): Promise<ClassSettings> {
  const supabase = getServerSupabase();
  if (!supabase) return FALLBACK_SETTINGS;

  try {
    const { data, error } = await supabase
      .from("class_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (error || !data) return FALLBACK_SETTINGS;
    return data as ClassSettings;
  } catch {
    return FALLBACK_SETTINGS;
  }
}

export async function fetchProjects(): Promise<ProjectItem[]> {
  const supabase = getServerSupabase();
  if (!supabase) return FALLBACK_BUNDLE.projects;

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_archived", false)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error || !data) return FALLBACK_BUNDLE.projects;
    return data as ProjectItem[];
  } catch {
    return FALLBACK_BUNDLE.projects;
  }
}

export async function fetchActivities(): Promise<ActivityItem[]> {
  const supabase = getServerSupabase();
  if (!supabase) return FALLBACK_BUNDLE.activities;

  try {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .eq("is_archived", false)
      .order("activity_date", { ascending: false });

    if (error || !data) return FALLBACK_BUNDLE.activities;
    return data as ActivityItem[];
  } catch {
    return FALLBACK_BUNDLE.activities;
  }
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  const supabase = getServerSupabase();
  if (!supabase) return FALLBACK_BUNDLE.gallery;

  try {
    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .eq("is_archived", false)
      .order("created_at", { ascending: false });

    if (error || !data) return FALLBACK_BUNDLE.gallery;
    return data as GalleryItem[];
  } catch {
    return FALLBACK_BUNDLE.gallery;
  }
}

export async function fetchAchievements(): Promise<AchievementItem[]> {
  const supabase = getServerSupabase();
  if (!supabase) return FALLBACK_BUNDLE.achievements;

  try {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .eq("is_archived", false)
      .order("year", { ascending: false })
      .order("created_at", { ascending: false });

    if (error || !data) return FALLBACK_BUNDLE.achievements;
    return data as AchievementItem[];
  } catch {
    return FALLBACK_BUNDLE.achievements;
  }
}

export async function fetchAnnouncements(): Promise<AnnouncementItem[]> {
  const supabase = getServerSupabase();
  if (!supabase) return FALLBACK_BUNDLE.announcements;

  try {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("is_archived", false)
      .order("is_pinned", { ascending: false })
      .order("published_date", { ascending: false });

    if (error || !data) return FALLBACK_BUNDLE.announcements;
    return data as AnnouncementItem[];
  } catch {
    return FALLBACK_BUNDLE.announcements;
  }
}

export async function fetchSiteBundle(): Promise<SiteBundle> {
  const [settings, projects, activities, gallery, achievements, announcements] =
    await Promise.all([
      fetchClassSettings(),
      fetchProjects(),
      fetchActivities(),
      fetchGallery(),
      fetchAchievements(),
      fetchAnnouncements(),
    ]);

  return {
    settings,
    projects,
    activities,
    gallery,
    achievements,
    announcements,
  };
}
