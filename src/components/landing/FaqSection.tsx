import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const FAQS = [
  {
    q: "Apa saja syarat sewa motor?",
    a: "SIM C yang masih berlaku dan identitas asli (KTP/SIM) saat pengambilan. Salinan atau foto identitas tidak kami simpan di sistem.",
  },
  {
    q: "Berapa lama durasi sewa minimal dan maksimal?",
    a: "Minimal 1 hari, maksimal 30 hari. Durasi dihitung per hari kalender; untuk kebutuhan lebih panjang, hubungi kami langsung agar harga terbaik.",
  },
  {
    q: "Bagaimana cara mengecek ketersediaan unit?",
    a: "Lihat status di katalog: TERSEDIA, TERBATAS, atau DISIWA. Status bisa berubah harian, jadi konfirmasi ulang lewat WhatsApp atau saat datang ke lokasi sebelum berangkat.",
  },
  {
    q: "Metode pembayarannya apa?",
    a: "Saat ini pembayaran dilakukan di lokasi saat pengambilan (tunai/transfer — detail menyusul). Sistem pembayaran online belum tersedia di versi ini.",
  },
  {
    q: "Di mana lokasi dan jam operasionalnya?",
    a: "Operasional setiap hari 08.00–20.00 WIB. Alamat lengkap dan patokan ada di bagian lokasi di halaman ini.",
  },
  {
    q: "Bagaimana kalau saya ingin membatalkan booking?",
    a: "Konfirmasi pembatalan minimal sehari sebelum jadwal ambil lewat WhatsApp. Syarat pembatalan dan pengembalian deposit masih disusun — tanyakan ke admin saat konfirmasi.",
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <Reveal>
          <SectionHeading
            index="04"
            title="Pertanyaan umum"
            description="Jawaban singkat untuk hal yang paling sering ditanyakan calon penyewa."
            prompt="~/faq $ man ryokourent"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger className="py-4 font-mono text-sm hover:no-underline">
                  <span className="flex items-start gap-2 pr-4 text-left">
                    <span className="text-ok" aria-hidden>
                      ?
                    </span>
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-6 text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
