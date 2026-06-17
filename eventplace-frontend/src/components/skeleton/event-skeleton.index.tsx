import { Skeleton } from "../ui/skeleton"

export function EventSkeleton() {

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Skeleton className="h-50 w-full bg-zinc-800" />

      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-8">
        <div className="mt-6 flex flex-row justify-between gap-8">

          <div className="flex-1">

            <Skeleton className="mb-3 h-6 w-24 bg-zinc-800" />

            <Skeleton className="mb-3 h-10 w-96 bg-zinc-800" />

            <div className="mb-6 flex gap-4">
              <Skeleton className="h-5 w-32 bg-zinc-800" />
              <Skeleton className="h-5 w-48 bg-zinc-800" />
            </div>

            <div className="mb-8 flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full bg-zinc-800" />
              <Skeleton className="h-4 w-32 bg-zinc-800" />
            </div>

            <Skeleton className="mb-4 h-6 w-40 bg-zinc-800" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-zinc-800" />
              <Skeleton className="h-4 w-full bg-zinc-800" />
              <Skeleton className="h-4 w-3/4 bg-zinc-800" />
            </div>
          </div>

          <div className="lg:w-85 space-y-3">
            <Skeleton className="h-8 w-32 bg-zinc-800" />
            <Skeleton className="h-12 w-full bg-zinc-800" />
            <Skeleton className="h-12 w-full bg-zinc-800" />
            <Skeleton className="h-12 w-full bg-zinc-800" />
            <Skeleton className="h-10 w-full bg-zinc-800" />
          </div>
        </div>
      </main>
    </div>
  )
}