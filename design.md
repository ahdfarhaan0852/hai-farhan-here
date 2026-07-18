# Sistem Desain Visual Portofolio Ahmad Farhan

Dokumen ini mendefinisikan sistem desain visual, palet warna, tipografi, dan panduan animasi interaktif untuk portofolio personal Ahmad Farhan. Dokumentasi ini berfungsi sebagai acuan utama guna menjaga konsistensi visual di seluruh komponen aplikasi.

---

## 1. Palet Warna (Color Palette)

Aplikasi menggunakan palet warna kustom yang memadukan warna merah muda lembut (*soft rose*) dengan lavender, serta menyediakan padanan *Dark Mode* berbasis plum gelap untuk memberikan kesan premium dan modern.

### Light Mode (Tema Terang)
*   **Background Utama (`rose-mist`):** `rgb(251, 239, 239)` / `#FBEFEF`
    *   *Penggunaan:* Latar belakang halaman utama, bersih dan memberikan kontras yang lembut bagi mata.
*   **Primary Accent (`rose-soft`):** `rgb(255, 226, 226)` / `#FFE2E2`
    *   *Penggunaan:* Latar belakang kartu, aksen tombol sekunder, dan area sorotan lembut.
*   **Secondary Accent (`rose-dust`):** `rgb(245, 203, 203)` / `#F5CBCB`
    *   *Penggunaan:* Garis tepi (borders), elemen dekoratif, dan teks sekunder.
*   **Accent Highlight (`lavender-soft`):** `rgb(197, 179, 211)` / `#C5B3D3`
    *   *Penggunaan:* Tombol CTA utama, hover states, teks penekanan (highlight), dan shadow lembut.

### Dark Mode (Tema Gelap)
Untuk mendukung transisi yang mulus ke mode gelap, kami mendefinisikan padanan warna berikut:
*   **Background Utama (`plum-dark`):** `rgb(24, 18, 22)` / `#181216`
    *   *Penggunaan:* Latar belakang halaman utama mode gelap (plum sangat gelap).
*   **Primary Accent (`plum-charcoal`):** `rgb(48, 38, 45)` / `#30262D`
    *   *Penggunaan:* Latar belakang kartu di mode gelap.
*   **Secondary Accent (`plum-muted`):** `rgb(105, 84, 102)` / `#695466`
    *   *Penggunaan:* Garis tepi (borders) kartu dan komponen di mode gelap.
*   **Accent Highlight (`lavender-bright`):** `rgb(218, 203, 230)` / `#DACBE6`
    *   *Penggunaan:* Teks highlight dan efek neon lembut di mode gelap.

---

## 2. Tipografi (Typography)

Kami menggabungkan gaya **Bold Athletics** dengan **Tech Minimalist** untuk mencerminkan keseimbangan antara kekuatan fisik (Powerlifting) dan presisi teknis (Software Engineering/Web Development).

*   **Font Judul (Headings): `Space Grotesk`** (Google Fonts)
    *   *Karakter:* Geometris, lebar, brutal, dan memberikan impresi yang sangat kuat serta percaya diri.
    *   *Aturan Penggunaan:* Digunakan untuk judul utama (Hero), sub-judul bagian (`h1`, `h2`, `h3`), dan nama proyek.
*   **Font Teks Utama (Body): `Inter`** atau **`Geist Sans`** (Next.js Default)
    *   *Karakter:* Bersih, keterbacaan tinggi di berbagai ukuran layar, ramah untuk mata rekruter atau pengunjung.
    *   *Aturan Penggunaan:* Seluruh paragraf cerita sejarah hidup (*history*), label umum, dan teks deskriptif.
*   **Font Pendukung Khusus (Data & Metrik): `Space Mono`** (Google Fonts)
    *   *Karakter:* Lebar karakter seragam (monospaced), terkesan futuristik, bersih, dan berorientasi data.
    *   *Aturan Penggunaan:* Angka statistik (misalnya: angkatan angkat beban, jumlah proyek), tag kategori, dan blok kode.

---

## 3. Panduan Animasi & Interaksi Kartu (Interactive Card Animation)

Komponen `LinkPreview` akan menampilkan pratinjau gambar dinamis saat teks tertentu di-hover dengan ketentuan interaktivitas berikut:

### A. Animasi Masuk (Falling Card Entrance)
Saat pengguna mengarahkan kursor ke atas teks pemicu, kartu pratinjau akan muncul dengan efek "jatuh":
*   **Posisi Awal (Initial):** `opacity: 0`, `y: -30` (bergeser ke atas), `scale: 0.85`, `rotateX: -15deg` (perspektif miring ke belakang).
*   **Animasi Aktif (Animate):** Transisi pegas (*spring transition*) ke `opacity: 1`, `y: 0`, `scale: 1`, `rotateX: 0deg`.
*   **Spring Physics:** `stiffness: 250`, `damping: 18` (memberikan efek memantul lembut yang premium).

### B. Animasi Rotasi 3D Mengikuti Kursor (3D Tilt interaction)
Setelah kartu melayang aktif di layar, pergerakan kursor di dalam area teks pemicu akan memengaruhi kemiringan (tilt) kartu secara langsung:
*   **Sumbu X & Y:** Menggunakan `useMotionValue` untuk mendeteksi koordinat X mouse relatif terhadap pusat teks.
*   **Rotasi 3D:** Kartu akan berotasi sedikit ke arah pergerakan kursor (maksimal `rotateY: 15deg` dan `rotateX: 10deg`) menggunakan `useSpring` untuk kelancaran transisi agar tidak patah-patah.
*   **Efek Bayangan (Shadow Dynamic):** Bayangan kartu (`box-shadow`) akan sedikit bergeser berlawanan dengan arah rotasi kartu untuk menciptakan ilusi kedalaman 3D yang nyata.
