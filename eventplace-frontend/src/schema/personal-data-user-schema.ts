import { z } from "zod";

export const personalDataSchema = z.object({
  name: z.string().min(2, "Nome obrigatório").max(255, "Nome muito longo"),
  username: z
    .string()
    .min(3, "Usuário obrigatório")
    .max(20, "Usuário muito longo"),
  birthDate: z.date({ error: "Data obrigatória" }),
  cellphone: z
    .string()
    .min(8, "Telefone obrigatório")
    .max(15, "Telefone muito longo"),
});

export type PersonalData = z.infer<typeof personalDataSchema>;
