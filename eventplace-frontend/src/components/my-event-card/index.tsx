import { Button } from "@/components/ui/button";
import type { EventDTO } from "@/interface/event-interface";
import {
  Calendar,
  CheckCircle,
  CircleCheckBig,
  MapPin,
  Play,
  Square,
  Ticket,
  Trash2,
  TriangleAlert,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DialogDemo } from "../dialog";
import { Badge } from "../ui/badge";
import { TypographyP } from "../ui/typography";

interface MyEventCardProps extends EventDTO {
  onStart: (id: string) => void;
  onFinish: (id: string) => void;
  onDelete: (id: string) => void;
}

export function MyEventCard({
  id,
  title,
  appropriate_age,
  localization,
  date,
  ticketType,
  banner,
  max_person_quantity,
  status,
  onStart,
  onFinish,
  onDelete,
  totalCheckins,
}: MyEventCardProps) {
  const [openStart, setOpenStart] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);

  const availableTickets =
    ticketType?.reduce((acc, ticket) => acc + ticket.quantity, 0) ?? 0;

  const isFinished = status === "FINISHED";

  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-200 ${isFinished
        ? "border-zinc-800 bg-zinc-950 opacity-70 grayscale"
        : "border-white/7 bg-zinc-950 hover:-translate-y-0.5 hover:border-purple-500/40"
        }`}
    >
      {banner ? (
        <img
          src={banner}
          alt={title}
          className={`h-48 w-full object-cover transition-all duration-300 ${isFinished ? "brightness-50 grayscale" : ""
            }`}
        />
      ) : (
        <div
          className={`flex h-48 w-full items-center justify-center bg-linear-to-br from-zinc-900 to-purple-950/50 ${isFinished ? "brightness-75" : ""
            }`}
        >
          <Ticket className="h-12 w-12 text-purple-400/30" />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex gap-2">
          <Badge className="border border-purple-500/20 bg-purple-500/10 text-purple-400">
            {appropriate_age === "ADULT" ? "18+" : "Livre"}
          </Badge>

          <Badge
            variant={
              status === "WILL_HAPPEN"
                ? "willHappen"
                : status === "ONGOING"
                  ? "ongoing"
                  : "finished"
            }
          >
            {status === "WILL_HAPPEN"
              ? "Em breve"
              : status === "ONGOING"
                ? "Em andamento"
                : "Encerrado"}
          </Badge>
        </div>

        <TypographyP className="text-xl font-bold text-white">
          {title}
        </TypographyP>

        <div className="flex items-center gap-1.5 text-xs text-white/40">
          <MapPin className="h-3 w-3" />
          {localization?.[0]
            ? `${localization[0].street}, ${localization[0].city}`
            : "Local não informado"}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-white/35">
          <Calendar className="h-3 w-3" />
          {new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-white/35">
          <Ticket className="h-3 w-3" />
          {max_person_quantity} capacidade máxima
        </div>

        <div className="flex items-center gap-1.5 text-xs text-white/35">
          <CheckCircle className="h-3 w-3" />
          <TypographyP className="text-xs text-white/40">
            {availableTickets} ingressos disponíveis
          </TypographyP>
        </div>

        <div className="flex items-center gap-2 text-xs text-white/40">
          <CircleCheckBig className="h-3 w-3 text-green-400" />
          {totalCheckins} check-ins realizados
        </div>

        <div className="mt-auto border-t border-white/6 pt-3">
          {status === "WILL_HAPPEN" && (
            <div className="flex gap-2">
              <Button
                onClick={() => setOpenStart(true)}
                className="flex-1 cursor-pointer bg-purple-600 hover:bg-purple-700"
              >
                <Play className="mr-2 h-4 w-4" />
                Iniciar
              </Button>

              <Button
                variant="destructive"
                className="flex-1 cursor-pointer"
                onClick={() => setOpenDelete(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </Button>
            </div>
          )}

          {status === "ONGOING" && (
            <div className="flex gap-2">
              <div className="flex gap-2">

                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-purple-500/40 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 hover:text-white"
                >
                  <Link to={`/event/checkins/${id}`}>
                    <Users className="mr-2 h-4 w-4" />
                    Ver check-ins
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-purple-500/40 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 hover:text-white"
                >
                  <Link to={`/ticket/check-in/${id}`}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Check-in
                  </Link>
                </Button>

              </div>

              <Button
                onClick={() => setOpenFinish(true)}
                className="flex-1 bg-red-600 hover:bg-red-700 cursor-pointer"
              >
                <Square className="mr-2 h-4 w-4" />
                Finalizar
              </Button>
            </div>
          )}

          {status === "FINISHED" && (
            <Button
              disabled
              className="w-full cursor-not-allowed bg-zinc-800 text-zinc-400 opacity-100 hover:bg-zinc-800 hover:cursor-not-allowed"
            >
              Evento encerrado
            </Button>
          )}
        </div>
      </div>
      <>
        <DialogDemo
          open={openStart}
          onOpenChange={setOpenStart}
          variant="info"
          Icon={TriangleAlert}
          title="Iniciar evento?"
          description="Após iniciar, os participantes poderão realizar check-in."
        >
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-violet-500 hover:bg-violet-500/10 hover:text-white cursor-pointer"
              onClick={() => setOpenStart(false)}
            >
              Cancelar
            </Button>

            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
              onClick={() => {
                onStart(id);
                setOpenStart(false);
              }}
            >
              Sim, iniciar
            </Button>
          </div>
        </DialogDemo>

        <DialogDemo
          open={openFinish}
          onOpenChange={setOpenFinish}
          variant="error"
          Icon={TriangleAlert}
          title="Encerrar evento?"
          description="Essa ação marcará o evento como encerrado e não poderá ser desfeita."
        >
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-violet-500 hover:bg-violet-500/10 hover:text-white cursor-pointer"
              onClick={() => setOpenFinish(false)}
            >
              Cancelar
            </Button>

            <Button
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              onClick={() => {
                onFinish(id);
                setOpenFinish(false);
              }}
            >
              Sim, encerrar
            </Button>
          </div>
        </DialogDemo>
        <DialogDemo
          open={openDelete}
          onOpenChange={setOpenDelete}
          variant="error"
          Icon={TriangleAlert}
          title="Excluir evento?"
          description="Esta ação excluirá permanentemente o evento. Ela não poderá ser desfeita."
        >
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-violet-500 hover:bg-violet-500/10 hover:text-white cursor-pointer"
              onClick={() => setOpenDelete(false)}
            >
              Cancelar
            </Button>

            <Button
              className="cursor-pointer bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                onDelete(id);
                setOpenDelete(false);
              }}
            >
              Sim, excluir
            </Button>
          </div>
        </DialogDemo>
      </>
    </div>
  );
}