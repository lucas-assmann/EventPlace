import { Mic2 } from 'lucide-react'

interface Artist {
  id: string
  name: string
  username: string
  avatar?: string | null
}

interface EventArtistsProps {
  artists: Artist[]
}

export function EventArtists({ artists }: EventArtistsProps) {
  if (!artists || artists.length === 0) return null

  return (
    <section className="mt-10">
      <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-white">
        <Mic2 className="h-4 w-4 text-purple-400" />
        Line-up
      </h2>

      <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {artists.map(({ id, name, username, avatar }) => (
          <div
            key={id}
            className="group flex w-20 shrink-0 flex-col items-center gap-2 sm:w-24"
          >
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-purple-500 via-fuchsia-500 to-purple-700 p-0.5 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_20px_-2px_rgba(168,85,247,0.6)] sm:h-24 sm:w-24">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-zinc-950">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <span className="text-lg font-semibold text-white/70">
                    {name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="max-w-24 truncate text-xs font-medium text-white">
                {name}
              </span>
              <span className="text-[11px] text-white/40">@{username}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}