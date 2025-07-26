import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchPokemonDetail, transformPokemonData } from "@/lib/api/pokemon";
import { UsePokemonDetailResult } from "@/lib/api/types";

export function usePokemonDetail(
  nameOrId: string | number | undefined
): UsePokemonDetailResult {
  const {
    data: pokemonData,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["pokemon", "detail", nameOrId],
    queryFn: () => {
      if (!nameOrId) {
        throw new Error("Pokemon name or ID is required");
      }
      return fetchPokemonDetail(nameOrId);
    },
    enabled: !!nameOrId, // Only run query if we have a name or ID
    staleTime: 10 * 60 * 1000, // 10 minutes (Pokemon details change less frequently)
    gcTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Don't retry 404s (Pokemon not found)
      if (error instanceof Error && error.message.includes("404")) {
        return false;
      }
      return failureCount < 2;
    },
  });

  // Transform the full Pokemon data to simplified format
  const pokemon = useMemo(() => {
    if (!pokemonData) return null;
    return transformPokemonData(pokemonData);
  }, [pokemonData]);

  // Transform error to our format
  const error = useMemo(() => {
    if (!queryError) return null;

    let message = "An error occurred";
    let status: number | undefined;

    if (queryError instanceof Error) {
      message = queryError.message;

      // Extract status code if available
      if (queryError.message.includes("404")) {
        status = 404;
        message = "Pokemon not found";
      } else if (queryError.message.includes("500")) {
        status = 500;
        message = "Server error occurred";
      }
    }

    return { message, status };
  }, [queryError]);

  return {
    pokemon,
    isLoading,
    error,
  };
}

// Helper hook for multiple Pokemon details (useful for evolution chains, etc.)
export function useMultiplePokemonDetails(namesOrIds: (string | number)[]): {
  pokemon: ReturnType<typeof usePokemonDetail>["pokemon"][];
  isLoading: boolean;
  error: ReturnType<typeof usePokemonDetail>["error"];
} {
  const queries = namesOrIds.map((nameOrId) => usePokemonDetail(nameOrId));

  const pokemon = queries.map((query) => query.pokemon);
  const isLoading = queries.some((query) => query.isLoading);
  const error = queries.find((query) => query.error)?.error || null;

  return {
    pokemon,
    isLoading,
    error,
  };
}
