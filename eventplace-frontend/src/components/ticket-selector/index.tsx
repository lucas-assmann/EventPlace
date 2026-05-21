import { Button } from '@/components/ui/button'
import { Ticket } from 'lucide-react'
import { useState } from 'react'
import { RadioGroupField, type RadioOption } from '../radio-group'

export interface TicketOption {
  id: string
  name: string
  price: number
  available: number
}

interface TicketSelectorProps {
  tickets: TicketOption[]
  onBuy?: (ticket: TicketOption) => void
}

export function TicketSelector({ tickets, onBuy }: TicketSelectorProps) {
  const [selected, setSelected] = useState(tickets[0].id)
  const selectedTicket = tickets.find((t) => t.id === selected)!

  const options: RadioOption[] = tickets.map((ticket) => ({
    id: ticket.id,
    label: ticket.name,
    description: `${ticket.available} disponíveis`,
    badge: `R$ ${ticket.price}`,
  }))

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/7 bg-zinc-900 p-5">
      <h2 className="text-base font-semibold text-white">Selecionar ingresso</h2>

      <RadioGroupField
        options={options}
        value={selected}
        onValueChange={setSelected}
      />

      <div className="border-t border-white/7 pt-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-white/50">Total</span>
          <span className="text-lg font-bold text-white">R$ {selectedTicket.price}</span>
        </div>
        <Button
          onClick={() => onBuy?.(selectedTicket)}
          className="w-full cursor-pointer bg-purple-600 font-semibold text-white hover:bg-purple-500"
        >
          <Ticket className="h-4 w-4" />
          Comprar ingresso
        </Button>
      </div>
    </div>
  )
}