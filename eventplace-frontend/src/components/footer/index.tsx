import { AtSign, ExternalLink, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-t border-white/10 pt-5 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} EventPlace. Todos os direitos reservados.</p>

          <div className="flex items-center gap-3">
            <a
              href="mailto:contato@eventplace.com"
              aria-label="Enviar e-mail para EventPlace"
              className="rounded-md p-2 text-white/45 transition-colors hover:bg-white/5 hover:text-purple-300"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da EventPlace"
              className="rounded-md p-2 text-white/45 transition-colors hover:bg-white/5 hover:text-purple-300"
            >
              <AtSign className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/lucas-assmann/EventPlace.git"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub da EventPlace"
              className="rounded-md p-2 text-white/45 transition-colors hover:bg-white/5 hover:text-purple-300"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
