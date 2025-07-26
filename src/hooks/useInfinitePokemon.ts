import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchPokemonList } from "@/lib/api/pokemon";
import type {
  UseInfinitePokemonResult,
  PokemonListItem,
} from "@/lib/api/types";
import { DEFAULT_LIMIT } from "@/lib/api/endpoints";

export function useInfinitePokemon(
  limitPerPage: number = DEFAULT_LIMIT
): UseInfinitePokemonResult {
  const {
    data,
    isLoading,
    error: queryError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemon", "list", "infinite"],
    queryFn: ({ pageParam = 0 }) => fetchPokemonList(pageParam, limitPerPage),
    getNextPageParam: (lastPage, allPages) => {
      // Calculate next offset
      const nextOffset = allPages.length * limitPerPage;

      // Check if we have more pages
      if (nextOffset >= lastPage.count) {
        return undefined; // No more pages
      }

      return nextOffset;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    initialPageParam: 0,
  });

  // Flatten all pages into a single array
  const pokemon: PokemonListItem[] = useMemo(() => {
    if (!data?.pages) return [];

    return data.pages.flatMap((page) => page.results);
  }, [data?.pages]);

  // Transform error to our format
  const error = useMemo(() => {
    if (!queryError) return null;
    return {
      message:
        queryError instanceof Error ? queryError.message : "An error occurred",
      status: undefined,
    };
  }, [queryError]);

  // Load more function
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    pokemon,
    isLoading,
    error,
    hasNextPage: hasNextPage || false,
    loadMore,
    isFetchingNextPage,
  };
}
