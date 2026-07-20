import type { TicketTypeDTO } from '@/interface/ticket-interface'
import { Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'
import { TypographyP } from '../ui/typography'

export function TicketCard({ ticketType, status, createdAt }: TicketTypeDTO) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/7 bg-zinc-950 px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-500/40 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 hrink-0 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10">
          <Ticket className="h-5 w-5 text-purple-400" />
        </div>
        <div className="flex flex-col gap-0.5">
          <TypographyP className="text-sm font-semibold text-white">{ticketType.name}</TypographyP>
          <TypographyP className="text-xs text-white/40">{ticketType.event.title}</TypographyP>
        </div>
      </div>

      <div className="flex items-center gap-6">

        <div className="hidden flex-col items-end gap-0.5 sm:flex border-r-2 border-white/10 pr-6 h-10">
          <TypographyP className="text-[10px] uppercase tracking-widest text-white/30">Data do Evento</TypographyP>
          <TypographyP className="text-xs text-white/60">{new Date(ticketType.event.date).toLocaleDateString('pt-BR')}</TypographyP>
        </div>

        <div className="hidden flex-col items-end gap-0.5 sm:flex border-r-2 border-white/10 pr-6 h-10">
          <TypographyP className="text-[10px] uppercase tracking-widest text-white/30 ">Emitido em</TypographyP>
          <TypographyP className="text-xs text-white/60">{new Date(createdAt).toLocaleDateString('pt-BR')}</TypographyP>
        </div>

        <div className="hidden flex-col items-end gap-0.5 sm:flex">
          <TypographyP className="text-[10px] uppercase tracking-widest text-white/30">Status</TypographyP>
          <Badge
            variant={
              status === "CONFIRMED"
                ? "success"
                : status === "CANCELLED"
                  ? "destructive"
                  : "warning"
            }
          >
            {status === "CONFIRMED"
              ? "Confirmado"
              : status === "CANCELLED"
                ? "Cancelado"
                : "Pendente"}
          </Badge>
        </div>

      </div>

      <Link to={`/event/${ticketType.event.id}`} className="absolute inset-0" />
    </div>
  )
}