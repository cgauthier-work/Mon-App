import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../contextes/AuthContext';
import { useFavoris } from '../contextes/FavorisContext';

export default function Layout() {
  const { pseudo, deconnecter } = useAuth();
  const { favoris } = useFavoris();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'font-bold text-blue-600'
      : 'text-gray-600 hover:text-blue-500';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <nav className="flex gap-6">
            <NavLink to="/" end className={navClass}>Accueil</NavLink>
            <NavLink to="/recherche" className={navClass}>Recherche</NavLink>
            <NavLink to="/favoris" className={navClass}>
              Favoris {favoris.length > 0 && (
                <span className="ml-1 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                  {favoris.length}
                </span>
              )}
            </NavLink>
          </nav>
          <div className="flex items-center gap-4 text-sm">
            {pseudo ? (
              <>
                <span className="text-gray-600">Connecté en tant que <strong>{pseudo}</strong></span>
                <button onClick={deconnecter} className="text-red-500 hover:text-red-700">
                  Déconnexion
                </button>
              </>
            ) : (
              <NavLink to="/connexion" className={navClass}>Connexion</NavLink>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}