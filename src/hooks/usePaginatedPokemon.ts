import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { fetchPokemonList } from "@/lib/api/pokemon";
import type { UsePokemonListResult, PokemonListItem } from "@/lib/api/types";
import { DEFAULT_LIMIT } from "@/lib/api/endpoints";

export function usePaginatedPokemon(
  limitPerPage: number = DEFAULT_LIMIT
): UsePokemonListResult {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate offset based on current page
  const offset = useMemo(
    () => (currentPage - 1) * limitPerPage,
    [currentPage, limitPerPage]
  );

  // React Query for fetching Pokemon list
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["pokemon", "list", { page: currentPage, limit: limitPerPage }],
    queryFn: () => fetchPokemonList(offset, limitPerPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  // Transform error to our format
  const error = useMemo(() => {
    if (!queryError) return null;
    return {
      message:
        queryError instanceof Error ? queryError.message : "An error occurred",
      status: undefined,
    };
  }, [queryError]);

  // Calculate pagination info
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / limitPerPage);
  const pokemon: PokemonListItem[] = data?.results || [];

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  // Navigation functions
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return {
    pokemon,
    totalCount,
    currentPage,
    totalPages,
    isLoading,
    error,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    nextPage,
    previousPage,
  };
}
