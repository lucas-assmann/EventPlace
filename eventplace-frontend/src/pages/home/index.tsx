import { EventCard } from "@/components/event-card";
import { TypographyH1 } from "@/components/ui/typography";
import type { EventDTO } from "@/interface/event-interface";
import api from "@/lib/api";
import { useState } from "react";

export function Home() {
  const [loading, setLoading] = useState(true);

  const [events, setEvents] = useState<EventDTO[]>([]);

  api.get<EventDTO[]>('/event')
    .then(response => {
      console.log(JSON.stringify(response.data, null, 2))
      setEvents(response.data)
    })
    .catch(console.error)
    .finally(() => setLoading(false));

  return (
    <div className="min-h-screen bg-zinc-950">
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="ml-3 border-b-2 border-purple-500/50 pb-3">
          <TypographyH1 className="font-bold text-white w-full">
            Eventos em <span className="text-[#7C3AED] font-bold text-[56px]">destaque</span>
          </TypographyH1>
          <p className="mt-1 text-sm text-white/40">Os melhores eventos perto de você</p>
        </div>

        {loading ? (
          <p className="text-white/40 mt-6">Carregando eventos...</p>
        ) : (
          <div className="grid grid-cols-2 ml-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 mt-6">
            {events.map((event) => <EventCard key={event.id} {...event} />)}
          </div>
        )}
      </main>
    </div>
  );
}