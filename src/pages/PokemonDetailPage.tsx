import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Ruler, Weight, Zap } from "lucide-react";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import { PokemonStats } from "@/components/pokemon/PokemonStats";
import { PokemonAbilities } from "@/components/pokemon/PokemonAbilities";

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
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-purple-600">
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

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Pokemon Image and Basic Info */}
          <Card className="bg-white rounded-lg mb-6">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Pokemon Image */}
                <div className="flex-shrink-0">
                  <div className="w-64 h-64 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
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
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Types */}
                  <div className="mb-6">
                    <div className="flex gap-2 justify-center lg:justify-start flex-wrap mb-4">
                      {pokemon.types.map((type) => (
                        <Badge
                          key={type}
                          className={`${getPokemonTypeColor(
                            type
                          )} text-white px-4 py-2 text-sm border-0`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Physical Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-2">
                        <Ruler className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">
                          Height
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">
                        {(pokemon.height / 10).toFixed(1)} m
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-2">
                        <Weight className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">
                          Weight
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">
                        {(pokemon.weight / 10).toFixed(1)} kg
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-2">
                        <Zap className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">
                          Base Experience
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">
                        {pokemon.base_experience} XP
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats and Abilities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PokemonStats stats={pokemon.stats} />
            <PokemonAbilities abilities={pokemon.abilities} />
          </div>
        </div>
      </div>
    </div>
  );
}
