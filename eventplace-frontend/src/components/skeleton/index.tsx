import { Skeleton } from '@/components/ui/skeleton'

type SkeletonProps = {
  rows?: number
  className?: string
}

export function SkeletonDemo({ rows = 3, className }: SkeletonProps) {
  return (
    <div className={className}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="mb-2 h-4 w-full" />
      ))}
    </div>
  )
}