import { EventArtists } from '@/components/event-artist'
import { EventHeader } from '@/components/event-header'
import { EventSkeleton } from '@/components/skeleton/event-skeleton.index'
import { TicketSelector } from '@/components/ticket-selector'
import type { EventDTO } from '@/interface/event-interface'
import api from '@/lib/api'
import { Info, Ticket } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function EventPage() {
  const { id } = useParams()

  const [event, setEvent] = useState<EventDTO | null>(null)

  useEffect(() => {
    api.get(`/event/${id}`).then(response => setEvent(response.data))
  }, [id])

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <EventSkeleton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {event.banner ? (
        <img src={event.banner} alt={event.title} className="h-50 w-full object-cover" />
      ) : (
        <div className="flex h-55 w-full items-center justify-center bg-linear-to-br from-zinc-900 to-purple-950/50">
          <Ticket className="h-12 w-12 text-purple-400/30" />
        </div>
      )}

      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-8">

        <div className="mt-6 flex flex-row justify-between">
          <div>
            <EventHeader
              title={event.title}
              date={event.date}
              location={event.localization?.[0] ? `${event.localization[0].street}, ${event.localization[0].city}` : 'Local não informado'}
              author={event.user ?? { name: 'Desconhecido' }}
              category={event.appropriate_age}
              cellphone={event.cellphone}
            />
            <div>
              <EventArtists
                artists={(event.artists ?? []).map(({ id, artist }) => ({
                  id,
                  name: artist.name,
                  username: artist.username,
                  avatar: artist.avatar,
                }))}
              />
              <div className="mt-10">
                <div className="mb-5 flex items-center gap-2 text-lg font-semibold text-white">
                  <Info className="h-4 w-4 text-purple-400" />
                  <h2>Sobre o evento</h2>
                </div>
                <p className="leading-7 text-white/60">{event.description}</p>
              </div>
            </div>
          </div>

          <div className="lg:w-110">
            <TicketSelector
              tickets={event.ticketType.map(t => ({
                id: t.id,
                name: t.name,
                price: Number(t.price),
                available: t.quantity,
              }))}
              onBuy={(ticket) => console.log('comprou:', ticket)}
            />
          </div>
        </div>
      </main>
    </div>
  )
}