# XI TKJ 1 — Platform Identitas Digital & Monograf Kelas

Website identitas digital resmi kelas **XI TKJ 1 (Teknik Komputer dan Jaringan)** yang dibangun dengan pendekatan **Swiss Editorial × Digital Architecture**, dilengkapi **Studio Pengelolaan (CMS)**, basis data **Supabase PostgreSQL**, penyimpanan media **Supabase Storage**, serta deployment **Vercel**.

---

## Fitur Utama

1. **8 Halaman Publik Terintegrasi:**
   - **Beranda (`/`)**: Narasi *7-Act Scrollytelling* (Identitas, Jati Diri & Wali Kelas, Pilar Keahlian TKJ, Proyek Pilihan, Kegiatan, Galeri & Prestasi, Informasi & Penutup).
   - **Tentang Kami (`/tentang`)**: Cerita kelas, filosofi pembelajaran, visi & misi, slot **Logo TKJ**, serta profil lengkap **Wali Kelas (Walas)**. *(Catatan privasi: tidak menampilkan daftar nama siswa).*
   - **Proyek TKJ (`/proyek`)**: Portofolio karya teknis (*Networking*, *Server Administration*, *Hardware*, *Web Development*, *Cybersecurity*, *IoT*) lengkap dengan modal detail arsitektur & tech stack.
   - **Kegiatan (`/kegiatan`)**: Linimasa kronologis aktivitas praktikum dan kebersamaan kelas.
   - **Galeri (`/galeri`)**: Arsip fotografi dengan filter kategori dan *Fullscreen Lightbox* (mendukung kontrol keyboard `Escape` dan tombol panah).
   - **Prestasi (`/prestasi`)**: Register catatan pencapaian resmi dan sertifikasi kompetensi kelas.
   - **Informasi (`/informasi`)**: Papan pengumuman dan agenda praktikum dengan fitur sematkan (*pinned*).
   - **Kontak (`/kontak`)**: Informasi saluran komunikasi resmi & formulir pesan langsung yang tersimpan ke Supabase.

2. **Studio Pengelolaan Kelas (`/masuk` & `/dashboard`):**
   - Unggah & ganti **Logo TKJ** secara instan ke Supabase Storage.
   - Perbarui **Profil, Foto & Sambutan Wali Kelas**.
   - Tambah, ubah, dan arsipkan Proyek, Kegiatan, Galeri Foto, Prestasi, dan Pengumuman tanpa menyentuh kode.
   - Kotak masuk pesan pengunjung dan fitur ganti kata sandi pengelola.

---

## Stack Teknologi

- **Framework:** Next.js 16 (App Router) + React 19
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS v4 + CSS Design Tokens (`globals.css`)
- **Animasi:** Framer Motion (dengan dukungan `prefers-reduced-motion`)
- **Ikon:** Lucide React
- **Database & Storage:** Supabase (PostgreSQL + RPC Security Definer + Bucket `class-media`)
- **Hosting:** Vercel

---

## Menjalankan Secara Lokal

1. Pastikan Node.js v20+ terpasang.
2. Salin konfigurasi environment pada `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_your_key_here
   ```
3. Pasang dependensi:
   ```bash
   npm install
   ```
4. Jalankan server pengembangan atau build produksi:
   ```bash
   npm run dev
   # atau
   npm run build && npm run start
   ```

*(Catatan khusus Windows PowerShell jika eksekusi skrip diblokir: gunakan `npm.cmd run dev` atau `npm.cmd run build`).*
