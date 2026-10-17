import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import hero from "@/assets/hero.jpg";
import buffet from "@/assets/buffet.jpg";
import chaud from "@/assets/chaud.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Douce Table — Cuisine maison & buffets" },
      { name: "description", content: "Plats chauds façon grand-mère et buffets froids faits maison, à domicile ou pour vos fêtes." },
      { property: "og:title", content: "Douce Table — Cuisine maison & buffets" },
      { property: "og:description", content: "Plats chauds façon grand-mère et buffets froids pour vos fêtes." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <section className="relative">
        <img src={hero} alt="Table garnie de plats maison" width={1600} height={912} className="h-[70vh] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-14 text-cream">
          <p className="eyebrow text-sable">Service à la personne</p>
          <h1 className="mt-3 text-5xl md:text-7xl max-w-3xl">Le goût de la fête, la passion du fait maison.</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="eyebrow">Notre maison</p>
        <h2 className="mt-3 text-4xl">Des petits plats préparés avec le cœur</h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Repas du quotidien pour les personnes qui n'ont pas le temps de cuisiner, ou buffets généreux pour vos anniversaires,
          baptêmes et réunions de famille, avec des produits frais.
        </p>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Service réservé uniquement aux particuliers.
        </p>
      </section>

      <section className="bg-sable">
        <div className="mx-auto max-w-6xl px-6 py-20 grid gap-10 md:grid-cols-2">
          {[
            { to: "/buffet" as const, img: buffet, t: "Buffet froid", d: "Verrines, canapés, salades et planches pour vos fêtes." },
            { to: "/plats-chauds" as const, img: chaud, t: "Plats chauds", d: "Les recettes de grand-mère, mijotées comme autrefois." },
          ].map((c) => (
            <Link key={c.to} to={c.to} className="group block bg-card rounded-lg overflow-hidden">
              <img src={c.img} alt={c.t} loading="lazy" width={1200} height={912} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="p-8">
                <h3 className="text-3xl">{c.t}</h3>
                <p className="mt-2 text-muted-foreground">{c.d}</p>
                <span className="mt-4 inline-block text-sm text-taupe">Découvrir →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
