import { Link } from 'react-router-dom';

export default function Accueil() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Bienvenue sur CinéSearch</h1>
      <p className="text-gray-600">Recherchez vos films préférés et ajoutez-les à vos favoris.</p>
      <Link to="/recherche" className="text-blue-600 hover:underline font-medium">
        → Lancer une recherche
      </Link>
    </div>
  );
}