import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Link } from "react-router-dom"

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
}

export function DialogDemo({ title, description, children, button, open, onOpenChange, link, text, Icon }: DialogDemoProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      {button && <DialogTrigger asChild>{button}</DialogTrigger>}
      <DialogContent className="bg-black text-white h-50 w-full sm:w-[112.5]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {Icon}
            {title}
          </DialogTitle>
          {description && <DialogDescription className="text-[18px] text-gray-400">{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogClose asChild>
          <Button variant="outline" className="text-black cursor-pointer h-10 mt-5"><Link to={link!}>{text}</Link></Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}