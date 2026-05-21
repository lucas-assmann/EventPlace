import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CalendarDays, MapPin, Menu, Search, Ticket } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

interface HeaderProps {
  user?: {
    name: string
    avatarUrl?: string
  }
  ticketCount?: number
}

export function Header({ user, ticketCount = 0 }: HeaderProps) {
  const { pathname } = useLocation()

  const initials = user?.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <header className="sticky flex h-16 border-b border-purple-900/30 bg-zinc-950 lg:justify-around">
      <div className="max-w-7xl flex items-center gap-4 justify-around w-full">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <svg viewBox="0 0 32 32" width="32" height="32">
            <polygon points="16,3 29,27 3,27" fill="transparent" stroke="#7C3AED" strokeWidth="2.5" strokeLinejoin="round" />
            <text x="16" y="23" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="700" fontFamily="sans-serif">EP</text>
          </svg>
          <span className="font-semibold tracking-wide text-white">
            Event<span className="text-purple-500">Place</span>
          </span>
        </Link>

        <div className="relative hidden flex-1  sm:block max-w-2xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 lg:width-full" />
          <Input
            placeholder="Buscar eventos, artistas..."
            className="h-9 border-white/10 bg-white/5 pl-9 text-sm text-white placeholder:text-white/30 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={pathname === '/eventos'
              ? 'text-purple-400 bg-purple-500/10 hover:bg-purple-500/15 hover:text-purple-300'
              : 'text-white/60 hover:text-white hover:bg-white/6'
            }
          >
            <Link to="/eventos">
              <CalendarDays className="h-4 w-4" />
              Eventos
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className={pathname === '/locais'
              ? 'text-purple-400 bg-purple-500/10 hover:bg-purple-500/15 hover:text-purple-300'
              : 'text-white/60 hover:text-white hover:bg-white/6'
            }
          >
            <Link to="/locais">
              <MapPin className="h-4 w-4" />
              Locais
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden border-purple-500/40 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300 sm:flex"
          >
            <Link to="/ingressos">
              <Ticket className="h-4 w-4" />
              Ingressos
              {ticketCount > 0 && (
                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                  {ticketCount}
                </span>
              )}
            </Link>
          </Button>

          <div className="hidden h-5 w-px bg-white/10 sm:block" />

          <Avatar className="h-9 w-9 cursor-pointer border-2 border-purple-500/40 transition-colors hover:border-purple-500">
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback className="bg-purple-950 text-sm font-semibold text-purple-300">
              {initials ?? 'EP'}
            </AvatarFallback>
          </Avatar>

          <Button variant="ghost" size="icon" className="text-white/60 sm:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}