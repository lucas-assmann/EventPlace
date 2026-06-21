import { z } from "zod";

export const ticketTypeSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  price: z.coerce.number().min(0, "Preço inválido"),
  quantity: z.coerce.number().min(1, "Quantidade mínima é 1"),
});

export const eventSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(255),
  banner: z.string().optional(),
  date: z.string().min(1, "Data obrigatória"),
  appropriate_age: z.enum(["ADULT", "CHILD"]),
  max_person_quantity: z.coerce.number().min(1),
  cep: z.string().length(8, "CEP deve ter 8 dígitos"),
  number: z.string().min(1),
  endAt: z.string().min(1, "Data de término obrigatória"),
  ticketType: z
    .array(ticketTypeSchema)
    .min(1, "Adicione ao menos um tipo de ingresso"),
});

export type EventFormData = z.input<typeof eventSchema>;
