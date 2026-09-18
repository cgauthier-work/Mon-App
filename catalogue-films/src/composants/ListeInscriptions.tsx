import Badge from "./Badge";
import Bouton from "./Bouton";
import Carte from "./Carte";
import type { InscriptionEnregistree } from "../App";

export interface ListeInscriptionsProps {
  inscriptions: InscriptionEnregistree[];
  onSuppression?: (id: number) => void;
}

export default function ListeInscriptions({ inscriptions, onSuppression }: ListeInscriptionsProps) {
  if (inscriptions.length === 0) {
    return <p className="text-gray-400 italic">Aucune inscription pour l'instant.</p>;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {inscriptions.map((i) => (
        <li key={i.id}>
          <Carte
            titre={i.prenom}
            sousTitre={i.email}
            actions={
              onSuppression ? (
                <Bouton
                  libelle="Supprimer"
                  variante="danger"
                  onClick={() => onSuppression(i.id)}
                />
              ) : undefined
            }
          >
            <Badge texte="CGV acceptées" ton="succes" />
          </Carte>
        </li>
      ))}
    </ul>
  );
}