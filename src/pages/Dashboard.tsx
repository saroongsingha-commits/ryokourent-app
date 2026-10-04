import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { LayoutDashboard, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-ok">ryokourent@web</span>
              :~/dashboard$
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Selamat datang{user?.name ? `, ${user.name}` : ""}
            </h1>
          </div>
          <div className="flex flex-wrap gap-2 self-start">
            <Button
              asChild
              variant="outline"
              className="cursor-pointer gap-2 font-mono text-xs"
            >
              <Link to="/#katalog">lihat katalog</Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer gap-2 font-mono text-xs"
              onClick={handleSignOut}
            >
              <LogOut className="size-4" />
              keluar
            </Button>
          </div>
        </header>

        <Card className="border-border/70 shadow-none">
          <CardHeader>
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <LayoutDashboard className="size-5" />
            </div>
            <CardTitle>Workspace operator sedang disiapkan</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-muted-foreground">
            Versi 1 berfokus pada landing page dan katalog motor. Kelola booking,
            perubahan status, dan pengaturan harga akan hadir di halaman ini pada
            rilis berikutnya.
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
