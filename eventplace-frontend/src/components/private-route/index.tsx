import { useAuth } from '@/lib/use-auth'
import { Navigate, Outlet } from 'react-router-dom'

export function PrivateRoute() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}