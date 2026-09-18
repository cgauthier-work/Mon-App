import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { FilmOmdb, ReponseRecherche } from '../lib/omdb';
import { urlRecherche } from '../lib/omdb';
import CarteFilm from '../composants/CarteFilm';

export default function Recherche() {
  const [terme, setTerme] = useState('');
  const [films, setFilms] = useState<FilmOmdb[]>([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    if (!terme.trim()) { setFilms([]); setErreur(null); return; }

    const controleur = new AbortController();

    const chercher = async () => {
      setChargement(true);
      setErreur(null);
      try {
        const r = await fetch(urlRecherche(terme), { signal: controleur.signal });
        if (!r.ok) throw new Error(`Erreur HTTP : ${r.status}`);
        const d: ReponseRecherche = await r.json();
        if (d.Response === 'False') { setFilms([]); setErreur(d.Error ?? 'Aucun résultat.'); }
        else setFilms(d.Search ?? []);
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') return;
        setErreur(e instanceof Error ? e.message : 'Erreur inconnue');
      } finally {
        setChargement(false);
      }
    };

    chercher();
    return () => controleur.abort();
  }, [terme]);

  return (
    <div className="flex flex-col gap-6">
      <input
        type="search"
        value={terme}
        onChange={e => setTerme(e.target.value)}
        placeholder="Tapez un titre…"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
      />
      {!terme.trim() && <p className="text-gray-500 italic">Tapez un titre pour lancer la recherche.</p>}
      {terme.trim() && chargement && <p className="text-gray-500">Chargement…</p>}
      {terme.trim() && !chargement && erreur && <p className="text-red-600">{erreur}</p>}
      {terme.trim() && !chargement && !erreur && films.length === 0 && (
        <p className="text-gray-500">Aucun film ne correspond à « {terme} ».</p>
      )}
      {films.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {films.map(film => (
            <li key={film.imdbID}>
              <Link to={`/films/${film.imdbID}`}>
                <CarteFilm film={film} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}