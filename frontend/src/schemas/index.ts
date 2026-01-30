import { z } from "zod";
import { id } from "zod/locales";

export const RegisterSchema = z
  .object({
    name: z.string().min(3, { error: "El nombre es obligatorio" }).max(50),
    email: z
      .email({ error: "El email es invalido" })
      .min(1, { error: "El email es obligatorio" }),
    password: z
      .string()
      .min(8, { error: "La contraseña debe tener min 8 caracteres" })
      .max(50),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    error: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

export const LoginSchema = z.object({
  email: z
    .email({ error: "El email es invalido" })
    .min(1, { error: "El email es obligatorio" }),
  password: z.string().min(1, { error: "La contraseña es obligatoria" }),
});

export const TokenSchema = z
  .string({ error: "Token invalido" })
  .length(6, { error: "Token invalido" });

export const ForgotPasswordSchema = z.object({
  email: z
    .email({ error: "Email no válido" })
    .min(1, { error: "El Email es Obligatorio" }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { error: "El Password debe ser de al menos 8 caracteres" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    error: "Los Passwords no son iguales",
    path: ["password_confirmation"],
  });

export const DraftBudgetSchema = z.object({
  name: z
    .string()
    .min(1, { error: "El Nombre del presupuesto es obligatorio" }),
  amount: z.coerce
    .number({ error: "Cantidad no válida" })
    .min(1, { error: "Cantidad no válida" }),
});

export const SuccessSchema = z.object({
  message: z.string(),
});

export const ErrorResponseSchema = z.object({
  error: z.string(),
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
});

export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema);

export type User = z.infer<typeof UserSchema>;
export type Budget = z.infer<typeof BudgetAPIResponseSchema>;
