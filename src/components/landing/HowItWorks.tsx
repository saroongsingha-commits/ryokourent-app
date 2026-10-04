import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  {
    n: "01",
    cmd: "pilih_motor",
    text: "Telusuri katalog, catat nama unit yang cocok dan harganya.",
  },
  {
    n: "02",
    cmd: "hubungi_admin",
    text: "Konfirmasi ketersediaan lewat WhatsApp atau datang langsung ke lokasi.",
  },
  {
    n: "03",
    cmd: "isi_data",
    text: "Isi data penyewa dan tanggal sewa saat konfirmasi. Cukup nama dan nomor aktif.",
  },
  {
    n: "04",
    cmd: "ambil_unit",
    text: "Ambil motor, bawa jalan. Helm dan jas hujan ikut, tinggal gas.",
  },
];

export function HowItWorks() {
  return (
    <section id="cara-sewa" className="border-y border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <SectionHeading
            index="03"
            title="Cara sewa, empat langkah"
            description="Alurnya sederhana dan bisa diselesaikan dari HP. Pemesanan online sedang disiapkan — untuk sekarang konfirmasi lewat WhatsApp atau lokasi toko."
            prompt="~/cara-sewa $ cat alur.txt"
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Reveal key={step.n} delay={index * 0.07}>
              <div className="h-full rounded-lg border border-border bg-background p-4 transition-colors hover:border-foreground/40">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-ok">step_{step.n}</span>
                  <span className="text-muted-foreground">{"{ }"}</span>
                </div>
                <p className="mt-3 font-mono text-sm font-bold text-foreground">
                  {step.cmd}
                </p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {step.text}
                </p>
                {index < STEPS.length - 1 ? (
                  <p
                    className="mt-4 font-mono text-[11px] text-muted-foreground"
                    aria-hidden
                  >
                    ↓ lanjut
                  </p>
                ) : (
                  <p
                    className="mt-4 font-mono text-[11px] text-ok"
                    aria-hidden
                  >
                    ✓ selesai
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 font-mono text-[11px] leading-5 text-muted-foreground">
            {"// syarat: SIM C aktif + identitas asli saat pengambilan (fotokopi tidak disimpan di sistem)"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
