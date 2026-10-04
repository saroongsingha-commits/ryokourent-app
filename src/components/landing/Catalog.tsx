import {
  MOTOR_CATEGORIES,
  MOTORS,
  type MotorCategory,
} from "@/data/motors";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MotorCard } from "./MotorCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Filter = MotorCategory | "semua";

export function Catalog() {
  const [active, setActive] = useState<Filter>("semua");

  const motors = useMemo(
    () =>
      active === "semua"
        ? MOTORS
        : MOTORS.filter((motor) => motor.category === active),
    [active],
  );

  return (
    <section
      id="katalog"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <Reveal>
        <SectionHeading
          index="02"
          title="Katalog motor"
          description="Status diperbarui oleh tim kami. Angka unit sengaja tidak ditampilkan — konfirmasi ketersediaan lewat WhatsApp atau langsung di lokasi."
          prompt={`~/katalog $ ls --kategori ${active}`}
        />
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {MOTOR_CATEGORIES.map((category) => {
            const isActive = active === category.value;
            return (
              <button
                key={category.value}
                type="button"
                onClick={() => setActive(category.value)}
                aria-pressed={isActive}
                className={cn(
                  "cursor-pointer rounded-[3px] border px-3 py-1.5 font-mono text-xs transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {isActive ? "> " : "  "}
                {category.label}
              </button>
            );
          })}
          <span className="ml-auto hidden font-mono text-[11px] text-muted-foreground sm:inline">
            filter → {active}
          </span>
        </div>
      </Reveal>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {motors.map((motor, index) => (
          <MotorCard key={motor.id} motor={motor} index={index + 1} />
        ))}
      </motion.div>

      {motors.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center font-mono text-sm text-muted-foreground">
          {"// tidak ada motor pada kategori ini"}
        </div>
      ) : null}

      <Reveal delay={0.1}>
        <p className="mt-6 font-mono text-[11px] leading-5 text-muted-foreground">
          {"// daftar model dapat berubah sewaktu-waktu — konfirmasi dulu sebelum berangkat"}
        </p>
      </Reveal>
    </section>
  );
}
