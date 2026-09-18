import type { ChangeEvent } from "react";

export interface ChampTexteProps {
  nom: string;
  label: string;
  valeur: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
  erreur?: string;
  placeholder?: string;
}

export default function ChampTexte({ nom, label, valeur, onChange, type = "text", erreur, placeholder }: ChampTexteProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={nom} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={nom}
        name={nom}
        type={type}
        value={valeur}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!erreur}
        aria-describedby={erreur ? `${nom}-erreur` : undefined}
        className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          erreur ? "border-red-500 bg-red-50" : "border-gray-300"
        }`}
      />
      {erreur && (
        <p id={`${nom}-erreur`} className="text-sm text-red-600">
          {erreur}
        </p>
      )}
    </div>
  );
}