import { EventBanner } from '@/components/event-banner'
import { EventHeader } from '@/components/event-header'
import { TicketSelector } from '@/components/ticket-selector'

const event = {
  title: 'Noite de Jazz & Blues',
  category: 'Música',
  description: 'Uma noite incrível com os melhores músicos de jazz e blues do Brasil. Prepare-se para uma experiência única com artistas renomados, drinks especiais e um ambiente intimista que só o Blue Note SP oferece.',
  banner: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1200&auto=format&fit=crop&q=80',
  date: '28 Jun 2025 · 21h00',
  location: 'Blue Note SP, Vila Olímpia, São Paulo',
  author: { name: 'Blue Note SP', avatarUrl: '' },
  tickets: [
    { id: '1', name: 'Pista', price: 80, available: 142 },
    { id: '2', name: 'VIP', price: 180, available: 40 },
    { id: '3', name: 'Camarote', price: 320, available: 12 },
  ],
}

export function EventPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <EventBanner src={event.banner} alt={event.title} />

      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-8">
        <EventHeader
          title={event.title}
          date={event.date}
          location={event.location}
          author={event.author}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">Sobre o evento</h2>
            <p className="leading-7 text-white/60">{event.description}</p>
          </div>

          <TicketSelector
            tickets={event.tickets}
            onBuy={(ticket) => console.log('comprou:', ticket)}
          />
        </div>
      </main>
    </div>
  )
}