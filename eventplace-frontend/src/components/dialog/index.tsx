import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Link } from "react-router-dom"

type Variant = 'success' | 'error' | 'info'

interface DialogDemoProps {
  title?: string
  description?: string
  children?: React.ReactNode
  button?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  link?: string
  text?: string
  Icon?: React.ReactNode
  variant?: Variant
  showClose?: boolean
}

const variantStyles: Record<Variant, {
  badge: string
  icon: string
  title: string
  glow: string
  label: string
}> = {
  success: {
    badge: 'border-violet-400/40 bg-violet-500/10 text-violet-50',
    icon: 'border-violet-400/35 bg-violet-500/15 text-violet-100',
    title: 'text-violet-50',
    glow: 'bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.12),transparent_30%)]',
    label: 'Sucesso'
  },
  error: {
    badge: 'border-violet-400/40 bg-violet-500/10 text-violet-50',
    icon: 'border-violet-400/35 bg-violet-500/15 text-violet-100',
    title: 'text-violet-50',
    glow: 'bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.12),transparent_30%)]',
    label: 'Atenção'
  },
  info: {
    badge: 'border-violet-400/40 bg-violet-500/10 text-violet-50',
    icon: 'border-violet-400/35 bg-violet-500/15 text-violet-100',
    title: 'text-violet-50',
    glow: 'bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.12),transparent_30%)]',
    label: 'Informação'
  }
}

export function DialogDemo({
  title,
  description,
  children,
  button,
  open,
  onOpenChange,
  link,
  text,
  Icon,
  variant = 'info',
  showClose = false
}: DialogDemoProps) {
  const styles = variantStyles[variant]
  const hasFooter = Boolean(showClose || (link && text))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {button && <DialogTrigger asChild>{button}</DialogTrigger>}
      <DialogContent
        showCloseButton={false}
        className={`w-full overflow-hidden rounded-[28px] border border-violet-400/20 bg-[#09060f]/95 p-0 text-white shadow-[0_32px_90px_-28px_rgba(124,58,237,0.7)] backdrop-blur-xl sm:max-w-lg ${styles.glow}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_25%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet-300/70 to-transparent" />

        <div className="relative p-5 sm:p-6">
          <DialogHeader className="gap-4">
            <div className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${styles.badge}`}>
              {styles.label}
            </div>

            <div className="flex items-start gap-3">
              <div className={`flex size-11 shrink-0 items-center justify-center rounded-2xl border ${styles.icon}`}>
                {Icon}
              </div>
              <div className="space-y-2">
                <DialogTitle className={`text-lg font-semibold leading-tight ${styles.title}`}>
                  {title}
                </DialogTitle>
                {description && (
                  <DialogDescription className="text-sm leading-6 text-zinc-200/90">
                    {description}
                  </DialogDescription>
                )}
              </div>
            </div>
          </DialogHeader>

          {children && <div className="mt-4 text-sm leading-6 text-zinc-100/90">{children}</div>}

          {hasFooter && (
            <DialogFooter className="mt-6 flex flex-col gap-2 mx-0 mb-0 rounded-none border-0 bg-transparent p-0 sm:flex-row sm:justify-end">
              {showClose && (
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-10 rounded-xl border border-violet-400/25 bg-white/5 text-white hover:bg-white/10 cursor-pointer"
                  >
                    Fechar
                  </Button>
                </DialogClose>
              )}
              {link && text && (
                <DialogClose asChild>
                  <Button
                    asChild
                    type="button"
                    className="h-10 rounded-xl bg-[#7C3AED] text-white shadow-[0_16px_40px_-18px_rgba(124,58,237,0.85)] hover:bg-[#6D28D9]"
                  >
                    <Link to={link}>{text}</Link>
                  </Button>
                </DialogClose>
              )}
            </DialogFooter>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}