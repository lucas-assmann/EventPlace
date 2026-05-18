import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

type BackLinkProps = {
  to: string
  icon: ReactNode
  children: ReactNode
}

export function BackLink({ to, icon, children }: BackLinkProps) {
  return (
    <Button
      asChild
      variant="link"
      className="absolute left-6 top-8 h-auto gap-2 p-0 text-sm font-semibold text-white/90 hover:text-white sm:left-12"
    >
      <Link to={to}>
        {icon}
        {children}
      </Link>
    </Button>
  )
}
