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