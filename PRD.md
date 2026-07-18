# Product Requirement Document (PRD)
## Project Name: Next-Gen Developer & Data Science Portfolio Hub
**Version:** 1.0  
**Owner:** Ahmad Farhan  
**Target Platform Deployment:** Vercel / Netlify / GitHub Pages (Vite + React.js + Tailwind CSS)

---

## 1. Executive Summary & Project Overview
Dokumen ini merinci kebutuhan teknis dan struktural untuk membangun platform portofolio digital pribadi milik **Ahmad Farhan**. Sebagai Mahasiswa Teknik Informatika dari Universitas Muhammadiyah Riau, website ini dirancang khusus untuk menampilkan beberapa keahlian yang kumiliki, yaitu: *Data Science/Machine Learning (Python)*, *Infrastruktur Data (MySQL)*, *Full-Stack Web Development*, hingga ketertarikan mendalam pada dunia *Fitness/Powerlifting*.

Portofolio ini mengusung konsep minimalis modern dengan performa tinggi yang di-deploy di platform Vercel, menyajikan transisi antarmuka yang halus serta dokumentasi proyek berbasis *data storytelling* yang interaktif.

---

## 2. Problem Statement
*   **Kompleksitas Proyek yang Tidak Terlihat:** Portofolio standar berbasis *no-code builder* gagal mendemonstrasikan kompleksitas logika model *machine learning* (seperti XGBoost) dan arsitektur *database* backend secara transparan kepada rekruter.
*   **Fragmentasi Identitas:** Adanya kebutuhan untuk menyatukan beragam spektrum proyek—mulai dari aplikasi manajemen *gym/fitness*, web *brand clothing*, otomasi, hingga riset analitik *machine learning*—ke dalam satu wadah yang kohesif tanpa terlihat berantakan.
*   **Kurangnya Pembuktian Dampak:** Rekruter industri IT saat ini tidak hanya mencari kandidat yang bisa menulis kode, tetapi juga kandidat yang bisa membuktikan metrik keberhasilan atau dampak bisnis dari aplikasi yang mereka bangun.

---

## 3. Goals & Objectives
*   **Portofolio Berbasis Dampak (Result-Oriented):** Menampilkan detail setiap proyek dengan metrik yang jelas (akurasi model, efisiensi alur kerja, performa web).
*   **Dual Call-to-Action (CTA) Framework:** Menyediakan tombol akses cepat ganda di setiap kartu proyek: satu mengarah langsung ke repositori GitHub untuk peninjauan kode, dan satu mengarah ke demo aplikasi langsung (live web / Google Colab).
*   **Skor Performa Maksimal:** Memaksimalkan infrastruktur Vercel untuk meraih skor Google Lighthouse > 90 pada aspek *Performance*, *SEO*, dan *Accessibility*.
*   **Diferensiasi Estetika (Anti-Mainstream):** Mengintegrasikan visualisasi data yang rapi, tipografi yang tegas, serta sentuhan personal bertema olahraga kekuatan (Powerlifting).

---

## 4. Target User Persona Analysis

### A. Rekruter & Hiring Managers (IT Internship/Junior Developer Recruitment)
*   **Kebutuhan:** Mem validasi keahlian teknis Farhan di bidang Python, Web Dev, dan MySQL secara cepat. Mencari bukti disiplin kerja, struktur kepemimpinan, dan nilai IPK akademis.
*   **Perilaku:** Memeriksa halaman portofolio dalam waktu singkat (skimming), mencari berkas Resume/CV yang dapat diunduh, dan melihat keaktifan repositori GitHub.

### B. Technical Reviewers (Senior Data Scientists / Engineers)
*   **Kebutuhan:** Memeriksa kualitas penulisan kode Python, logika implementasi algoritma XGBoost Regressor, desain skema basis data MySQL, dan penataan komponen frontend.
*   **Perilaku:** Membuka tautan kode sumber di GitHub, membaca dokumen pendukung (README.md), dan menguji coba masukan/keluaran aplikasi secara langsung.

### C. Komunitas & Rekan Pengembang (General Visitors)
*   **Kebutuhan:** Terinspirasi oleh antarmuka aplikasi, menjelajahi web komunitas powerlifting, atau melihat katalog produk brand lokal.
*   **Perilaku:** Menjelajahi setiap proyek aplikasi web interaktif, menguji chatbot konsultan kesehatan, dan menelusuri galeri desain.

---

## 5. User Stories

