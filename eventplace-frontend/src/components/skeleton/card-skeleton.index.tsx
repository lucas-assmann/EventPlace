import { Skeleton } from '@/components/ui/skeleton'

export function EventCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
      <Skeleton className="h-40 w-full rounded-none" />

      <div className="p-3 space-y-3">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/5" />

        <div className="pt-1 border-t border-white/5">
          <Skeleton className="h-3 w-16 mb-1" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}