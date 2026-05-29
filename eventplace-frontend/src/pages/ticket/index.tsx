import { TicketCardSkeleton } from "@/components/skeleton/ticket-skeleton.index";
import { TicketCard } from "@/components/ticket";
import { TypographyH1 } from "@/components/ui/typography";
import type { TicketTypeDTO } from "@/interface/ticket-interface";
import api from "@/lib/api";
import { useEffect, useState } from "react";

export function TicketsPage() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<TicketTypeDTO[]>([]);

  useEffect(() => {
    api.get<TicketTypeDTO[]>('/ticket/my')
      .then(response => setTickets(response.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <TypographyH1 className="font-bold text-white border-b-2 border-purple-500/50 pb-3">Meus ingressos</TypographyH1>
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <TicketCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          tickets.map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} />
          ))
        )}
      </div>
    </main>
  )
}