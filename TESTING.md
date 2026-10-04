# TESTING — Ryokourent

Status dokumen: FASE 0 (rencana skenario; hasil diisi saat pengujian dijalankan).

Kolom: **ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan**

Status: `MENUNGGU` (belum dijalankan) · `LULUS` · `GAGAL` · `N/A-Pasca-v1`.

---

## 1. Skenario v1 (landing + katalog) — wajib lulus sebelum v1 disebut selesai

| ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan |
| --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Typecheck frontend | `bun tsc -b --noEmit` | Exit 0, tanpa error tipe | exit 0, tanpa output error | LULUS | Dijalankan 2026-10-04 |
| TC-002 | Landing render | Buka `/` | Hero, katalog, FAQ, lokasi, footer tampil; tanpa error console | — | MENUNGGU | Review manual |
| TC-003 | Filter katalog | Klik tiap kategori + "Semua" | Daftar tersaring sesuai kategori; "Semua" menampilkan seluruh unit | — | MENUNGGU | Review manual |
| TC-004 | Responsif | Lebar 360 / 768 / 1280 px | Tanpa overflow horizontal; grid menyesuaikan (1/2/3 kolom) | — | MENUNGGU | DevTools responsive |
| TC-005 | Tanpa angka unit | Periksa kartu katalog | Hanya status teks (`TERSEDIA`/`TERBATAS`/`DISIWA`), tidak ada angka stok | Pencarian kode: `unit_count`/`unitCount`/"stok" tidak ada di `src/` (hanya komentar aturan) | LULUS | Aturan #16; verifikasi visual di preview |
| TC-006 | CTA masuk | Klik "Masuk" (belum login) | Menuju `/auth`; setelah OTP sukses → `/dashboard` | — | MENUNGGU | Alur auth |
| TC-007 | Route terproteksi | Buka `/dashboard` tanpa login | Diblokir dengan penjelasan + tautan `/auth?returnTo=%2Fdashboard`; setelah login kembali ke `/dashboard` | — | MENUNGGU | `RequireAuth` |
| TC-008 | 404 | Buka `/halaman-ada-tidak` | Halaman 404 tampil | — | MENUNGGU | — |
| TC-009 | Tanpa kredensial di repo | `rg -i "(api_key\|password\|secret\|token) *[:=]"` | Tidak ada kecocokan kredensial; hanya placeholder | Tidak ada kecocokan; nomor WA placeholder hanya di dokumen/config contoh | LULUS | Aturan #14; jalankan ulang sebelum merge |
| TC-010 | Theme terang konsisten | Cek `/`, `/auth`, `/dashboard` | Semua memakai permukaan off-white + monospace; tidak ada palet gelap; kontras teks lolos | — | MENUNGGU | Arahan desain |
| TC-011 | Animasi | Interaksi hover/scroll di landing | Framer Motion jalan halus, tanpa layout shift mengganggu | — | MENUNGGU | — |
| TC-012 | Aksesibilitas dasar | Keyboard tab + screen reader ringan | Fokus terlihat, urutan logis, CTA berlabel jelas | — | MENUNGGU | — |

## 2. Skenario booking inti (FASE 3 — pasca-v1)

### 2.1 Form & validasi

| ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F01 | Submit kosong | Semua field kosong | Ditolak, pesan per field | — | N/A-Pasca-v1 | TASK-011 |
| TC-F02 | Telepon invalid | `0812abc` | Ditolak, format WA diminta | — | N/A-Pasca-v1 | TASK-012 |
| TC-F03 | Nama terlalu panjang | 500 karakter | Ditolak (maks 100) | — | N/A-Pasca-v1 | TASK-012 |
| TC-F04 | Tanggal selesai < mulai | 2026-10-10 → 2026-10-01 | Ditolak dengan pesan jelas | — | N/A-Pasca-v1 | TASK-015 |
| TC-F05 | Di luar jam operasional | Mulai 05:00 | Ditolak (08:00–20:00) | — | N/A-Pasca-v1 | TASK-015 |

### 2.2 Durasi & harga

| ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan |
| --- | --- | --- | --- | --- | --- | --- |
| TC-P01 | Sewa 1 hari | 4 Okt → 4 Okt | Durasi = 1 hari | — | N/A-Pasca-v1 | TASK-013 |
| TC-P02 | Lewat tengah malam | 4 Okt → 5 Okt | Durasi = 2 hari | — | N/A-Pasca-v1 | TASK-013 |
| TC-P03 | Lewat tahun | 31 Des → 2 Jan | Durasi benar (3 hari) | — | N/A-Pasca-v1 | TASK-013 |
| TC-P04 | Durasi negatif | 5 Okt → 4 Okt | Ditolak sebelum kalkulasi | — | N/A-Pasca-v1 | TASK-015 |
| TC-P05 | Harga harian | 1 hari × Rp75.000 | Total Rp75.000 | — | N/A-Pasca-v1 | TASK-014 |
| TC-P06 | Harga mingguan | 7 hari | Total = harga mingguan | — | N/A-Pasca-v1 | TASK-014 |
| TC-P07 | Harga bulanan | 30 hari | Total = harga bulanan | — | N/A-Pasca-v1 | TASK-014 |
| TC-P08 | Campuran | 10 hari | Kombinasi konsisten + terdokumentasi | — | N/A-Pasca-v1 | Aturan dicatat di DECISIONS |

### 2.3 Ketersediaan & anti double booking

| ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan |
| --- | --- | --- | --- | --- | --- | --- |
| TC-A01 | Unit `rented` dipilih | Pilih unit berstatus disewa | Ditolak server-side | — | N/A-Pasca-v1 | TASK-016 |
| TC-A02 | Rentang overlap | Booking 4–6 Okt lalu 5–7 Okt | Booking kedua ditolak, tanggal bentrok disebut | — | N/A-Pasca-v1 | TASK-017 |
| TC-A03 | Rentang tidak overlap | 4–6 Okt lalu 7–9 Okt | Kedua booking diterima | — | N/A-Pasca-v1 | TASK-017 |
| TC-B01 | Konkurensi | 2 submit bersamaan untuk unit & tanggal sama | Tepat satu sukses, satu gagal | — | N/A-Pasca-v1 | **Risiko tertinggi** |
| TC-B02 | Booking `cancelled` | Rentang punya booking dibatalkan | Boleh booking ulang | — | N/A-Pasca-v1 | TASK-017 |
| TC-B03 | Booking `completed` | Rentang lampau | Tidak menghalangi booking baru | — | N/A-Pasca-v1 | TASK-017 |

### 2.4 WhatsApp, penyimpanan, status

| ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan |
| --- | --- | --- | --- | --- | --- | --- |
| TC-W01 | Encode pesan | Nama + tanggal + spasi | `wa.me` URL ter-encode UTF-8, tidak putus | — | N/A-Pasca-v1 | TASK-018 |
| TC-W02 | Nomor dari settings | Nomor placeholder | Nomor tidak di-hardcode di kode | — | N/A-Pasca-v1 | TODO nomor asli |
| TC-S01 | Simpan booking | Data valid | Record `pending` + kode booking unik | — | N/A-Pasca-v1 | TASK-019 |
| TC-S02 | Kode booking unik | 100 booking serentak | Tanpa duplikat | — | N/A-Pasca-v1 | TASK-019 |
| TC-ST01 | Transisi valid | `pending → confirmed` | Berhasil + tercatat siapa/kapan | — | N/A-Pasca-v1 | TASK-023 |
| TC-ST02 | Transisi invalid | `completed → active` | Ditolak | — | N/A-Pasca-v1 | TASK-023 |

### 2.5 Akses & keamanan

| ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan |
| --- | --- | --- | --- | --- | --- | --- |
| TC-R01 | User biasa baca booking | Query daftar booking tanpa role | Ditolak di server | — | N/A-Pasca-v1 | TASK-021 |
| TC-R02 | Operator ubah settings | Mutation settings sebagai operator | Ditolak (hanya admin) | — | N/A-Pasca-v1 | TASK-021 |
| TC-R03 | Nonce/capability (target WP) | Aksi admin tanpa nonce | Ditolak | — | N/A-Pasca-v1 | Aturan #12 |
| TC-X01 | XSS pada output | Nama motor berisi `<script>` | Dirender sebagai teks, tidak dieksekusi | — | N/A-Pasca-v1 | React escape + review |
| TC-X02 | Input aneh | Karakter unicode, emoji, HTML | Disanitasi sebelum disimpan | — | N/A-Pasca-v1 | TASK-012 |
| TC-DB01 | Dashboard booking | Login operator | Daftar reactive + filter status | — | N/A-Pasca-v1 | TASK-022 |
| TC-SET01 | Simpan harga | Angka valid/nonvalid | Valid tersimpan; nonvalid ditolak | — | N/A-Pasca-v1 | TASK-024 |

## 3. Pengaktifan & instalasi (target WordPress — FASE 3/4)

| ID | Skenario | Input | Hasil yang diharapkan | Hasil aktual | Status | Catatan |
| --- | --- | --- | --- | --- | --- | --- |
| TC-I01 | Aktivasi plugin | Aktifkan `ryokourent-core` | Tanpa fatal error/notice | — | N/A-Pasca-v1 | — |
| TC-I02 | CPT muncul | Lihat wp-admin | Menu motor & penyewaan ada | — | N/A-Pasca-v1 | — |
| TC-I03 | Field tersimpan | Isi meta motor, simpan | Nilai terbaca kembali | — | N/A-Pasca-v1 | — |
| TC-I04 | Akses ditolak | User tanpa role buka halaman admin booking | Ditolak (capability) | — | N/A-Pasca-v1 | — |
| TC-I05 | Child theme aktif | Aktifkan `generatepress-child` | Gaya katalog sesuai, tanpa error | — | N/A-Pasca-v1 | — |
| TC-I06 | Mobile UI | Perangkat fisik/emulator | Booking bisa diselesaikan di mobile | — | N/A-Pasca-v1 | — |

## 4. Checklist keamanan (TASK-027)

- [ ] Plugin/theme aktif tanpa fatal error
- [ ] Semua aksi admin punya nonce + capability check
- [ ] Semua output di-escape; semua input disanitasi
- [ ] Query manual memakai prepared statement
- [ ] Tidak ada kredensial di repository (TC-009)
- [ ] Tidak ada data identitas pelanggan tersimpan
- [ ] Tidak ada angka unit fisik di payload/UI publik (TC-005)
- [ ] Otorisasi dicek di server untuk setiap mutation (TC-R01/R02)
- [ ] Anti double booking lulus uji konkurensi (TC-B01)
- [ ] File auth backend tidak diubah tanpa review

## 5. Cara menjalankan

1. **Otomatis (v1):** `bun tsc -b --noEmit` dan `bun run lint` dari root proyek.
2. **Manual (v1):** buka preview, jalankan tiap baris §1 pada lebar 360/768/1280,
   catat kolom *Hasil aktual* + *Status*.
3. **Pasca-v1:** jalankan §2 saat task terkait selesai; jangan menandai task
   `COMPLETED` sebelum barisnya terisi.
4. Uji regresi diulang sebelum merge ke `main` dan sebelum FASE 4.
