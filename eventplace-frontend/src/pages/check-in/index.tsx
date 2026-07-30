import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import {
  Calendar,
  CircleCheckBig,
  DollarSign,
  Search,
  Ticket,
  User,
} from "lucide-react";
import { useState } from "react";

interface TicketData {
  id: string;
  buyerName: string;
  buyerEmail: string;
  ticketName: string;
  price: number;
  purchaseDate: string;
  entryStatus: "ENTERED" | "NOT_ENTERED";
}

export function CheckInPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<TicketData | null>(null);

  async function searchTicket() {
    if (!code.trim()) {
      alert("Digite o código do ingresso.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.get(`/ticket/checkin/${code}`);

      setTicket(data);
    } catch (err) {
      console.error(err);
      setTicket(null);
      alert("Ingresso não encontrado.");
    } finally {
      setLoading(false);
    }
  }

  async function confirmCheckin() {
    try {
      await api.post("/ticket/checkin", {
        entryCode: code,
      });

      alert("Check-in realizado com sucesso!");

      setTicket((old) =>
        old
          ? {
            ...old,
            entryStatus: "ENTERED",
          }
          : null
      );
    } catch (err) {
      console.error(err);
      alert("Erro ao realizar check-in.");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-purple-500/20 bg-purple-500/10">
            <Ticket className="h-10 w-10 text-purple-400" />
          </div>

          <h1 className="text-4xl font-bold text-white">
            Check-in do Evento
          </h1>

          <p className="mt-2 text-zinc-400">
            Digite o código do ingresso para validar a entrada.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 backdrop-blur">

          <div className="flex gap-3">

            <Input
              placeholder="Código do ingresso..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-12 border-zinc-800 bg-zinc-950 text-white"
            />

            <Button
              variant="event"
              onClick={searchTicket}
              disabled={loading}
              className="h-12 px-8 cursor-pointer"
            >
              <Search className="mr-2 h-4 w-4" />
              {loading ? "Buscando..." : "Buscar"}
            </Button>

          </div>

        </div>

        {ticket && (

          <div className="mt-8 rounded-3xl border border-purple-500/20 bg-zinc-900 p-8 shadow-xl">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-semibold text-white">
                Ingresso encontrado
              </h2>

              <Badge
                className={
                  ticket.entryStatus === "ENTERED"
                    ? "border-red-500/30 bg-red-500/15 text-red-300"
                    : "border-green-500/30 bg-green-500/15 text-green-300"
                }
              >
                {ticket.entryStatus === "ENTERED"
                  ? "UTILIZADO"
                  : "CONFIRMADO"}
              </Badge>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <div className="flex items-center gap-3">
                  <User className="text-purple-400" />
                  <div>
                    <p className="text-xs text-zinc-500">
                      Participante
                    </p>

                    <p className="font-medium text-white">
                      {ticket.buyerName}
                    </p>

                    <p className="text-xs text-zinc-500">
                      {ticket.buyerEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <div className="flex items-center gap-3">
                  <Ticket className="text-purple-400" />

                  <div>
                    <p className="text-xs text-zinc-500">
                      Ingresso
                    </p>

                    <p className="font-medium text-white">
                      {ticket.ticketName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="text-purple-400" />

                  <div>
                    <p className="text-xs text-zinc-500">
                      Valor
                    </p>

                    <p className="font-medium text-white">
                      R$ {Number(ticket.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-purple-400" />

                  <div>
                    <p className="text-xs text-zinc-500">
                      Data da compra
                    </p>

                    <p className="font-medium text-white">
                      {new Date(ticket.purchaseDate).toLocaleDateString(
                        "pt-BR",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <Button
              variant="event"
              className="mt-8 h-12 w-full text-base"
              disabled={ticket.entryStatus === "ENTERED"}
              onClick={confirmCheckin}
            >
              <CircleCheckBig className="mr-2 h-5 w-5" />

              {ticket.entryStatus === "ENTERED"
                ? "Ingresso já utilizado"
                : "Liberar Entrada"}
            </Button>

          </div>

        )}
      </div>
    </div>
  );
}