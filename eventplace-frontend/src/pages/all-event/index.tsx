import { EventCard } from "@/components/event-card";
import { EventCardSkeleton } from "@/components/skeleton/card-skeleton.index";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import type { EventDTO } from "@/interface/event-interface";
import api from "@/lib/api";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function AllEvents() {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const termo = searchParams.get("q") || "";

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [ageFilter, setAgeFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("DATE");

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventDTO[]>([]);

  useEffect(() => {
    let ignore = false;

    async function fetchEvents() {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        if (termo)
          params.append("q", termo);

        if (statusFilter !== "ALL")
          params.append("status", statusFilter);

        if (ageFilter !== "ALL")
          params.append("age", ageFilter);

        if (sortBy)
          params.append("sort", sortBy);

        const response = await api.get<EventDTO[]>(
          `/event?${params.toString()}`
        );

        if (!ignore)
          setEvents(response.data);

      } finally {
        if (!ignore)
          setLoading(false);
      }
    }

    fetchEvents();

    return () => {
      ignore = true;
    };

  }, [termo, statusFilter, ageFilter, sortBy]);

  const filteredEvents = [...events]
    .filter((event) => {
      if (
        statusFilter !== "ALL" &&
        event.status !== statusFilter
      )
        return false;

      if (
        ageFilter !== "ALL" &&
        event.appropriate_age !== ageFilter
      )
        return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "DATE") {
        return (
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
        );
      }

      return a.title.localeCompare(b.title);
    });

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

        <div className="mt-6">

          <div className="flex justify-end">
            <Button
              variant="event"
              onClick={() => setShowFilters(!showFilters)}
              className="cursor-pointer rounded-xl shadow-none"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>

          {showFilters && (
            <div className="mt-3 rounded-2xl border border-purple-500/20 bg-zinc-900/95 p-4">

              <div className="flex flex-wrap items-end gap-4">

                <div className="min-w-40">
                  <p className="mb-1 text-xs font-medium text-zinc-400">
                    Status
                  </p>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-10 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-white outline-none focus:border-purple-500"
                  >
                    <option value="ALL">Todos</option>
                    <option value="WILL_HAPPEN">Em breve</option>
                    <option value="ONGOING">Em andamento</option>
                  </select>
                </div>

                <div className="min-w-40">
                  <p className="mb-1 text-xs font-medium text-zinc-400">
                    Idade
                  </p>

                  <select
                    value={ageFilter}
                    onChange={(e) => setAgeFilter(e.target.value)}
                    className="h-10 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-white outline-none focus:border-purple-500"
                  >
                    <option value="ALL">Todas</option>
                    <option value="FREE">Livre</option>
                    <option value="ADULT">18+</option>
                  </select>
                </div>

                <div className="min-w-40">
                  <p className="mb-1 text-xs font-medium text-zinc-400">
                    Ordenar
                  </p>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-10 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-white outline-none focus:border-purple-500"
                  >
                    <option value="DATE">Mais próximos</option>
                    <option value="NAME">A → Z</option>
                  </select>
                </div>

                <div className="ml-auto flex gap-2">

                  <Button
                    variant="event"
                    className="cursor-pointer"
                    onClick={() => setShowFilters(false)}
                  >
                    Fechar
                  </Button>
                </div>

              </div>

            </div>
          )}

        </div>

        {loading ? (
          <div className="mt-6 ml-2 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="mt-6 ml-2 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredEvents.map((event) => (
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