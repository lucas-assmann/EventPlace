import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import api from '@/lib/api'
import { Eye, EyeOff, KeyRound } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function UpdatePasswordPage() {
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    if (password.length < 6) {
      setError('A nova senha deve ter no mínimo 6 caracteres.')
      return
    }

    try {
      setLoading(true)
      await api.put('/user/password', { oldPassword, password })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } }
      setError(error.response?.data?.message ?? 'Erro ao atualizar a senha.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/30">
            <KeyRound className="h-7 w-7 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold">Senha atualizada!</h1>
          <p className="text-sm text-white/50">
            Você será redirecionado para o login em instantes...
          </p>
          <Link
            to="/login"
            className="mt-2 rounded-xl bg-purple-600 px-6 py-2 text-sm font-semibold text-white hover:bg-purple-500"
          >
            Ir para Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 ring-1 ring-purple-500/30">
              <KeyRound className="h-5 w-5 text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              Alterar <span className="text-purple-400">senha</span>
          </h1>
          </div>
          <p className="mt-1 text-sm text-white/40">
            Insira sua senha atual e defina uma nova senha segura.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl border border-white/7 bg-zinc-900 p-6"
        >
          {error && (
            <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            <Label className="text-sm text-white/60">Senha atual</Label>
            <div className="relative">
              <Input
                type={showOld ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-black border-white/15 pr-10 text-white"
              />
              <button
                type="button"
                onClick={() => setShowOld((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showOld ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-sm text-white/60">Nova senha</Label>
            <div className="relative">
              <Input
                type={showNew ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-black border-white/15 pr-10 text-white"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-white/30">Mínimo 6 caracteres.</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-sm text-white/60">Confirmar nova senha</Label>
            <div className="relative">
              <Input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-black border-white/15 pr-10 text-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full bg-purple-600 font-semibold text-white hover:bg-purple-500 cursor-pointer"
          >
            {loading ? 'Atualizando...' : 'Atualizar senha'}
          </Button>

          <Link
            to="/profile"
            className="text-center text-xs text-white/30 hover:text-white/60"
          >
            Cancelar e voltar ao perfil
          </Link>
        </form>
      </div>
    </div>
  )
}