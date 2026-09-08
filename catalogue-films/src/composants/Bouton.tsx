export type VarianteBouton = "primaire" | "secondaire" | "danger";

export interface BoutonProps {
  libelle: string;
  variante?: VarianteBouton;
  desactive?: boolean;
  onClick?: () => void;
}

const styles: Record<VarianteBouton, string> = {
  primaire: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
  secondaire: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
};

export default function Bouton({ libelle, variante = "primaire", desactive = false, onClick }: BoutonProps) {
  return (
    <button
      onClick={onClick}
      disabled={desactive}
      className={`px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${styles[variante]}`}
    >
      {libelle}
    </button>
  );
}