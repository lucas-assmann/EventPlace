import { Header } from '@/components/header'
import { Outlet, Route, Routes } from 'react-router-dom'
import { EventPage } from './pages/event'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { TicketsPage } from './pages/ticket'
import { PrivateRoute } from './components/private-route'

function RootLayout() {
  return (
    <div className="min-h-svh bg-zinc-950">
      <Header user={{ name: 'João Dias' }} ticketCount={3} />
      <Outlet />
    </div>
  )
}

function AuthLayout() {
  return <Outlet />
}

export function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ticket" element={<TicketsPage />} />
          <Route path="/event" element={<EventPage />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  )
}