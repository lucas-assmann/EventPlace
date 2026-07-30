import api from "@/lib/api";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  Calendar,
  Search,
  Ticket,
  Users
} from "lucide-react";
import { EventCheckinSkeleton } from "@/components/skeleton/event-checkin.index";

interface CheckinUser {
  id: string;
  createdAt: string;

  user: {
    name: string;
    email: string;
  };

  ticketType: {
    name: string;
  };
}

export function EventCheckinsPage() {
  const { eventId } = useParams();

  const [users, setUsers] = useState<CheckinUser[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const { data } = await api.get(
          `/ticket/checkin/event/${eventId}`
        );

        setUsers(data);
      } finally {
        setLoading(false);
      }
    }

    if (eventId) {
      load();
    }
  }, [eventId]);


  const filtered = useMemo(() => {
    return users.filter((user) =>
      user.user.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, users]);

  return (
    <div className="min-h-screen bg-zinc-950 px-8 py-10">

      <div className="mx-auto max-w-5xl">

        <div className="mb-8">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-purple-500/20 bg-purple-500/10">

            <Users className="h-8 w-8 text-purple-400" />

          </div>

          <h1 className="text-4xl font-bold text-white">
            Check-ins realizados
          </h1>

          <p className="mt-2 text-zinc-400">
            {users.length} participantes já entraram no evento.
          </p>

        </div>

        <div className="relative mb-8">

          <Search className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar participante..."
            className="h-12 border-zinc-800 bg-zinc-900 pl-12 text-white"
          />

        </div>

        <div className="space-y-4">

          <div className="space-y-4">

            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <EventCheckinSkeleton key={index} />
              ))
            ) : (
              filtered.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-purple-500/30"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {ticket.user.name}
                      </h2>

                      <p className="text-sm text-zinc-500">
                        {ticket.user.email}
                      </p>
                    </div>

                    <Badge className="border-green-500/30 bg-green-500/10 text-green-400">
                      Entrou
                    </Badge>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-8 text-sm text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Ticket size={16} />
                      {ticket.ticketType.name}
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {new Date(ticket.createdAt).toLocaleString("pt-BR")}
                    </div>
                  </div>
                </div>
              ))
            )}

          </div>

        </div>

      </div>

    </div>
  );
}