import { EventCard } from "@/components/event-card";
import { EventCardSkeleton } from "@/components/skeleton/card-skeleton.index";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import type { EventDTO } from "@/interface/event-interface";
import api from "@/lib/api";
import { useEffect, useState } from "react";

export function Home() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventDTO[]>([]);

  useEffect(() => {
    api.get<EventDTO[]>("/event")
      .then((response) => setEvents(response.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950">
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="ml-3 border-b-2 border-purple-500/50 pb-3">
          <TypographyH1 className="w-full font-bold text-white">
            Eventos em{" "}
            <span className="text-[56px] font-bold text-[#7C3AED]">
              destaque
            </span>
          </TypographyH1>
        </div>

        {loading ? (
          <div className="mt-6 ml-2 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="mt-6 ml-2 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex justify-center">
            <TypographyP className="text-lg text-zinc-400">
              Nenhum evento disponível.
            </TypographyP>
          </div>
        )}
      </main>
    </div>
  );
}