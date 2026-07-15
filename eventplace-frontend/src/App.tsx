import { Header } from '@/components/header'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Footer } from './components/footer'
import { PrivateRoute } from './components/private-route'
import { AllEvents } from './pages/all-event'
import { EditProfile } from './pages/edit-profile'
import { EventPage } from './pages/event'
import { Home } from './pages/home'
import { LocalEvent } from './pages/local'
import { Login } from './pages/login'
import { NewEvent } from './pages/new-event'
import { NotFound } from './pages/not-found'
import { Profile } from './pages/profile'
import { Register } from './pages/register'
import { TicketsPage } from './pages/ticket'
import { UpdatePasswordPage } from './pages/update-password'
import { VerifyCode } from './pages/verify-code'

function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-zinc-950 px-4">
      <Header />
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
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/local" element={<LocalEvent />} />
          <Route path="/eventos" element={<AllEvents />} />
          <Route path="/new-event" element={<NewEvent />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/profile/password" element={<UpdatePasswordPage />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