### Sebagai Pengunjung Umum
*   *Sebagai pengunjung umum,* saya ingin dapat memfilter proyek berdasarkan kategori (Machine Learning, Web Development, Gym/Fitness Apps) agar saya bisa melihat proyek spesifik dengan cepat.
*   *Sebagai sesama atlet/penggemar olahraga,* saya ingin menjelajahi halaman landing komunitas powerlifting agar dapat melihat aktivitas komunitas kekuatan tersebut secara intuitif.

### Sebagai Rekruter Teknis
*   *As a technical recruiter,* I want to easily access Ahmad Farhan's academic achievements (IPK 3.74, relevant coursework) and download his latest CV directly from the hero section.
*   *As a data reviewer,* I want to inspect the structural workflow of the XGBoost Sports News Analysis project so that I can evaluate how it impacts sports infrastructure development.

---

## 6. Project Architecture & Structured Catalog
Setiap proyek yang ditampilkan pada landing page ini wajib mengikuti struktur katalog data berikut untuk dihubungkan ke repositori eksternal:

### 1. Kategori: Web Development & Branding
*   **barokahgroup-web**
    *   *Deskripsi:* Website profil/operasional untuk manajemen Barokah Group.
    *   *Badges:* Web Development | Frontend | Database
    *   *Tautan:* `[GitHub Link]` | `[Live Demo]`
*   **minority website**
    *   *Deskripsi:* Website landing page eksklusif untuk portofolio dan profil komunitas Powerlifting.
    *   *Badges:* Tailwind CSS | Community Platform | UI/UX Design
    *   *Tautan:* `[GitHub Link]` | `[Live Demo]`
*   **teszta-world-web**
    *   *Deskripsi:* Website katalog portofolio interaktif untuk clothing brand lokal berbasis di Bandung.
    *   *Badges:* E-Commerce Showcase | Frontend Dev | Creative Design
    *   *Tautan:* `[GitHub Link]` | `[Live Demo]`
*   **halaman portofolio dan katalog alif-parcel**
    *   *Deskripsi:* Halaman portofolio bisnis dan katalog produk interaktif untuk layanan parcel/hampers Alif-Parcel dengan pendekatan visual yang menarik.
    *   *Badges:* Web Catalog | Branding | Frontend Showcase
    *   *Tautan:* `[GitHub Link]` | `[Live Demo]`

### 2. Kategori: Software Utility, Retail, & Productivity Apps
*   **swole-planer**
    *   *Deskripsi:* Aplikasi manajemen dan penjadwalan terstruktur untuk mengoptimalkan rutinitas harian.
    *   *Badges:* Productivity App | Task Management | CRUD System
    *   *Tautan:* `[GitHub Link]` | `[Live Demo]`
*   **readnmove app**
    *   *Deskripsi:* Aplikasi inovatif yang menggabungkan aktivitas membaca dengan pelacakan pergerakan fisik secara interaktif.
    *   *Badges:* Mobile/Web App | Interactive UI | Logic Optimization
    *   *Tautan:* `[GitHub Link]` | `[Live Demo]`
*   **sadboy-playbox**
    *   *Deskripsi:* Ruang hiburan digital/platform interaktif berbasis web untuk mini-games atau showcase kreatif.
    *   *Badges:* Interactive Elements | Event Handlers | Frontend Games
    *   *Tautan:* `[GitHub Link]` | `[Live Demo]`
*   **sistem transaksi kasir bobee coffee**
    *   *Deskripsi:* Sistem Point-of-Sale (POS) terintegrasi untuk operasional kedai kopi guna mencatat inventaris dan sirkulasi keuangan harian secara akurat menggunakan MySQL.
    *   *Badges:* POS System | MySQL | Database Management | Retail Tech
    *   *Tautan:* `[GitHub Link]` | `[Live Demo]`

### 3. Kategori: Fitness Architecture & Advanced Tech
*   **nerve-app**
    *   *Deskripsi:* Platform komprehensif untuk melacak setiap sesi latihan gym/olahraga, disertai fitur planner dan Chatbot AI terintegrasi sebagai konsultan kebugaran pribadi.
    *   *Badges:* Gym Tracking | AI Chatbot Integration | Workout Planner | Full-Stack
    *   *Tautan:* `[GitHub Link]` | `[Live Demo]`

### 4. Kategori: Data Science, Machine Learning, & NLP
*   **ANALISIS BERITA OLAHRAGA UNTUK PREDIKSI TREN KESEHATAN MENGGUNAKAN XGBOOST REGRESSOR**
    *   *Deskripsi:* Riset analitik menggunakan model XGBoost Regressor berbasis Python untuk menganalisis data berita olahraga, memprediksi tren kesehatan masyarakat, guna mendukung akselerasi infrastruktur bidang olahraga di Indonesia.
    *   *Badges:* Data Science | Python | XGBoost Regressor | Predictive Modeling
    *   *Tautan:* `[GitHub Link]` | `[Google Colab Notebook]`

