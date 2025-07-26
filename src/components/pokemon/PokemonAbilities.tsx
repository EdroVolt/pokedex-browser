import { Badge } from "@/components/ui/badge";

interface PokemonAbilitiesProps {
  abilities: {
    name: string;
    is_hidden: boolean;
  }[];
}

export function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  const formatAbilityName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Abilities</h3>
      <div className="space-y-2">
        {abilities.map((ability, index) => (
          <div key={index} className="flex items-center gap-3">
            <Badge
              variant={ability.is_hidden ? "secondary" : "default"}
              className="text-sm"
            >
              {formatAbilityName(ability.name)}
            </Badge>
            {ability.is_hidden && (
              <span className="text-xs text-gray-500 italic">(Hidden)</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
