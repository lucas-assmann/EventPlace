import { Button } from '@/components/ui/button'
import type { EventDTO } from '@/interface/event-interface'
import { ArrowRight, Calendar, MapPin, Star, Ticket, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TypographyP } from '../ui/typography'

export function EventCard({ id, title, appropriate_age, localization, date, ticketType, banner, user }: EventDTO) {

  const totalTickets = ticketType?.reduce(
    (acc, ticket) => acc + ticket.quantity,
    0
  ) ?? 0

  return (
    <Link to={`/event/${id}`} className="group flex flex-col overflow-hidden rounded-2xl border border-white/7 bg-zinc-950 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-500/40 cursor-pointer">
      <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/7 bg-zinc-950 ">
        {banner ? (
          <img
            src={banner}
            alt={title}
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-linear-to-br from-zinc-900 to-purple-950/50">
            <Ticket className="h-12 w-12 text-purple-400/30" />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-2 p-4">
          <TypographyP className="w-fit rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-400">
            {appropriate_age}
          </TypographyP>

          <TypographyP className="font-bold text-white text-xl">{title}</TypographyP>

          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <MapPin className="h-3 w-3" />
            {localization?.[0]
              ? `${localization[0].street}, ${localization[0].city}`
              : 'Local não informado'}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-white/35">
            <Calendar className="h-3 w-3" />
            {new Date(date).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-white/35">
              <User className="h-3 w-3" />
              <TypographyP className="text-xs text-white/40">
                {user?.username ?? 'Usuário não informado'}
              </TypographyP>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-white/35">
              <TypographyP className="text-xs text-white/40">
                {user?.rating ?? '5.0'}
              </TypographyP>
              <Star className="h-4 w-4 text-yellow-400" />

            </div>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-white/6 pt-2">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-white/30">Ingressos</span>
              <span className="text-sm font-medium text-white">{totalTickets.toLocaleString('pt-BR')} disponíveis</span>
            </div>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-purple-500/40 bg-purple-500/10 text-xs text-purple-400 hover:bg-purple-500/25 hover:text-purple-300"
            >
              <Link to={`/event/${id}`}>
                <ArrowRight className="h-3 w-3" />
                Acessar
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}