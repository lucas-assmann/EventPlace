import { Button } from "@/components/ui/button"
import { TypographyH2, TypographyP } from "@/components/ui/typography"
import api from "@/lib/user"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function VerifyCode() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function handleVerifyCode() {
    try {
      setLoading(true)
      setError(null)

      const email = localStorage.getItem('pendingEmail')
      const response = await api.get(`user/verify-status?email=${email}`)

      if (response.data.isVerified) {
        navigate('/login')
      } else {
        setError('Email ainda não verificado. Verifique sua caixa de entrada.')
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } }
      setError(error.response?.data?.message || 'Ocorreu um erro.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.35),transparent_35%),linear-gradient(180deg,#05030a_0%,#09060f_100%)] px-4">
      <div className="relative w-full overflow-hidden rounded-[28px] border border-violet-400/20 bg-[#09060f]/95 p-0 text-white shadow-[0_32px_90px_-28px_rgba(124,58,237,0.7)] backdrop-blur-xl sm:max-w-lg">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_25%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet-300/70 to-transparent" />

        <div className="relative p-5 sm:p-6">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-400/50 bg-zinc-500/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-zinc-50">
            Informação
          </div>

          <div className="flex items-start gap-3">
            <div className="space-y-2">
              <TypographyH2 className="border-none p-0 text-lg font-semibold leading-tight text-violet-50">
                Verifique seu email
              </TypographyH2>
              <TypographyP className="text-sm leading-6 text-zinc-200/90">
                Enviamos um link de verificação para o seu email. Confirme o código para continuar.
              </TypographyP>
              {error && (
                <TypographyP className="text-sm text-red-400">{error}</TypographyP>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              type="button"
              variant="ghost"
              disabled={loading}
              className="h-10 rounded-xl border border-violet-400/25 bg-white text-black hover:bg-white/70"
              onClick={handleVerifyCode}
            >
              {loading ? 'Verificando...' : 'Verificar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}