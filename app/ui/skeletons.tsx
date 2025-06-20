import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-48 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  )
}

export function ProjectsGridSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 xl:gap-8 2xl:grid-cols-2 2xl:gap-10 max-w-7xl mx-auto">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
    </div>
  );
}

export function GameCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg shadow-sm flex flex-col space-y-4">
      <div className="flex items-start justify-between w-full">
        <div className="flex-1">
          <Skeleton className="h-6 w-32 mb-2" />
        </div>
        <Skeleton className="h-10 w-10 ml-4 rounded" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export function GamesGridSkeleton() {
  return (
    <div className="flex flex-1 flex-col grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 max-w-7xl mx-auto">
      <GameCardSkeleton />
      <GameCardSkeleton />
      <GameCardSkeleton />
      <GameCardSkeleton />
    </div>
  );
}