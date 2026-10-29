import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Dish, BackButton } from "@/components/SiteLayout";
import { PhotoGallery } from "@/components/PhotoGallery";
import buffet1 from "@/assets/buffet-1.jpg";
import buffet2 from "@/assets/buffet-2.jpg";
import buffet3 from "@/assets/buffet-3.jpg";
import buffet4 from "@/assets/buffet-4.jpg";
import milleCrepes from "@/assets/mille-crepes.jpg";
import charcuterie1 from "@/assets/charcuterie-1.jpg";
import charcuterie2 from "@/assets/charcuterie-2.jpg";
import salade1 from "@/assets/salade-compo-1.jpg";
import salade2 from "@/assets/salade-compo-2.jpg";
import salade3 from "@/assets/salade-compo-3.jpg";
import salade4 from "@/assets/salade-compo-4.jpg";
import viande1 from "@/assets/viande-1.jpg";
import viande2 from "@/assets/viande-2.jpg";
import tomateMozzarella from "@/assets/tomate-mozzarella.jpg";

export const Route = createFileRoute("/buffet")({
  head: () => ({
    meta: [
      { title: "Buffet froid — Douce Table" },
      { name: "description", content: "Buffets froids faits maison pour vos fêtes : charcuteries, salades, viandes froides, mille-crêpes." },
      { property: "og:title", content: "Buffet froid — Douce Table" },
      { property: "og:description", content: "Buffets froids faits maison pour vos fêtes." },
    ],
  }),
  component: Buffet,
});

const photos = [
  { src: buffet4, alt: "Buffet d'apéritif : plateaux de charcuterie, verrines et hérissons" },
  { src: buffet1, alt: "Viandes froides, poulet mariné, carottes râpées et plateaux de charcuterie" },
  { src: buffet2, alt: "Plateaux de charcuterie, mille-crêpes et buffet dressé" },
  { src: buffet3, alt: "Buffet d'anniversaire : charcuteries, salades et plats garnis" },
];

const dishes = [
  { name: "Apéritif", desc: "Plateau de charcuterie et fromage, rosasse, hérissons, vérines." },
  {
    name: "Entrées et salades composées",
    desc: "Piémontaise, choux blancs, carotte râpée, taboulet, pâtes froides, riz niçois, riz au thon, tomate/mozzarella/concombre.",
    items: [
      "Salades repas : gourmande, périgourdine, paysanne, du chef, vosgienne, à l'italienne.",
    ],
    images: [
      { src: salade1, alt: "Salades composées : piémontaise et carottes râpées dressées sur plateaux" },
      { src: salade2, alt: "Salades composées variées sur un buffet d'anniversaire" },
      { src: salade3, alt: "Salade décorée d'une rose de betterave et de rondelles de concombre" },
      { src: salade4, alt: "Plateau de carottes râpées décoré de tomates cerises et d'asperges" },
      { src: tomateMozzarella, alt: "Tomate farcie de mozzarella et de dés de tomate, persil et huile d'olive" },
    ],
  },
  {
    name: "Charcuterie et terrines",
    desc: "Charcuterie, terrines (campagne, foie, rillettes), laitue.",
    images: [
      { src: charcuterie1, alt: "Grand plateau de charcuterie garni d'olives et de tomates cerises" },
      { src: charcuterie2, alt: "Plateau de charcuterie en forme de poisson avec terrines" },
    ],
  },
  {
    name: "Viandes froides",
    desc: "Rôti de bœuf, de porc ou de poulet, jambon à l'os.",
    images: [
      { src: viande1, alt: "Présentoir de viandes froides : rôti de bœuf et jambon" },
      { src: viande2, alt: "Rôti de bœuf en tranches et poulet rôti sur plateaux" },
    ],
  },
  { name: "Cornets de jambon", desc: "Garnis de macédoine ou d'asperges." },
  { name: "Poulet mariné", desc: "Tex-mex ou curry." },
  {
    name: "Mille-crêpes",
    desc: "3 sortes au choix :",
    items: [
      "Surimi, thon, salade, tomate",
      "Carotte, tomate, œuf, thon, concombre",
      "Avocat, salade, tomate, œuf, jambon",
    ],
    images: [{ src: milleCrepes, alt: "Mille-crêpes garni d'œuf mimosa, de jambon et de tomates cerises" }],
  },
];

function Buffet() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-2 items-start">
        <div>
          <BackButton />
          <p className="mt-6 eyebrow">Plats froids</p>
          <h1 className="mt-3 text-5xl md:text-6xl">Le buffet froid</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Pour un anniversaire, un baptême ou un repas d'entreprise, nous composons un buffet sur mesure selon le nombre d'invités.
          </p>
          <div className="mt-8">{dishes.map((d) => <Dish key={d.name} {...d} />)}</div>
        </div>
        <PhotoGallery photos={photos} className="md:sticky md:top-24" />
      </section>
    </SiteLayout>
  );
}
