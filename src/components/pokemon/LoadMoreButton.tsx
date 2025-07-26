import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

export function LoadMoreButton({
  onLoadMore,
  isLoading,
  hasMore,
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">🎉 You've seen all Pokémon!</p>
        <p className="text-sm text-gray-400 mt-1">Showing all Pokémon</p>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <Button
        onClick={onLoadMore}
        disabled={isLoading}
        size="lg"
        className="min-w-[140px]"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Loading...
          </>
        ) : (
          "Load More Pokémon"
        )}
      </Button>
    </div>
  );
}
