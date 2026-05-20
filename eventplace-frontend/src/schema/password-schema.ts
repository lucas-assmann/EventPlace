import { z } from 'zod'

export const passwordSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export type PasswordData = z.infer<typeof passwordSchema>