import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, FACEBOOK_URL } from "@/components/SiteLayout";

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
          Un devis pour une fête, ou des repas réguliers à domicile ? Appelez-nous ou écrivez-nous sur Facebook.
        </p>
        <div className="mt-10 bg-sable rounded-lg p-10 space-y-3 text-xl font-display">
          <p><a href="tel:0641765138">06 41 76 51 38</a></p>
          <p><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Notre page Facebook</a></p>
        </div>
      </section>
    </SiteLayout>
  );
}
