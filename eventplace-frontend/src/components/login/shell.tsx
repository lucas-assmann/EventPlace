import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type LoginShellProps = {
  imagePanel: ReactNode
  children: ReactNode
  className?: string
  reverse?: boolean
}

export function LoginShell({
  imagePanel,
  children,
  className,
  reverse = false,
}: LoginShellProps) {
  return (
    <div
      className={cn(
        'grid min-h-svh bg-black text-white lg:grid-cols-[45%_55%]',
        className,
      )}
    >
      <div className={cn('contents', reverse && '*:lg:order-2')}>
        {imagePanel}
      </div>
      <main
        className={cn(
          'relative flex min-h-svh items-center justify-center px-6 py-10 sm:px-10',
          reverse && 'lg:order-1 border-r',
        )}
      >
        {children}
      </main>
    </div>
  )
}