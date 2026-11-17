# Panduan Pengelolaan Konten Website XI TKJ 1

Dokumen ini menjelaskan cara mengelola seluruh isi website XI TKJ 1 langsung dari **Studio Pengelolaan** tanpa perlu mengubah kode program.

---

## 1. Cara Masuk ke Studio Pengelolaan

1. Buka menu **Studio Pengelola** di kanan atas website (atau akses rute `/masuk`).
2. Masukkan **Kata Sandi Pengelola** bawaan awal: `tkj1admin`.
3. Setelah berhasil masuk ke `/dashboard`, **segera ubah kata sandi** melalui tab **Pesan & Keamanan** → **Ubah Kata Sandi Pengelola**.

---

## 2. Mengganti Logo TKJ & Profil Wali Kelas

1. Buka tab **Identitas, Logo TKJ & Walas** di `/dashboard`.
2. **Mengganti Logo TKJ:**
   - Klik tombol **Unggah File Logo TKJ (PNG/SVG/WebP)** untuk mengunggah gambar logo jurusan dari perangkat Anda langsung ke Supabase Storage.
   - Logo akan tampil pada: Navbar (kiri atas), Kartu Emblem di Hero Beranda, halaman Tentang Kami, dan Footer.
   - Klik **Gunakan Emblem Bawaan** jika ingin kembali ke SVG arsitektural bawaan.
3. **Mengisi Profil Wali Kelas (Walas):**
   - Unggah foto Wali Kelas melalui tombol **Unggah Foto Walas**.
   - Isi Nama Lengkap & Gelar Wali Kelas, Jabatan, serta Kutipan Sambutan.
4. Klik **Simpan Seluruh Pengaturan** di bagian paling bawah formulir agar perubahan langsung live di website publik.

---

## 3. Mengelola Proyek, Kegiatan, Galeri, Prestasi & Informasi

- Pilih tab yang sesuai di sidebar sebelah kiri pada `/dashboard`:
  - **Proyek TKJ:** Klik **Tambah Proyek** untuk mengisi judul, kategori teknis, unit tim (tanpa nama siswa pribadi), ringkasan, detail arsitektur, daftar teknologi (pisahkan dengan koma), dan unggah foto dokumentasi.
  - **Kegiatan:** Tambahkan agenda praktikum atau acara kelas beserta tanggal dan lokasi.
  - **Galeri Foto:** Unggah foto resolusi baik dan pilih kategori (*Praktikum*, *Kebersamaan*, *Infrastruktur*, *Acara*).
  - **Prestasi:** Hanya catat prestasi atau sertifikasi resmi yang benar-benar terverifikasi.
  - **Informasi:** Terbitkan pengumuman dan centang **Sematkan di Paling Atas** jika pengumuman bersifat penting.
- Setiap entri contoh (`DATA CONTOH`) akan otomatis terlepas dari status *placeholder* setelah Anda edit dan simpan melalui Studio Pengelolaan.

---

## 4. Meninjau Pesan Masuk & Privasi

- Pesan yang dikirim pengunjung melalui halaman `/kontak` dapat dibaca pada tab **Pesan & Keamanan**.
- Website ini dirancang tanpa kolom nama siswa individu demi menjaga privasi peserta didik di ruang publik internet.
