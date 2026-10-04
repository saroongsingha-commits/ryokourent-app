# PROJECT_OVERVIEW — Ryokourent

Status dokumen: FASE 0 (Analisis dan Perencanaan)
Terakhir diperbarui: 2026-10-04

## 1. Tujuan Proyek

Ryokourent adalah website rental motor yang mobile-first, dengan alur sewa yang
aman (tanpa double booking) dan komunikasi pelanggan lewat WhatsApp.

Tujuan jangka panjang (setelah v1):

- Katalog motor dan detail motor yang jelas untuk calon penyewa.
- Form booking dengan perhitungan durasi dan harga otomatis.
- Validasi ketersediaan unit dan pencegahan double booking.
- Generator pesan WhatsApp untuk konfirmasi booking.
- Dashboard admin/operator dengan perubahan status booking.
- Pengaturan harga dan nomor WhatsApp tanpa menyentuh kode.

## 2. Target Pengguna

| Pengguna | Kebutuhan utama | Status v1 |
| --- | --- | --- |
| Calon penyewa (publik) | Melihat katalog, harga, status ketersediaan, lokasi, FAQ | Aktif |
| Admin / operator | Masuk ke workspace terproteksi, kelola booking | Akses masuk tersedia, workspace menyusul |

Jawaban scope v1: **kedua pengguna** harus bisa masuk — publik lewat landing +
katalog, operator lewat halaman masuk yang sudah terproteksi.

## 3. Ruang Lingkup MVP (Versi 1)

Satu hal yang wajib jalan di versi 1: **landing page + katalog motor**.

### 3.1 Termasuk v1

- Landing page mobile-first dengan theme Terminal terang.
- Katalog motor: daftar unit, filter kategori, spec ringkas, harga
  harian/mingguan/bulanan, indikator status ketersediaan.
- Bagian FAQ dan informasi lokasi sebagai konten statis landing.
- CTA masuk (auth) yang mengarah ke dashboard terproteksi.
- Responsive layout untuk mobile sampai desktop.
- Struktur repo + dokumen FASE 0.

### 3.2 Tidak termasuk v1 (ditunda)

| Fitur | Task | Fase |
| --- | --- | --- |
| Form booking dasar | TASK-011 | FASE 2 |
| Kalkulasi durasi & harga | TASK-013, TASK-014 | FASE 2 |
| Validasi tanggal/jam & ketersediaan | TASK-015, TASK-016 | FASE 2 |
| Pencegahan double booking | TASK-017 | FASE 2 |
| Generator pesan WhatsApp | TASK-018 | FASE 2 |
| Penyimpanan booking & status | TASK-009, TASK-010, TASK-019 | FASE 2 |
| Role operator & pembatasan akses | TASK-020, TASK-021 | FASE 2 |
| Dashboard booking & perubahan status | TASK-022, TASK-023 | FASE 2 |
| Pengaturan harga & nomor WhatsApp | TASK-024 | FASE 2 |
| Halaman detail motor | TASK-008 | FASE 2 |
| Pembayaran online | — | Ditunda tanpa batas (lihat aturan proyek) |

## 4. Asumsi Bisnis (sementara, ditandai TODO)

Semua nilai di bawah adalah placeholder sampai pemilik bisnis mengonfirmasi.

| Asumsi | Nilai sementara | Catatan |
| --- | --- | --- |
| Nomor WhatsApp | `6281234567890` | TODO: nomor asli, format kode negara tanpa `+` |
| Mata uang | IDR | TODO: konfirmasi |
| Zona waktu | Asia/Jakarta | TODO: konfirmasi |
| Harga harian | Rp75.000 | TODO: daftar harga resmi per unit |
| Harga mingguan | Rp475.000 | TODO |
| Harga bulanan | Rp1.750.000 | TODO |
| Jam operasional | 08.00–20.00 WIB | TODO |
| Lokasi | "Toko Ryokourent — Alamat Contoh" | TODO: alamat + tautan Google Maps |
| Minimum sewa | 1 hari | TODO |
| Maksimum sewa | 30 hari | TODO |
| Deposit | Rp100.000 | TODO: perlu atau tidak |
| Jumlah unit fisik | Tidak dipublikasikan | Aturan proyek #16 — status saja, tanpa angka stok |
| Data identitas pelanggan | Tidak disimpan di tahap awal | Aturan proyek #15 |
| Foto motor | Placeholder publik dulu | TODO: foto asli milik sendiri |

## 5. Fase Proyek

| Fase | Isi | Status |
| --- | --- | --- |
| FASE 0 | Analisis dan perencanaan (dokumen di repo ini) | Selesai |
| FASE 1 | Repo, kerangka, coding standards, branch strategy | Menunggu persetujuan |
| FASE 2 | Implementasi fitur inti (TASK-003 s/d TASK-030) | Menunggu FASE 1 |
| FASE 3 | Integrasi, testing, hardening | Menunggu FASE 2 |
| FASE 4 | Dokumentasi dan deployment | Menunggu FASE 3 |

Rincian task ada di `TASKS.md`. Alur kerja AI ada di `AI_WORKFLOW.md`.
Keputusan arsitektur ada di `DECISIONS.md`. Skenario uji ada di `TESTING.md`.
