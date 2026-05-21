import loginImage from '@/assets/login-image.jpg'
import { TypographyH2, TypographyMuted, TypographyP } from '@/components/ui/typography'

import { LocationStep } from '@/components/location-step'
import { PasswordStep } from '@/components/password-step'
import { PersonalDataStep } from '@/components/personal-data-user-step'
import { ProgressStep } from '@/components/progress-step'
import type { LocationData } from '@/schema/location-schema'
import type { PasswordData } from '@/schema/password-schema'
import type { PersonalData } from '@/schema/personal-data-user-schema'
import { Lock, MapPin, User } from 'lucide-react'
import { useState } from 'react'

type RegisterDTO = PersonalData & LocationData & PasswordData

const STEPS = [
  { icon: User, label: 'Dados pessoais' },
  { icon: MapPin, label: 'Localização' },
  { icon: Lock, label: 'Senha' },
]

export function Register() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<RegisterDTO>>({})

  function handleNext(stepData: Partial<RegisterDTO>) {
    const updated = { ...formData, ...stepData }
    setFormData(updated)

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      sendToBackend(updated as RegisterDTO)
    }
  }

  return (
    <div className="relative min-h-svh overflow-hidden bg-black text-white">
      <img
        src={loginImage}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-black/60" />

      <main className="relative z-10 flex min-h-svh items-center justify-center py-10 sm:px-6 px-0">      
        <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur-[100px] sm:p-10 h-full sm:h-auto py-6 px-2 flex flex-col justify-between">
        <div className="mx-auto mb-8 max-w-md text-center">

          <div className="relative flex mb-5 h-20 w-20 items-center justify-center mx-auto">
            <svg
              viewBox="0 0 64 64"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full text-[#7C3AE0]"
            >
              <path
                d="M32 6 58 54H6L32 6Z"
                fill="black"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
              />
            </svg>
            <span className="relative mt-3.5 text-xl font-black tracking-tight text-gray-300">
              EP
            </span>
          </div>

          <TypographyH2 className="mb-4 border-0 p-0 font-semibold leading-tight tracking-tight text-white">
            Bem Vindo ao{' '}
            <TypographyP className="text-[#7C3AE0] text-3xl font-bold">EventPlace</TypographyP>
          </TypographyH2>
          <TypographyMuted className="mx-auto max-w-lg text-sm leading-6 text-white/70">
            Crie sua conta para começar a explorar eventos incríveis e encontrar o que mais combina com você.
          </TypographyMuted>
        </div>


        <div className="flex justify-center gap-4 mb-6">
          <ProgressStep steps={STEPS} currentStep={currentStep} />
        </div>

        <div className="mx-auto w-full max-w-xl">
          {currentStep === 0 && <PersonalDataStep onNext={handleNext} />}
          {currentStep === 1 && <LocationStep onNext={handleNext} />}
          {currentStep === 2 && <PasswordStep onNext={handleNext} />}
        </div>
      </div>
      </main>
    </div>
  )
}