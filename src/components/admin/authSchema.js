import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El correo es obligatorio." })
    .email({ message: "El formato del correo no es válido." }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export default loginSchema;
