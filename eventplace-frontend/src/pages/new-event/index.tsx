import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import api from '@/lib/api'
import { eventSchema, type EventFormData } from '@/schema/event-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, MapPin, Plus, Ticket, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export function NewEvent() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      appropriate_age: 'ADULT',
      ticketType: [{ name: '', price: 0, quantity: 1 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ticketType',
  })

  async function onSubmit(data: EventFormData) {
    try {
      setLoading(true)
      setError(null)

      const payload = {
        ...data,
        banner: data.banner?.trim() ? data.banner : undefined,
      }

      await api.post('/event', payload)
      navigate('/')
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } }
      setError(error.response?.data?.message ?? 'Erro ao criar evento.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
      <main className="mx-auto max-w-7xl">
        <div className="mb-8 border-b-2 border-purple-500/50 pb-3">
          <h1 className="text-3xl font-bold text-white">
            Criar <span className="text-[#7C3AED] font-bold text-[56px]">evento</span>
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Preencha as informações para publicar seu evento
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <section className="flex flex-col gap-4 rounded-2xl border border-white/7 bg-zinc-900 p-5">
            <h2 className="text-base font-semibold text-white">Sobre o evento</h2>

            <div>
              <Label className="text-white/60">Título</Label>
              <Input {...register('title')} placeholder="Festival de Verão 2026" className="mt-1 bg-black border-white/15 text-white" />
              {errors.title && <span className="text-xs text-red-400">{errors.title.message}</span>}
            </div>

            <div>
              <Label className="text-white/60">Descrição</Label>
              <textarea
                {...register('description')}
                placeholder="Conte os detalhes do seu evento..."
                rows={4}
                className="mt-1 w-full rounded-md border border-white/15 bg-black p-3 text-sm text-white outline-none focus:border-purple-500/50"
              />
              {errors.description && <span className="text-xs text-red-400">{errors.description.message}</span>}
            </div>

            <div>
              <Label className="text-white/60">Banner (URL)</Label>
              <Input {...register('banner')} placeholder="https://..." className="mt-1 bg-black border-white/15 text-white" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/60">Classificação</Label>
                <select
                  {...register('appropriate_age')}
                  className="mt-1 h-10 w-full rounded-md border border-white/15 bg-black px-3 text-sm text-white outline-none focus:border-purple-500/50"
                >
                  <option value="ADULT">Adulto (18+)</option>
                  <option value="EVERYONE">Livre</option>
                </select>
              </div>

              <div>
                <Label className="text-white/60">Capacidade máxima</Label>
                <Input
                  type="number"
                  {...register('max_person_quantity')}
                  placeholder="500"
                  className="mt-1 bg-black border-white/15 text-white"
                />
                {errors.max_person_quantity && <span className="text-xs text-red-400">{errors.max_person_quantity.message}</span>}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-white/7 bg-zinc-900 p-5">
            <h2 className="flex items-center gap-2 text-base font-semibold text-white">
              <Calendar className="h-4 w-4 text-purple-400" />
              Data e hora
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/60">Início</Label>
                <Input type="datetime-local" {...register('date')} className="mt-1 bg-black border-white/15 text-white" />
                {errors.date && <span className="text-xs text-red-400">{errors.date.message}</span>}
              </div>
              <div>
                <Label className="text-white/60">Término</Label>
                <Input type="datetime-local" {...register('endAt')} className="mt-1 bg-black border-white/15 text-white" />
                {errors.endAt && <span className="text-xs text-red-400">{errors.endAt.message}</span>}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-white/7 bg-zinc-900 p-5">
            <h2 className="flex items-center gap-2 text-base font-semibold text-white">
              <MapPin className="h-4 w-4 text-purple-400" />
              Localização
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/60">CEP</Label>
                <Input {...register('cep')} placeholder="01310100" maxLength={8} className="mt-1 bg-black border-white/15 text-white" />
                {errors.cep && <span className="text-xs text-red-400">{errors.cep.message}</span>}
              </div>
              <div>
                <Label className="text-white/60">Número</Label>
                <Input {...register('number')} placeholder="100" className="mt-1 bg-black border-white/15 text-white" />
                {errors.number && <span className="text-xs text-red-400">{errors.number.message}</span>}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-white/7 bg-zinc-900 p-5">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                <Ticket className="h-4 w-4 text-purple-400" />
                Tipos de ingresso
              </h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ name: '', price: 0, quantity: 1 })}
                className="border-purple-500/40 bg-purple-500/10 text-xs text-purple-400 hover:bg-purple-500/25 hover:text-white cursor-pointer"
              >
                <Plus className="h-3 w-3" />
                Adicionar tipo
              </Button>
            </div>

            {errors.ticketType?.root && (
              <span className="text-xs text-red-400">{errors.ticketType.root.message}</span>
            )}

            <div className="flex flex-col gap-3">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-[1fr_120px_120px_auto] items-end gap-3 rounded-lg border border-white/7 bg-black/40 p-3">
                  <div>
                    <Label className="text-xs text-white/50">Nome</Label>
                    <Input {...register(`ticketType.${index}.name`)} placeholder="Pista" className="mt-1 bg-black border-white/15 text-white" />
                    {errors.ticketType?.[index]?.name && (
                      <span className="text-xs text-red-400">{errors.ticketType[index]?.name?.message}</span>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs text-white/50">Preço (R$)</Label>
                    <Input type="number" step="0.01" {...register(`ticketType.${index}.price`)} placeholder="50" className="mt-1 bg-black border-white/15 text-white" />
                  </div>
                  <div>
                    <Label className="text-xs text-white/50">Quantidade</Label>
                    <Input type="number" {...register(`ticketType.${index}.quantity`)} placeholder="100" className="mt-1 bg-black border-white/15 text-white" />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                    className="text-red-400 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-30 cursor-pointer "
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full bg-purple-600 font-semibold text-white hover:bg-purple-500 cursor-pointer"
          >
            {loading ? 'Criando evento...' : 'Publicar evento'}
          </Button>
        </form>
      </main>
    </div>
  )
}