*   **Prediksi Mahasiswa Dropout menggunakan Logistic Regression dan Random Forest**
    *   *Deskripsi:* Komparasi model prediksi klasifikasi untuk mengidentifikasi risiko mahasiswa yang berpotensi dropout menggunakan pendekatan Logistic Regression dan Random Forest guna mendukung retensi akademis kampus.
    *   *Badges:* Machine Learning | Random Forest | Logistic Regression | Academic Analytics
    *   *Tautan:* `[GitHub Link]` | `[Google Colab Notebook]`

*   **PREDIKSI POPULARITAS BUKU MENGGUNAKAN HYBRID RECOMMENDATION**
    *   *Deskripsi:* Sistem rekomendasi berbasis Hybrid Recommendation yang menggabungkan berbagai pendekatan filter untuk memprediksi tingkat popularitas dan memberikan rekomendasi buku yang personal kepada pengguna.
    *   *Badges:* Recommendation System | Hybrid Models | Python | Data Science
    *   *Tautan:* `[GitHub Link]` | `[Google Colab Notebook]`

*   **Klasifikasi Email Spam Berbasis Teks: Perbandingan Performa Algoritma SVM (Linear Kernel) dan Logistic Regression**
    *   *Deskripsi:* Studi komparatif pengolahan bahasa alami (NLP) untuk mendeteksi email spam dengan membandingkan performa akurasi dan efisiensi waktu komputasi antara algoritma SVM Linear Kernel dan Logistic Regression.
    *   *Badges:* Natural Language Processing (NLP) | Text Classification | SVM | Data Science
    *   *Tautan:* `[GitHub Link]` | `[Google Colab Notebook]`

---

## 7. Functional Requirements

### FR-1: Hero & Profile Showcase
*   Menampilkan nama lengkap "**Ahmad Farhan**" secara dominan beserta sub-headline sebagai "Informatics Student & Data Enthusiast".
*   Menyertakan bagian informasi akademis penting: Universitas Muhammadiyah Riau, IPK: 3.74, serta kompetensi bahasa (Indonesia, Inggris, Arab).
*   Menyediakan tombol interaktif "Download CV" dan tautan cepat ke LinkedIn, GitHub, Instagram, dan Email (`itsmeaan08@gmail.com`).

### FR-2: Modul Filter & Grid Proyek
*   Menyediakan tombol navigasi filter kategori dinamis: `All`, `Data Science`, `Web Dev`, dan `Fitness Apps`.
*   Setiap kartu proyek wajib merender judul, penjelasan ringkas 2 kalimat, tag teknologi (*badges*), serta tombol aksi ganda (*Dual Call-to-Action Buttons*).

### FR-3: Tampilan Fleksibel Visualisasi Data (Three.js Layer - Opsional)
*   Mengintegrasikan komponen berbasis kanvas 3D ringan (*lazy loading*) untuk merepresentasikan jaring-jaring klaster data atau struktur atomik pada bagian latar belakang atau komponen proyek Machine Learning guna menciptakan impresi visual yang mendalam (*anti-mainstream*).

---

## 8. Non-Functional Requirements

### NFR-1: Performa, Kompilasi & Deployment
*   Platform dibangun menggunakan arsitektur **Vite + React.js (TypeScript)** bersama **Tailwind CSS v4** untuk performa yang sangat ringan dan meniadakan beban *runtime* server.
*   Dapat dideploy penuh pada ekosistem statis seperti **Vercel**, **Netlify**, atau **GitHub Pages** dengan integrasi berkelanjutan (CI/CD) berbasis pemicu *push* repositori GitHub.

### NFR-2: Responsivitas & Aksesibilitas
*   Desain tata letak komponen wajib adaptif secara dinamis (*flawless responsive layout*) mulai dari layar telepon genggam beresolusi rendah hingga monitor desktop ultra-lebar.
*   Mematuhi pedoman kontras warna minimal WCAG AA untuk kenyamanan keterbacaan mata rekruter.

---

## 9. Project Scope Bounds

### In-Scope (Lingkup Pekerjaan yang Dibangun)
*   Arsitektur *Landing Page* satu halaman penuh (*Single Page Application*) berkecepatan tinggi yang di-host di Vercel.
*   Penyusunan komponen statis kartu data proyek berdasarkan daftar 8 proyek inti Farhan.
*   Navigasi internal halus (*Smooth Scroll Anchors*) beserta modul penyaringan (*filtering*) dinamis berbasis kategori proyek.

