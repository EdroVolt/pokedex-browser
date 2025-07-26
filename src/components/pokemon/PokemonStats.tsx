import { Progress } from "@/components/ui/progress";

interface PokemonStatsProps {
  stats: {
    name: string;
    base_stat: number;
  }[];
}

export function PokemonStats({ stats }: PokemonStatsProps) {
  const formatStatName = (name: string) => {
    const statNames: Record<string, string> = {
      hp: "HP",
      attack: "Attack",
      defense: "Defense",
      "special-attack": "Sp. Attack",
      "special-defense": "Sp. Defense",
      speed: "Speed",
    };
    return statNames[name] || name.charAt(0).toUpperCase() + name.slice(1);
  };

  const getStatColor = (statName: string) => {
    const colors: Record<string, string> = {
      hp: "bg-red-500",
      attack: "bg-orange-500",
      defense: "bg-yellow-500",
      "special-attack": "bg-blue-500",
      "special-defense": "bg-green-500",
      speed: "bg-pink-500",
    };
    return colors[statName] || "bg-gray-500";
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Base Stats</h3>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.name} className="flex items-center gap-4">
            <div className="w-20 text-sm font-medium text-gray-600 text-right">
              {formatStatName(stat.name)}
            </div>
            <div className="text-sm font-semibold text-gray-800 w-8 text-center">
              {stat.base_stat}
            </div>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ease-out ${getStatColor(
                    stat.name
                  )}`}
                  style={{
                    width: `${Math.min((stat.base_stat / 200) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
