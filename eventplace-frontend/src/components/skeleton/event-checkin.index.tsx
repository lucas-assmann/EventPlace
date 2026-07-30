import { Skeleton } from "@/components/ui/skeleton";

export function EventCheckinSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

      <div className="flex items-center justify-between">

        <div className="space-y-2">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-4 w-64" />
        </div>

        <Skeleton className="h-6 w-20 rounded-full" />

      </div>

      <div className="mt-5 flex gap-8">

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-40" />
        </div>

      </div>

    </div>
  );
}