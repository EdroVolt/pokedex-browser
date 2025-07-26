import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Ruler, Weight } from "lucide-react";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";

export function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { pokemon, isLoading, error } = usePokemonDetail(name);

  const handleBackToList = () => {
    navigate("/");
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

  const formatAbilityName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-400 to-red-600 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">😞 Oops!</h1>
          <p className="text-xl mb-6">{error.message}</p>
          <Button onClick={handleBackToList} variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-400 to-purple-600">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={handleBackToList}
            className="text-white hover:bg-white/20 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>

          <div className="text-center text-white mb-8">
            <div className="w-32 h-8 bg-white/20 rounded mb-4 mx-auto animate-pulse"></div>
            <div className="w-24 h-6 bg-white/20 rounded mx-auto animate-pulse"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8 animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-400 to-gray-600 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">🔍 Pokemon Not Found</h1>
          <Button onClick={handleBackToList} variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleBackToList}
          className="text-white hover:bg-white/20 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to List
        </Button>

        {/* Header Section */}
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">
            ⚡ {formatPokemonName(pokemon.name)}
          </h1>
          <p className="text-purple-100 text-lg">
            #{pokemon.id.toString().padStart(3, "0")}
          </p>
        </div>

        {/* Main Content - Single Card Layout */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white rounded-lg">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Side - Pokemon Image and Basic Info */}
                <div className="flex-shrink-0 lg:w-80">
                  {/* Pokemon Image */}
                  <div className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden mb-4">
                    {pokemon.sprites.official_artwork ? (
                      <img
                        src={pokemon.sprites.official_artwork}
                        alt={formatPokemonName(pokemon.name)}
                        className="w-full h-full object-contain"
                      />
                    ) : pokemon.sprites.front_default ? (
                      <img
                        src={pokemon.sprites.front_default}
                        alt={formatPokemonName(pokemon.name)}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Type Badges */}
                  <div className="flex gap-2 justify-center mb-4">
                    {pokemon.types.map((type) => (
                      <Badge
                        key={type}
                        className={`${getPokemonTypeColor(
                          type
                        )} text-white px-3 py-1 text-sm border-0 rounded-full`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Badge>
                    ))}
                  </div>

                  {/* Height and Weight */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Ruler className="w-4 h-4 text-gray-600 mr-1" />
                        <span className="text-sm text-gray-600">Height</span>
                      </div>
                      <p className="text-lg font-bold text-gray-800">
                        {(pokemon.height / 10).toFixed(1)} m
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Weight className="w-4 h-4 text-gray-600 mr-1" />
                        <span className="text-sm text-gray-600">Weight</span>
                      </div>
                      <p className="text-lg font-bold text-gray-800">
                        {(pokemon.weight / 10).toFixed(1)} kg
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side - Stats and Abilities */}
                <div className="flex-1">
                  {/* Base Stats */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Base Stats
                    </h3>
                    <div className="space-y-3">
                      {pokemon.stats.map((stat) => (
                        <div
                          key={stat.name}
                          className="flex items-center gap-4"
                        >
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
                                  width: `${Math.min(
                                    (stat.base_stat / 200) * 100,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Abilities */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Abilities
                    </h3>
                    <div className="space-y-2">
                      {pokemon.abilities.map((ability, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <span className="text-sm text-gray-800">
                            {formatAbilityName(ability.name)}
                          </span>
                          {ability.is_hidden && (
                            <span className="text-xs text-gray-500 italic">
                              (hidden)
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Base Experience */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Base Experience
                    </h3>
                    <p className="text-2xl font-bold text-purple-600">
                      {pokemon.base_experience} XP
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
