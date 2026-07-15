import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin } from 'lucide-react'

interface EventHeaderProps {
  title: string
  category?: string
  date: string
  location: string
  cellphone: string
  author: { name: string; avatar?: string }
}

export function EventHeader({ title, category, date, location, cellphone, author }: EventHeaderProps) {
  return (
    <div className="relative z-10 mb-5">
      <div className="-mt-6">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-white/50">
            <Calendar className="h-4 w-4 shrink-0" />
            {new Date(date).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-white/50">
            <MapPin className="h-4 w-4 shrink-0" />
            {location}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Avatar className="h-6 w-6 border border-purple-500/30">
          <AvatarImage src={author?.avatar} />
          <AvatarFallback className="bg-purple-950 text-[10px] text-purple-300">
            {author?.name?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
        <span className="text-xs text-white/40">
          por <span className="text-white/60">{author.name}</span>
        </span>
        <span className="text-xs text-white/40">•</span>
        <span className="text-xs text-white/40">{cellphone}</span>
      </div>
      {category && (
        <Badge variant="outline" className="mb-3 border-purple-500/20 bg-purple-500/10 text-purple-400 mt-5">
          {category}
        </Badge>
      )}
    </div>
  )
}