### Out-of-Scope (Di Luar Lingkup Pekerjaan Saat Ini)
*   Pembangunan sistem database pengguna atau fitur login (aplikasi murni sebagai etalase publik).
*   Proses pelatihan ulang (*retraining*) model XGBoost secara langsung di server Vercel. Seluruh komputasi data berat dialihkan ke luar sistem menggunakan tautan Google Colab.

## 7. Tech Stack Recommendation (Lightweight SPA Architecture)

Untuk memastikan portfolio ini berjalan dengan performa maksimal dan sangat ringan, berikut adalah rekomendasi arsitektur teknologi (*tech stack*) yang digunakan:

*   **Core Framework:** **Vite + React.js (TypeScript)**
    *   *Alasan:* Kompilasi yang sangat cepat, tidak membutuhkan server Node.js aktif di runtime (pure static HTML/JS/CSS), dan sangat ringan untuk perangkat mobile.
*   **Styling & UI Engine:** **Tailwind CSS v4**
    *   *Alasan:* Menggunakan compiler CSS modern berbasis Rust yang super cepat, menyederhanakan deklarasi tema langsung di file CSS, dan meminimalkan ukuran berkas CSS akhir.
*   **Icons Library:** **Lucide React**
    *   *Alasan:* Menyediakan set ikon minimalis berkualitas tinggi yang konsisten (untuk kontak, koding, dan olahraga).
*   **Interactive Motion:** **Framer Motion + Radix UI (Hover Card)**
    *   *Alasan:* Mendukung animasi spring-physics premium untuk transisi halaman dan efek melayang 3D kustom pada LinkPreview.
*   **Infrastructure & Media Hosting:** **GitHub (Source) + Static Hosting (Vercel/Netlify) + Google Colab (Compute)**
    *   *Alasan:* Hasil build statis dideploy secara gratis di Vercel/Netlify. Seluruh komputasi data berat untuk data science tetap menggunakan tautan notebook luar.

---

## 8. Development & Deployment Workflow

Proses pengembangan hingga peluncuran portofolio ini diatur melalui *workflow* terstruktur sebagai berikut:

### FASE 1: Inisialisasi Repositori Eksternal (GitHub & Colab)
1.  **Standardisasi README.md:** Farhan merapikan 13 repositori proyek yang ada di GitHub. Setiap proyek wajib dilengkapi dengan grafik visual statis (hasil ekspor Python/Spreadsheet) dan penjelasan ringkas mengenai hasil akhir model/sistem.
2.  **Konfigurasi Google Colab:** Untuk proyek *Machine Learning* dan NLP, simpan berkas `.ipynb` di Google Colab, ubah hak akses menjadi *Public (Viewer)*, dan salin tautannya untuk diintegrasikan nanti.

### FASE 2: Pengembangan Lokal (Local Frontend Setup)
1.  **Inisialisasi Proyek:** Setup proyek React baru berbasis Vite menggunakan perintah `npx create-vite@latest portofolio --template react-ts`.
2.  **Penyusunan Data Statis (`data/projects.ts`):** Memasukkan data ke-13 proyek terverifikasi (termasuk deskripsi, tag keahlian, metrik, link GitHub, dan link Colab/Live Web) ke dalam satu objek array TypeScript terstruktur.
3.  **Pembuatan Komponen UI:**
    *   Membangun komponen `ProjectCard.tsx` untuk menampilkan informasi proyek dan tombol aksi ganda secara seragam.
    *   Membangun komponen filter dinamis menggunakan *state* React (`useState`) untuk menyaring kategori: `All`, `Data Science & NLP`, `Web Dev`, `Retail & Productivity`, dan `Fitness Tech`.

### FASE 3: Integrasi Berkelanjutan & Deployment (Vercel Workflow)
1.  **Pembuatan Repositori Utama:** Buat repositori baru bernama `portofolio` di GitHub, lalu lakukan `git push` untuk kode frontend Next.js kamu.
2.  **Menghubungkan ke Vercel:** 
    *   Masuk ke *Dashboard* Vercel menggunakan akun GitHub milik Farhan.
    *   Pilih proyek `portofolio`, lalu tekan tombol **Deploy**. Vercel akan membaca konfigurasi Next.js secara otomatis.
3.  **Automated CI/CD Loop:** Setiap kali Farhan melakukan pembaruan kode frontend di laptop lokal dan melakukan `git push origin main` ke GitHub, Vercel akan otomatis melakukan kompilasi ulang (*rebuild*) dan memperbarui portofolio publik secara instan dalam hitungan detik tanpa waktu henti (*zero-downtime*).