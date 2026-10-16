import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Douce Table" },
      { name: "description", content: "Contactez-nous pour un devis buffet ou des repas maison à domicile." },
      { property: "og:title", content: "Contact — Douce Table" },
      { property: "og:description", content: "Demandez un devis buffet ou des repas à domicile." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 text-5xl">Parlons de votre repas</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Un devis pour une fête, ou des repas réguliers à domicile ? Appelez-nous ou écrivez-nous.
        </p>
        <div className="mt-10 bg-sable rounded-lg p-10 space-y-3 text-xl font-display">
          <p><a href="tel:0600000000">06 00 00 00 00</a></p>
          <p><a href="mailto:contact@auxpetitsplats.fr">contact@auxpetitsplats.fr</a></p>
        </div>
      </section>
    </SiteLayout>
  );
}
