import { Header } from '@/components/header'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Footer } from './components/footer'
import { PrivateRoute } from './components/private-route'
import api from './lib/api'
import { EventPage } from './pages/event'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { TicketsPage } from './pages/ticket'
import { VerifyCode } from './pages/verify-code'
import { useEffect, useState } from 'react'
import { Profile } from './pages/profile'

interface User {
  name: string;
  avatarUrl: string;
}

function RootLayout() {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    api.get('/user')
      .then(response => setUser(response.data))
      .catch(console.error);
  }, []);

  return (
    <div className="flex min-h-svh flex-col bg-zinc-950">
      <Header user={user} ticketCount={3} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
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
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-code" element={<VerifyCode />} />
      </Route>
    </Routes>
  )
}
