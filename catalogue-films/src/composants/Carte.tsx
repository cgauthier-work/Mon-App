import type { ReactNode } from "react";

export interface CarteProps {
  titre: string;
  sousTitre?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function Carte({ titre, sousTitre, children, actions }: CarteProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
      <div>
        <h2 className="font-bold text-lg">{titre}</h2>
        {sousTitre && <p className="text-sm text-gray-500">{sousTitre}</p>}
      </div>
      <div className="flex-1">{children}</div>
      {actions && <div className="pt-2 border-t border-gray-100">{actions}</div>}
    </div>
  );
}export type TonBadge = "neutre" | "succes" | "info" | "attention";

export interface BadgeProps {
  texte: string;
  ton?: TonBadge;
}

const tons: Record<TonBadge, string> = {
  neutre: "bg-gray-200 text-gray-700",
  succes: "bg-green-100 text-green-800",
  info: "bg-blue-100 text-blue-800",
  attention: "bg-yellow-100 text-yellow-800",
};

export default function Badge({ texte, ton = "neutre" }: BadgeProps) {
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${tons[ton]}`}>
      {texte}
    </span>
  );
}