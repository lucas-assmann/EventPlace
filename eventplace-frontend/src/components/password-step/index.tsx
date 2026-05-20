import { LoginField } from '@/components/login'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { passwordSchema, type PasswordData } from '@/schema/password-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  onNext: (data: PasswordData) => void
}

export function PasswordStep({ onNext }: Props) {
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
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

        <Label className="mt-1 flex flex-col items-start gap-1 text-[0.82rem] text-white/70">
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
    </form>
  )
}