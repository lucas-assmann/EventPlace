import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import api from "@/lib/api";
import { Loader2, QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface TicketResponse {
  id: string;
  status: "PENDING" | "CONFIRMED";
}

export function PaymentPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [qrCode, setQrCode] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ticketId) return;

    api
      .get(`/ticket/qrcode/generate/${ticketId}`)
      .then((response) => {
        setQrCode(response.data);
      })
      .finally(() => setLoading(false));
  }, [ticketId]);

  useEffect(() => {
    if (!ticketId) return;

    const interval = setInterval(async () => {
      try {
        const response = await api.get<TicketResponse>(`/ticket/${ticketId}`);

        if (response.data.status === "CONFIRMED") {
          clearInterval(interval);
          navigate("/payment-success");
        }
      } catch (err) {
        console.error(err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [ticketId, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.35),transparent_35%),linear-gradient(180deg,#05030a_0%,#09060f_100%)] px-4">
      <div className="w-full max-w-md rounded-3xl border border-violet-500/20 bg-[#09060f]/95 p-8 shadow-[0_32px_90px_-28px_rgba(124,58,237,0.7)] backdrop-blur-xl">

        <TypographyH2 className="border-none p-0 text-center text-white">
          Pagamento via QR Code
        </TypographyH2>

        <TypographyP className="mt-2 text-center text-zinc-400">
          Escaneie o QR Code abaixo para concluir a compra do ingresso.
        </TypographyP>

        <div className="mt-8 flex justify-center">
          {loading ? (
            <Loader2 className="h-16 w-16 animate-spin text-violet-400" />
          ) : qrCode ? (
            <img
              src={qrCode}
              alt="QR Code"
              className="rounded-xl bg-white p-4"
            />
          ) : (
            <div className="flex h-64 w-64 items-center justify-center rounded-xl border border-dashed border-zinc-700">
              <QrCode className="h-16 w-16 text-zinc-600" />
            </div>
          )}
        </div>

        <div className="mt-8 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">
          <p className="text-center text-sm text-yellow-300">
            ⏳ Aguardando confirmação do pagamento...
          </p>

          <p className="mt-2 text-center text-xs text-zinc-400">
            Esta página será atualizada automaticamente assim que o pagamento
            for confirmado.
          </p>
        </div>

        <Button
          variant="ghost"
          className="mt-6 w-full text-zinc-300 cursor-pointer"
          onClick={() => navigate("/tickets")}
        >
          Ver meus ingressos
        </Button>

        <Button
          variant="outline"
          className="mt-3 w-full cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Cancelar compra
        </Button>
      </div>
    </div>
  );
}