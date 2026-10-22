import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Dish, BackButton } from "@/components/SiteLayout";
import { PhotoGallery } from "@/components/PhotoGallery";
import buffet1 from "@/assets/buffet-1.jpg";
import buffet2 from "@/assets/buffet-2.jpg";
import buffet3 from "@/assets/buffet-3.jpg";
import buffet4 from "@/assets/buffet-4.jpg";
import milleCrepes from "@/assets/mille-crepes.jpg";

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
  { name: "Entrées et salades composées", desc: "Piémontaise, choux blancs, carotte râpée, taboulet, pâtes froides, riz niçois, riz au thon." },
  { name: "Salades repas", desc: "Gourmande, périgourdine, paysanne, du chef, vosgienne, à l'italienne." },
  { name: "Charcuterie et terrines", desc: "Charcuterie, terrines (campagne, foie, rillettes), laitue." },
  { name: "Viandes froides", desc: "Rôti de bœuf, de porc ou de poulet, jambon à l'os." },
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
    image: milleCrepes,
    imageAlt: "Mille-crêpes garni d'œuf mimosa, de jambon et de tomates cerises",
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
