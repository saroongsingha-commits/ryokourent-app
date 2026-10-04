import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const FOOTER_LINKS = [
  { href: "#katalog", label: "katalog" },
  { href: "#cara-sewa", label: "cara-sewa" },
  { href: "#faq", label: "faq" },
  { href: "#lokasi", label: "lokasi" },
];

export function FooterCta() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <section className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-10">
              <SectionHeading
                index="06"
                title="Siap jalan hari ini?"
                description="Pilih motormu di katalog, lalu konfirmasi lewat WhatsApp atau langsung ke lokasi. Operator bisa masuk untuk mengelola data dari dashboard."
                prompt="$ ryokourent --mulai"
                className="mb-6 sm:mb-8"
              />
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="cursor-pointer font-mono text-sm"
                >
                  <a href="#katalog">
                    pilih motor <span aria-hidden>↑</span>
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="cursor-pointer font-mono text-sm"
                >
                  <Link to={isAuthenticated ? "/dashboard" : "/auth"}>
                    {isAuthenticated ? "buka dashboard" : "masuk / daftar"}
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="font-mono text-xs text-muted-foreground">
            <span className="font-bold text-foreground">ryokourent</span>
            <span className="mx-2 text-border">|</span>
            © 2026 · rental motor
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Link
              to={isAuthenticated ? "/dashboard" : "/auth"}
              className="font-mono text-xs text-ok transition-colors hover:text-foreground"
            >
              {isAuthenticated ? "dashboard →" : "masuk →"}
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
