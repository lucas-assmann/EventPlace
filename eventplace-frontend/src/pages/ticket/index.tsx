import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";

import type { TicketTypeDTO } from "@/interface/ticket-interface";
import api from "@/lib/api";

import { TicketCardSkeleton } from "@/components/skeleton/ticket-skeleton.index";
import { TicketCard } from "@/components/ticket";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

export function TicketsPage() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<TicketTypeDTO[]>([]);

  const [showFilters, setShowFilters] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [entryFilter, setEntryFilter] = useState("ALL");

  useEffect(() => {
    let ignore = false;

    async function fetchTickets() {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        if (search)
          params.append("q", search);

        if (statusFilter !== "ALL")
          params.append("status", statusFilter);

        if (entryFilter !== "ALL")
          params.append("entryStatus", entryFilter);

        const response = await api.get<TicketTypeDTO[]>(
          `/ticket/my?${params.toString()}`
        );

        if (!ignore) {
          setTickets(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchTickets();

    return () => {
      ignore = true;
    };
  }, [search, statusFilter, entryFilter]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <TypographyH1 className="border-b-2 border-purple-500/50 pb-3 font-bold text-white">
        Meus ingressos
      </TypographyH1>

      <div className="mt-6">

        <div className="flex flex-col gap-4 md:flex-row md:items-center">

          <div className="relative flex-1">

            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              size={18}
            />

            <Input
              placeholder="Pesquisar evento ou ingresso..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />

          </div>

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
          <div className="relative z-50 mt-3 rounded-2xl border border-purple-500/20 bg-zinc-900/95 p-4 shadow-2xl">
            <div className="flex flex-wrap items-end gap-4">

              <div className="min-w-48">

                <p className="mb-1 text-xs font-medium text-zinc-400">
                  Status do pagamento
                </p>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-white outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="ALL">
                    Todos
                  </option>

                  <option value="CONFIRMED">
                    Confirmado
                  </option>

                  <option value="PENDING">
                    Pendente
                  </option>

                </select>

              </div>

              <div className="min-w-48">

                <p className="mb-1 text-xs font-medium text-zinc-400">
                  Entrada
                </p>

                <select
                  value={entryFilter}
                  onChange={(e) => setEntryFilter(e.target.value)}
                  className="h-10 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-white outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="ALL">
                    Todos
                  </option>

                  <option value="NOT_ENTERED">
                    Não utilizado
                  </option>

                  <option value="ENTERED">
                    Utilizado
                  </option>

                </select>

              </div>

              <div className="ml-auto flex gap-2">

                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("ALL");
                    setEntryFilter("ALL");
                  }}
                >
                  Limpar
                </Button>

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

      <div className="mt-6 flex flex-col gap-4">

        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <TicketCardSkeleton key={i} />
            ))}
          </div>
        ) : tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              {...ticket}
            />
          ))
        ) : (
          <TypographyP className="py-10 text-center text-zinc-400">
            Nenhum ingresso encontrado.
          </TypographyP>
        )}

      </div>
    </main>
  );
}