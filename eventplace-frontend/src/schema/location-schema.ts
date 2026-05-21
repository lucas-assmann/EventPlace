import { z } from "zod";

export const locationSchema = z.object({
  cep: z.string().length(9, "CEP obrigatório"),
  country: z.string().min(1, "País obrigatório"),
  state: z.string().min(1, "Estado obrigatório"),
  street: z.string().min(1, "Rua obrigatória"),
  number: z.string().min(1, "Número obrigatório"),
});

export type LocationData = z.infer<typeof locationSchema>;
