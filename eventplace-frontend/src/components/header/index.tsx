import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { UserDTO } from '@/interface/user-interface'
import api from '@/lib/api'
import { CalendarDays, MapPin, Menu, PlusCircle, Search, Ticket } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DropdownAvatar } from '../dropdown-avatar'
import { Logo } from '../logo'

export function Header() {
  const { pathname } = useLocation()
  const [userData, setUserData] = useState<UserDTO | null>(null);

  const ticketsCount = userData?.tickets?.length ?? 0

  useEffect(() => {
    api.get<UserDTO>('/user')
      .then(response => setUserData(response.data))
      .catch(console.error)
  }, [])

  const initials = userData?.name
    ? userData.username
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
    : ''

  return (
    <header className="sticky flex h-16 border-b border-purple-900/30 bg-zinc-950 lg:justify-around">
      <div className="max-w-7xl flex items-center gap-4 justify-around w-full">
        <Logo />

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
            className={pathname === '/new-event'
              ? 'text-purple-400 bg-purple-500/10 hover:bg-purple-500/15 hover:text-purple-300'
              : 'text-white/60 hover:text-white hover:bg-white/6'
            }
          >
            <Link to="/new-event">
              <PlusCircle className="h-4 w-4" />
              Criar Evento
            </Link>
          </Button>

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
            <Link to="/ticket">
              <Ticket className="h-4 w-4" />
              Ingressos
              {ticketsCount > 0 && (
                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                  {ticketsCount}
                </span>
              )}
            </Link>
          </Button>

          <div className="hidden h-5 w-px bg-white/10 sm:block" />

          <DropdownAvatar>
            <Avatar className="border-white/10 bg-white/5 cursor-pointer">
              {userData?.avatar ? (
                <AvatarImage
                  src={userData.avatar}
                  alt={userData.name}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="bg-gray-900 border-2 border-[#7C3AED]">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
          </DropdownAvatar>
          <Button variant="ghost" size="icon" className="text-white/60 sm:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}