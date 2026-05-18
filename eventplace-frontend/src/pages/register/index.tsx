import loginImage from '@/assets/login-image.jpg'
import {
  LoginField,
  LoginImagePanel,
  LoginShell
} from '@/components/login'
import { Button } from '@/components/ui/button'
import { TypographyH2, TypographyMuted, TypographyP } from '@/components/ui/typography'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function Register() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <LoginShell
      reverse
      imagePanel={
        <LoginImagePanel
          imageSrc={loginImage}
          title={<>Encontre seu próximo <span className="text-[#7C3AED] font-bold">evento</span> sem perder tempo.</>}
        />
      }
    >
      <div className="w-full max-w-97.5 text-left ">

        <div className="relative flex mb-5 h-20 w-20 items-center justify-center mx-auto">
          <svg
            viewBox="0 0 64 64"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full text-[#7C3AE0]"
          >
            <path
              d="M32 6 58 54H6L32 6Z"
              fill="black"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
          <span className="relative mt-3.5 text-xl font-black tracking-tight text-gray-300">
            EP
          </span>
        </div>

        <div className="w-full max-w-97.5 text-left ">
          <img
            src={loginImage}
            alt=""
            className="mb-10 h-36 w-full rounded-lg object-cover opacity-75 lg:hidden"
          />

          <TypographyH2 className="mb-4 border-0 p-0 text-4xl font-semibold leading-tight tracking-tight text-white">
            Bem Vindo ao EventPlace!
          </TypographyH2>
          <TypographyMuted className="max-w-sm text-sm leading-6 text-white/60">
            Crie sua conta para começar a explorar eventos incríveis e encontrar o que mais combina com você.
          </TypographyMuted>

          <form className="mt-5 space-y-4">
            <LoginField
              id="email"
              label="Email"
              type="email"
              placeholder="Digite seu email"
            />

            <LoginField
              id="password"
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              trailingIcon={
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((isVisible) => !isVisible)}
                  className="cursor-pointer absolute right-3 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center border-0 bg-transparent p-0 text-white/70 outline-none hover:text-white focus-visible:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              }
            />

            <Button
              type="submit"
              variant="outline"
              className="cursor-pointer mt-2 h-10 w-full border-white/30 bg-white text-sm font-semibold text-black hover:bg-white/90 hover:text-black"
            >
              Entrar
            </Button>
          </form>

          <div className="mt-7 space-y-3 text-center">
            <TypographyP className="text-sm font-medium leading-none text-white/70">
              Já tem uma conta?
            </TypographyP>
            <Button
              asChild
              variant="outline"
              className="mt-2 group relative h-10 w-full overflow-hidden border-white/25 bg-transparent text-sm font-semibold text-white transition-colors0 hover:text-black"
            >
              <Link to="/login">
                <span className="relative">Faça login agora!</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </LoginShell>
  )
}
