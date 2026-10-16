import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Dish } from "@/components/SiteLayout";
import buffet from "@/assets/buffet.jpg";

export const Route = createFileRoute("/buffet")({
  head: () => ({
    meta: [
      { title: "Buffet froid — Aux Petits Plats" },
      { name: "description", content: "Buffets froids faits maison pour vos fêtes : verrines, canapés, salades, planches." },
      { property: "og:title", content: "Buffet froid — Aux Petits Plats" },
      { property: "og:description", content: "Buffets froids faits maison pour vos fêtes." },
    ],
  }),
  component: Buffet,
});

const dishes = [
  { name: "Verrines de saison", desc: "Avocat, crevettes, fromage frais et légumes croquants." },
  { name: "Canapés assortis", desc: "Saumon fumé, tapenade, chèvre-miel, à la pièce." },
  { name: "Planche de charcuterie & fromages", desc: "Sélection affinée, fruits secs et pain de campagne." },
  { name: "Salades composées", desc: "Taboulé maison, piémontaise, tomates-mozzarella." },
  { name: "Mini-tartelettes salées", desc: "Quiche lorraine, poireaux, légumes du soleil." },
  { name: "Douceurs sucrées", desc: "Mini-tartes, choux et verrines de dessert." },
];

function Buffet() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-2 items-start">
        <div>
          <p className="eyebrow">Plats froids</p>
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
