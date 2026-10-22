// Avis partagés, enregistrés dans la base de données Lovable Cloud.
import { supabase } from "@/integrations/supabase/client";

export type Review = {
  id: string;
  name: string;
  rating: number;
  message: string;
  date: string;
};

export async function loadReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, rating, message, created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error("Impossible de charger les avis pour le moment.");
  return (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    rating: r.rating,
    message: r.message,
    date: r.created_at,
  }));
}

export async function addReview(input: { name: string; rating: number; message: string }): Promise<void> {
  const { error } = await supabase.from("reviews").insert({
    name: input.name.trim().slice(0, 50),
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    message: input.message.trim(),
  });
  if (error) {
    if (error.message.includes("duplicate_review")) throw new Error("Cet avis a déjà été publié.");
    if (error.message.includes("too_many_reviews"))
      throw new Error("Beaucoup d'avis viennent d'être envoyés, merci de réessayer dans une minute.");
    throw new Error("Votre avis n'a pas pu être envoyé, merci de réessayer.");
  }
}
