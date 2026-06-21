import { Skeleton } from '@/components/ui/skeleton'

export function EditProfileSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
      <main className="mx-auto max-w-6xl">
        <div className="mb-8 border-b-2 border-purple-500/50 pb-3">
          <Skeleton className="h-9 w-48 bg-zinc-800/60" />
          <Skeleton className="mt-2 h-4 w-64 bg-zinc-800/60" />
        </div>

        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-4 rounded-2xl border border-white/7 bg-zinc-900 p-5">
            <Skeleton className="h-5 w-40 bg-zinc-800/60" />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3.5 w-16 bg-zinc-800/60" />
                <Skeleton className="h-10 w-full bg-zinc-800/60" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3.5 w-20 bg-zinc-800/60" />
                <Skeleton className="h-10 w-full bg-zinc-800/60" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-12 bg-zinc-800/60" />
              <Skeleton className="h-10 w-full bg-zinc-800/60" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3.5 w-32 bg-zinc-800/60" />
                <Skeleton className="h-10 w-full bg-zinc-800/60" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3.5 w-20 bg-zinc-800/60" />
                <Skeleton className="h-10 w-full bg-zinc-800/60" />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-white/7 bg-zinc-900 p-5">
            <Skeleton className="h-5 w-32 bg-zinc-800/60" />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3.5 w-10 bg-zinc-800/60" />
                <Skeleton className="h-10 w-full bg-zinc-800/60" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3.5 w-16 bg-zinc-800/60" />
                <Skeleton className="h-10 w-full bg-zinc-800/60" />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3 rounded-2xl border border-white/7 bg-zinc-900 p-5">
            <Skeleton className="h-5 w-20 bg-zinc-800/60" />
            <Skeleton className="h-4 w-72 bg-zinc-800/60" />
            <Skeleton className="h-8 w-32 rounded-md bg-zinc-800/60" />
          </section>

          <Skeleton className="h-11 w-full rounded-md bg-zinc-800/60" />
        </div>
      </main>
    </div>
  )
}