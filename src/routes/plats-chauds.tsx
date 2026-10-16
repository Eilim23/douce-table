import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Dish } from "@/components/SiteLayout";
import chaud from "@/assets/chaud.jpg";

export const Route = createFileRoute("/plats-chauds")({
  head: () => ({
    meta: [
      { title: "Plats chauds de grand-mère — Douce Table" },
      { name: "description", content: "Bœuf bourguignon, blanquette, hachis parmentier : les recettes de grand-mère livrées chez vous." },
      { property: "og:title", content: "Plats chauds de grand-mère — Douce Table" },
      { property: "og:description", content: "Les recettes de grand-mère, mijotées comme autrefois." },
    ],
  }),
  component: Chauds,
});

const dishes = [
  { name: "Bœuf bourguignon", desc: "Mijoté au vin rouge, carottes, champignons et petits oignons." },
  { name: "Blanquette de veau", desc: "Sauce crémeuse, riz pilaf." },
  { name: "Hachis parmentier", desc: "Purée maison bien beurrée, gratinée au four." },
  { name: "Poule au pot", desc: "Bouillon parfumé et légumes du jardin." },
  { name: "Gratin dauphinois", desc: "Pommes de terre fondantes, crème et pointe d'ail." },
  { name: "Pot-au-feu", desc: "Le classique du dimanche, avec ses os à moelle." },
  { name: "Langue de bœuf", desc: "Sauce piquante ou madère, mijotée longuement." },
];

function Chauds() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-2 items-start">
        <img src={chaud} alt="Bœuf bourguignon en cocotte" width={1200} height={912} className="rounded-lg w-full object-cover md:sticky md:top-24" />
        <div>
          <p className="eyebrow">Plats chauds</p>
          <h1 className="mt-3 text-5xl md:text-6xl">Les recettes de grand-mère</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Des plats réconfortants, cuisinés lentement, livrés prêts à réchauffer — pour vous ou pour vos proches.
          </p>
          <div className="mt-8">{dishes.map((d) => <Dish key={d.name} {...d} />)}</div>
        </div>
      </section>
    </SiteLayout>
  );
}
