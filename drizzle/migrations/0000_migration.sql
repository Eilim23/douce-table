CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 50),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  message text NOT NULL CHECK (char_length(btrim(message)) >= 3),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.reviews TO anon, authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tout le monde peut lire les avis" ON public.reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Tout le monde peut ajouter un avis" ON public.reviews FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.reviews_anti_spam()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  NEW.created_at := now();
  IF EXISTS (SELECT 1 FROM public.reviews WHERE message = NEW.message AND created_at > now() - interval '1 day') THEN
    RAISE EXCEPTION 'duplicate_review';
  END IF;
  IF (SELECT count(*) FROM public.reviews WHERE created_at > now() - interval '1 minute') >= 5 THEN
    RAISE EXCEPTION 'too_many_reviews';
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER reviews_anti_spam BEFORE INSERT ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.reviews_anti_spam();