import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contextes/AuthContext';

export default function RouteProtegee({ children }: { children: ReactNode }) {
  const { pseudo } = useAuth();
  if (!pseudo) return <Navigate to="/connexion" replace />;
  return <>{children}</>;
}