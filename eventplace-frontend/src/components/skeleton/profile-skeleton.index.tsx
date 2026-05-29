import { Skeleton } from '@/components/ui/skeleton'

export function ProfileSkeleton() {
  return (
    <div>

      <div className="flex items-center justify-between bg-zinc-900 border-[0.5px] border-[rgba(124,58,237,0.2)] py-6 px-7 rounded-lg">
        <div className="flex items-center gap-10">
          <Skeleton className="h-32 w-32 rounded-full" />

          <div className="space-y-3">
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-44" />

            <div className="flex items-center gap-2 pt-1">
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
        </div>

        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="rounded-xl overflow-hidden bg-zinc-900 border border-white/5 p-6 space-y-3">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="rounded-xl overflow-hidden bg-zinc-900 border border-white/5 p-6 space-y-3">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="rounded-xl overflow-hidden bg-zinc-900 border border-white/5 p-6 space-y-3">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="bg-zinc-900 border-[0.5px] border-[rgba(124,58,237,0.2)] py-6 px-7 rounded-lg mt-6">
        <Skeleton className="h-8 w-56 mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 border-[0.5px] border-[rgba(124,58,237,0.2)] py-6 px-7 rounded-lg mt-6">
        <Skeleton className="h-8 w-44 mb-6" />

        <div className="space-y-4">

          <div className="rounded-xl overflow-hidden bg-zinc-900 border border-white/5 p-4 space-y-3">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />

            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-8 w-24 rounded-lg" />
              <Skeleton className="h-8 w-28 rounded-lg" />
            </div>
          </div>

          <div className="rounded-xl overflow-hidden bg-zinc-900 border border-white/5 p-4 space-y-3">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />

            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-8 w-24 rounded-lg" />
              <Skeleton className="h-8 w-28 rounded-lg" />
            </div>
          </div>

          <div className="rounded-xl overflow-hidden bg-zinc-900 border border-white/5 p-4 space-y-3">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />

            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-8 w-24 rounded-lg" />
              <Skeleton className="h-8 w-28 rounded-lg" />
            </div>
          </div>

          <div className="rounded-xl overflow-hidden bg-zinc-900 border border-white/5 p-4 space-y-3">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />

            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-8 w-24 rounded-lg" />
              <Skeleton className="h-8 w-28 rounded-lg" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}