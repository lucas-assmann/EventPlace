import { Button } from '@/components/ui/button'
import { TypographyH1, TypographyP } from '@/components/ui/typography'
import { useNavigate } from 'react-router-dom'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#05030a]">

      <div className="relative flex flex-col items-center text-center">
        <div className="relative">
          <span
            className="text-[clamp(120px,20vw,220px)] font-black leading-none text-transparent"
            style={{
              WebkitTextStroke: '2px rgba(124,58,237,0.5)',
              textShadow: '0 0 80px rgba(124,58,237,0.4)',
            }}
          >
            404
          </span>
        </div>

        <TypographyH1 className="mb-3 font-bold tracking-tight text-white">
          Página não encontrada
        </TypographyH1>
        <TypographyP className="mb-8 max-w-sm leading-relaxed text-zinc-400">
          Parece que você se perdeu no caminho para o evento. Essa página não existe ou foi removida.😅
        </TypographyP>

        <div className="flex flex-col gap-3 sm:flex-row mt-4">
          <Button variant="outline" onClick={() => navigate(-1)} className="cursor-pointer mt-4 bg-[#7c3aeD]/30 hover:bg-[#7c3aeD]/90 text-[#7c3aeD] hover:text-white border-[#5b17cf]">
            Voltar
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="cursor-pointer mt-4 bg-white font-semibold text-black hover:bg-white/80"
          >
            Ir para o início
          </Button>
        </div>
      </div>
    </div>
  )
}