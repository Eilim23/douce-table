import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { loadReviews, addReview, type Review } from "@/lib/reviews";

export const Route = createFileRoute("/avis")({
  head: () => ({
    meta: [
      { title: "Avis — Douce Table" },
      { name: "description", content: "Laissez un avis sur Douce Table et lisez les commentaires de nos clients." },
      { property: "og:title", content: "Avis — Douce Table" },
      { property: "og:description", content: "Les avis de nos clients et un espace pour laisser le vôtre." },
    ],
  }),
  component: Avis,
});

function Stars({ value, size = "h-5 w-5" }: { value: number; size?: string }) {
  return (
    <span className="inline-flex" role="img" aria-label={`${value} étoiles sur 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`${size} ${n <= value ? "fill-taupe text-taupe" : "text-border"}`} />
      ))}
    </span>
  );
}

function Avis() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setReviews(loadReviews());
  }, []);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSent(false);
    const n = name.trim();
    const m = message.trim();
    if (!n) return setError("Merci d'indiquer votre prénom.");
    if (m.length < 3) return setError("Merci d'écrire un petit commentaire.");
    setReviews(addReview({ name: n, rating, message: m }));
    setName("");
    setMessage("");
    setRating(5);
    setError("");
    setSent(true);
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-center">
          <p className="eyebrow">Avis</p>
          <h1 className="mt-3 text-5xl">Votre avis nous fait plaisir</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Vous avez goûté à nos plats ou à nos buffets ? Laissez-nous un mot, il sera visible ci-dessous.
          </p>
        </div>

        <form onSubmit={submit} className="mt-12 bg-sable rounded-lg p-8 space-y-5" noValidate>
          <div>
            <label htmlFor="avis-nom" className="text-sm font-medium">Votre prénom</label>
            <Input id="avis-nom" value={name} onChange={(e) => setName(e.target.value)} maxLength={50} className="mt-2 bg-card" />
          </div>
          <div>
            <p className="text-sm font-medium">Votre note</p>
            <div className="mt-2 flex gap-1" role="radiogroup" aria-label="Note">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={rating === n}
                  aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
                  onClick={() => setRating(n)}
                  className="p-0.5"
                >
                  <Star className={`h-7 w-7 transition-colors ${n <= rating ? "fill-taupe text-taupe" : "text-taupe/40"}`} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="avis-message" className="text-sm font-medium">Votre commentaire</label>
            <Textarea id="avis-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="mt-2 bg-card" />
          </div>
          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
          {sent && <p className="text-sm text-foreground" role="status">Merci pour votre avis !</p>}
          <Button type="submit">Publier mon avis</Button>
        </form>

        <div className="mt-16">
          <h2 className="text-3xl">Ils nous ont fait confiance</h2>
          {reviews.length === 0 ? (
            <p className="mt-6 text-muted-foreground">Aucun avis pour le moment : soyez le premier à en laisser un !</p>
          ) : (
            <ul className="mt-6">
              {reviews.map((r) => (
                <li key={r.id} className="border-b border-dashed py-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-2xl">{r.name}</h3>
                    <Stars value={r.rating} />
                  </div>
                  <p className="mt-2 whitespace-pre-line text-muted-foreground">{r.message}</p>
                  <p className="mt-2 text-xs text-muted-foreground/80">
                    {new Date(r.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
