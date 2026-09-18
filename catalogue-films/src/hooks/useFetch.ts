import { useState, useEffect } from "react";

export function useFetch<T>(url: string | null): {
  donnees: T | null;
  chargement: boolean;
  erreur: string | null;
} {
  const [donnees, setDonnees] = useState<T | null>(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const controleur = new AbortController();

    const charger = async () => {
      setChargement(true);
      setErreur(null);
      try {
        const r = await fetch(url, { signal: controleur.signal });
        if (!r.ok) throw new Error(`Erreur HTTP : ${r.status}`);
        const d: T = await r.json();
        setDonnees(d);
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") return;
        setErreur(e instanceof Error ? e.message : "Erreur inconnue");
      } finally {
        setChargement(false);
      }
    };

    charger();
    return () => controleur.abort();
  }, [url]);

  return { donnees, chargement, erreur };
}