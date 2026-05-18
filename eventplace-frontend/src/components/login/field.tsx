import type { ReactNode } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type LoginFieldProps = React.ComponentProps<typeof Input> & {
  id: string
  label: string
  action?: ReactNode
  trailingIcon?: ReactNode
}

export function LoginField({
  id,
  label,
  action,
  trailingIcon,
  className,
  ...props
}: LoginFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label
          htmlFor={id}
          className="text-[0.82rem] font-medium tracking-wide text-white/90"
        >
          {label}
        </Label>
        {action}
      </div>
      <div className="relative">
        <Input
          id={id}
          className={cn(
            'h-10 rounded-lg border-white/25 bg-white/8 px-3.5 text-sm text-white shadow-sm shadow-black/20 placeholder:text-white/35 focus-visible:border-white/60 focus-visible:ring-white/15',
            trailingIcon && 'pr-10',
            className,
          )}
          {...props}
        />
        {trailingIcon}
      </div>
    </div>
  )
}
