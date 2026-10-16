import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Dish, BackButton } from "@/components/SiteLayout";
import buffet from "@/assets/buffet.jpg";

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

const dishes = [
  { name: "Plateau de charcuterie et fromage", },
  { name: "Apéritif", desc: "Plateau de charcuterie et fromage, rosasse, hérissons, vérines." },
  { name: "Entrées et salades composées", desc: "Piémontaise, choux blancs, carotte râpée, taboulet, pâtes froides, riz niçois, riz au thon." },
  { name: "Salades repas", desc: "Gourmande, périgourdine, paysanne, du chef, vosgienne, à l'italienne." },
  { name: "Charcuterie et terrines", desc: "Charcuterie, terrines (campagne, foie, rillettes), laitue." },
  { name: "Viandes froides", desc: "Rôti de bœuf, de porc ou de poulet, jambon à l'os." },
  { name: "Cornets de jambon", desc: "Garnis de macédoine ou d'asperges." },
  { name: "Poulet mariné", desc: "Tex-mex ou curry." },
  { name: "Mille-crêpes", desc: "3 sortes au choix." },
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
        <img src={buffet} alt="Buffet froid" width={1200} height={912} className="rounded-lg w-full object-cover md:sticky md:top-24" />
      </section>
    </SiteLayout>
  );
}
