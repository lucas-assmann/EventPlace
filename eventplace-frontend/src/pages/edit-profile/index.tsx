// pages/edit-profile.tsx
import { EditProfileSkeleton } from '@/components/skeleton/edit-profile-skeleton.index'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import api from '@/lib/api'
import { profileSchema, type ProfileFormData } from '@/schema/profile-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound, MapPin, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

export function EditProfile() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

  useEffect(() => {
    api.get('/user')
      .then((response) => {
        const user = response.data
        reset({
          name: user.name,
          username: user.username,
          email: user.email,
          avatar: user.avatar ?? '',
          birthDate: user.birthDate?.slice(0, 10),
          cep: user.cep,
          number: user.localization?.[0]?.number ?? '',
        })
      })
      .catch(console.error)
      .finally(() => setFetching(false))
  }, [reset])

  async function onSubmit(data: ProfileFormData) {
    try {
      setLoading(true)
      setError(null)

      const payload = {
        ...data,
        avatar: data.avatar?.trim() ? data.avatar : undefined,
      }

      await api.patch('/user', payload)
      navigate('/profile')
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } }
      setError(error.response?.data?.message ?? 'Erro ao atualizar perfil.')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return <EditProfileSkeleton />
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
      <main className="mx-auto max-w-6xl">
        <div className="mb-8 border-b-2 border-purple-500/50 pb-3">
          <h1 className="text-3xl font-bold text-white">
            Editar <span className="text-[#7C3AED] font-bold text-[56px]">perfil</span>
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Atualize suas informações pessoais
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <section className="flex flex-col gap-4 rounded-2xl border border-white/7 bg-zinc-900 p-5">
            <h2 className="flex items-center gap-2 text-base font-semibold text-white">
              <User className="h-4 w-4 text-purple-400" />
              Dados pessoais
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/60">Nome</Label>
                <Input {...register('name')} placeholder="João Dias" className="mt-1 bg-black border-white/15 text-white" />
                {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
              </div>
              <div>
                <Label className="text-white/60">Username</Label>
                <Input {...register('username')} placeholder="joaodias" className="mt-1 bg-black border-white/15 text-white" />
                {errors.username && <span className="text-xs text-red-400">{errors.username.message}</span>}
              </div>
            </div>

            <div>
              <Label className="text-white/60">Email</Label>
              <Input type="email" {...register('email')} placeholder="email@exemplo.com" className="mt-1 bg-black border-white/15 text-white" />
              {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/60">Data de nascimento</Label>
                <Input type="date" {...register('birthDate')} className="mt-1 bg-black border-white/15 text-white" />
                {errors.birthDate && <span className="text-xs text-red-400">{errors.birthDate.message}</span>}
              </div>
              <div>
                <Label className="text-white/60">Avatar (URL)</Label>
                <Input {...register('avatar')} placeholder="https://..." className="mt-1 bg-black border-white/15 text-white" />
                {errors.avatar && <span className="text-xs text-red-400">{errors.avatar.message}</span>}
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

          <section className="flex flex-col gap-3 rounded-2xl border border-white/7 bg-zinc-900 p-5">
            <h2 className="flex items-center gap-2 text-base font-semibold text-white">
              <KeyRound className="h-4 w-4 text-purple-400" />
              Senha
            </h2>
            <p className="text-sm text-white/40">
              Para alterar sua senha, acesse a página dedicada de segurança.
            </p>
            <Button
              asChild
              type="button"
              variant="outline"
              className="w-fit border-purple-500/40 bg-purple-500/10 text-xs text-purple-400 hover:bg-purple-500/25 hover:text-white"
            >
              <Link to="/profile/password">Alterar senha</Link>
            </Button>
          </section>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full bg-purple-600 font-semibold text-white hover:bg-purple-500 cursor-pointer"
          >
            {loading ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </form>
      </main>
    </div>
  )
}