import { z } from 'zod'

export const personalDataSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório').max(255, 'Nome muito longo'),
  username: z.string().min(3, 'Usuário obrigatório').max(20, 'Usuário muito longo'),
  birthDate: z.date({ error: 'Data obrigatória' }),
})

export type PersonalData = z.infer<typeof personalDataSchema>