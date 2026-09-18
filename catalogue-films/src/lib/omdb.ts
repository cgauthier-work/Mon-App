export interface FilmOmdb {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface FilmDetailOmdb extends FilmOmdb {
  Genre: string;
  Runtime: string;
  Plot: string;
  Director: string;
  Response: 'True' | 'False';
  Error?: string;
}

export interface ReponseRecherche {
  Search?: FilmOmdb[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

export function urlRecherche(terme: string): string {
  const cle = import.meta.env.VITE_OMDB_KEY;
  return `https://www.omdbapi.com/?apikey=${cle}&s=${encodeURIComponent(terme)}`;
}

export function urlDetail(id: string): string {
  const cle = import.meta.env.VITE_OMDB_KEY;
  return `https://www.omdbapi.com/?apikey=${cle}&i=${encodeURIComponent(id)}`;
}