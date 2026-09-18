import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextes/AuthContext';

export default function Connexion() {
  const [pseudo, setPseudo] = useState('');
  const { connecter } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pseudo.trim()) return;
    connecter(pseudo);
    navigate('/favoris');
  };

  return (
    <div className="max-w-sm mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Connexion</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={pseudo}
          onChange={e => setPseudo(e.target.value)}
          placeholder="Votre pseudo"
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Se connecter
        </button>
      </form>
    </div>
  );
}