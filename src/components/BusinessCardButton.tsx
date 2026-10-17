import { Contact } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import carte from "@/assets/carte-de-visite.jpg";

export function BusinessCardButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Voir la carte de visite"
          title="Voir la carte de visite"
          className="fixed bottom-5 left-5 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-taupe text-primary-foreground shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Contact className="h-7 w-7" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-2 sm:p-3">
        <DialogTitle className="sr-only">Carte de visite Douce Table</DialogTitle>
        <DialogDescription className="sr-only">
          Carte de visite de Douce Table, traiteur à domicile.
        </DialogDescription>
        <img src={carte} alt="Carte de visite Douce Table, traiteur à domicile" width={1555} height={1012} className="w-full rounded-md" />
      </DialogContent>
    </Dialog>
  );
}
