import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Dish, BackButton } from "@/components/SiteLayout";
import { PhotoGallery } from "@/components/PhotoGallery";
import hamburger from "@/assets/hamburger.jpg";
import boeuf2 from "@/assets/boeuf-bourguignon-2.jpg";
import rouelle from "@/assets/rouelle-porc.jpg";

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

const photos = [
  { src: boeuf2, alt: "Bœuf bourguignon mijoté avec carottes et pommes de terre", position: "50% 75%" },
  { src: rouelle, alt: "Rouelle de porc et pommes de terre en quartiers à la sauce persillée" },
  { src: hamburger, alt: "Hamburgers maison au steak haché, fromage et jambon cru" },
];

const dishes = [
  {
    name: "Bœuf bourguignon",
    desc: "Mijoté au vin rouge, carottes, champignons et petits oignons.",
    images: [{ src: boeuf2, alt: "Bœuf bourguignon mijoté avec carottes et pommes de terre" }],
  },
  { name: "Blanquette de veau", desc: "Sauce crémeuse, mijotée doucement." },
  { name: "Hachis parmentier", desc: "Purée maison bien beurrée, gratinée au four." },
  { name: "Poule au pot", desc: "Bouillon parfumé et légumes du jardin." },
  { name: "Gratin dauphinois", desc: "Pommes de terre fondantes, crème et pointe d'ail." },
  { name: "Langue de bœuf", desc: "Sauce piquante, mijotée longuement." },
  { name: "Couscous", desc: "Semoule fine, légumes mijotés et viandes tendres." },
  { name: "Jambalaya", desc: "Riz épicé à la créole, poulet et saucisse." },
  { name: "Tartiflette", desc: "Pommes de terre, lardons, oignons et reblochon fondant." },
  {
    name: "Rouelle de porc à la sauce tomate, piment d'Espelette et 5 baies",
    images: [{ src: rouelle, alt: "Rouelle de porc et pommes de terre en quartiers à la sauce persillée" }],
  },
  {
    name: "Hamburger",
    desc: "Pain moelleux, steak haché, fromage fondant et crudités.",
    images: [{ src: hamburger, alt: "Hamburgers maison au jambon cru, steak haché, fromage et salade" }],
  },
];

function Chauds() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-2 items-start">
        <div>
          <BackButton />
          <p className="mt-6 eyebrow">Plats chauds</p>
          <h1 className="mt-3 text-5xl md:text-6xl">Les recettes de grand-mère</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Des plats réconfortants, cuisinés lentement, livrés prêts à réchauffer — pour vous ou pour vos proches.
          </p>
          <div className="mt-8">{dishes.map((d) => <Dish key={d.name} {...d} />)}</div>
        </div>
        <PhotoGallery photos={photos} className="md:sticky md:top-24" />
      </section>
    </SiteLayout>
  );
}
