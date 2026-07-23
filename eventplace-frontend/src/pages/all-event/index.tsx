import { EventCard } from "@/components/event-card";
import { EventCardSkeleton } from "@/components/skeleton/card-skeleton.index";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import type { EventDTO } from "@/interface/event-interface";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function AllEvents() {
  const [searchParams] = useSearchParams();
  const termo = searchParams.get("q") || "";

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventDTO[]>([]);

  useEffect(() => {
  let ignore = false;

  async function fetchEvents() {
    setLoading(true);
    try {
      const response = await api.get<EventDTO[]>(
        `/event${termo ? `?q=${encodeURIComponent(termo)}` : ""}`
      );
      if (!ignore) setEvents(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      if (!ignore) setLoading(false);
    }
  }

  fetchEvents();

  return () => {
    ignore = true;
  };
}, [termo]);

  return (
    <div className="min-h-screen bg-zinc-950">
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="ml-3 border-b-2 border-purple-500/50 pb-3">
          <TypographyH1 className="w-full font-bold text-white">
            {termo ? (
              <>
                Resultados para{" "}
                <span className="text-[56px] font-bold text-[#7C3AED]">
                  "{termo}"
                </span>
              </>
            ) : (
              <>
                Eventos em{" "}
                <span className="text-[56px] font-bold text-[#7C3AED]">
                  destaque
                </span>
              </>
            )}
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
              {termo
                ? `Nenhum evento encontrado para "${termo}".`
                : "Nenhum evento disponível."}
            </TypographyP>
          </div>
        )}
      </main>
    </div>
  );
}