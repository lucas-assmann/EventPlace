import { Button } from "@/components/ui/button"
import { TypographyH2, TypographyP } from "@/components/ui/typography"
import { CheckCircle } from "lucide-react"

export function EmailVerified() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.35),transparent_35%),linear-gradient(180deg,#05030a_0%,#09060f_100%)] px-4">
      <div className="relative w-full overflow-hidden rounded-[28px] border border-violet-400/20 bg-[#09060f]/95 p-0 text-white shadow-[0_32px_90px_-28px_rgba(124,58,237,0.7)] backdrop-blur-xl sm:max-w-lg">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_25%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet-300/70 to-transparent" />

        <div className="relative p-5 sm:p-6">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-green-400/50 bg-green-500/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-green-300">
            Sucesso
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />

            <div className="space-y-2">
              <TypographyH2 className="border-none p-0 text-lg font-semibold leading-tight text-violet-50">
                Email verificado com sucesso!
              </TypographyH2>

              <TypographyP className="text-sm leading-6 text-zinc-200/90">
                Sua conta foi confirmada. Você pode fechar esta página e voltar
                para a aba anterior para continuar utilizando a plataforma.
              </TypographyP>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              type="button"
              className="h-10 rounded-xl border border-violet-400/25 bg-white text-black hover:bg-white/70 cursor-pointer"
              onClick={() => window.close()}
            >
              Fechar página
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}