import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Lightbox } from "@/components/PhotoGallery";
import { BusinessCardButton } from "@/components/BusinessCardButton";

export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61576646970029";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/buffet", label: "Buffet froid" },
  { to: "/plats-chauds", label: "Plats chauds" },
  { to: "/avis", label: "Avis" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/90 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="font-display text-2xl text-foreground">
            Douce Table
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
            <p className="font-display text-2xl">Douce Table</p>
            <p className="mt-2 opacity-80">À domicile et pour vos fêtes.</p>
          </div>
          <div className="opacity-90">
            <p><a href="tel:0641765138">06 41 76 51 38</a></p>
            <p><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Notre page Facebook</a></p>
          </div>
          <div className="opacity-80 sm:text-right">© {new Date().getFullYear()} Douce Table</div>
        </div>
      </footer>
      <BusinessCardButton />
    </div>
  );
}

export function Dish({
  name,
  desc,
  items,
  image,
  imageAlt,
}: {
  name: string;
  desc?: string;
  items?: string[];
  image?: string;
  imageAlt?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-dashed py-5">
      <h3 className="text-2xl">{name}</h3>
      {desc && <p className="mt-1 text-muted-foreground">{desc}</p>}
      {items && (
        <ul className="mt-2 space-y-1 text-muted-foreground list-disc pl-5">
          {items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
      {image && (
        <>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Agrandir la photo : ${name}`}
            className="mt-4 block cursor-zoom-in overflow-hidden rounded-md"
          >
            <img src={image} alt={imageAlt ?? name} loading="lazy" className="h-20 w-28 object-cover transition hover:scale-105" />
          </button>
          <Lightbox
            photos={[{ src: image, alt: imageAlt ?? name }]}
            open={open}
            index={0}
            onOpenChange={setOpen}
            onIndexChange={() => {}}
          />
        </>
      )}
    </div>
  );
}

export function BackButton() {
  const router = useRouter();
  const goBack = () => {
    if (window.history.length > 1) router.history.back();
    else router.navigate({ to: "/" });
  };
  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Retour en arrière"
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="h-5 w-5" />
      Retour
    </button>
  );
}
