import type { FilmOmdb } from "../lib/omdb";
import Badge from "./Badge";
import Carte from "./Carte";

export interface CarteFilmProps {
  film: FilmOmdb;
}

const typeLabels: Record<string, string> = {
  movie: "Film",
  series: "Série",
  game: "Jeu",
};

export default function CarteFilm({ film }: CarteFilmProps) {
  return (
    <Carte
      titre={film.Title}
      sousTitre={film.Year}
    >
      <div className="flex flex-col gap-2">
        {film.Poster !== "N/A" ? (
          <img
            src={film.Poster}
            alt={`Affiche de ${film.Title}`}
            className="w-full rounded object-cover"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
            Pas d'affiche
          </div>
        )}
        <Badge texte={typeLabels[film.Type] ?? film.Type} ton="info" />
      </div>
    </Carte>
  );
}