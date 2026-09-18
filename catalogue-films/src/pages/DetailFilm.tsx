import { useParams } from 'react-router-dom';
import { useFavoris } from '../contextes/FavorisContext';
import { useFetch } from '../hooks/useFetch';
import type { FilmDetailOmdb } from '../lib/omdb';
import { urlDetail } from '../lib/omdb';

export default function DetailFilm() {
  const { id } = useParams();
  const { donnees, chargement, erreur } = useFetch<FilmDetailOmdb>(id ? urlDetail(id) : null);
  const { favoris, dispatch } = useFavoris();

  if (chargement) return <p>Chargement…</p>;
  if (erreur) return <p className="text-red-600">{erreur}</p>;
  if (!donnees || donnees.Response === 'False') return <p>Film introuvable.</p>;

  const estFavori = favoris.some(f => f.imdbID === donnees.imdbID);

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex gap-6">
        {donnees.Poster !== 'N/A' ? (
          <img src={donnees.Poster} alt={`Affiche de ${donnees.Title}`} className="w-48 rounded-lg shadow" />
        ) : (
          <div className="w-48 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
            Pas d'affiche
          </div>
        )}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{donnees.Title}</h1>
          <p className="text-gray-500">{donnees.Year} · {donnees.Runtime}</p>
          <p className="text-gray-500">{donnees.Genre}</p>
          <p className="text-sm text-gray-700 mt-2">{donnees.Plot}</p>
          <button
            onClick={() => dispatch(
              estFavori
                ? { type: 'retirer', id: donnees.imdbID }
                : { type: 'ajouter', film: donnees }
            )}
            className={`mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${
              estFavori
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {estFavori ? '✕ Retirer des favoris' : '+ Ajouter aux favoris'}
          </button>
        </div>
      </div>
    </div>
  );
}