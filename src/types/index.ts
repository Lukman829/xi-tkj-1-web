export type ProjectCategory =
  | "Networking"
  | "Server Administration"
  | "Hardware"
  | "Web Development"
  | "Cybersecurity"
  | "IoT";

export type ActivityCategory =
  | "Praktikum Lab"
  | "Kegiatan Kelas"
  | "Acara Sekolah"
  | "Kolaborasi";

export type GalleryCategory =
  | "Praktikum"
  | "Kebersamaan"
  | "Infrastruktur"
  | "Acara";

export type AchievementCategory =
  | "Kompetisi Teknis"
  | "Sertifikasi"
  | "Akademik"
  | "Non-Akademik";

export type AnnouncementCategory =
  | "Penting"
  | "Jadwal Praktikum"
  | "Informasi Kelas";

export interface ClassSettings {
  id: number;
  class_name: string;
  department_name: string;
  school_name: string;
  academic_year: string;
  logo_tkj_url: string | null;
  hero_headline: string;
  hero_subheadline: string;
  about_story: string;
  philosophy_text: string;
  vision_text: string;
  mission_items: string[];
  homeroom_teacher_name: string;
  homeroom_teacher_role: string;
  homeroom_teacher_photo_url: string | null;
  homeroom_teacher_quote: string;
  contact_email: string | null;
  contact_instagram: string | null;
  contact_location: string | null;
  updated_at?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  team_unit: string;
  summary: string;
  architecture_details: string;
  technologies: string[];
  result_output: string;
  image_url: string | null;
  is_featured: boolean;
  is_placeholder: boolean;
  created_at?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  activity_date: string;
  category: ActivityCategory;
  description: string;
  location: string;
  image_url: string | null;
  is_placeholder: boolean;
  created_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  caption: string;
  image_url: string | null;
  taken_date: string;
  aspect_ratio: string;
  is_placeholder: boolean;
  created_at?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: AchievementCategory;
  organizer: string;
  year: string;
  team_or_unit: string;
  description: string;
  is_placeholder: boolean;
  created_at?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  category: AnnouncementCategory;
  content: string;
  is_pinned: boolean;
  published_date: string;
  is_placeholder: boolean;
  created_at?: string;
}

export interface ContactMessage {
  id: string;
  sender_name: string;
  sender_origin: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface SiteBundle {
  settings: ClassSettings;
  projects: ProjectItem[];
  activities: ActivityItem[];
  gallery: GalleryItem[];
  achievements: AchievementItem[];
  announcements: AnnouncementItem[];
}
