import { MyEventCard } from "@/components/my-event-card";
import { EventCardSkeleton } from "@/components/skeleton/card-skeleton.index";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import type { EventDTO } from "@/interface/event-interface";
import api from "@/lib/api";
import { useEffect, useState } from "react";

export function MyEvent() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventDTO[]>([]);

  const priority: Record<string, number> = {
    ONGOING: 0,
    WILL_HAPPEN: 1,
    FINISHED: 2,
  };

  const sortedEvents = [...events].sort(
    (a, b) => (priority[a.status] ?? 999) - (priority[b.status] ?? 999)
  );

  useEffect(() => {
    api
      .get<EventDTO[]>("/event/my")
      .then((response) => setEvents(response.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function deleteEvent(id: string) {
    try {
      await api.delete(`/event/${id}`);

      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  const handleStart = async (id: string) => {
    try {
      await api.patch(`/event/${id}/start`);

      setEvents((prev) =>
        prev.map((event) =>
          event.id === id
            ? {
              ...event,
              status: "ONGOING",
            }
            : event
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinish = async (id: string) => {
    try {
      await api.patch(`/event/${id}/finish`);

      setEvents((prev) =>
        prev.map((event) =>
          event.id === id
            ? {
              ...event,
              status: "FINISHED",
            }
            : event
        )
      );
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="min-h-screen bg-zinc-950">
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="ml-3 border-b-2 border-purple-500/50 pb-3">
          <TypographyH1 className="font-bold text-white">
            Meus{" "}
            <span className="text-[56px] font-bold text-[#7C3AED]">
              eventos
            </span>
          </TypographyH1>

          <TypographyP className="mt-2 text-zinc-400">
            Gerencie seus eventos, acompanhe o andamento e controle o início e o encerramento.
          </TypographyP>
        </div>

        {loading ? (
          <div className="mt-6 ml-2 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="mt-6 ml-2 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sortedEvents.map((event) => (
              <MyEventCard
                key={event.id}
                {...event}
                onStart={handleStart}
                onFinish={handleFinish}
                onDelete={deleteEvent}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex justify-center">
            <TypographyP className="text-lg text-zinc-400">
              Você ainda não criou nenhum evento.
            </TypographyP>
          </div>
        )}
      </main>
    </div>
  );
}