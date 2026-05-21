import { z } from 'zod'

export const passwordSchema = z.object({
  email: z.email('E-mail inválido').max(255, 'O e-mail deve ter no máximo 255 caracteres'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres').max(50, 'A senha deve ter no máximo 50 caracteres'),
})

export type PasswordData = z.infer<typeof passwordSchema>