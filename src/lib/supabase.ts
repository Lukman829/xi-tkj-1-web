import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

let browserClient: SupabaseClient | null = null;

export function getBrowserSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return browserClient;
}

export function getServerSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      fetch: (url, options = {}) =>
        fetch(url, {
          ...options,
          cache: "no-store",
        }),
    },
  });
}

export async function uploadClassMedia(
  file: File,
  folder: "branding" | "walas" | "projects" | "activities" | "gallery"
): Promise<{ publicUrl: string | null; error: string | null }> {
  const client = getBrowserSupabase();
  if (!client) {
    return {
      publicUrl: null,
      error: "Koneksi Supabase belum terkonfigurasi.",
    };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .slice(0, 40);
  const filePath = `${folder}/${Date.now()}-${safeName}.${ext}`;

  const { error: uploadError } = await client.storage
    .from("class-media")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) {
    return {
      publicUrl: null,
      error: uploadError.message,
    };
  }

  const { data } = client.storage.from("class-media").getPublicUrl(filePath);
  return {
    publicUrl: data.publicUrl,
    error: null,
  };
}
