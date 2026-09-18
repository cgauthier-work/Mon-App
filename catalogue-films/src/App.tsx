import { useState } from "react";
import type { Inscription } from "./lib/inscription";
import FormulaireInscription from "./composants/FormulaireInscription";
import ListeInscriptions from "./composants/ListeInscriptions";

export type InscriptionEnregistree = Omit<Inscription, "motDePasse" | "confirmation"> & { id: number };

export default function App() {
  const [inscriptions, setInscriptions] = useState<InscriptionEnregistree[]>([]);

  const ajouterInscription = (donnees: Inscription) => {
    const nouvelle: InscriptionEnregistree = {
      id: Date.now(),
      prenom: donnees.prenom,
      email: donnees.email,
      cgv: donnees.cgv,
    };
    setInscriptions((liste) => [nouvelle, ...liste]);
  };

  const supprimerInscription = (id: number) => {
    setInscriptions((liste) => liste.filter((i) => i.id !== id));
  };

  return (
    <main className="max-w-6xl mx-auto p-6 flex flex-col gap-10">
      <h1 className="text-3xl font-bold">Formulaire d'inscription</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section>
          <h2 className="text-xl font-semibold mb-4">S'inscrire</h2>
          <FormulaireInscription onInscription={ajouterInscription} />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Inscriptions ({inscriptions.length})
          </h2>
          <ListeInscriptions
            inscriptions={inscriptions}
            onSuppression={supprimerInscription}
          />
        </section>
      </div>
    </main>
  );
}