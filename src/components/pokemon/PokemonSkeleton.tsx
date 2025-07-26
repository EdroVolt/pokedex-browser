import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PokemonSkeleton() {
  return (
    <Card className="bg-white">
      <CardContent className="p-4">
        <Skeleton className="aspect-square bg-gray-200 rounded-lg mb-3" />
        <div className="text-center">
          <Skeleton className="h-6 w-24 mx-auto mb-1" />
          <Skeleton className="h-4 w-16 mx-auto mb-3" />
          <div className="flex gap-1 justify-center">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface PokemonSkeletonGridProps {
  count?: number;
}

export function PokemonSkeletonGrid({ count = 20 }: PokemonSkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <PokemonSkeleton key={index} />
      ))}
    </div>
  );
}
