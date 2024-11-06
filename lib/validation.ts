import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, { message: "No mínimo 2 caracteres" })
    .max(50, { message: "No máximo 50 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z
    .string()
    .refine(
      (phone) => /^\+?[1-9]\d{9,14}$/.test(phone), // verifica formato e tamanho entre 10 e 15 caracteres
      { message: "Telefone inválido" }
    ),
});
