import { PokemonCard } from "./PokemonCard";
import { PokemonSkeletonGrid } from "./PokemonSkeleton";
import { LoadMoreButton } from "./LoadMoreButton";
import { usePaginatedPokemon } from "@/hooks/usePaginatedPokemon";
import { useInfinitePokemon } from "@/hooks/useInfinitePokemon";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { PokemonGridErrorFallback } from "@/components/error/ErrorFallback";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PokemonGridProps {
  viewMode: "pagination" | "infinite";
}

function PokemonGridContent({ viewMode }: PokemonGridProps) {
  // Pagination mode
  const paginationData = usePaginatedPokemon(20);

  // Infinite scroll mode
  const infiniteData = useInfinitePokemon(20);

  // Use appropriate data based on view mode
  const currentData = viewMode === "pagination" ? paginationData : infiniteData;

  // Error handling
  if (currentData.error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-500 mb-4">
          <svg
            className="w-12 h-12 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold">Oops! Something went wrong</h3>
          <p className="text-gray-600 mt-2">{currentData.error.message}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-500 hover:text-blue-600 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  // Loading state
  if (currentData.isLoading && currentData.pokemon.length === 0) {
    return <PokemonSkeletonGrid count={20} />;
  }

  // Empty state
  if (!currentData.isLoading && currentData.pokemon.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-500">
          <svg
            className="w-12 h-12 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4-4m4 4l-4 4m4-4H9"
            />
          </svg>
          <h3 className="text-lg font-semibold">No Pokémon found</h3>
          <p className="text-gray-600 mt-2">Try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Pokemon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {currentData.pokemon.map((pokemon) => (
          <ErrorBoundary
            key={pokemon.name}
            fallback={({ error, resetError }) => (
              <div className="bg-white rounded-lg p-4 text-center border border-red-200">
                <div className="text-red-500 text-sm">
                  <p>Failed to load</p>
                  <button
                    onClick={resetError}
                    className="text-blue-500 underline"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
          >
            <PokemonCard pokemon={pokemon} />
          </ErrorBoundary>
        ))}
      </div>

      {/* Pagination Controls (for pagination mode) */}
      {viewMode === "pagination" && "totalPages" in paginationData && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-sm text-gray-600">
            Page {paginationData.currentPage} of {paginationData.totalPages}(
            {paginationData.totalCount} total Pokémon)
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={
                    paginationData.hasPreviousPage
                      ? paginationData.previousPage
                      : undefined
                  }
                  className={
                    !paginationData.hasPreviousPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {/* First page */}
              {paginationData.currentPage > 2 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => paginationData.goToPage(1)}
                      className="cursor-pointer"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {paginationData.currentPage > 3 && <PaginationEllipsis />}
                </>
              )}

              {/* Current page and neighbors */}
              {[
                paginationData.currentPage - 1,
                paginationData.currentPage,
                paginationData.currentPage + 1,
              ]
                .filter(
                  (page) => page >= 1 && page <= paginationData.totalPages
                )
                .map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => paginationData.goToPage(page)}
                      isActive={page === paginationData.currentPage}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              {/* Last page */}
              {paginationData.currentPage < paginationData.totalPages - 1 && (
                <>
                  {paginationData.currentPage <
                    paginationData.totalPages - 2 && <PaginationEllipsis />}
                  <PaginationItem>
                    <PaginationLink
                      onClick={() =>
                        paginationData.goToPage(paginationData.totalPages)
                      }
                      className="cursor-pointer"
                    >
                      {paginationData.totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={
                    paginationData.hasNextPage
                      ? paginationData.nextPage
                      : undefined
                  }
                  className={
                    !paginationData.hasNextPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Load More Button (for infinite scroll mode) */}
      {viewMode === "infinite" && (
        <LoadMoreButton
          onLoadMore={infiniteData.loadMore}
          isLoading={infiniteData.isFetchingNextPage}
          hasMore={infiniteData.hasNextPage}
        />
      )}
    </div>
  );
}

export function PokemonGrid({ viewMode }: PokemonGridProps) {
  return (
    <ErrorBoundary fallback={PokemonGridErrorFallback}>
      <PokemonGridContent viewMode={viewMode} />
    </ErrorBoundary>
  );
}
