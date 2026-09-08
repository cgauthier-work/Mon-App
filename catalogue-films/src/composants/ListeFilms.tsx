import type { Film, StatutFilm } from "../lib/utils";
import Badge, { type TonBadge } from "./Badge";
import Bouton from "./Bouton";
import Carte from "./Carte";

export interface ListeFilmsProps {
  films: Film[];
  messageVide?: string;
  onSelection?: (film: Film) => void;
}

const statutConfig: Record<StatutFilm, { libelle: string; ton: TonBadge }> = {
  vu: { libelle: "Déjà vu", ton: "succes" },
  a_voir: { libelle: "À voir", ton: "info" },
  abandonne: { libelle: "Abandonné", ton: "neutre" },
};

export default function ListeFilms({ films, messageVide = "Aucun film à afficher.", onSelection }: ListeFilmsProps) {
  if (films.length === 0) {
    return <p className="text-gray-400 italic">{messageVide}</p>;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {films.map((film) => {
        const { libelle, ton } = statutConfig[film.statut];
        return (
          <li key={film.id}>
            <Carte
              titre={film.titre}
              sousTitre={`${film.annee} — ${film.note}/10`}
              actions={
                onSelection ? (
                  <Bouton libelle="Détails" onClick={() => onSelection(film)} />
                ) : undefined
              }
            >
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge texte={libelle} ton={ton} />
                {film.genres.map((g) => (
                  <Badge key={g} texte={g} />
                ))}
              </div>
            </Carte>
          </li>
        );
      })}
    </ul>
  );
}