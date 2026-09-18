import { useFavoris } from '../contextes/FavorisContext';
import CarteFilm from '../composants/CarteFilm';
import { Link } from 'react-router-dom';

export default function Favoris() {
  const { favoris, dispatch } = useFavoris();

  if (favoris.length === 0) {
    return <p className="text-gray-500 italic">Aucun film dans vos favoris.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mes favoris ({favoris.length})</h1>
        <button
          onClick={() => dispatch({ type: 'vider' })}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Tout vider
        </button>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {favoris.map(film => (
          <li key={film.imdbID} className="flex flex-col gap-2">
            <Link to={`/films/${film.imdbID}`}>
              <CarteFilm film={film} />
            </Link>
            <button
              onClick={() => dispatch({ type: 'retirer', id: film.imdbID })}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Retirer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}