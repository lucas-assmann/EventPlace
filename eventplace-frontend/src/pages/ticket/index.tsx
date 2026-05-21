import { TicketCard, type TicketCardProps } from "@/components/ticket"
import { TypographyH1 } from "@/components/ui/typography"


const tickets: TicketCardProps[] = [
  { id: '1', name: 'Pista', event: 'Noite de Jazz & Blues', date: '28 Jun 2025 · 21h00', status: 'ativo' },
  { id: '2', name: 'VIP', event: 'Brasil Game Show 2025', date: '10 Jul 2025 · 10h00', status: 'ativo' },
  { id: '3', name: 'Pista', event: 'Festival Eletrônico Universo', date: '15 Jul 2025 · 18h00', status: 'usado' },
  { id: '4', name: 'Camarote', event: 'Festival da Gastronomia Paulistana', date: '22 Jul 2025 · 12h00', status: 'cancelado' },
]

export function TicketsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <TypographyH1 className="font-bold text-white border-b-2 border-purple-500/50 pb-3">Meus ingressos</TypographyH1>
      <div className="flex flex-col gap-4">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} {...ticket} />
        ))}
      </div>
    </main>
  )
}