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

export type User = z.infer<typeof UserSchema>;
