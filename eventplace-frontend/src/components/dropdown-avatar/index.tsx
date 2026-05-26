import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import api from "@/lib/api"
import { useAuth } from "@/lib/use-auth"
import { useNavigate } from "react-router-dom"

interface DropdownAvatarProps {
  children: React.ReactNode
  className?: string
}

export function DropdownAvatar({ children, className }: DropdownAvatarProps) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
  try {
    await api.post('/auth/logout')
  } finally {
    logout()
    navigate('/login')
  }
}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={className || "w-40 bg-black text-white "} align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Configurações
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            Sair
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
