# DECISIONS — Ryokourent (Architecture Decision Records)

Status dokumen: FASE 0. Format: keputusan → alternatif → alasan → konsekuensi.
Keputusan baru ditambahkan dengan ID berikutnya; keputusan lama tidak dihapus,
ditandai `DICABUT` bila berubah.

## D-001 — Runtime implementasi v1 (perubahan dari blueprint WordPress)

- **Status:** DISETUJUI (dijelaskan sebelum diterapkan, sesuai aturan kerja)
- **Keputusan:** Versi 1 (landing + katalog) dibangun di runtime yang tersedia
  pada lingkungan proyek: Vite + React 19 + TypeScript + Tailwind v4 + shadcn/ui
  + Convex Auth. Arsitektur WordPress (GeneratePress child theme + plugin
  `ryokourent-core`) tetap didokumentasikan di `ARCHITECTURE.md` sebagai target
  untuk FASE 2–4 bila hosting WordPress dipakai.
- **Alternatif:**
  1. Menulis seluruh plugin WordPress tanpa bisa dijalankan/diuji (melanggar
     aturan #18: kode belum selesai sebelum diuji).
  2. Membangun ulang seluruh repo jadi React (dilarang aturan #6).
  3. Bangun v1 di runtime ini, dokumentasikan pemetaan 1:1 (dipilih).
- **Alasan:** Runtime WordPress (PHP, wp-admin) tidak tersedia di lingkungan
  kerja ini; pilihan 3 memenuhi scope v1, tetap bisa diuji, dan tidak
  menghapus struktur blueprint.
- **Konsekuensi:** Field/CPT di `DATA_MODEL.md` dipetakan ke tipe TS dan tabel
  Convex; `ARCHITECTURE.md` §3 jadi peta perpindahan.
- **Perlu persetujuan:** ya — dikonfirmasi di ringkasan FASE 0.

## D-002 — Data katalog v1 statis di `src/data/motors.ts`

- **Status:** DISETUJUI (sementara)
- **Keputusan:** Daftar motor v1 berupa modul data statis bertipe, bukan tabel
  backend/CMS.
- **Alternatif:** (a) tabel Convex + seed mutation; (b) CMS external; (c) statis.
- **Alasan:** Scope v1 hanya landing + katalog, belum ada operasi tulis; data
  katalog saat ini konten pemasaran; statis = tanpa risiko codegen/backend dan
  termudah dipindah nanti.
- **Konsekuensi:** Perubahan harga/unit butuh edit kode sampai TASK-024 (pasca-v1)
  memindahkannya ke tabel `motors` + halaman pengaturan.
- **Tanda:** TODO di `src/data/motors.ts`.

## D-003 — Visual: theme Terminal **terang**

- **Status:** DISETUJUI (arahan desain)
- **Keputusan:** Monospace sebagai tipografi utama, layout grid rapi bergaya
  terminal (prompt, output, tabel), aksen status hijau/amber terkendali di
  atas permukaan off-white. **Tanpa palet gelap.**
- **Alternatif ditolak:** terminal gelap (hijau neon di hitam) — eksplisit
  dilarang arahan desain; gradient ungu/pink generik — dihindari pedoman.
- **Konsekuensi:** `src/index.css` memakai token terang + radius kecil;
  komponen shadcn mengikuti token (tanpa hardcode warna).

## D-004 — Katalog jadi bagian halaman landing (satu route `/`)

- **Status:** DISETUJUI (aturan #20: pilih yang paling sederhana)
- **Keputusan:** Katalog dirender sebagai section di landing dengan anchor
  `#katalog`, bukan route terpisah.
- **Alternatif:** route `/katalog` terpisah → navigasi lebih banyak, duplikasi
  navbar/footer untuk v1 yang isinya baru dua hal.
- **Konsekuensi:** Setelah ada detail motor (TASK-008) dan booking (TASK-011),
  pertimbangkan route `/katalog` + `/motor/[slug]`.

## D-005 — Jumlah unit fisik tidak pernah dipublikasikan

- **Status:** DISETUJUI (aturan proyek #16)
- **Keputusan:** UI publik hanya menampilkan status teks
  (`TERSEDIA` / `TERBATAS` / `DISIWA`). Field `unit_count` hanya untuk backend.
- **Konsekuensi:** Tidak ada angka stok di kartu, tooltip, maupun payload API
  publik.

## D-006 — Tidak ada data identitas pelanggan & tidak ada pembayaran online

- **Status:** DISETUJUI (aturan #15 dan #17)
- **Keputusan:** Form booking (pasca-v1) hanya menyimpan nama, telepon, email
  opsional, tanggal, catatan. Tidak ada KTP/foto. Tidak ada payment gateway
  sebelum booking inti lolos FASE 3.
- **Konsekuensi:** TASK pembayaran tidak dibuatkan ID (bila diminta nanti,
  tambahkan ke `TASKS.md` dulu).

## D-007 — Bahasa antarmuka: Bahasa Indonesia

- **Status:** DISETUJUI
- **Keputusan:** Seluruh copy publik memakai Bahasa Indonesia (audiens rental
  lokal); identifier kode & commit message tetap Inggris.
- **Konsekuensi:** FAQ, pesan error, dan pesan WhatsApp (TASK-018) berbahasa
  Indonesia.

## D-008 — Auth & route memakai pola template, tidak ditulis ulang

- **Status:** DISETUJUI
- **Keputusan:** Memakai `RequireAuth`, `useAuth`, `/auth` (redirect
  `returnTo` → `/dashboard`) apa adanya; CTA landing menyesuaikan status login.
- **Alasan:** Pola sudah teruji (anti open-redirect, penjelasan blok di halaman);
  menulis ulang = risiko regresi (aturan #5).
- **Konsekuensi:** `redirectAfterAuth` tetap `/dashboard`.

## D-009 — Konfigurasi: `CONFIG.example.php`, bukan `.env.example`

- **Status:** DISETUJUI (keterbatasan platform)
- **Keputusan:** Platform menolak penulisan `.env.example` (dianggap berkas
  sensitif), jadi contoh konfigurasi memakai alternatif yang diizinkan spec:
  `CONFIG.example.php`, berisi hanya nilai placeholder.
- **Konsekuensi:** Variabel runtime nyata diisi lewat environment platform /
  panel Keys, bukan lewat Git.

## D-010 — Tidak ada REST API / endpoint tulis di v1

- **Status:** DISETUJUI
- **Keputusan:** V1 hanya membaca data statis; belum ada endpoint publik.
- **Alasan:** Blueprint memakai REST API "hanya jika dibutuhkan"; untuk landing
  + katalog, tidak dibutuhkan.
- **Konsekuensi:** Endpoint pertama muncul di TASK-011 (form booking) dan wajib
  melewati review keamanan TASK-027.
