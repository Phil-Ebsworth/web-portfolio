// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function ProjectCardSkeleton() {
    return (
        <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 shadow-sm w-full`}>
            <div className="h-40 w-full rounded-t-xl bg-gray-200" />
            <div className="p-4">
                <div className="h-6 w-32 rounded-md bg-gray-200 mb-2" />
                <div className="h-4 w-24 rounded-md bg-gray-200 mb-4" />
                <div className="h-4 w-full rounded bg-gray-200 mb-2" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
            <div className="px-4 pb-4">
                <div className="h-5 w-24 rounded bg-gray-200" />
            </div>
        </div>
    );
}
export function ProjectsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-4 xl:gap-8 2xl:grid-cols-2 2xl:gap-10 max-w-7xl mx-auto">
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
    </div>
  );
}