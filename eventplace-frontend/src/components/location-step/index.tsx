import { getCep } from '@/api/getCep'
import { LoginField } from '@/components/login'
import { Button } from '@/components/ui/button'
import { cepMask } from '@/mask/cep-mask'
import { locationSchema, type LocationData } from '@/schema/location-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { TypographyP } from '../ui/typography'

interface Props {
  onNext: (data: LocationData) => void
}

export function LocationStep({ onNext }: Props) {

  const { register, handleSubmit, setValue, setError, control, formState: { errors } } = useForm<LocationData>({
    resolver: zodResolver(locationSchema),
  })

  const country = useWatch({ control, name: 'country' })
  const state = useWatch({ control, name: 'state' })
  const street = useWatch({ control, name: 'street' })

  async function handleCepChange(e: React.ChangeEvent<HTMLInputElement>) {
    register('cep').onChange(e)

    const cep = e.target.value.replace(/\D/g, '')
    if (cep.length !== 8) return

    try {
      const data = await getCep(cep)
      setValue('country', 'Brasil')
      setValue('state', data.uf)
      setValue('street', data.logradouro)
    } catch (err) {
      setError('cep', {
        type: 'manual', message: err instanceof Error ? err.message : 'CEP inválido',
      })
    }
  }

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
          onChange={handleCepChange}
        />
        {errors.cep && <span className="text-sm text-red-400">{errors.cep.message}</span>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <LoginField id="country" label="País" type="text" clickable={false} className={country ? 'border-white/25 bg-white/8 text-white opacity-100' : ''} {...register('country')} />
          {errors.country && <span className="text-sm text-red-400">{errors.country.message}</span>}
        </div>

        <div>
          <LoginField id="state" label="Estado" type="text" clickable={false} className={state ? 'border-white/25 bg-white/8 text-white' : ''} {...register('state')} />
          {errors.state && <span className="text-sm text-red-400">{errors.state.message}</span>}
        </div>

        <div>
          <LoginField id="street" label="Rua" type="text" clickable={false} className={street ? 'border-white/25 bg-white/8 text-white' : ''} {...register('street')} />
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

      <div className="mt-7 space-y-3 text-center">
        <TypographyP className="text-sm font-medium leading-none text-white/70">
          Errou algo?
        </TypographyP>
        <Button
          asChild
          variant="outline"
          onClick={window.location.reload}
          className="mt-2 group relative h-10 w-full overflow-hidden border-white/25 bg-transparent text-sm font-semibold text-red-500 transition-colors hover:text-red-700 hover:border-red-300 hover:bg-red-300"
        >
          <Link to="/register">
            <span className="relative">Resetar cadastro</span>
          </Link>
        </Button>
      </div>
    </form>
  )
}