import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import { PokemonListItem } from "@/lib/api/types";
import { getPokemonIdFromUrl } from "@/lib/api/pokemon";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const navigate = useNavigate();
  const pokemonId = getPokemonIdFromUrl(pokemon.url);

  // Fetch detailed Pokemon data for images and types
  const { pokemon: pokemonDetail, isLoading } = usePokemonDetail(pokemonId);

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  const formatPokemonName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const getPokemonTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      normal: "bg-gray-400",
      fighting: "bg-red-500",
      flying: "bg-blue-300",
      poison: "bg-purple-500",
      ground: "bg-yellow-500",
      rock: "bg-yellow-700",
      bug: "bg-green-400",
      ghost: "bg-purple-700",
      steel: "bg-gray-500",
      fire: "bg-red-600",
      water: "bg-blue-500",
      grass: "bg-green-500",
      electric: "bg-yellow-400",
      psychic: "bg-pink-500",
      ice: "bg-blue-200",
      dragon: "bg-purple-600",
      dark: "bg-gray-800",
      fairy: "bg-pink-300",
    };
    return typeColors[type] || "bg-gray-400";
  };

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 bg-white"
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
          {isLoading ? (
            <div className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse" />
          ) : pokemonDetail?.sprites.official_artwork ? (
            <img
              src={pokemonDetail.sprites.official_artwork}
              alt={formatPokemonName(pokemon.name)}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          ) : pokemonDetail?.sprites.front_default ? (
            <img
              src={pokemonDetail.sprites.front_default}
              alt={formatPokemonName(pokemon.name)}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm">No image</span>
            </div>
          )}
        </div>

        <div className="text-center">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">
            {formatPokemonName(pokemon.name)}
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            #{pokemonId.toString().padStart(3, "0")}
          </p>

          {pokemonDetail?.types && (
            <div className="flex gap-1 justify-center flex-wrap">
              {pokemonDetail.types.map((type) => (
                <Badge
                  key={type}
                  className={`${getPokemonTypeColor(
                    type
                  )} text-white text-xs px-2 py-1 border-0`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
