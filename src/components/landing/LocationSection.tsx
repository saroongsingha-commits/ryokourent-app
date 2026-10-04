import { MapPin, Clock, MessageCircle, Info } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const INFO = [
  {
    icon: MapPin,
    label: "alamat",
    // TODO: alamat resmi Ryokourent belum tersedia (lihat CONFIG.example.php)
    value: "Jl. Contoh No. 1, Kota Contoh — patokan: depan minimarket",
    todo: true,
  },
  {
    icon: Clock,
    label: "jam_operasional",
    value: "Setiap hari, 08.00 – 20.00 WIB",
    todo: false,
  },
  {
    icon: MessageCircle,
    label: "whatsapp",
    value: "+62 812-3456-7890 (nomor contoh — TODO ganti nomor asli)",
    todo: true,
  },
  {
    icon: Info,
    label: "patokan",
    value: "Area kota; pengantaran unit luar kota bisa dikomunikasikan dengan admin",
    todo: false,
  },
];

export function LocationSection() {
  return (
    <section id="lokasi" className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <SectionHeading
            index="05"
            title="Lokasi & kontak"
            description="Ambil unit di lokasi, atau minta admin menyiapkan dulu sebelum datang."
            prompt="~/lokasi $ cat kontak.txt"
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.06}>
            <dl className="divide-y divide-border rounded-lg border border-border bg-background">
              {INFO.map((item) => (
                <div
                  key={item.label}
                  className="flex gap-3 px-4 py-4 sm:px-5"
                >
                  <item.icon
                    className="mt-0.5 size-4 shrink-0 text-ok"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-foreground">
                      {item.value}
                      {item.todo ? (
                        <span className="ml-2 rounded-[3px] border border-warn/40 bg-accent px-1.5 py-0.5 font-mono text-[10px] text-warn">
                          TODO
                        </span>
                      ) : null}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid-paper flex h-full min-h-[240px] flex-col items-center justify-center rounded-lg border border-border bg-background p-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full border border-border bg-card">
                <MapPin className="size-5 text-ok" aria-hidden />
              </div>
              <p className="mt-4 font-mono text-sm font-bold text-foreground">
                peta_lokasi
              </p>
              <p className="mt-2 max-w-xs font-mono text-[11px] leading-5 text-muted-foreground">
                {"// tautan Google Maps belum dipasang — TODO setelah alamat resmi dikonfirmasi"}
              </p>
              <p className="mt-4 font-mono text-[11px] text-muted-foreground">
                koordinat : <span className="text-warn">— (TODO)</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
