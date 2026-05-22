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

const variantStyles: Record<Variant, { title: string }> = {
  success: { title: 'text-emerald-400' },
  error: { title: 'text-red-400' },
  info: { title: 'text-blue-400' },
}

export function DialogDemo({ title, description, children, button, open, onOpenChange, link, text, Icon, variant = 'info', showClose = false }: DialogDemoProps) {
  const styles = variantStyles[variant]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {button && <DialogTrigger asChild>{button}</DialogTrigger>}
      <DialogContent className="bg-gray-800 text-white w-full sm:w-[112.5]">
        <DialogHeader>
          <DialogTitle className={`flex items-center gap-2 ${styles.title}`}>
            {Icon}
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-[18px] text-gray-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
        <DialogFooter className="flex gap-2 mt-5 bg-gray-800 border-none">
          {showClose && (
            <DialogClose asChild>
              <Button variant="ghost" className="cursor-pointer bg-white/80 text-black hover:bg-white/60">
                Fechar
              </Button>
            </DialogClose>
          )}
          {link && text && (
            <DialogClose asChild>
              <Button variant="outline" className="text-black cursor-pointer h-10 flex-1">
                <Link to={link}>{text}</Link>
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}