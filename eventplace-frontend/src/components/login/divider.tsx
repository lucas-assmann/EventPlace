import { Separator } from '@/components/ui/separator'

type DividerProps = {
  children: string
}

export function Divider({ children }: DividerProps) {
  return (
    <div className="my-11 flex items-center gap-4">
      <Separator className="flex-1 bg-white/20" />
      <span className="text-xs text-white/80">{children}</span>
      <Separator className="flex-1 bg-white/20" />
    </div>
  )
}
