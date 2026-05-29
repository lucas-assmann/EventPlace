import { Skeleton } from '@/components/ui/skeleton'

export function TicketCardSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/7 bg-zinc-950 px-5 py-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-lg bg-zinc-800/60" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-28 bg-zinc-800/60" />
          <Skeleton className="h-3 w-20 bg-zinc-800/60" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden flex-col items-end gap-1 sm:flex border-r-2 border-white/10 pr-6 h-10 justify-center">
          <Skeleton className="h-2.5 w-16 bg-zinc-800/60" />
          <Skeleton className="h-3 w-20 bg-zinc-800/60" />
        </div>

        <div className="hidden flex-col items-end gap-1 sm:flex border-r-2 border-white/10 pr-6 h-10 justify-center">
          <Skeleton className="h-2.5 w-16 bg-zinc-800/60" />
          <Skeleton className="h-3 w-20 bg-zinc-800/60" />
        </div>

        <div className="hidden flex-col items-end gap-1 sm:flex">
          <Skeleton className="h-2.5 w-12 bg-zinc-800/60" />
          <Skeleton className="h-5 w-20 rounded-full bg-zinc-800/60" />
        </div>
      </div>
    </div>
  )
}