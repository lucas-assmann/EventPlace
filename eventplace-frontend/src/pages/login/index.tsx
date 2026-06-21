import heroImage from '@/assets/hero.png'
import loginImage from '@/assets/login-image.jpg'
import { DialogDemo } from '@/components/dialog'
import {
  LoginField,
  LoginImagePanel,
  LoginShell,
} from '@/components/login'
import { Button } from '@/components/ui/button'
import {
  TypographyH2,
  TypographyMuted,
  TypographyP,
} from '@/components/ui/typography'
import api from '@/lib/api'
import { useAuth } from '@/lib/use-auth'
import axios from 'axios'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

interface LoginData {
  email: string
  password: string
}

export function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [open, setOpen] = useState(false)
  const [dialogError, setDialogError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>()
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmitData(data: LoginData) {
    try {
      const response = await api.post('/auth/login', data)
      login(response.data.acess_token)
      navigate('/')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setDialogError(err.response?.data?.message ?? 'Email ou senha inválidos')
        setOpen(true)
      }
    }
  }

  return (
    <LoginShell
      imagePanel={
        <LoginImagePanel
          imageSrc={loginImage}
          imageSrcs={[loginImage, heroImage]}
          title={<>Encontre seu próximo <span className="text-[#7C3AED] font-bold">evento</span> sem perder tempo.</>}
        />
      }
    >
      <div className="w-full max-w-97.5 text-left">
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

        <div className="w-full max-w-97.5 text-left">
          <TypographyH2 className="mb-4 border-0 p-0 text-4xl font-semibold leading-tight tracking-tight text-white">
            Bem Vindo de volta!
          </TypographyH2>
          <TypographyMuted className="max-w-sm text-sm leading-6 text-white/60">
            Faça login no EventPlace e continue descobrindo eventos perfeitos para sua próxima noite incrível.
          </TypographyMuted>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit(handleSubmitData)}>
            <div>
              <LoginField
                id="email"
                label="Email"
                type="email"
                placeholder="Digite seu email"
                {...register('email')}
              />
              {errors.email && <span className="text-sm text-red-400">{errors.email.message}</span>}
            </div>

            <div>
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
                    onClick={() => setShowPassword((v) => !v)}
                    className="cursor-pointer absolute right-3 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center border-0 bg-transparent p-0 text-white/70 outline-none hover:text-white focus-visible:text-white"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                }
                {...register('password')}
              />
              {errors.password && <span className="text-sm text-red-400">{errors.password.message}</span>}
            </div>

            <Button
              type="submit"
              variant="outline"
              className="cursor-pointer mt-2 h-10 w-full border-white/30 bg-white text-sm font-semibold text-black hover:bg-white/90 hover:text-black"
            >
              Entrar
            </Button>

            <DialogDemo
              open={open}
              onOpenChange={setOpen}
              title={dialogError ? 'Erro ao entrar' : 'Verifique seu email!'}
              description={dialogError || 'Você precisa verificar o email para acessar sua conta!'}
              variant={dialogError ? 'error' : 'info'}
              Icon={<Mail className="size-6 text-violet-200" />}
              text="Ok"
              showClose
            />
          </form>

          <div className="mt-7 space-y-3 text-center">
            <TypographyP className="text-sm font-medium leading-none text-white/70">
              Novo na plataforma?
            </TypographyP>
            <Button
              asChild
              variant="outline"
              className="mt-2 group relative h-10 w-full overflow-hidden border-white/25 bg-transparent text-sm font-semibold text-white transition-colors hover:text-black"
            >
              <Link to="/register">
                <span className="relative">Crie sua conta agora!</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </LoginShell>
  )
}