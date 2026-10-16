import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/buffet", label: "Buffet froid" },
  { to: "/plats-chauds", label: "Plats chauds" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/90 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="font-display text-2xl text-foreground">
            Aux Petits Plats
          </Link>
          <nav className="flex flex-wrap gap-6 text-sm">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground underline underline-offset-8 decoration-taupe" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-taupe text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-10 grid gap-6 sm:grid-cols-3 text-sm">
          <div>
            <p className="font-display text-2xl">Aux Petits Plats</p>
            <p className="mt-2 opacity-80">Cuisine maison, à domicile et pour vos fêtes.</p>
          </div>
          <div className="opacity-90">
            <p>06 00 00 00 00</p>
            <p>contact@auxpetitsplats.fr</p>
          </div>
          <div className="opacity-80 sm:text-right">© {new Date().getFullYear()} Aux Petits Plats</div>
        </div>
      </footer>
    </div>
  );
}

export function Dish({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="border-b border-dashed py-5">
      <h3 className="text-2xl">{name}</h3>
      <p className="mt-1 text-muted-foreground">{desc}</p>
    </div>
  );
}
