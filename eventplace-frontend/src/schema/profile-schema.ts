import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório').max(25),
  username: z.string().min(3, 'Mínimo 3 caracteres').max(20),
  email: z.string().email('Email inválido').max(255),
  avatar: z.string().url('URL inválida').optional().or(z.literal('')),
  birthDate: z.string().min(1, 'Data de nascimento obrigatória'),
  cep: z.string().length(8, 'CEP deve ter 8 dígitos'),
  number: z.string().min(1).max(5),
})

export type ProfileFormData = z.input<typeof profileSchema>