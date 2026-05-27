import type { TicketDTO, TicketTypeDTO } from '@/interface/ticket-interface'
import { Ticket } from 'lucide-react'

export function TicketCard({ id }: TicketDTO) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/7 bg-zinc-950 px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-500/40 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 hrink-0 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10">
          <Ticket className="h-5 w-5 text-purple-400" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-white">{id.name}</span>
          <span className="text-xs text-white/40">{id.event}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden flex-col items-end gap-0.5 sm:flex">
          <span className="text-[10px] uppercase tracking-widest text-white/30">Data</span>
          <span className="text-xs text-white/60">{id.date}</span>
        </div>
      </div>
    </div>
  )
}