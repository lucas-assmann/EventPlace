import { LoginField } from '@/components/login'
import { Button } from '@/components/ui/button'
import { getCep } from '@/fetch/getCep'
import { cepMask } from '@/mask/cep-mask'
import { locationSchema, type LocationData } from '@/schema/location-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface Props {
  onNext: (data: LocationData) => void
}

export function LocationStep({ onNext }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<LocationData>({
    resolver: zodResolver(locationSchema),
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <div>
        <LoginField
          id="cep"
          label="CEP"
          type="text"
          placeholder="00000-000"
          required
          mask={cepMask}
          {...register('cep')}
        />
        {errors.cep && <span className="text-sm text-red-400">{errors.cep.message}</span>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <LoginField id="country" label="País" type="text" clickable={false} {...register('country')} />
          {errors.country && <span className="text-sm text-red-400">{errors.country.message}</span>}
        </div>

        <div>
          <LoginField id="state" label="Estado" type="text" clickable={false} {...register('state')} />
          {errors.state && <span className="text-sm text-red-400">{errors.state.message}</span>}
        </div>

        <div>
          <LoginField id="street" label="Rua" type="text" clickable={false} {...register('street')} />
          {errors.street && <span className="text-sm text-red-400">{errors.street.message}</span>}
        </div>

        <div>
          <LoginField id="number" label="Número" type="text" placeholder="Número" required {...register('number')} />
          {errors.number && <span className="text-sm text-red-400">{errors.number.message}</span>}
        </div>
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