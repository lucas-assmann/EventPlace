import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, MapPin, Star, Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export interface EventCardProps {
  id: string
  title: string
  category: string
  location: string
  date: string
  ticketsAvailable: number
  imageUrl?: string
  author: {
    name: string
    avatarUrl?: string
    rating?: number
  }
}

export function EventCard({ id, title, category, location, date, ticketsAvailable, imageUrl, author }: EventCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/7 bg-zinc-950 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-500/40 cursor-pointer">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="h-50 w-full object-cover" />
      ) : (
        <div className="flex h-55 w-full items-center justify-center bg-linear-to-br from-zinc-900 to-purple-950/50">
          <Ticket className="h-12 w-12 text-purple-400/30" />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="w-fit rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-medium text-purple-400">
          {category}
        </span>

        <p className="font-semibold leading-tight text-white">{title}</p>

        <div className="flex items-center gap-1.5 text-xs text-white/40">
          <MapPin className="h-3 w-3 shrink-0" />
          {location}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-white/35">
          <Calendar className="h-3 w-3 shrink-0" />
          {date}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Avatar className="h-5 w-5">
            <AvatarImage src={author.avatarUrl} />
            <AvatarFallback className="bg-purple-950 text-[9px] text-purple-300">
              {author.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2 justify-between w-full">
            <span className="text-xs text-white/40">{author.name}</span>
            <span className="ml-auto text-xs text-white/30 flex items-center gap-2"> {author.rating ? author.rating.toFixed(1) : 'N/A'} <Star className="text-yellow-400" /></span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/6 pt-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-widest text-white/30">Ingressos</span>
            <span className="text-sm font-medium text-white">{ticketsAvailable.toLocaleString('pt-BR')} disponíveis</span>
          </div>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-purple-500/40 bg-purple-500/10 text-xs text-purple-400 hover:bg-purple-500/25 hover:text-purple-300"
          >
            <Link to={`/eventos/${id}`}>
              <ArrowRight className="h-3 w-3" />
              Acessar
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}