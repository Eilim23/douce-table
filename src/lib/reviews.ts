// Stockage des avis.
// Pour l'instant les avis sont enregistrés dans le navigateur (localStorage).
// Pour que TOUS les visiteurs voient les mêmes avis, il faudra remplacer
// loadReviews / addReview par des appels à une base de données.

export type Review = {
  id: string;
  name: string;
  rating: number;
  message: string;
  date: string;
};

const KEY = "douce-table-avis";

export function loadReviews(): Review[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function addReview(input: { name: string; rating: number; message: string }): Review[] {
  const review: Review = {
    id: crypto.randomUUID(),
    name: input.name.slice(0, 50),
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    message: input.message,
    date: new Date().toISOString(),
  };
  const next = [review, ...loadReviews()];
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // stockage indisponible : l'avis reste visible pour la session en cours
  }
  return next;
}
