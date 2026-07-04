import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
    lastName: z
      .string()
      .min(2, { message: "El apellido debe tener al menos 2 caracteres." }),
    email: z
      .string()
      .min(1, { message: "El correo es obligatorio." })
      .email({ message: "El formato del correo no es válido." }),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Debes confirmar tu contraseña." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });
