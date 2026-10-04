/**
 * Aturan durasi & harga (TASK-013/TASK-014, keputusan D-014).
 * Fungsi murni — dipakai bersama oleh frontend dan backend Convex.
 */

const DAY_MS = 86_400_000;
/** Zona waktu operasional (Asia/Jakarta, UTC+7) — lihat CONFIG.example.php. */
const TZ_OFFSET_MS = 7 * 3_600_000;

/** "YYYY-MM-DD" → Date lokal (tanpa kejutan timezone UTC). */
export function parseDateOnly(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

/** Sewa di hari yang sama dihitung 1 hari. */
export function rentalDays(startDate: string, endDate: string): number {
  const diff = Math.round(
    (parseDateOnly(endDate).getTime() - parseDateOnly(startDate).getTime()) /
      DAY_MS,
  );
  return Math.max(1, diff);
}

/**
 * Total harga: bulan penuh (30 hari) → minggu penuh (7 hari) → sisa hari.
 * Sengaja sederhana dan deterministik; aturan dicatat di DECISIONS.md.
 */
export function computeTotal(
  days: number,
  priceDay: number,
  priceWeek: number,
  priceMonth: number,
): number {
  const months = Math.floor(days / 30);
  const weeks = Math.floor((days - months * 30) / 7);
  const remaining = days - months * 30 - weeks * 7;
  return months * priceMonth + weeks * priceWeek + remaining * priceDay;
}

/** Hari ini menurut zona waktu operasional, format ISO. */
export function todayJakarta(): string {
  return new Date(Date.now() + TZ_OFFSET_MS).toISOString().slice(0, 10);
}

/** Batas akhir pemesanan: 180 hari ke depan. */
export function maxBookingDate(): string {
  return new Date(Date.now() + TZ_OFFSET_MS + 180 * DAY_MS)
    .toISOString()
    .slice(0, 10);
}
