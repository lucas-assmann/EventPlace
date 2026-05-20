import { z } from 'zod'

export const personalDataSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  username: z.string().min(3, 'Usuário obrigatório'),
  birthDate: z.date({ error: 'Data obrigatória' }),
})

export type PersonalData = z.infer<typeof personalDataSchema>