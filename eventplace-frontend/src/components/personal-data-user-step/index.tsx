import { LoginField } from '@/components/login'
import { Button } from '@/components/ui/button'
import type { RegisterDTO } from '@/interface/register-user-interface'
import { personalDataSchema, type PersonalData } from '@/schema/personal-data-user-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { TypographyP } from '../ui/typography'
import { useEffect } from 'react'

interface Props {
  onNext: (data: Pick<RegisterDTO, 'name' | 'username' | 'birthDate'>) => void
  apiErrors: Record<string, string>
}

export function PersonalDataStep({ onNext, apiErrors }: Props) {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<PersonalData>({
    resolver: zodResolver(personalDataSchema),
  })

  useEffect(() => {
    if (!apiErrors) return
    Object.entries(apiErrors).forEach(([field, message]) => {
      setError(field as keyof PersonalData, { type: 'manual', message })
    })
  }, [apiErrors, setError])

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <div>
        <LoginField
          id="name"
          label="Nome Completo"
          type="text"
          placeholder="Digite seu nome completo"
          required
          {...register('name')}
        />
        {errors.name && <span className="text-sm text-red-400">{errors.name.message}</span>}
      </div>

      <div>
        <LoginField
          id="username"
          label="Nome de Usuário"
          type="text"
          placeholder="Digite seu nome de usuário"
          required
          {...register('username')}
        />
        {errors.username && <span className="text-sm text-red-400">{errors.username.message}</span>}
      </div>

      <div>
        <LoginField
          id="birthDate"
          label="Data de nascimento"
          type="date"
          required
          {...register('birthDate', { valueAsDate: true })}
        />
        {errors.birthDate && <span className="text-sm text-red-400">{errors.birthDate.message}</span>}
      </div>

      <Button
        type="submit"
        variant="outline"
        className="cursor-pointer mt-2 h-10 w-full border-white/30 bg-white text-sm font-semibold text-black hover:bg-white/90 hover:text-black"
      >
        Próximo
      </Button>

      <div className="mt-7 space-y-3 text-center">
        <TypographyP className="text-sm font-medium leading-none text-white/70">
          Já tem uma conta?
        </TypographyP>
        <Button
          asChild
          variant="outline"
          className="mt-2 group relative h-10 w-full overflow-hidden border-white/25 bg-transparent text-sm font-semibold text-white transition-colors hover:text-black"
        >
          <Link to="/login">
            <span className="relative">Faça login agora!</span>
          </Link>
        </Button>
      </div>
    </form>
  )
}