import { Link } from 'react-router-dom';

export default function PageIntrouvable() {
  return (
    <div className="text-center flex flex-col gap-4">
      <p className="text-6xl font-bold text-gray-300">404</p>
      <p className="text-gray-600">Cette page n'existe pas.</p>
      <Link to="/" className="text-blue-600 hover:underline">Retour à l'accueil</Link>
    </div>
  );
}