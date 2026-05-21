import { EventCard, type EventCardProps } from "@/components/event-card";
import { TypographyH1 } from "@/components/ui/typography";

const events: EventCardProps[] = [
  { id: '1', title: 'Noite de Jazz & Blues', category: 'Música', location: 'Blue Note SP, São Paulo', date: '28 Jun 2025 · 21h00', ticketsAvailable: 142, imageUrl: "https://plus.unsplash.com/premium_photo-1680404114169-e254afa55a16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGlua3xlbnwwfHwwfHx8MA%3D%3D", author: { name: 'Blue Note SP', rating: 4, avatarUrl: '/avatars/bluenote.jpg' } },
  { id: '2', title: 'Brasil Game Show 2025', category: 'Games', location: 'Expo Center Norte, SP', date: '10 Jul 2025 · 10h00', ticketsAvailable: 2340, author: { name: 'Blue Note SP', rating: 4.5, avatarUrl: '/avatars/bluenote.jpg' }, imageUrl: "https://images.unsplash.com/photo-1605701250441-2bfa95839417?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", },
  { id: '3', title: 'Festival Eletrônico Universo', category: 'Show', location: 'Allianz Parque, SP', date: '15 Jul 2025 · 18h00', ticketsAvailable: 890, author: { name: 'Blue Note SP', rating: 4.2, avatarUrl: '/avatars/bluenote.jpg' } },
  { id: '4', title: 'Festival da Gastronomia Paulistana', category: 'Gastronomia', location: 'Ibirapuera, SP', date: '22 Jul 2025 · 12h00', ticketsAvailable: 560, author: { name: 'Blue Note SP', rating: 4.7, avatarUrl: '/avatars/bluenote.jpg' } },
  { id: '1', title: 'Noite de Jazz & Blues', category: 'Música', location: 'Blue Note SP, São Paulo', date: '28 Jun 2025 · 21h00', ticketsAvailable: 142, author: { name: 'Blue Note SP', rating: 4, avatarUrl: '/avatars/bluenote.jpg' } },
  { id: '2', title: 'Brasil Game Show 2025', category: 'Games', location: 'Expo Center Norte, SP', date: '10 Jul 2025 · 10h00', ticketsAvailable: 2340, author: { name: 'Blue Note SP', rating: 4.5 } },
  { id: '3', title: 'Festival Eletrônico Universo', category: 'Show', location: 'Allianz Parque, SP', date: '15 Jul 2025 · 18h00', ticketsAvailable: 890, author: { name: 'Blue Note SP', rating: 4.2, avatarUrl: '/avatars/bluenote.jpg' } },
  { id: '4', title: 'Festival da Gastronomia Paulistana', category: 'Gastronomia', location: 'Ibirapuera, SP', date: '22 Jul 2025 · 12h00', ticketsAvailable: 560, author: { name: 'Blue Note SP', rating: 4.7, avatarUrl: '/avatars/bluenote.jpg' } },
]


export function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="ml-3 border-b-2 border-purple-500/50 pb-3">
          <TypographyH1 className="font-bold text-white w-full">Eventos em <span className="text-[#7C3AED] font-bold text-[56px]">destaque</span></TypographyH1>
          <p className="mt-1 text-sm text-white/40">Os melhores eventos perto de você</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 mt-6">
          {events.map((event) => <EventCard key={event.id} {...event} />)}
        </div>
      </main>
    </div>
  )
}