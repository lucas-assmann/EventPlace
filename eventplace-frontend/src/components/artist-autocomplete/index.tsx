import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import api from '@/lib/api'
import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface ArtistOption {
  id: string
  username: string
  name: string
  avatar?: string | null
}

interface ArtistAutocompleteProps {
  selected: ArtistOption[]
  onChange: (artists: ArtistOption[]) => void
}

export function ArtistAutocomplete({ selected, onChange }: ArtistAutocompleteProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ArtistOption[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const trimmedQuery = query.trim()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (trimmedQuery.length < 2) {
      return
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true)
        const { data } = await api.get<ArtistOption[]>('/user/search', {
          params: { query: trimmedQuery },
        })
        const filtered = data.filter(
          (user) => !selected.some((artist) => artist.id === user.id),
        )
        setResults(filtered)
        setOpen(true)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 350)

    return () => clearTimeout(timeout)
  }, [trimmedQuery, selected])

  const visibleResults = trimmedQuery.length < 2 ? [] : results

  function handleSelect(artist: ArtistOption) {
    onChange([...selected, artist])
    setQuery('')
    setResults([])
    setOpen(false)
  }

  function handleRemove(id: string) {
    onChange(selected.filter((artist) => artist.id !== id))
  }

  return (
    <div ref={wrapperRef} className="relative flex flex-col gap-2">
      <Label className="text-white/60">Artistas</Label>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => visibleResults.length > 0 && setOpen(true)}
          placeholder="Buscar por username..."
          className="mt-1 bg-black border-white/15 pl-9 text-white"
        />
      </div>

      {open && (
        <div className="absolute top-17 z-10 w-full rounded-md border border-white/10 bg-zinc-900 shadow-lg">
          {loading && (
            <div className="px-3 py-2 text-xs text-white/40">Buscando...</div>
          )}
          {!loading && visibleResults.length === 0 && trimmedQuery.length >= 2 && (
            <div className="px-3 py-2 text-xs text-white/40">Nenhum usuário encontrado</div>
          )}
          {!loading &&
            visibleResults.map((artist) => (
              <button
                key={artist.id}
                type="button"
                onClick={() => handleSelect(artist)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-white hover:bg-purple-500/10 cursor-pointer"
              >
                {artist.avatar ? (
                  <img src={artist.avatar} alt={artist.username} className="h-6 w-6 rounded-full object-cover" />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-purple-500/20" />
                )}
                <div className="flex flex-col">
                  <span className="text-sm">{artist.name}</span>
                  <span className="text-xs text-white/40">@{artist.username}</span>
                </div>
              </button>
            ))}
        </div>
      )}

      {selected.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-2">
          {selected.map((artist) => (
            <div
              key={artist.id}
              className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-white"
            >
              @{artist.username}
              <button
                type="button"
                onClick={() => handleRemove(artist.id)}
                className="text-white/50 hover:text-red-400 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}