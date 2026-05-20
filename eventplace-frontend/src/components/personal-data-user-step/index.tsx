import { LoginField } from '@/components/login'
import { Button } from '@/components/ui/button'
import type { RegisterDTO } from '@/interface/register-user-interface'
import { personalDataSchema, type PersonalData } from '@/schema/personal-data-user-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface Props {
  onNext: (data: Pick<RegisterDTO, 'name' | 'username' | 'birthDate'>) => void
}

export function PersonalDataStep({ onNext }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalData>({
    resolver: zodResolver(personalDataSchema),
  })

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
    </form>
  )
}