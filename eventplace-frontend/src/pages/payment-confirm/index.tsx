import api from "@/lib/api";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function PaymentConfirm() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    code ? "loading" : "error"
  );

  const [message, setMessage] = useState(
    code ? "" : "Código inválido."
  );

  useEffect(() => {
    if (!code) return;

    api
      .get(`/ticket/payment/confirm?code=${code}`)
      .then((res) => {
        setStatus("success");
        setMessage(res.data);
      })
      .catch(() => {
        setStatus("error");
        setMessage("Não foi possível confirmar o pagamento.");
      });
  }, [code]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-white">

        {status === "loading" && (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-violet-400" />
            <h2 className="mt-6 text-2xl font-bold">
              Confirmando pagamento...
            </h2>
            <p className="mt-2 text-zinc-400">
              Aguarde alguns segundos.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="mx-auto h-14 w-14 text-green-500" />

            <h2 className="mt-6 text-2xl font-bold">
              Pagamento confirmado!
            </h2>

            <p className="mt-3 text-zinc-400">
              {message}
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mx-auto h-14 w-14 text-red-500" />

            <h2 className="mt-6 text-2xl font-bold">
              Erro
            </h2>

            <p className="mt-3 text-zinc-400">
              {message}
            </p>
          </>
        )}
      </div>
    </div>
  );
}