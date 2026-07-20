import { LoginField } from '@/components/login'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { passwordSchema, type PasswordData } from '@/schema/password-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, MailCheck, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { DialogDemo } from '../dialog'
import { TypographyP } from '../ui/typography'

interface Props {
  onNext: (data: PasswordData) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  dialogError?: string
}

export function PasswordStep({ onNext, open, onOpenChange, dialogError }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
  })

  const handleSubmitData = (data: PasswordData) => {
    localStorage.setItem('pendingEmail', data.email)
    onNext(data)
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitData)} className="space-y-4">
      <div>
        <LoginField
          id="email"
          label="Email"
          type="email"
          placeholder="exemplo@email.com"
          required
          {...register('email')}
        />
        {errors.email && <span className="text-sm text-red-400">{errors.email.message}</span>}
      </div>

      <div>
        <LoginField
          id="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          placeholder="**********"
          required
          trailingIcon={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="cursor-pointer absolute right-3 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center bg-transparent text-white/70 hover:text-white"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          }
          {...register('password')}
        />
        {errors.password && <span className="text-sm text-red-400">{errors.password.message}</span>}

        <Label className="mt-2 flex flex-col items-start gap-1 text-[0.82rem] text-white/70">
          <p className="flex items-center gap-1">
            <ShieldAlert className="text-red-700" />
            A senha deve conter no mínimo 6 caracteres.
          </p>
          <p className="flex items-center gap-1">
            <ShieldAlert className="text-red-700" />
            Lembre-se sempre de colocar uma senha forte.
          </p>
        </Label>
      </div>

      <Button
        type="submit"
        variant="outline"
        className="cursor-pointer mt-2 h-10 w-full border-white/30 bg-white text-sm font-semibold text-black hover:bg-white/90 hover:text-black"
      >
        Criar Conta
      </Button>

      <DialogDemo
        open={open}
        onOpenChange={onOpenChange}
        title={dialogError ? 'Erro ao criar conta no EventPlace' : 'Conta Criada 🎆'}
        description={dialogError || 'Sua conta foi criada com sucesso!'}
        variant={dialogError ? 'error' : 'success'}
        link={dialogError ? undefined : '/verify-code'}
        text={dialogError ? undefined : 'Ok'}
        showClose={!!dialogError}
        Icon={dialogError ? ShieldAlert : MailCheck}
      />

      <div className="mt-7 space-y-3 text-center">
        <TypographyP className="text-sm font-medium leading-none text-white/70">
          Errou algo?
        </TypographyP>
        <Button
          asChild
          variant="outline"
          onClick={window.location.reload}
          className="mt-2 group relative h-10 w-full overflow-hidden border-white/25 bg-transparent text-sm font-semibold text-red-500 transition-colors hover:text-red-700 hover:bg-red-300"
        >
          <Link to="/register">
            <span className="relative">Resetar cadastro</span>
          </Link>
        </Button>
      </div>
    </form>
  )
}