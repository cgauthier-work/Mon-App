export type TonBadge = "neutre" | "succes" | "info" | "attention";

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